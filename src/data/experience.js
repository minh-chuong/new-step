/**
 * Experience Data
 * Work history displayed in the Experience / Timeline section.
 * Add entries in reverse chronological order (most recent first).
 */

export const experience = [
  {
    id: 'exp-1',
    company: 'Vercel',
    companyUrl: 'https://vercel.com',
    role: 'Senior Product Designer',
    type: 'Full-time',
    period: {
      start: 'Jan 2023',
      end: 'Present',
    },
    location: 'San Francisco, CA (Remote)',
    description:
      'Led design for the Vercel Dashboard redesign — improved developer velocity metrics by 34%. Established new component patterns adopted across 8 product teams.',
    highlights: [
      'Redesigned core deployment workflow used by 300k+ developers',
      'Built Vercel\'s internal design system "Geist UI" used company-wide',
      'Collaborated with engineering on the Next.js App Router documentation experience',
    ],
    logo: null, // '/logos/vercel.svg'
    current: true,
  },
  {
    id: 'exp-2',
    company: 'Linear',
    companyUrl: 'https://linear.app',
    role: 'Product Designer',
    type: 'Full-time',
    period: {
      start: 'Mar 2021',
      end: 'Dec 2022',
    },
    location: 'Remote',
    description:
      'Core design team member during Linear\'s growth from 10k to 100k users. Owned the Projects, Cycles, and Roadmaps product areas from concept to launch.',
    highlights: [
      'Designed the Roadmaps feature (most-requested feature, launched 2022)',
      'Reduced onboarding drop-off by 28% through a redesigned first-run experience',
      'Created the motion design language still used across the product today',
    ],
    logo: null,
    current: false,
  },
  {
    id: 'exp-3',
    company: 'Craft & Code Studio',
    companyUrl: null,
    role: 'Founding Designer & Developer',
    type: 'Freelance',
    period: {
      start: 'Jun 2019',
      end: 'Feb 2021',
    },
    location: 'San Francisco, CA',
    description:
      'Ran an independent design and development studio. Worked with 15+ early-stage startups on product strategy, design, and MVP development.',
    highlights: [
      'Delivered 15+ MVPs across B2B SaaS, fintech, and consumer apps',
      'Built and sold a Notion template pack with 4,000+ purchases',
      'Averaged a 4.9/5 client satisfaction score on Toptal',
    ],
    logo: null,
    current: false,
  },
];

export default experience;
