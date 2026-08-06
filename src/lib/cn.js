/**
 * cn — className utility
 * Merges Tailwind classes safely, resolving conflicts via tailwind-merge.
 * Use this everywhere instead of raw string concatenation.
 *
 * Usage:
 *   cn('px-4 py-2', isActive && 'bg-accent', className)
 */

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
