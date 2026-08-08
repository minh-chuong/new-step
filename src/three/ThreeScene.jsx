/**
 * ThreeScene - Full-viewport 3D Canvas
 * Renders the single continuous 3D character avatar across the entire portfolio.
 * 100% transparent, no borders, no purple glow boxes, pointer-events-none.
 */
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { CharacterRig } from './CharacterRig';
import useScrollProgress from '../hooks/useScrollProgress';

export function ThreeScene() {
  const { activeSection, sectionProgress } = useScrollProgress();

  return (
    <div className="w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0.1, 4.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{
          background: 'transparent',
          width: '100vw',
          height: '100vh',
          display: 'block',
          pointerEvents: 'none',
        }}
        aria-label="Interactive 3D avatar character"
      >
        {/* Cinematic lighting */}
        <ambientLight intensity={0.65} />
        <directionalLight position={[-3, 6, 4]} intensity={1.6} castShadow />
        <directionalLight position={[4, 3, -2]} intensity={0.8} color="#c4b5fd" />
        <pointLight position={[0, 0, 4]} intensity={0.5} color="#fef3c7" />
        <Environment preset="city" />

        <Suspense fallback={null}>
          <CharacterRig
            activeSection={activeSection}
            sectionProgress={sectionProgress}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default ThreeScene;
