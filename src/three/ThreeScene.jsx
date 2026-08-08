/**
 * ThreeScene - transparent canvas wrapper, no border/frame.
 * Suspense lives INSIDE Canvas via Html.
 * forcedAnimation: locks character to a specific animation state.
 */
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Html } from "@react-three/drei";
import { CharacterRig } from "./CharacterRig";
import useScrollProgress from "../hooks/useScrollProgress";

function CanvasLoader() {
  return (
    <Html center>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          background: "rgba(10,10,18,0.85)",
          backdropFilter: "blur(12px)",
          padding: "10px 18px",
          borderRadius: "999px",
          border: "1px solid rgba(99,102,241,0.3)",
        }}
      >
        <span
          style={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            border: "2px solid #6366f1",
            borderTopColor: "transparent",
            animation: "spin 0.8s linear infinite",
            display: "block",
          }}
        />
        <span
          style={{
            fontSize: 11,
            fontFamily: "monospace",
            color: "#a0a0b0",
            whiteSpace: "nowrap",
          }}
        >
          Loading 3D Character...
        </span>
      </div>
    </Html>
  );
}

export function ThreeScene({ forcedAnimation, height = "100%" }) {
  const { activeSection, sectionProgress } = useScrollProgress();

  return (
    // Fully transparent — no border, no background box
    <div
      style={{
        position: "relative",
        width: "100%",
        height: height,
        overflow: "visible",
      }}
    >
      {/* Soft ambient glow — NOT a visible box */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 55% 65% at 50% 75%, rgba(99,102,241,0.11) 0%, transparent 70%)",
        }}
      />

      <Canvas
        camera={{ position: [0, 0.6, 3.4], fov: 50 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{
          background: "transparent",
          width: "100%",
          height: "100%",
          display: "block",
        }}
        aria-label="Interactive 3D avatar character"
      >
        {/* ── Cinematic lighting ─────────────────────────────── */}
        {/* Soft ambient */}
        <ambientLight intensity={0.6} />
        {/* Main key light from upper-left */}
        <directionalLight position={[-3, 6, 4]} intensity={1.6} castShadow />
        {/* Rim light from right */}
        <directionalLight position={[4, 3, -2]} intensity={0.8} color="#c4b5fd" />
        {/* Warm fill from front-low */}
        <pointLight position={[0, 0, 4]} intensity={0.5} color="#fef3c7" />
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
