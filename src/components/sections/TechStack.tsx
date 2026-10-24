import * as THREE from "three";
import { Component, useRef, useMemo, useState, useEffect, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { BallCollider, Physics, RigidBody, RapierRigidBody } from "@react-three/rapier";
import techs from "../../data/tech-stack.json";

function makeTexture({ image, label }: (typeof techs)[number]) {
  return new Promise<THREE.CanvasTexture>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 384;
      const context = canvas.getContext("2d");
      if (!context) { reject(new Error("Canvas textures are unavailable")); return; }
      context.fillStyle = "#fff";
      context.fillRect(0, 0, 512, 384);
      context.drawImage(img, 156, 40, 200, 200);
      context.fillStyle = "#1c1820";
      context.font = "600 32px system-ui, sans-serif";
      context.textAlign = "center";
      context.fillText(label, 256, 320);
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 1;
      resolve(texture);
    };
    img.onerror = () => reject(new Error("Technology icon could not load"));
    img.src = image;
  });
}

class CanvasBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

type SphereSpec = { scale: number; materialIndex: number; position: [number, number, number] };
const createSpheres = (count: number): SphereSpec[] => Array.from({ length: count }, (_, i) => ({
  scale: [0.7, 1, 0.8][i % 3],
  materialIndex: i % techs.length,
  position: [THREE.MathUtils.randFloatSpread(12), THREE.MathUtils.randFloatSpread(10), THREE.MathUtils.randFloatSpread(5)],
}));

const impulse = new THREE.Vector3();
function SphereGeo({ spec, material, geometry, active }: { spec: SphereSpec; material: THREE.Material; geometry: THREE.BufferGeometry; active: boolean }) {
  const body = useRef<RapierRigidBody>(null);
  useFrame((_state, delta) => {
    if (!active || !body.current) return;
    const position = body.current.translation();
    impulse.set(position.x, position.y, position.z).normalize();
    impulse.multiplyScalar(-40 * Math.min(delta, 0.05) * spec.scale);
    body.current.applyImpulse(impulse, true);
  });
  return <RigidBody position={spec.position} linearDamping={0.75} angularDamping={0.15} friction={0.2} colliders={false} ref={body}>
    <BallCollider args={[spec.scale]} />
    <mesh scale={spec.scale} geometry={geometry} material={material} dispose={null} />
  </RigidBody>;
}

const pointerTarget = new THREE.Vector3();
function Pointer({ active }: { active: boolean }) {
  const body = useRef<RapierRigidBody>(null);
  useFrame(({ pointer, viewport }) => {
    if (!active || !body.current) return;
    pointerTarget.set(pointer.x * viewport.width / 2, pointer.y * viewport.height / 2, 0);
    body.current.setNextKinematicTranslation(pointerTarget);
  });
  return <RigidBody position={[100, 100, 100]} type="kinematicPosition" colliders={false} ref={body}><BallCollider args={[2]} /></RigidBody>;
}

const TechStack = ({ fallback }: { fallback: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [intersecting, setIntersecting] = useState(false);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  const [mobile, setMobile] = useState(() => window.matchMedia("(max-width: 768px), (pointer: coarse)").matches);
  const [materials, setMaterials] = useState<THREE.MeshLambertMaterial[]>([]);
  const [failed, setFailed] = useState(false);
  const geometry = useMemo(() => new THREE.SphereGeometry(1, 20, 16), []);
  const spheres = useMemo(() => createSpheres(mobile ? 10 : 20), [mobile]);
  const active = intersecting && pageVisible;

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px), (pointer: coarse)");
    const update = () => setMobile(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    const observer = new IntersectionObserver(entries => setIntersecting(entries[0].isIntersecting));
    if (ref.current) observer.observe(ref.current);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);
  useEffect(() => {
    let cancelled = false;
    let owned: THREE.MeshLambertMaterial[] = [];
    const dispose = () => owned.forEach(material => { material.map?.dispose(); material.dispose(); });
    Promise.allSettled(techs.map(makeTexture)).then(results => {
      const textures = results.flatMap(result => result.status === "fulfilled" ? [result.value] : []);
      if (cancelled || textures.length !== techs.length) {
        textures.forEach(texture => texture.dispose());
        if (!cancelled) setFailed(true);
        return;
      }
      owned = textures.map(map => new THREE.MeshLambertMaterial({ map, emissive: "#fff", emissiveMap: map, emissiveIntensity: 0.15 }));
      setMaterials(owned);
    });
    return () => { cancelled = true; dispose(); };
  }, []);
  useEffect(() => () => geometry.dispose(), [geometry]);

  return <div ref={ref} className="tech-scene">
    {failed || !materials.length ? fallback : <CanvasBoundary fallback={fallback}>
      <Canvas frameloop={active ? "always" : "never"} dpr={mobile ? 1 : [1, 1.5]}
        gl={{ alpha: true, antialias: false }} camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }} className="tech-canvas" fallback={fallback}>
        <ambientLight intensity={1.5} /><directionalLight position={[5, 10, 15]} intensity={2} />
        <Physics gravity={[0, 0, 0]} paused={!active}>
          <Pointer active={active} />
          {spheres.map((spec, i) => <SphereGeo key={i} spec={spec} material={materials[spec.materialIndex]} geometry={geometry} active={active} />)}
        </Physics>
      </Canvas>
    </CanvasBoundary>}
  </div>;
};
export default TechStack;
