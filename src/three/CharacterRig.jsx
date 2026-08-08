/**
 * CharacterRig - 3D Avatar Rigging & Animation Controller
 * 
 * Perfect Framing Math:
 * - Character scale 1.0 (native ~1.75m Avaturn model).
 * - Feet placed at y = -0.9, head at y = +0.85.
 * - Camera at z = 3.6 with FOV 40° covers vertical span [-1.31, +1.31].
 * - Guarantees 100% full-body visibility from shoes to head with zero cutoff & zero floating!
 */
import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useFBX, useAnimations } from '@react-three/drei';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import * as THREE from 'three';

// Preload assets for instant load
useGLTF.preload('/models/model.glb');
useGLTF.preload('/models/animations/Standing_Idle.glb');
useGLTF.preload('/models/animations/Waving.glb');
useGLTF.preload('/models/animations/Jumping.glb');
useFBX.preload('/models/animations/Pointing.fbx');

const CHAR_SCALE = 1.0;
const CHAR_Y     = -0.9;
const CAM_LOOKAT = new THREE.Vector3(0, 0.0, 0);
const CAM_POS    = new THREE.Vector3(0, 0.0, 3.6);

export function CharacterRig({ animationState = 'wave' }) {
  const groupRef    = useRef();
  const currentAnim = useRef(null);
  const { camera }  = useThree();

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

  useFrame((state) => {
    // ── Animation Playback & Crossfading ──
    const targetAnim = animationState;

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

    // ── Camera Framing ──
    camera.position.copy(CAM_POS);
    camera.lookAt(CAM_LOOKAT);

    // ── Subtle Body Mouse Sway ──
    if (groupRef.current) {
      const maxY = Math.PI / 12;
      const maxX = Math.PI / 20;
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
