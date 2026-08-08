/**
 * About Section
 * Bio, extended description, and 3D Avatar (Standing Pointing - Full Body) with floating glass cards.
 */

import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/cn';
import { site } from '../../data/site';
import { SectionLabel } from '../ui/SectionLabel';
import { Divider } from '../ui/Divider';
import { staggerContainer, staggerItem, fadeInLeft } from '../../config/animations';
import { useInView } from '../../hooks/useInView';
import { ThreeScene } from '../../three/ThreeScene';

// ── 3D Column for About (Standing Pointing + Floating UI Overlays) ─────────────
function About3DColumn() {
  return (
    <div className="relative w-full max-w-[480px] h-[560px] mx-auto">
      {/* 3D character - standing pointing animation (full body) */}
      <ThreeScene animationState="point" height="560px" />

      {/* Floating glass card overlay - Design Philosophy */}
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className={cn(
          'absolute top-6 -left-4 z-20',
          'px-4 py-3 rounded-[var(--radius-xl)]',
          'bg-[var(--bg-primary)]/85 backdrop-blur-xl',
          'border border-[var(--border-default)]',
          'shadow-[0_8px_32px_rgba(0,0,0,0.4)]',
          'flex items-center gap-3'
        )}
      >
        <div className="w-8 h-8 rounded-full bg-[var(--accent-muted)] border border-[var(--accent-primary)]/30 flex items-center justify-center">
          <Sparkles size={15} className="text-[var(--accent-primary)]" />
        </div>
        <div>
          <p className="text-xs font-semibold text-[var(--text-primary)]">Design Philosophy</p>
          <p className="text-[10px] text-[var(--text-muted)]">Craft · Precision · Performance</p>
        </div>
      </motion.div>

      {/* Floating glass card overlay - Production Quality */}
      <motion.div
        animate={{ y: [6, -6, 6] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className={cn(
          'absolute bottom-12 -right-4 z-20',
          'px-4 py-3 rounded-[var(--radius-xl)]',
          'bg-[var(--bg-primary)]/85 backdrop-blur-xl',
          'border border-[var(--border-default)]',
          'shadow-[0_8px_32px_rgba(0,0,0,0.4)]',
          'flex items-center gap-3'
        )}
      >
        <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
          <CheckCircle2 size={15} className="text-emerald-400" />
        </div>
        <div>
          <p className="text-xs font-semibold text-[var(--text-primary)]">Production Quality</p>
          <p className="text-[10px] text-[var(--text-muted)]">6+ Yrs · 40+ Projects Shipped</p>
        </div>
      </motion.div>
    </div>
  );
}

// ── Main About Section ───────────────────────────────────────────────────────
export function About() {
  const { ref: containerRef, inView } = useInView({ threshold: 0.1, once: true });

  return (
    <section id="about" className="section relative z-20" aria-labelledby="about-heading">
      <div className="container">
        <div
          ref={containerRef}
          className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center"
        >
          {/* Left Column: 3D Character (Standing Pointing) */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="flex justify-center lg:justify-start"
          >
            <About3DColumn />
          </motion.div>

          {/* Right Column: Text Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="flex flex-col gap-6"
          >
            <motion.div variants={staggerItem}>
              <SectionLabel>About Me</SectionLabel>
              <h2
                id="about-heading"
                className="text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-tight text-[var(--text-primary)] leading-[1.12]"
              >
                Designing at the intersection of{' '}
                <span className="gradient-text-accent">craft & engineering.</span>
              </h2>
            </motion.div>

            <motion.div variants={staggerItem}>
              <p className="text-base text-[var(--text-secondary)] leading-[1.8]">
                {site.bio}
              </p>
            </motion.div>

            <motion.div variants={staggerItem}>
              <p className="text-base text-[var(--text-tertiary)] leading-[1.8]">
                {site.bioExtended}
              </p>
            </motion.div>

            <Divider />

            {/* Stats Grid */}
            <motion.div
              variants={staggerItem}
              className="grid grid-cols-2 gap-6"
            >
              {site.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="text-3xl font-bold text-[var(--text-primary)] tracking-[-0.03em]">
                    {stat.value}
                  </span>
                  <span className="text-xs font-medium text-[var(--text-muted)]">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
