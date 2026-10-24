import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/loadingContext";
import handleResize from "./utils/resizeUtils";
import { handleMouseMove, handleHeadRotation } from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { disposeObject } from "./utils/disposeObject";
import { setCharTimeline } from "../../utils/GsapScroll";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    const container = canvasDiv.current;
    if (!container) return;
    const controller = new AbortController();
    const scene = new THREE.Scene();
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: window.innerWidth > 768 });
    } catch {
      setLoading(100);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth <= 768 ? 1 : 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    container.appendChild(renderer.domElement);
    const camera = new THREE.PerspectiveCamera(14.5, 1, 0.1, 1000);
    camera.position.set(0, 13.1, 24.7);
    camera.zoom = 1.1;
    handleResize(renderer, camera, container);
    const resize = new ResizeObserver(() => {
      handleResize(renderer, camera, container);
      if (reduced.matches) resume();
    });
    resize.observe(container);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const light = setLighting(scene, controller.signal, () => resume());
    const clock = new THREE.Clock();
    let animations: ReturnType<typeof setAnimations> | undefined;
    let head: THREE.Object3D | undefined;
    let screen: THREE.Mesh | undefined;
    let cleanupTimeline: (() => void) | undefined;
    let cleanupHover: (() => void) | undefined;
    let rafId = 0;
    let visible = true;
    let mouse = { x: 0, y: 0 };

    const render = () => {
      rafId = 0;
      if (controller.signal.aborted || !visible || document.hidden) return;
      const delta = Math.min(clock.getDelta(), 0.05);
      if (!reduced.matches) {
        animations?.mixer.update(delta);
        if (head) handleHeadRotation(head, mouse.x, mouse.y,
          1 - Math.pow(0.9, delta * 60), 1 - Math.pow(0.8, delta * 60), THREE.MathUtils.lerp);
      }
      if (screen) light.setPointLight(screen);
      renderer.render(scene, camera);
      if (!reduced.matches) rafId = requestAnimationFrame(render);
    };
    const resume = () => {
      cancelAnimationFrame(rafId);
      clock.getDelta();
      render();
    };
    const observer = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      resume();
    }, { rootMargin: "100px" });
    observer.observe(container);
    document.addEventListener("visibilitychange", resume);
    reduced.addEventListener("change", resume);
    const onPointerMove = (event: PointerEvent) => {
      if (visible && !reduced.matches) handleMouseMove(event, (x, y) => { mouse = { x, y }; });
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const onContextLost = (event: Event) => { event.preventDefault(); cancelAnimationFrame(rafId); };
    renderer.domElement.addEventListener("webglcontextlost", onContextLost);
    renderer.domElement.addEventListener("webglcontextrestored", resume);

    setCharacter(controller.signal).loadCharacter().then(gltf => {
      if (!gltf) return;
      // Cleanup can occur between resolving the model and this callback.
      if (controller.signal.aborted) { disposeObject(gltf.scene); return; }
      scene.add(gltf.scene);
      head = gltf.scene.getObjectByName("spine006");
      screen = gltf.scene.getObjectByName("screenlight") as THREE.Mesh | undefined;
      animations = setAnimations(gltf, reduced.matches);
      if (hoverDivRef.current && !reduced.matches) cleanupHover = animations.hover(hoverDivRef.current);
      cleanupTimeline = setCharTimeline(gltf.scene, camera);
      if (!reduced.matches) animations.startIntro();
      resume();
    }).catch(error => {
      if (!controller.signal.aborted) console.warn("3D character could not load; portfolio content remains available.", error);
    }).finally(() => {
      if (!controller.signal.aborted) setLoading(100);
    });

    return () => {
      controller.abort();
      cancelAnimationFrame(rafId);
      observer.disconnect();
      resize.disconnect();
      document.removeEventListener("visibilitychange", resume);
      reduced.removeEventListener("change", resume);
      window.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
      renderer.domElement.removeEventListener("webglcontextrestored", resume);
      cleanupTimeline?.();
      cleanupHover?.();
      animations?.dispose();
      light.dispose();
      disposeObject(scene);
      scene.clear();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [setLoading]);

  return <div className="character-container" aria-hidden="true"><div className="character-model" ref={canvasDiv}>
    <div className="character-rim" /><div className="character-hover" ref={hoverDivRef} />
  </div></div>;
};
export default Scene;
