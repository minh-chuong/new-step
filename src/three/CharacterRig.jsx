/**
 * CharacterRig - Single Continuous 3D Avatar Logic
 * 
 * Features:
 * - Single persistent 3D character instance across the entire site.
 * - Dynamic scroll position interpolation (x, y, z) per section.
 * - Smooth scroll-driven animation transition state machine:
 *   - Hero (Page 1): Standing waving ('wave').
 *   - Scroll Hero -> About (Page 2): Leaps ('jump') and lands into pointing ('point').
 *   - Projects: Pointing ('point').
 *   - Contact: Waving ('wave').
 * - Full-body framing (feet to head completely visible with zero cutoff).
 */
import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useFBX, useAnimations } from '@react-three/drei';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import * as THREE from 'three';

// Preload assets
useGLTF.preload('/models/model.glb');
useGLTF.preload('/models/animations/Standing_Idle.glb');
useGLTF.preload('/models/animations/Waving.glb');
useGLTF.preload('/models/animations/Jumping.glb');
useFBX.preload('/models/animations/Pointing.fbx');

// ── Display & Framing Constants ────────────────────────────────────────────────
const CHAR_SCALE_DESKTOP = 1.35;
const CHAR_SCALE_MOBILE  = 1.05;
const CHAR_Y             = -1.05;
const CAM_LOOKAT         = new THREE.Vector3(0, 0.15, 0);

// Target 3D positions [x, y, z] per section for the single character
const SECTION_CHAR_POSITIONS = {
  hero:       new THREE.Vector3(-1.4, CHAR_Y, 0),
  about:      new THREE.Vector3(-1.4, CHAR_Y, 0),
  projects:   new THREE.Vector3(1.4,  CHAR_Y, 0),
  skills:     new THREE.Vector3(-1.4, CHAR_Y, 0),
  experience: new THREE.Vector3(-1.4, CHAR_Y, 0),
  contact:    new THREE.Vector3(0,    CHAR_Y, 0),
};

// Target camera position
const CAM_POSITION = new THREE.Vector3(0, 0.1, 4.5);

// Section -> default animation state
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

export function CharacterRig({ activeSection }) {
  const groupRef       = useRef();
  const currentAnim    = useRef(null);
  const charPosRef     = useRef(new THREE.Vector3(-1.4, CHAR_Y, 0));
  const prevSectionRef = useRef(activeSection);
  const jumpTimeoutRef = useRef(null);
  const isJumpingRef   = useRef(false);
  const { camera, size } = useThree();

  const isMobile = size.width < 768;

  // Load mesh and CLONE it for clean scene graph
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

  // Per-frame render loop
  useFrame((state) => {
    // ── Section Transition Animation Logic ──
    let targetAnim = sectionToAnim(activeSection);

    // Detect transition from Hero -> About (or any section change)
    if (prevSectionRef.current !== activeSection) {
      if (prevSectionRef.current === 'hero' && activeSection === 'about') {
        // Trigger jump animation transition!
        isJumpingRef.current = true;
        if (jumpTimeoutRef.current) clearTimeout(jumpTimeoutRef.current);
        jumpTimeoutRef.current = setTimeout(() => {
          isJumpingRef.current = false;
        }, 850);
      }
      prevSectionRef.current = activeSection;
    }

    if (isJumpingRef.current) {
      targetAnim = 'jump';
    }

    // ── Animation Crossfading ──
    if (currentAnim.current !== targetAnim) {
      const next = actions[targetAnim] ?? actions['wave'] ?? actions['idle'];
      if (next) {
        const prev = currentAnim.current ? actions[currentAnim.current] : null;
        next.reset().setEffectiveTimeScale(1).setEffectiveWeight(1);
        if (prev && prev !== next) {
          prev.fadeOut(0.35);
          next.crossFadeFrom(prev, 0.35, true);
        }
        next.play();
        currentAnim.current = targetAnim;
      }
    }

    // ── Smooth Character Position Interpolation ──
    const targetPos = isMobile
      ? new THREE.Vector3(0, -1.2, 0)
      : (SECTION_CHAR_POSITIONS[activeSection] ?? SECTION_CHAR_POSITIONS.hero);

    charPosRef.current.lerp(targetPos, 0.06);

    if (groupRef.current) {
      groupRef.current.position.copy(charPosRef.current);

      // Subtle mouse sway
      const maxY = Math.PI / 10;
      const maxX = Math.PI / 18;
      const ry = THREE.MathUtils.clamp(state.pointer.x * maxY, -maxY, maxY);
      const rx = THREE.MathUtils.clamp(-state.pointer.y * maxX, -maxX, maxX);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, ry, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, rx, 0.05);
    }

    // ── Camera Framing ──
    camera.position.copy(CAM_POSITION);
    camera.lookAt(CAM_LOOKAT);
  });

  const scale = isMobile ? CHAR_SCALE_MOBILE : CHAR_SCALE_DESKTOP;

  return (
    <group ref={groupRef} position={[-1.4, CHAR_Y, 0]} scale={scale} dispose={null}>
      <primitive object={clonedScene} />
    </group>
  );
}

export default CharacterRig;
