/**
 * ThreeScene — React Three Fiber Scene
 *
 * This file is prepared for R3F integration.
 * The 3D character/model is NOT implemented yet.
 *
 * To integrate:
 * 1. Add your GLTF model to src/assets/models/
 * 2. Import it here using useGLTF from @react-three/drei
 * 3. Replace the placeholder geometry below
 * 4. Import <ThreeScene /> in Hero.jsx
 *
 * ─── Dependencies (already installed) ───────────────────────────
 * - @react-three/fiber
 * - @react-three/drei
 * - three
 */

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';

// ─── Placeholder Geometry (replace with your model) ──────────────
function PlaceholderModel() {
  const meshRef = useRef();

  // Gentle rotation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial
          color="#6366f1"
          metalness={0.4}
          roughness={0.2}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

// ─── Scene Loader Fallback ────────────────────────────────────────
function SceneFallback() {
  return null; // Hero renders its own placeholder while R3F loads
}

// ─── Main Scene ───────────────────────────────────────────────────
export function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 2]}
      performance={{ min: 0.5 }}
      style={{ background: 'transparent' }}
      aria-label="Interactive 3D visualization"
    >
      <Suspense fallback={<SceneFallback />}>
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.2}
          castShadow
        />
        <pointLight position={[-3, 3, 3]} intensity={0.8} color="#818cf8" />

        {/* Environment */}
        <Environment preset="city" />

        {/* Model */}
        <PlaceholderModel />

        {/* Controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={(3 * Math.PI) / 4}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Suspense>
    </Canvas>
  );
}

export default ThreeScene;
