/**
 * Badge Component
 * Small pill label for tags, categories, status indicators.
 *
 * Variants: default | accent | success | warning | muted
 *
 * Usage:
 *   <Badge>React</Badge>
 *   <Badge variant="accent">Featured</Badge>
 */

import { cn } from '../../lib/cn';

const variants = {
  default: 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-subtle)]',
  accent: 'bg-[var(--accent-muted)] text-[var(--accent-primary)] border border-[var(--accent-primary)]/20',
  success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  muted: 'bg-transparent text-[var(--text-muted)] border border-[var(--border-subtle)]',
};

export function Badge({ children, variant = 'default', className, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1',
        'px-2.5 py-0.5',
        'text-xs font-medium rounded-full',
        'whitespace-nowrap',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
