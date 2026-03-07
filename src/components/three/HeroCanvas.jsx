import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars, Ring } from '@react-three/drei';
import * as THREE from 'three';

function FloatingSphere({ position, scale, speed, color }) {
  const mesh = useRef();
  useFrame(({ clock }) => {
    mesh.current.rotation.x = clock.getElapsedTime() * speed * 0.3;
    mesh.current.rotation.y = clock.getElapsedTime() * speed * 0.2;
  });
  return (
    <Float speed={speed} floatIntensity={1.5} rotationIntensity={0.5}>
      <mesh ref={mesh} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color={color} wireframe opacity={0.3} transparent />
      </mesh>
    </Float>
  );
}

function MainOrb() {
  const mesh = useRef();
  useFrame(({ clock }) => {
    mesh.current.rotation.y = clock.getElapsedTime() * 0.15;
  });
  return (
    <Float speed={2} floatIntensity={0.8}>
      <mesh ref={mesh}>
        <Sphere args={[1.4, 64, 64]}>
          <MeshDistortMaterial
            color="#6366f1"
            attach="material"
            distort={0.45}
            speed={2}
            roughness={0.1}
            metalness={0.8}
            envMapIntensity={1}
          />
        </Sphere>
      </mesh>
    </Float>
  );
}

function Rings() {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.x = clock.getElapsedTime() * 0.1;
    ref.current.rotation.z = clock.getElapsedTime() * 0.05;
  });
  return (
    <group ref={ref}>
      <Ring args={[1.8, 1.85, 64]} rotation={[Math.PI / 3, 0, 0]}>
        <meshBasicMaterial color="#818cf8" opacity={0.25} transparent />
      </Ring>
      <Ring args={[2.3, 2.33, 64]} rotation={[Math.PI / 5, Math.PI / 4, 0]}>
        <meshBasicMaterial color="#22d3ee" opacity={0.15} transparent />
      </Ring>
    </group>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#818cf8" />
      <pointLight position={[-5, -3, -5]} intensity={0.8} color="#22d3ee" />
      <Suspense fallback={null}>
        <Stars radius={80} depth={50} count={3000} factor={3} saturation={0} fade speed={0.5} />
        <MainOrb />
        <Rings />
        <FloatingSphere position={[-3.5, 1.5, -2]}  scale={0.5}  speed={1.2} color="#6366f1" />
        <FloatingSphere position={[3.5, -1.5, -3]}  scale={0.35} speed={0.8} color="#22d3ee" />
        <FloatingSphere position={[2.5, 2.5, -4]}   scale={0.25} speed={1.5} color="#a78bfa" />
        <FloatingSphere position={[-2.5, -2.5, -2]} scale={0.3}  speed={1.0} color="#38bdf8" />
      </Suspense>
    </Canvas>
  );
}
