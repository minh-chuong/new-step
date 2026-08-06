/**
 * Divider Component
 * Elegant horizontal rule with optional label.
 *
 * Usage:
 *   <Divider />
 *   <Divider label="Or" />
 */

import { cn } from '../../lib/cn';

export function Divider({ label, className, ...props }) {
  if (label) {
    return (
      <div
        className={cn('flex items-center gap-4 my-8', className)}
        role="separator"
        {...props}
      >
        <div className="flex-1 h-px bg-[var(--border-subtle)]" />
        <span className="text-xs text-[var(--text-muted)] uppercase tracking-widest font-medium">
          {label}
        </span>
        <div className="flex-1 h-px bg-[var(--border-subtle)]" />
      </div>
    );
  }

  return (
    <hr
      className={cn('border-none h-px bg-[var(--border-subtle)] my-8', className)}
      {...props}
    />
  );
}

export default Divider;
