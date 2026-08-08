/**
 * CharacterRig - all avatar logic in one place (runs inside R3F Canvas).
 * Loads the mesh + 4 animation clips, handles:
 *   - section-based animation crossfade
 *   - per-frame camera smooth lerp (no OrbitControls conflict)
 *   - subtle mouse-tracking body rotation
 */
import { useRef, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useFBX, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

// Preload assets
useGLTF.preload('/models/model.glb');
useGLTF.preload('/models/animations/Standing_Idle.glb');
useGLTF.preload('/models/animations/Waving.glb');
useGLTF.preload('/models/animations/Jumping.glb');
useFBX.preload('/models/animations/Pointing.fbx');

// Camera waypoints per section
const CAM_POSITIONS = {
  hero:       new THREE.Vector3(0,   1.5, 4.5),
  about:      new THREE.Vector3(-0.4, 1.5, 4.2),
  projects:   new THREE.Vector3(0.3, 1.2, 4.0),
  skills:     new THREE.Vector3(0,   1.8, 4.2),
  experience: new THREE.Vector3(-0.3, 1.4, 4.5),
  contact:    new THREE.Vector3(0,   1.5, 4.5),
};
const CAM_LOOKAT = new THREE.Vector3(0, 1.2, 0);

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

export function CharacterRig({ activeSection, sectionProgress }) {
  const groupRef   = useRef();
  const currentAnim = useRef('idle');
  const camTarget  = useRef(new THREE.Vector3(0, 1.5, 4.5));
  const { camera }  = useThree();

  // Load mesh
  const { scene } = useGLTF('/models/model.glb');

  // Ensure shadows on all meshes
  useMemo(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow    = true;
        obj.receiveShadow = true;
      }
    });
  }, [scene]);

  // Load animation clips
  const idleGltf    = useGLTF('/models/animations/Standing_Idle.glb');
  const waveGltf    = useGLTF('/models/animations/Waving.glb');
  const jumpGltf    = useGLTF('/models/animations/Jumping.glb');
  const pointFbx    = useFBX('/models/animations/Pointing.fbx');

  const clips = useMemo(() => {
    const list = [];

    if (idleGltf?.animations?.[0]) {
      const c = idleGltf.animations[0].clone(); c.name = 'idle'; list.push(c);
    }
    if (waveGltf?.animations?.[0]) {
      const c = waveGltf.animations[0].clone(); c.name = 'wave'; list.push(c);
    }
    if (pointFbx?.animations?.[0]) {
      const c = pointFbx.animations[0].clone();
      c.name = 'point';
      // Remove root armature track to prevent position jump
      c.tracks = c.tracks.filter((t) => !t.name.startsWith('Armature_1'));
      list.push(c);
    }
    if (jumpGltf?.animations?.[0]) {
      const c = jumpGltf.animations[0].clone(); c.name = 'jump'; list.push(c);
    }

    return list;
  }, [idleGltf, waveGltf, pointFbx, jumpGltf]);

  const { actions } = useAnimations(clips, groupRef);

  // Crossfade animation when section changes
  useEffect(() => {
    const nextName = sectionToAnim(activeSection);
    if (currentAnim.current === nextName) return;

    const prev = actions[currentAnim.current];
    const next = actions[nextName] ?? actions['idle'];
    if (!next) return;

    next.reset().setEffectiveTimeScale(1).setEffectiveWeight(1);
    if (prev && prev !== next) {
      prev.fadeOut(0.5);
      next.crossFadeFrom(prev, 0.5, true);
    }
    next.play();
    currentAnim.current = nextName;
  }, [activeSection, actions]);

  // Per-frame: smooth camera lerp + subtle body mouse tracking
  useFrame((state) => {
    const target = CAM_POSITIONS[activeSection] ?? CAM_POSITIONS.hero;
    camTarget.current.lerp(target, 0.04);
    camera.position.copy(camTarget.current);
    camera.lookAt(CAM_LOOKAT);

    // Subtle body rotation toward pointer (clamped)
    if (groupRef.current) {
      const maxY = Math.PI / 8;
      const maxX = Math.PI / 14;
      const ry = THREE.MathUtils.clamp(state.pointer.x * maxY, -maxY, maxY);
      const rx = THREE.MathUtils.clamp(-state.pointer.y * maxX, -maxX, maxX);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, ry, 0.06);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, rx, 0.06);
    }
  });

  return (
    // Position and scale character: feet at y=0, center in frame
    <group ref={groupRef} position={[0, -1.8, 0]} scale={1.8} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

export default CharacterRig;
