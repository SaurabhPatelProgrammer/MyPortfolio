import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars, Ring, Torus } from '@react-three/drei';
import * as THREE from 'three';

function FloatingIcosahedron({ position, scale, speed, color }) {
  const mesh = useRef();
  useFrame(({ clock }) => {
    mesh.current.rotation.x = clock.getElapsedTime() * speed * 0.25;
    mesh.current.rotation.y = clock.getElapsedTime() * speed * 0.15;
  });
  return (
    <Float speed={speed} floatIntensity={1.8} rotationIntensity={0.8}>
      <mesh ref={mesh} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color={color} wireframe opacity={0.35} transparent roughness={0.1} metalness={0.9} />
      </mesh>
    </Float>
  );
}

function MainOrb() {
  const mesh = useRef();
  useFrame(({ clock }) => {
    mesh.current.rotation.y = clock.getElapsedTime() * 0.2;
    mesh.current.rotation.x = clock.getElapsedTime() * 0.1;
  });
  return (
    <Float speed={2.5} floatIntensity={1.2}>
      <mesh ref={mesh}>
        <Sphere args={[1.5, 64, 64]}>
          <MeshDistortMaterial
            color="#6366f1"
            attach="material"
            distort={0.4}
            speed={2.2}
            roughness={0.05}
            metalness={0.9}
            envMapIntensity={1.5}
          />
        </Sphere>
      </mesh>
    </Float>
  );
}

function TechRings() {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.x = clock.getElapsedTime() * 0.12;
    ref.current.rotation.z = clock.getElapsedTime() * 0.08;
    ref.current.rotation.y = clock.getElapsedTime() * 0.05;
  });
  return (
    <group ref={ref}>
      {/* Dynamic Torus Ring */}
      <Torus args={[2.0, 0.04, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
        <meshStandardMaterial color="#818cf8" roughness={0.1} metalness={1} opacity={0.6} transparent />
      </Torus>

      {/* Outer Glow Ring */}
      <Ring args={[2.5, 2.53, 64]} rotation={[Math.PI / 6, Math.PI / 4, 0]}>
        <meshBasicMaterial color="#22d3ee" opacity={0.3} transparent side={THREE.DoubleSide} />
      </Ring>

      {/* Cybernetic Grid Ring */}
      <Ring args={[2.9, 2.92, 4]} rotation={[Math.PI / 2, 0, Math.PI / 4]}>
        <meshBasicMaterial color="#a78bfa" opacity={0.4} transparent side={THREE.DoubleSide} />
      </Ring>
    </group>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.45} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#818cf8" />
      <pointLight position={[-10, -10, -5]} intensity={1.2} color="#22d3ee" />
      <pointLight position={[0, 10, 0]} intensity={1.0} color="#ec4899" />

      <Suspense fallback={null}>
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0.5} fade speed={1.5} />
        <MainOrb />
        <TechRings />

        {/* Floating particles/icons surrounding the main AI core orb */}
        <FloatingIcosahedron position={[-3.8, 1.8, -1.5]}  scale={0.55}  speed={1.4} color="#6366f1" />
        <FloatingIcosahedron position={[3.8, -1.8, -2.5]}  scale={0.4}   speed={0.9} color="#22d3ee" />
        <FloatingIcosahedron position={[2.8, 2.8, -3.5]}   scale={0.3}   speed={1.6} color="#a78bfa" />
        <FloatingIcosahedron position={[-2.8, -2.8, -1.5]} scale={0.35}  speed={1.1} color="#38bdf8" />
        <FloatingIcosahedron position={[0, -3.2, -2.0]}    scale={0.25}  speed={1.8} color="#ec4899" />
      </Suspense>
    </Canvas>
  );
}
