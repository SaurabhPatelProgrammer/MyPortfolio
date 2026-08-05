import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles, Sphere } from '@react-three/drei';

function Core() {
  const group = useRef();
  const inner = useRef();

  useFrame(({ clock, pointer }) => {
    const elapsed = clock.getElapsedTime();
    group.current.rotation.y = elapsed * 0.12 + pointer.x * 0.15;
    group.current.rotation.x = pointer.y * -0.12;
    inner.current.rotation.x = elapsed * -0.2;
    inner.current.rotation.z = elapsed * 0.14;
  });

  return (
    <Float speed={1.4} floatIntensity={0.6} rotationIntensity={0.25}>
      <group ref={group}>
        <Sphere args={[1.38, 48, 48]}>
          <MeshDistortMaterial color="#171221" emissive="#2b1838" emissiveIntensity={0.55} roughness={0.28} metalness={0.7} distort={0.28} speed={1.8} />
        </Sphere>
        <mesh ref={inner}>
          <icosahedronGeometry args={[1.7, 1]} />
          <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.3} />
        </mesh>
        <mesh rotation={[Math.PI / 2.8, 0.3, 0]}>
          <torusGeometry args={[2.05, 0.012, 8, 128]} />
          <meshBasicMaterial color="#fb7185" transparent opacity={0.5} />
        </mesh>
        <mesh rotation={[Math.PI / 1.7, -0.5, 0.2]}>
          <torusGeometry args={[2.35, 0.008, 8, 128]} />
          <meshBasicMaterial color="#a78bfa" transparent opacity={0.25} />
        </mesh>
      </group>
    </Float>
  );
}

export default function InteractiveHeroCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 48 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 4, 5]} intensity={22} color="#a78bfa" distance={12} />
      <pointLight position={[-4, -2, 3]} intensity={14} color="#fb7185" distance={10} />
      <Suspense fallback={null}>
        <Sparkles count={70} scale={7} size={1.4} speed={0.25} color="#f5efff" opacity={0.45} />
        <Core />
      </Suspense>
    </Canvas>
  );
}
