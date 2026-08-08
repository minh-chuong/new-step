/**
 * ThreeScene - transparent canvas wrapper, no border/frame.
 * Suspense lives INSIDE Canvas via Html.
 * Accepts optional `forcedAnimation` prop to lock a specific animation state.
 */
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Html } from '@react-three/drei';
import { CharacterRig } from './CharacterRig';
import useScrollProgress from '../hooks/useScrollProgress';

function CanvasLoader() {
  return (
    <Html center>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '8px', background: 'rgba(10,10,18,0.85)', backdropFilter: 'blur(12px)',
        padding: '10px 18px', borderRadius: '999px',
        border: '1px solid rgba(99,102,241,0.3)',
      }}>
        <span style={{
          width: 16, height: 16, borderRadius: '50%',
          border: '2px solid #6366f1', borderTopColor: 'transparent',
          animation: 'spin 0.8s linear infinite', display: 'block',
        }} />
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#a0a0b0', whiteSpace: 'nowrap' }}>
          Loading 3D Character...
        </span>
      </div>
    </Html>
  );
}

export function ThreeScene({ forcedAnimation }) {
  const { activeSection, sectionProgress } = useScrollProgress();

  return (
    // No border, no background - fully transparent
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      {/* Subtle ambient glow behind character - not a box frame */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 70% at 50% 80%, rgba(99,102,241,0.10) 0%, transparent 70%)',
      }} />

      <Canvas
        camera={{ position: [0, 1.6, 3.8], fov: 42 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
        aria-label="Interactive 3D avatar character"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 6, 4]} intensity={1.4} castShadow />
        <pointLight position={[-3, 4, 2]} intensity={0.7} color="#818cf8" />
        <pointLight position={[3, 0, 3]} intensity={0.3} color="#fbbf24" />
        <Environment preset="city" />

        <Suspense fallback={<CanvasLoader />}>
          <CharacterRig
            activeSection={activeSection}
            sectionProgress={sectionProgress}
            forcedAnimation={forcedAnimation}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default ThreeScene;
