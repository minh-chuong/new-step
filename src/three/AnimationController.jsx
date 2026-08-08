import { useEffect, useMemo, useRef } from 'react';
import { useGLTF, useFBX, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

// Preload model & animations for zero latency
useGLTF.preload('/models/model.glb');
useGLTF.preload('/models/animations/Standing_Idle.glb');
useGLTF.preload('/models/animations/Waving.glb');
useGLTF.preload('/models/animations/Jumping.glb');
useFBX.preload('/models/animations/Pointing.fbx');

export function AnimationController({ groupRef, activeSection }) {
  // Map sections to animation states
  const targetAnimation = useMemo(() => {
    switch (activeSection) {
      case 'about':
        return 'wave';
      case 'projects':
        return 'point';
      case 'skills':
        return 'jump';
      case 'experience':
        return 'point';
      case 'contact':
        return 'wave';
      case 'hero':
      default:
        return 'idle';
    }
  }, [activeSection]);

  // Load animation clips
  const idleGltf = useGLTF('/models/animations/Standing_Idle.glb');
  const wavingGltf = useGLTF('/models/animations/Waving.glb');
  const jumpingGltf = useGLTF('/models/animations/Jumping.glb');
  const pointingFbx = useFBX('/models/animations/Pointing.fbx');

  // Prepare named animation clips
  const clips = useMemo(() => {
    const prepared = [];

    if (idleGltf?.animations?.[0]) {
      const c = idleGltf.animations[0].clone();
      c.name = 'idle';
      prepared.push(c);
    }

    if (wavingGltf?.animations?.[0]) {
      const c = wavingGltf.animations[0].clone();
      c.name = 'wave';
      prepared.push(c);
    }

    if (pointingFbx?.animations?.[0]) {
      const c = pointingFbx.animations[0].clone();
      c.name = 'point';
      // Remove root transform track if present to prevent position jumps
      c.tracks = c.tracks.filter((t) => !t.name.startsWith('Armature_1'));
      prepared.push(c);
    }

    if (jumpingGltf?.animations?.[0]) {
      const c = jumpingGltf.animations[0].clone();
      c.name = 'jump';
      prepared.push(c);
    }

    return prepared;
  }, [idleGltf, wavingGltf, pointingFbx, jumpingGltf]);

  const { actions } = useAnimations(clips, groupRef);
  const currentAnimRef = useRef('idle');

  // Crossfade between animations on section change
  useEffect(() => {
    const currentName = currentAnimRef.current;
    const nextName = actions[targetAnimation] ? targetAnimation : 'idle';

    if (currentName === nextName && actions[currentName]?.isRunning()) {
      return;
    }

    const prevAction = actions[currentName];
    const nextAction = actions[nextName];

    if (nextAction) {
      nextAction.reset().enabled = true;

      if (prevAction && prevAction !== nextAction) {
        prevAction.fadeOut(0.4);
        nextAction.crossFadeFrom(prevAction, 0.4, true);
      }

      nextAction.play();
      currentAnimRef.current = nextName;
    }
  }, [targetAnimation, actions]);

  return null;
}

export default AnimationController;
