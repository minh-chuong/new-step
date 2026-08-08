/**
 * CharacterRig - unified 3D avatar logic inside R3F Canvas.
 * 
 * Features:
 * - Uses SkeletonUtils.clone() so each Canvas gets an independent scene graph.
 * - Full-body framing (feet to head completely visible with zero cutoff).
 * - Smooth scroll-driven animation transition:
 *   - Hero section: Standing waving ('wave').
 *   - Scroll to About: Leaps ('jump') into action then transitions to pointing ('point').
 *   - Interactive mouse tracking for subtle head/body orientation.
 */
import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useFBX, useAnimations } from '@react-three/drei';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import * as THREE from 'three';

// Preload assets for instant rendering
useGLTF.preload('/models/model.glb');
useGLTF.preload('/models/animations/Standing_Idle.glb');
useGLTF.preload('/models/animations/Waving.glb');
useGLTF.preload('/models/animations/Jumping.glb');
useFBX.preload('/models/animations/Pointing.fbx');

// ── Display & Framing Constants ────────────────────────────────────────────────
// Scale 1.35 + Y offset -1.05 places character feet at y=-1.05, head at y=+1.31.
// Camera at z=4.5 with FOV 45 has vertical bounds [-1.7, +1.9], perfectly framing full body.
const CHAR_SCALE = 1.35;
const CHAR_Y     = -1.05;
const CAM_LOOKAT = new THREE.Vector3(0, 0.15, 0);

const CAM_POSITIONS = {
  hero:       new THREE.Vector3(0, 0.1, 4.5),
  about:      new THREE.Vector3(0, 0.1, 4.5),
  projects:   new THREE.Vector3(0, 0.15, 4.3),
  skills:     new THREE.Vector3(0, 0.2, 4.5),
  experience: new THREE.Vector3(0, 0.1, 4.5),
  contact:    new THREE.Vector3(0, 0.1, 4.5),
};

// Map section to animation state
function sectionToAnim(section) {
  switch (section) {
    case 'hero':       return 'wave';
    case 'about':      return 'point';
    case 'projects':   return 'point';
    case 'skills':     return 'jump';
    case 'experience': return 'idle';
    case 'contact':    return 'wave';
    default:           return 'wave';
  }
}

export function CharacterRig({ activeSection, forcedAnimation }) {
  const groupRef       = useRef();
  const currentAnim    = useRef(null);
  const camTarget      = useRef(new THREE.Vector3(0, 0.1, 4.5));
  const prevSectionRef = useRef(activeSection);
  const jumpTimerRef   = useRef(null);
  const { camera }     = useThree();

  // Load mesh and CLONE it for isolated scene graph per Canvas
  const { scene: originalScene } = useGLTF('/models/model.glb');
  const clonedScene = useMemo(() => {
    const c = clone(originalScene);
    c.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow    = true;
        obj.receiveShadow = true;
      }
    });
    return c;
  }, [originalScene]);

  // Load animation clips
  const idleGltf = useGLTF('/models/animations/Standing_Idle.glb');
  const waveGltf = useGLTF('/models/animations/Waving.glb');
  const jumpGltf = useGLTF('/models/animations/Jumping.glb');
  const pointFbx = useFBX('/models/animations/Pointing.fbx');

  const clips = useMemo(() => {
    const list = [];
    if (idleGltf?.animations?.[0]) {
      const c = idleGltf.animations[0].clone(); c.name = 'idle'; list.push(c);
    }
    if (waveGltf?.animations?.[0]) {
      const c = waveGltf.animations[0].clone(); c.name = 'wave'; list.push(c);
    }
    if (pointFbx?.animations?.[0]) {
      const c = pointFbx.animations[0].clone(); c.name = 'point';
      c.tracks = c.tracks.filter((t) => !t.name.startsWith('Armature_1'));
      list.push(c);
    }
    if (jumpGltf?.animations?.[0]) {
      const c = jumpGltf.animations[0].clone(); c.name = 'jump'; list.push(c);
    }
    return list;
  }, [idleGltf, waveGltf, pointFbx, jumpGltf]);

  const { actions } = useAnimations(clips, groupRef);

  // Per-frame logic: animation crossfading, camera lerp, subtle mouse tracking
  useFrame((state) => {
    let targetAnim = forcedAnimation ?? sectionToAnim(activeSection);

    // Dynamic scroll transition: when scrolling from Hero -> About, play Jump first!
    if (
      !forcedAnimation &&
      prevSectionRef.current === 'hero' &&
      activeSection === 'about' &&
      !jumpTimerRef.current
    ) {
      jumpTimerRef.current = setTimeout(() => {
        jumpTimerRef.current = null;
      }, 850);
    }

    if (jumpTimerRef.current) {
      targetAnim = 'jump';
    }

    prevSectionRef.current = activeSection;

    // Crossfade animation when targetAnim changes
    if (currentAnim.current !== targetAnim) {
      const next = actions[targetAnim] ?? actions['wave'] ?? actions['idle'];
      if (next) {
        const prev = currentAnim.current ? actions[currentAnim.current] : null;
        next.reset().setEffectiveTimeScale(1).setEffectiveWeight(1);
        if (prev && prev !== next) {
          prev.fadeOut(0.4);
          next.crossFadeFrom(prev, 0.4, true);
        }
        next.play();
        currentAnim.current = targetAnim;
      }
    }

    // Camera smooth lerp
    const target = CAM_POSITIONS[activeSection] ?? CAM_POSITIONS.hero;
    camTarget.current.lerp(target, 0.04);
    camera.position.copy(camTarget.current);
    camera.lookAt(CAM_LOOKAT);

    // Subtle body sway toward mouse cursor
    if (groupRef.current) {
      const maxY = Math.PI / 10;
      const maxX = Math.PI / 18;
      const ry = THREE.MathUtils.clamp(state.pointer.x * maxY, -maxY, maxY);
      const rx = THREE.MathUtils.clamp(-state.pointer.y * maxX, -maxX, maxX);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, ry, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, rx, 0.05);
    }
  });

  return (
    <group ref={groupRef} position={[0, CHAR_Y, 0]} scale={CHAR_SCALE} dispose={null}>
      <primitive object={clonedScene} />
    </group>
  );
}

export default CharacterRig;
