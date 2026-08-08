import React, { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Load model once for efficiency
useGLTF.preload('/models/model.glb');

/**
 * Character component renders the main avatar model.
 * The groupRef is forwarded so external controllers can manipulate position/rotation.
 */
export const Character = forwardRef(function Character(_, ref) {
  const { scene } = useGLTF('/models/model.glb');

  // Ensure the model casts and receives shadows
  scene.traverse((obj) => {
    if (obj.isMesh) {
      obj.castShadow = true;
      obj.receiveShadow = true;
    }
  });

  // The model is placed inside a group so we can move/rotate it as a whole.
  return (
    <group ref={ref} dispose={null}>
      <primitive object={scene} />
    </group>
  );
});

export default Character;
