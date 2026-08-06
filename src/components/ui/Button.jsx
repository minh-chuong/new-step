/**
 * Button Component
 * Variants: primary | secondary | ghost | outline
 * Sizes: sm | md | lg
 *
 * Usage:
 *   <Button variant="primary" size="md" onClick={fn}>Get in touch</Button>
 *   <Button variant="ghost" as="a" href="#projects">View Work</Button>
 */

import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';

const variants = {
  primary: [
    'bg-[var(--accent-secondary)] text-white',
    'hover:bg-[var(--accent-primary)]',
    'shadow-[0_0_24px_var(--accent-glow)]',
    'hover:shadow-[0_0_40px_var(--accent-glow)]',
  ],
  secondary: [
    'bg-[var(--bg-secondary)] text-[var(--text-primary)]',
    'border border-[var(--border-default)]',
    'hover:border-[var(--border-strong)] hover:bg-[var(--bg-tertiary)]',
  ],
  ghost: [
    'text-[var(--text-secondary)]',
    'hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]',
  ],
  outline: [
    'border border-[var(--border-default)] text-[var(--text-primary)]',
    'hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]',
  ],
};

const sizes = {
  sm: 'h-8 px-3 text-xs rounded-[var(--radius-md)]',
  md: 'h-10 px-5 text-sm rounded-[var(--radius-lg)]',
  lg: 'h-12 px-7 text-base rounded-[var(--radius-lg)]',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  as: Component = 'button',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  ...props
}) {
  const classes = cn(
    // Base
    'inline-flex items-center justify-center gap-2',
    'font-medium transition-all duration-200',
    'select-none whitespace-nowrap',
    'focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]',
    'disabled:opacity-40 disabled:pointer-events-none',
    // Variant
    variants[variant],
    // Size
    sizes[size],
    className
  );

  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      style={{ display: 'inline-flex' }}
    >
      <Component className={classes} disabled={disabled} {...props}>
        {loading ? (
          <span
            className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin"
            aria-hidden="true"
          />
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <span className="flex-shrink-0" aria-hidden="true">{icon}</span>
            )}
            {children}
            {icon && iconPosition === 'right' && (
              <span className="flex-shrink-0" aria-hidden="true">{icon}</span>
            )}
          </>
        )}
      </Component>
    </motion.div>
  );
}

export default Button;
