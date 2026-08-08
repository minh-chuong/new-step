/**
 * ThreeScene - fixed: Suspense is INSIDE Canvas (via Html), not wrapping it.
 * OrbitControls removed to avoid fighting camera controller.
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

export function ThreeScene() {
  const { activeSection, sectionProgress } = useScrollProgress();

  return (
    <div style={{
      position: 'relative', width: '100%', height: '100%', minHeight: 380,
      borderRadius: 'var(--radius-2xl, 16px)', overflow: 'hidden',
      border: '1px solid var(--border-default, rgba(255,255,255,0.08))',
      background: 'var(--bg-secondary, rgba(15,15,25,0.4))',
      backdropFilter: 'blur(24px)', boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
    }}>
      <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
      <div style={{
        position: 'absolute', width: 288, height: 288, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, rgba(168,85,247,0.05) 50%, transparent 70%)',
        top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none',
      }} />

      <Canvas
        camera={{ position: [0, 1.5, 4.5], fov: 45 }}
        dpr={[1, 2]}
        style={{ position: 'relative', background: 'transparent' }}
        aria-label="Interactive 3D avatar character"
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 6, 4]} intensity={1.2} castShadow />
        <pointLight position={[-3, 3, -2]} intensity={0.6} color="#818cf8" />
        <pointLight position={[3, 1, 3]} intensity={0.3} color="#fbbf24" />
        <Environment preset="city" />

        <Suspense fallback={<CanvasLoader />}>
          <CharacterRig activeSection={activeSection} sectionProgress={sectionProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default ThreeScene;
