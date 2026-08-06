/**
 * Site Data
 * Core personal/brand information.
 * Buyers replace these values to customize the template.
 */

export const site = {
  name: 'Alex Chen',
  initials: 'AC',
  role: 'Product Designer & Developer',
  tagline: 'I craft digital experiences',
  taglineAccent: 'that matter.',
  bio: `I'm a product designer and full-stack developer who bridges the gap between design and engineering.
I specialize in building elegant, performant products that users love.`,
  bioExtended: `With over 6 years of experience working with startups and scale-ups, I bring a systems-thinking
approach to product design — combining deep technical knowledge with a refined visual sensibility.`,
  location: 'San Francisco, CA',
  availability: 'Available for freelance',
  availabilityStatus: true, // true = available (shows green dot)
  email: 'hello@yourportfolio.com',
  resumeUrl: '/resume.pdf',
  openToWork: true,

  // Headline stats shown in About section
  stats: [
    { label: 'Years of experience', value: '6+' },
    { label: 'Projects shipped', value: '40+' },
    { label: 'Happy clients', value: '28' },
    { label: 'Open source stars', value: '2.4k' },
  ],

  // Copyright
  copyright: '© 2025 Alex Chen. All rights reserved.',
};

export default site;
