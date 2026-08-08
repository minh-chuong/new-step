/**
 * ThreeScene Component — Clean, transparent R3F Canvas
 * 100% transparent background, no purple glow boxes, no borders.
 */

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { CharacterRig } from './CharacterRig';

export function ThreeScene({ animationState = 'wave', height = '520px' }) {
  return (
    <div className="relative w-full overflow-hidden" style={{ height }}>
      <Canvas
        camera={{ position: [0, 0, 3.6], fov: 40 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{
          background: 'transparent',
          width: '100%',
          height: '100%',
          display: 'block',
        }}
        aria-label="Interactive 3D avatar character"
      >
        {/* Soft cinematic lighting */}
        <ambientLight intensity={0.65} />
        <directionalLight position={[-3, 6, 4]} intensity={1.6} castShadow />
        <directionalLight position={[4, 3, -2]} intensity={0.8} color="#c4b5fd" />
        <pointLight position={[0, 0, 4]} intensity={0.5} color="#fef3c7" />
        <Environment preset="city" />

        <Suspense fallback={null}>
          <CharacterRig animationState={animationState} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default ThreeScene;
