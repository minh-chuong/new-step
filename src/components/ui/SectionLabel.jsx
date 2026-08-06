/**
 * SectionLabel Component
 * Small eyebrow label shown above section headings.
 *
 * Usage:
 *   <SectionLabel>About Me</SectionLabel>
 */

import { cn } from '../../lib/cn';

export function SectionLabel({ children, className, ...props }) {
  return (
    <div
      className={cn('inline-flex items-center gap-2 mb-4', className)}
      {...props}
    >
      <div className="w-4 h-px bg-[var(--accent-primary)] opacity-70" />
      <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--accent-primary)]">
        {children}
      </span>
      <div className="w-4 h-px bg-[var(--accent-primary)] opacity-70" />
    </div>
  );
}

export default SectionLabel;
