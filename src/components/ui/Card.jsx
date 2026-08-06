/**
 * Card Component
 * Reusable glass-morphism card container.
 *
 * Usage:
 *   <Card hoverable>
 *     <Card.Header>...</Card.Header>
 *     <Card.Body>...</Card.Body>
 *   </Card>
 */

import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';

export function Card({ children, className, hoverable = false, as: Component = 'div', ...props }) {
  const baseClasses = cn(
    'rounded-[var(--radius-xl)]',
    'border border-[var(--border-default)]',
    'bg-[var(--bg-secondary)]',
    'overflow-hidden',
    'transition-all duration-300',
    hoverable && [
      'cursor-pointer',
      'hover:border-[var(--border-strong)]',
      'hover:shadow-[var(--shadow-md)]',
    ],
    className
  );

  if (hoverable) {
    return (
      <motion.div
        whileHover={{ y: -4, scale: 1.005 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={baseClasses}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <Component className={baseClasses} {...props}>
      {children}
    </Component>
  );
}

Card.Header = function CardHeader({ children, className, ...props }) {
  return (
    <div
      className={cn('p-6 pb-0', className)}
      {...props}
    >
      {children}
    </div>
  );
};

Card.Body = function CardBody({ children, className, ...props }) {
  return (
    <div className={cn('p-6', className)} {...props}>
      {children}
    </div>
  );
};

Card.Footer = function CardFooter({ children, className, ...props }) {
  return (
    <div
      className={cn('px-6 py-4 border-t border-[var(--border-subtle)]', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
