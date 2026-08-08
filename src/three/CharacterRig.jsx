/**
 * CharacterRig - all avatar logic inside R3F Canvas.
 * Loads mesh + 4 animation clips.
 * Handles: animation crossfade, smooth camera lerp, subtle mouse tracking.
 * forcedAnimation: overrides scroll-based animation (for non-hero sections).
 */
import { useRef, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useFBX, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

// Preload all assets upfront
useGLTF.preload('/models/model.glb');
useGLTF.preload('/models/animations/Standing_Idle.glb');
useGLTF.preload('/models/animations/Waving.glb');
useGLTF.preload('/models/animations/Jumping.glb');
useFBX.preload('/models/animations/Pointing.fbx');

// Camera positions per section - tuned so character is centered
const CAM_POSITIONS = {
  hero:       new THREE.Vector3(0,    1.1, 3.8),
  about:      new THREE.Vector3(-0.2, 1.1, 3.8),
  projects:   new THREE.Vector3(0.2,  1.1, 3.6),
  skills:     new THREE.Vector3(0,    1.3, 3.8),
  experience: new THREE.Vector3(-0.2, 1.1, 3.8),
  contact:    new THREE.Vector3(0,    1.1, 3.8),
};

// Camera looks at character chest/face area
const CAM_LOOKAT = new THREE.Vector3(0, 0.9, 0);

// Section -> animation name
function sectionToAnim(section) {
  switch (section) {
    case 'about':      return 'wave';
    case 'projects':   return 'point';
    case 'skills':     return 'jump';
    case 'experience': return 'point';
    case 'contact':    return 'wave';
    default:           return 'idle';
  }
}

export function CharacterRig({ activeSection, sectionProgress, forcedAnimation }) {
  const groupRef    = useRef();
  const currentAnim = useRef(null); // null = not started yet
  const camTarget   = useRef(new THREE.Vector3(0, 1.1, 3.8));
  const { camera }  = useThree();

  // Load mesh
  const { scene } = useGLTF('/models/model.glb');

  // Enable shadows on all meshes once
  useMemo(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow    = true;
        obj.receiveShadow = true;
      }
    });
  }, [scene]);

  // Load animation clips
  const idleGltf = useGLTF('/models/animations/Standing_Idle.glb');
  const waveGltf = useGLTF('/models/animations/Waving.glb');
  const jumpGltf = useGLTF('/models/animations/Jumping.glb');
  const pointFbx = useFBX('/models/animations/Pointing.fbx');

  const clips = useMemo(() => {
    const list = [];

    if (idleGltf?.animations?.[0]) {
      const c = idleGltf.animations[0].clone();
      c.name = 'idle';
      list.push(c);
    }
    if (waveGltf?.animations?.[0]) {
      const c = waveGltf.animations[0].clone();
      c.name = 'wave';
      list.push(c);
    }
    if (pointFbx?.animations?.[0]) {
      const c = pointFbx.animations[0].clone();
      c.name = 'point';
      // Remove root armature track to prevent position jump
      c.tracks = c.tracks.filter((t) => !t.name.startsWith('Armature_1'));
      list.push(c);
    }
    if (jumpGltf?.animations?.[0]) {
      const c = jumpGltf.animations[0].clone();
      c.name = 'jump';
      list.push(c);
    }

    return list;
  }, [idleGltf, waveGltf, pointFbx, jumpGltf]);

  const { actions } = useAnimations(clips, groupRef);

  // Play/crossfade animation when section changes (or forcedAnimation changes)
  useEffect(() => {
    // Determine target animation
    const nextName = forcedAnimation ?? sectionToAnim(activeSection);
    if (currentAnim.current === nextName) return;

    const prev = currentAnim.current ? actions[currentAnim.current] : null;
    const next = actions[nextName] ?? actions['idle'];
    if (!next) return;

    next.reset().setEffectiveTimeScale(1).setEffectiveWeight(1);

    if (prev && prev !== next) {
      prev.fadeOut(0.5);
      next.crossFadeFrom(prev, 0.5, true);
    }

    next.play();
    currentAnim.current = nextName;
  }, [activeSection, forcedAnimation, actions]);

  // Per-frame smooth camera lerp + subtle body mouse tracking
  useFrame((state) => {
    const target = CAM_POSITIONS[activeSection] ?? CAM_POSITIONS.hero;
    camTarget.current.lerp(target, 0.04);
    camera.position.copy(camTarget.current);
    camera.lookAt(CAM_LOOKAT);

    // Subtle body sway toward mouse pointer
    if (groupRef.current) {
      const maxY = Math.PI / 10;
      const maxX = Math.PI / 18;
      const ry = THREE.MathUtils.clamp(state.pointer.x * maxY, -maxY, maxY);
      const rx = THREE.MathUtils.clamp(-state.pointer.y * maxX, -maxX, maxX);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, ry, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, rx, 0.05);
    }
  });

  // Character: feet at y=0 in model space. Offset down so full body is visible.
  // scale=1 for native size (Avaturn ~1.7m), position y=-0.95 drops feet to below center
  return (
    <group ref={groupRef} position={[0, -0.95, 0]} scale={1} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

export default CharacterRig;
