/**
 * useInView Hook
 * Returns a ref and a boolean indicating whether the element is in the viewport.
 * Used to trigger Framer Motion scroll-based animations.
 *
 * Usage:
 *   const { ref, inView } = useInView({ threshold: 0.1, once: true });
 *   <motion.div ref={ref} animate={inView ? 'visible' : 'hidden'} variants={fadeInUp} />
 */

import { useEffect, useRef, useState } from 'react';

export function useInView({ threshold = 0.15, once = true } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(element);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, once]);

  return { ref, inView };
}
