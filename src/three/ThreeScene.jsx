// ThreeScene Component — 3D Character & Animation System
// Provides a persistent, scroll‑driven avatar that travels through the portfolio.

import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Html } from '@react-three/drei';
import * as THREE from 'three';

import { Character } from './Character';
import AnimationController from './AnimationController';
import CameraController from './CameraController';
import useScrollProgress from '../hooks/useScrollProgress';

// Loading spinner displayed while GLB assets load
function CanvasLoader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2 bg-[var(--bg-primary)]/80 backdrop-blur-md px-4 py-3 rounded-full border border-[var(--border-default)] shadow-lg">
        <span className="w-4 h-4 rounded-full border-2 border-[var(--accent-primary)] border-t-transparent animate-spin" />
        <span className="text-[11px] font-mono text-[var(--text-secondary)] whitespace-nowrap">
          Loading 3D Character…
        </span>
      </div>
    </Html>
  );
}

export function ThreeScene() {
  const { activeSection, sectionProgress } = useScrollProgress();
  const characterRef = useRef();

  return (
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[440px] rounded-[var(--radius-2xl)] overflow-hidden border border-[var(--border-default)] bg-[var(--bg-secondary)]/40 backdrop-blur-xl shadow-[0_16px_48px_rgba(0,0,0,0.5)] group">
      {/* Background grid texture */}
      <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />

      {/* Ambient glow orb */}
      <div
        className="absolute w-72 h-72 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(99,102,241,0.12) 0%, rgba(168,85,247,0.05) 50%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <Suspense fallback={<CanvasLoader />}>
        <Canvas
          camera={{ position: [0, 1.5, 4], fov: 45 }}
          dpr={[1, 2]}
          style={{ background: 'transparent' }}
        >
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
          <pointLight position={[-3, 3, 3]} intensity={0.6} color="#818cf8" />
          <Environment preset="city" />

          {/* Character and controllers */}
          <Character ref={characterRef} />
          <AnimationController groupRef={characterRef} activeSection={activeSection} />
          <CameraController activeSection={activeSection} sectionProgress={sectionProgress} />

          {/* Subtle auto‑rotate controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={(3 * Math.PI) / 4}
            autoRotate
            autoRotateSpeed={0.3}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}

export default ThreeScene;
