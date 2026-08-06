/**
 * Home Page
 * Composes all sections in order.
 * Add / remove / reorder sections here.
 */

import { lazy, Suspense } from 'react';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Projects } from '../components/sections/Projects';
import { Skills } from '../components/sections/Skills';
import { Experience } from '../components/sections/Experience';
import { Contact } from '../components/sections/Contact';

// Lazy-load heavy sections (below the fold)
// const Projects = lazy(() => import('@components/sections/Projects'));
// const Skills = lazy(() => import('@components/sections/Skills'));
// const Experience = lazy(() => import('@components/sections/Experience'));
// const Contact = lazy(() => import('@components/sections/Contact'));

export function Home() {
  return (
    <main id="main-content" aria-label="Portfolio content">
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </main>
  );
}

export default Home;
