/**
 * About Section
 * Bio, extended description, and an elegant left-side visual composition with
 * floating glass cards, design philosophy pill, and ambient gradient orb.
 */

import { motion } from 'framer-motion';
import { Sparkles, Code2, Layers, Cpu, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/cn';
import { site } from '../../data/site';
import { SectionLabel } from '../ui/SectionLabel';
import { Divider } from '../ui/Divider';
import { staggerContainer, staggerItem, fadeInLeft } from '../../config/animations';
import { useInView } from '../../hooks/useInView';

// ─── Left Visual Composition (Future 3D / UI Craft Composition) ───────────────
function AboutVisualComposition() {
  return (
    <div className="relative w-full max-w-[480px] aspect-square mx-auto flex items-center justify-center">

      {/* Ambient Pulsing Gradient Orb */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(99,102,241,0.25) 0%, rgba(192,132,252,0.15) 45%, transparent 70%)',
        }}
      />

      {/* Central Glass Frame Container (Space reserved for 3D element) */}
      <div
        className={cn(
          'relative w-64 h-64 sm:w-72 sm:h-72',
          'rounded-[var(--radius-2xl)]',
          'border border-[var(--border-default)]',
          'bg-[var(--bg-secondary)]/50 backdrop-blur-2xl',
          'shadow-[0_16px_48px_rgba(0,0,0,0.5)]',
          'flex flex-col items-center justify-center p-6',
          'overflow-hidden group'
        )}
      >
        {/* Subtle grid background */}
        <div className="absolute inset-0 grid-bg opacity-30" />

        {/* Outer subtle ring */}
        <div className="absolute inset-3 rounded-[var(--radius-xl)] border border-[var(--border-subtle)] pointer-events-none" />

        {/* Initials Badge */}
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className={cn(
            'relative z-10 w-20 h-20 rounded-[var(--radius-xl)]',
            'bg-gradient-to-br from-[var(--accent-secondary)]/20 to-[var(--bg-tertiary)]',
            'border border-[var(--accent-primary)]/30 shadow-[0_0_30px_rgba(99,102,241,0.2)]',
            'flex items-center justify-center'
          )}
        >
          <span className="text-3xl font-bold tracking-tight gradient-text-accent">
            {site.initials}
          </span>
        </motion.div>

        <p className="relative z-10 text-xs font-medium text-[var(--text-secondary)] mt-4">
          Systematic Craft & Engineering
        </p>

        {/* Corner matrix detail */}
        <div className="absolute bottom-3 right-4 text-[9px] font-mono text-[var(--text-muted)]">
          [PROD_READY]
        </div>
      </div>

      {/* ── Floating Glass Card 1: Design Philosophy (Top Left) ── */}
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className={cn(
          'absolute -top-2 -left-2 sm:-left-6 z-20',
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
          <p className="text-xs font-semibold text-[var(--text-primary)]">
            Design Philosophy
          </p>
          <p className="text-[10px] text-[var(--text-muted)]">
            Craft · Precision · Performance
          </p>
        </div>
      </motion.div>

      {/* ── Floating Glass Card 2: Experience Badge (Bottom Right) ── */}
      <motion.div
        animate={{ y: [6, -6, 6] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className={cn(
          'absolute -bottom-2 -right-2 sm:-right-6 z-20',
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
          <p className="text-xs font-semibold text-[var(--text-primary)]">
            Production Quality
          </p>
          <p className="text-[10px] text-[var(--text-muted)]">
            6+ Yrs · 40+ Projects Shipped
          </p>
        </div>
      </motion.div>

      {/* ── Floating Glass Card 3: Stack Badge (Top Right) ── */}
      <motion.div
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className={cn(
          'absolute top-8 -right-4 sm:-right-8 z-10',
          'px-3 py-1.5 rounded-full',
          'bg-[var(--bg-secondary)]/90 backdrop-blur-md',
          'border border-[var(--border-subtle)]',
          'flex items-center gap-2 shadow-sm'
        )}
      >
        <Code2 size={12} className="text-[var(--accent-primary)]" />
        <span className="text-[11px] font-mono font-medium text-[var(--text-secondary)]">
          React 19 & Tailwind
        </span>
      </motion.div>

    </div>
  );
}

// ─── Main About Section ───────────────────────────────────────────────────────
export function About() {
  const { ref: containerRef, inView } = useInView({ threshold: 0.1, once: true });

  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <div className="container">
        <div
          ref={containerRef}
          className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center"
        >
          {/* Left: Enhanced Visual Composition */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="flex justify-center lg:justify-start"
          >
            <AboutVisualComposition />
          </motion.div>

          {/* Right: Text Content */}
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

