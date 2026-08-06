/**
 * AnimatedSection Component
 * Wrapper that triggers scroll-based Framer Motion animations.
 * Use this to wrap any section that should animate on entry.
 *
 * Usage:
 *   <AnimatedSection variants={fadeInUp} className="my-section">
 *     <h2>Hello</h2>
 *   </AnimatedSection>
 */

import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { fadeInUp } from '../../config/animations';
import { cn } from '../../lib/cn';

export function AnimatedSection({
  children,
  variants = fadeInUp,
  threshold = 0.1,
  once = true,
  className,
  delay = 0,
  ...props
}) {
  const { ref, inView } = useInView({ threshold, once });

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedSection;
