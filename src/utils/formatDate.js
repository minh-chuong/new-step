/**
 * formatDate — Utility
 * Formats a date string into a human-readable form.
 *
 * Usage:
 *   formatDate('2024-01-15') // → 'Jan 2024'
 */

export function formatDate(dateString) {
  if (!dateString || dateString === 'Present') return dateString;
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

/**
 * truncate — Utility
 * Truncates a string to a max length with ellipsis.
 *
 * Usage:
 *   truncate('Long description text...', 80)
 */
export function truncate(str, maxLength = 100) {
  if (!str || str.length <= maxLength) return str;
  return `${str.slice(0, maxLength).trimEnd()}…`;
}

/**
 * slugify — Utility
 * Converts a string to URL-safe slug.
 */
export function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
