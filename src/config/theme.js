/**
 * Design System — Theme Tokens
 * Central source of truth for all design decisions.
 * Mirrors the CSS custom properties defined in globals.css.
 */

export const theme = {
  colors: {
    // Base surfaces (dark-first)
    background: {
      primary: '#09090b',    // zinc-950
      secondary: '#18181b',  // zinc-900
      tertiary: '#27272a',   // zinc-800
      elevated: '#3f3f46',   // zinc-700
    },
    // Text hierarchy
    text: {
      primary: '#fafafa',    // zinc-50
      secondary: '#a1a1aa',  // zinc-400
      tertiary: '#71717a',   // zinc-500
      muted: '#52525b',      // zinc-600
      inverse: '#09090b',    // for light mode buttons
    },
    // Accent / interactive
    accent: {
      primary: '#818cf8',    // indigo-400
      secondary: '#6366f1',  // indigo-500
      muted: 'rgba(99, 102, 241, 0.12)',
      glow: 'rgba(99, 102, 241, 0.25)',
    },
    // Border
    border: {
      subtle: 'rgba(255, 255, 255, 0.06)',
      default: 'rgba(255, 255, 255, 0.10)',
      strong: 'rgba(255, 255, 255, 0.18)',
    },
  },

  spacing: {
    '0': '0px',
    '1': '4px',
    '2': '8px',
    '3': '12px',
    '4': '16px',
    '5': '20px',
    '6': '24px',
    '8': '32px',
    '10': '40px',
    '12': '48px',
    '16': '64px',
    '20': '80px',
    '24': '96px',
    '32': '128px',
  },

  typography: {
    fontFamily: {
      sans: "'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      mono: "'Geist Mono', 'JetBrains Mono', 'Fira Code', monospace",
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem',// 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
      '6xl': '3.75rem', // 60px
      '7xl': '4.5rem',  // 72px
    },
    fontWeight: {
      light: '300',
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: '1.1',
      snug: '1.3',
      normal: '1.5',
      relaxed: '1.7',
    },
    letterSpacing: {
      tight: '-0.03em',
      normal: '-0.01em',
      wide: '0.05em',
      wider: '0.1em',
    },
  },

  borderRadius: {
    none: '0px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '20px',
    '3xl': '28px',
    full: '9999px',
  },

  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.4)',
    md: '0 4px 12px rgba(0,0,0,0.5)',
    lg: '0 8px 32px rgba(0,0,0,0.6)',
    xl: '0 16px 64px rgba(0,0,0,0.7)',
    glow: '0 0 40px rgba(99, 102, 241, 0.15)',
    glowStrong: '0 0 80px rgba(99, 102, 241, 0.3)',
  },

  animation: {
    duration: {
      instant: '100ms',
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      slower: '700ms',
      slowest: '900ms',
    },
    easing: {
      spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
      easeInOut: 'cubic-bezier(0.45, 0, 0.55, 1)',
      linear: 'linear',
    },
  },

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1400px',
  },
};

export default theme;
