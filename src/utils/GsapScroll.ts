import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function setCharTimeline(character: THREE.Object3D, camera: THREE.PerspectiveCamera) {
  const media = gsap.matchMedia();
  media.add("(min-width: 1025px) and (prefers-reduced-motion: no-preference)", () => {
    const neck = character.getObjectByName("spine005");
    const screen = character.getObjectByName("screenlight") as THREE.Mesh | undefined;
    const monitor = character.getObjectByName("Plane004")?.children.find(
      child => ((child as THREE.Mesh).material as THREE.Material)?.name === "Material.027"
    ) as THREE.Mesh | undefined;

    if (screen) {
      const material = screen.material as THREE.MeshStandardMaterial;
      gsap.set(material, { transparent: true, opacity: 0, emissiveIntensity: 2.5 });
    }
    if (monitor) gsap.set(monitor.material, { transparent: true, opacity: 0 });

    gsap.timeline({ scrollTrigger: { trigger: ".landing-section", start: "top top", end: "bottom top", scrub: true, invalidateOnRefresh: true } })
      .fromTo(character.rotation, { y: 0 }, { y: 0.7, duration: 1 }, 0)
      .to(camera.position, { z: 22 }, 0)
      .fromTo(".character-model", { x: 0 }, { x: "-25%", duration: 1 }, 0)
      .to(".landing-container", { opacity: 0, duration: 0.4 }, 0)
      .to(".landing-container", { y: "40%", duration: 0.8 }, 0)
      .fromTo(".about-me", { y: "-50%" }, { y: "0%" }, 0);

    const about = gsap.timeline({ scrollTrigger: { trigger: ".about-section", start: "center 55%", end: "bottom top", scrub: true, invalidateOnRefresh: true } })
      .to(camera.position, { z: 75, y: 8.4, duration: 6, delay: 2, ease: "power3.inOut" }, 0)
      .to(".about-section", { y: "30%", duration: 6 }, 0)
      .to(".about-section", { opacity: 0, delay: 3, duration: 2 }, 0)
      .fromTo(".character-model", { pointerEvents: "inherit" }, { pointerEvents: "none", x: "-12%", delay: 2, duration: 5 }, 0)
      .to(character.rotation, { y: 0.92, x: 0.12, delay: 3, duration: 3 }, 0)
      .fromTo(".what-box-in", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, delay: 5 }, 0)
      .fromTo(".character-rim", { opacity: 1, scaleX: 1.4 }, { opacity: 0, scale: 0, y: "-70%", duration: 5, delay: 2 }, 0.3);
    if (neck) about.to(neck.rotation, { x: 0.6, delay: 2, duration: 3 }, 0);
    if (monitor) about.to(monitor.material, { opacity: 1, duration: 0.8, delay: 3.2 }, 0)
      .fromTo(monitor.position, { y: -10, z: 2 }, { y: 0, z: 0, delay: 1.5, duration: 3 }, 0);
    if (screen) about.to(screen.material, { opacity: 1, duration: 0.8, delay: 4.5 }, 0);

    gsap.timeline({ scrollTrigger: { trigger: ".whatIDO", start: "top top", end: "bottom top", scrub: true, invalidateOnRefresh: true } })
      .fromTo(".character-model", { y: "0%" }, { y: "-100%", duration: 4, ease: "none", delay: 1 }, 0)
      .fromTo(".whatIDO", { y: 0 }, { y: "15%", duration: 2 }, 0)
      .to(character.rotation, { x: -0.04, duration: 2, delay: 1 }, 0);
  });
  return () => media.revert();
}

export function setAllTimeline() {
  const media = gsap.matchMedia();
  media.add("(prefers-reduced-motion: no-preference)", () => {
    gsap.timeline({ scrollTrigger: { trigger: ".career-section", start: "top 80%", end: "bottom 60%", scrub: true } })
      .fromTo(".career-timeline", { scaleY: 0.1, transformOrigin: "top" }, { scaleY: 1, duration: 1 }, 0)
      .fromTo(".career-info-box", { opacity: 0.3, y: 20 }, { opacity: 1, y: 0, stagger: 0.15, duration: 0.5 }, 0);
  });
  return () => media.revert();
}
