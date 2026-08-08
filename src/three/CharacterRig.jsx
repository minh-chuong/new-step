/**
 * CharacterRig - unified avatar logic inside R3F Canvas.
 *
 * CRITICAL: uses SkeletonUtils.clone() so each Canvas instance gets its OWN
 * copy of the scene graph. Without this, two Canvases sharing the same
 * useGLTF scene will steal the object from each other (Three.js nodes can
 * only have one parent).
 *
 * Animation switching lives in useFrame (not useEffect) because actions
 * from useAnimations may not be populated on the first useEffect run.
 */
import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useFBX, useAnimations } from '@react-three/drei';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import * as THREE from 'three';

// preload
useGLTF.preload('/models/model.glb');
useGLTF.preload('/models/animations/Standing_Idle.glb');
useGLTF.preload('/models/animations/Waving.glb');
useGLTF.preload('/models/animations/Jumping.glb');
useFBX.preload('/models/animations/Pointing.fbx');

// ── display constants ───────────────────────────────────────────────────────────
// At scale 1.5 the ~1.75m Avaturn model = 2.625 world units tall.
// Y offset places feet at y=-1.3, head at y≈1.33, center ≈ y=0.
const CHAR_SCALE = 1.5;
const CHAR_Y     = -1.3;

// Camera sees full body: lookAt at character center, z far enough for FOV 45.
// Visible height at z=4 with FOV 45 ≈ 3.3 units -> fits 2.625 comfortably.
const CAM_LOOKAT = new THREE.Vector3(0, 0, 0);

const CAM_POSITIONS = {
  hero:       new THREE.Vector3(0,    0.0, 4.0),
  about:      new THREE.Vector3(-0.2, 0.0, 4.0),
  projects:   new THREE.Vector3(0.2,  0.0, 3.8),
  skills:     new THREE.Vector3(0,    0.2, 4.0),
  experience: new THREE.Vector3(-0.2, 0.0, 4.0),
  contact:    new THREE.Vector3(0,    0.0, 4.0),
};

// section -> animation name
function sectionToAnim(section) {
  switch (section) {
    case 'hero':       return 'wave';
    case 'about':      return 'point';
    case 'projects':   return 'point';
    case 'skills':     return 'jump';
    case 'experience': return 'idle';
    case 'contact':    return 'wave';
    default:           return 'idle';
  }
}

// ── component ───────────────────────────────────────────────────────────────────
export function CharacterRig({ activeSection, forcedAnimation }) {
  const groupRef    = useRef();
  const currentAnim = useRef(null);
  const camTarget   = useRef(new THREE.Vector3(0, 0, 4.0));
  const { camera }  = useThree();

  // Load mesh and CLONE it so each Canvas instance gets a separate scene graph
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

  // animation clips
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

  // per-frame: animation + camera + mouse tracking
  useFrame((state) => {
    // ── animation (reliable frame-based check) ──
    const nextName = forcedAnimation ?? sectionToAnim(activeSection);
    if (currentAnim.current !== nextName) {
      const next = actions[nextName] ?? actions['idle'];
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

    // ── camera ──
    const target = CAM_POSITIONS[activeSection] ?? CAM_POSITIONS.hero;
    camTarget.current.lerp(target, 0.04);
    camera.position.copy(camTarget.current);
    camera.lookAt(CAM_LOOKAT);

    // ── subtle body sway toward cursor ──
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
