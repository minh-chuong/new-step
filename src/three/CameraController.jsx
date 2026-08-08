import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { Vector3 } from 'three';

/**
 * CameraController interpolates the camera position and lookAt target based on scroll progress.
 * It receives the active section and a normalized progress (0‑1) within that section.
 */
export function CameraController({ activeSection, sectionProgress }) {
  const { camera, scene } = useThree();
  const targetRef = useRef(new Vector3());

  // Define base camera positions per section (adjust for a premium feel)
  const CAMERA_POS = {
    hero: new Vector3(0, 1.5, 4),
    about: new Vector3(-1, 1.5, 4),
    projects: new Vector3(0, 1.5, 3),
    skills: new Vector3(0, 2, 3.5),
    experience: new Vector3(0, 1, 4.5),
    contact: new Vector3(0, 1.5, 4),
  };

  // Define where the camera looks at (generally the character origin)
  const LOOK_AT = new Vector3(0, 1.2, 0);

  useEffect(() => {
    // Compute next camera position based on section and progress (simple lerp to next section)
    const currentPos = CAMERA_POS[activeSection] || CAMERA_POS.hero;
    // For smooth transition we could look ahead to next section, but keep simple
    targetRef.current.lerpVectors(camera.position, currentPos, 0.08);
    camera.position.copy(targetRef.current);
    camera.lookAt(LOOK_AT);
    // Ensure the changes are applied on each render frame
  }, [activeSection, sectionProgress, camera]);

  return null;
}

export default CameraController;
