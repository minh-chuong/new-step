/**
 * CharacterRig - unified avatar logic inside R3F Canvas.
 *
 * Animation note: animation switching is done inside useFrame (not useEffect)
 * because `actions` from useAnimations may be populated after the first
 * useEffect run. useFrame polls every frame but the guard check is O(1).
 *
 * Camera note: CAM_LOOKAT must aim at character center-mass, not above head.
 */
import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useFBX, useAnimations } from "@react-three/drei";
import * as THREE from "three";

// ── preload assets ──────────────────────────────────────────────────────────────
useGLTF.preload("/models/model.glb");
useGLTF.preload("/models/animations/Standing_Idle.glb");
useGLTF.preload("/models/animations/Waving.glb");
useGLTF.preload("/models/animations/Jumping.glb");
useFBX.preload("/models/animations/Pointing.fbx");

// ── character display constants ─────────────────────────────────────────────────
// Scale 1.8 makes the ~1.75m Avaturn model fill the frame nicely.
// At this scale the character spans world y = [-1.1 , -1.1 + 1.75*1.8] = [-1.1 , 2.05]
// Center of mass ≈ y = 0.475  → camera lookAt set to 0.4
const CHAR_SCALE = 1.8;
const CHAR_Y     = -1.1;   // vertical offset: pushes feet below center
const CAM_LOOKAT = new THREE.Vector3(0, 0.4, 0);

// Camera positions per section — all aimed at character center
const CAM_POSITIONS = {
  hero:       new THREE.Vector3(0,    0.6, 3.4),
  about:      new THREE.Vector3(-0.3, 0.6, 3.4),
  projects:   new THREE.Vector3(0.3,  0.6, 3.2),
  skills:     new THREE.Vector3(0,    0.8, 3.4),
  experience: new THREE.Vector3(-0.2, 0.6, 3.4),
  contact:    new THREE.Vector3(0,    0.6, 3.4),
};

// ── section → animation name ────────────────────────────────────────────────────
function sectionToAnim(section) {
  switch (section) {
    case "about":      return "wave";
    case "projects":   return "point";
    case "skills":     return "jump";
    case "experience": return "point";
    case "contact":    return "wave";
    default:           return "idle";
  }
}

// ── component ───────────────────────────────────────────────────────────────────
export function CharacterRig({ activeSection, forcedAnimation }) {
  const groupRef    = useRef();
  const currentAnim = useRef(null);
  const camTarget   = useRef(new THREE.Vector3(0, 0.6, 3.4));
  const { camera }  = useThree();

  // ── mesh ─────────────────────────────────────────────────────────────────────
  const { scene } = useGLTF("/models/model.glb");

  useMemo(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow    = true;
        obj.receiveShadow = true;
      }
    });
  }, [scene]);

  // ── animation clips ──────────────────────────────────────────────────────────
  const idleGltf = useGLTF("/models/animations/Standing_Idle.glb");
  const waveGltf = useGLTF("/models/animations/Waving.glb");
  const jumpGltf = useGLTF("/models/animations/Jumping.glb");
  const pointFbx = useFBX("/models/animations/Pointing.fbx");

  const clips = useMemo(() => {
    const list = [];

    if (idleGltf?.animations?.[0]) {
      const c = idleGltf.animations[0].clone();
      c.name = "idle";
      list.push(c);
    }
    if (waveGltf?.animations?.[0]) {
      const c = waveGltf.animations[0].clone();
      c.name = "wave";
      list.push(c);
    }
    if (pointFbx?.animations?.[0]) {
      const c = pointFbx.animations[0].clone();
      c.name = "point";
      c.tracks = c.tracks.filter((t) => !t.name.startsWith("Armature_1"));
      list.push(c);
    }
    if (jumpGltf?.animations?.[0]) {
      const c = jumpGltf.animations[0].clone();
      c.name = "jump";
      list.push(c);
    }

    return list;
  }, [idleGltf, waveGltf, pointFbx, jumpGltf]);

  const { actions } = useAnimations(clips, groupRef);

  // ── per-frame: animation switching + camera lerp + mouse tracking ─────────────
  useFrame((state) => {
    // ─ animation (reliable: runs every frame so we never miss a state change) ─
    const nextName = forcedAnimation ?? sectionToAnim(activeSection);

    if (currentAnim.current !== nextName) {
      const next = actions[nextName] ?? actions["idle"];
      if (next) {
        const prev = currentAnim.current ? actions[currentAnim.current] : null;
        next.reset().setEffectiveTimeScale(1).setEffectiveWeight(1);
        if (prev && prev !== next) {
          prev.fadeOut(0.5);
          next.crossFadeFrom(prev, 0.5, true);
        }
        next.play();
        currentAnim.current = nextName;
      }
    }

    // ─ camera smooth lerp ─
    const target = CAM_POSITIONS[activeSection] ?? CAM_POSITIONS.hero;
    camTarget.current.lerp(target, 0.04);
    camera.position.copy(camTarget.current);
    camera.lookAt(CAM_LOOKAT);

    // ─ subtle body sway toward cursor ─
    if (groupRef.current) {
      const maxY = Math.PI / 10;
      const maxX = Math.PI / 18;
      const ry = THREE.MathUtils.clamp(state.pointer.x * maxY, -maxY, maxY);
      const rx = THREE.MathUtils.clamp(-state.pointer.y * maxX, -maxX, maxX);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y, ry, 0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x, rx, 0.05
      );
    }
  });

  return (
    <group
      ref={groupRef}
      position={[0, CHAR_Y, 0]}
      scale={CHAR_SCALE}
      dispose={null}
    >
      <primitive object={scene} />
    </group>
  );
}

export default CharacterRig;
