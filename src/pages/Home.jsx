/**
 * Home Page
 * Composes all sections in order.
 * Renders the single continuous 3D Avatar scene overlay globally across the entire portfolio.
 */

import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Projects } from '../components/sections/Projects';
import { Skills } from '../components/sections/Skills';
import { Experience } from '../components/sections/Experience';
import { Contact } from '../components/sections/Contact';
import { ThreeScene } from '../three/ThreeScene';

export function Home() {
  return (
    <main id="main-content" aria-label="Portfolio content" className="relative">
      {/* Single, continuous 3D avatar scene across the whole portfolio */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
        <ThreeScene />
      </div>

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
