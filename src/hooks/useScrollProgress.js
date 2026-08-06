/**
 * useScrollProgress Hook
 * Returns a Framer Motion MotionValue representing scroll progress (0–1).
 * Used for parallax effects and scroll-driven animations.
 *
 * Usage:
 *   const progress = useScrollProgress();
 *   const y = useTransform(progress, [0, 1], [0, -100]);
 */

import { useScroll } from 'framer-motion';

export function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  return scrollYProgress;
}
