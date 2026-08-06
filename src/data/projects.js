/**
 * Projects Data
 * Showcase your best work here.
 * Each project is an isolated config object — add/remove freely.
 */

export const projects = [
  {
    id: 'project-1',
    title: 'Orbit Design System',
    description:
      'A comprehensive design system built for scale — 200+ components, dark/light mode, and full Figma integration. Used by 12 product teams.',
    longDescription:
      'Orbit is a production-grade design system that unifies the visual language across a SaaS platform. It includes a token architecture, a React component library, and Figma documentation.',
    tags: ['Design System', 'React', 'TypeScript', 'Storybook'],
    category: 'design-systems',
    image: null, // Replace with image path e.g. '/projects/orbit.png'
    featured: true,
    links: {
      live: 'https://yourproject.com',
      github: 'https://github.com/yourusername/orbit',
      case_study: null,
    },
    color: '#6366f1', // accent color for the card
    year: '2024',
  },
  {
    id: 'project-2',
    title: 'Flux — AI Writing Tool',
    description:
      'A minimal AI writing assistant with real-time collaboration, document versioning, and an elegant distraction-free editor.',
    longDescription:
      'Flux integrates OpenAI GPT-4 with a custom editor built on ProseMirror. Features include real-time multiplayer cursors, auto-save, and keyboard-first navigation.',
    tags: ['Product Design', 'Next.js', 'Prisma', 'OpenAI'],
    category: 'product',
    image: null,
    featured: true,
    links: {
      live: 'https://yourproject.com',
      github: null,
      case_study: 'https://yourportfolio.com/case-studies/flux',
    },
    color: '#10b981',
    year: '2024',
  },
  {
    id: 'project-3',
    title: 'Beacon Analytics',
    description:
      'Privacy-first analytics platform for indie makers. Cookie-free, GDPR compliant, and beautifully visualized.',
    longDescription:
      'Beacon is a Plausible-alternative built with ClickHouse for time-series data. The dashboard visualizes traffic, events, and funnels in real time.',
    tags: ['Analytics', 'Data Viz', 'Go', 'ClickHouse'],
    category: 'product',
    image: null,
    featured: false,
    links: {
      live: 'https://yourproject.com',
      github: 'https://github.com/yourusername/beacon',
      case_study: null,
    },
    color: '#f59e0b',
    year: '2023',
  },
  {
    id: 'project-4',
    title: 'Persona — Brand Identity',
    description:
      'Full brand identity system for a fintech startup: logo, typography, motion language, and a 60-page brand guidelines document.',
    longDescription: '',
    tags: ['Branding', 'Motion', 'Figma', 'Identity'],
    category: 'design',
    image: null,
    featured: false,
    links: {
      live: null,
      github: null,
      case_study: 'https://yourportfolio.com/case-studies/persona',
    },
    color: '#ec4899',
    year: '2023',
  },
];

// Filter categories for the projects section filter bar
export const projectCategories = [
  { id: 'all', label: 'All Work' },
  { id: 'product', label: 'Product' },
  { id: 'design-systems', label: 'Design Systems' },
  { id: 'design', label: 'Design' },
];

export default projects;
