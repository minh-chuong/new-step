/**
 * Hero Section
 * Premium hero with refined typography rhythm, glass stat cards,
 * and a luxury prepared canvas slot for React Three Fiber integration.
 */

import { motion } from 'framer-motion';
import { ArrowRight, Download, MapPin, Sparkles, Box } from 'lucide-react';
import { cn } from '../../lib/cn';
import { site } from '../../data/site';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import {
  fadeIn,
  fadeInUp,
  staggerContainer,
  staggerItem,
  blurIn,
} from '../../config/animations';

// ─── R3F Placeholder (Future-Ready 3D Slot) ──────────────────────────────────
function ThreePlaceholder() {
  return (
    <div
      className={cn(
        'w-full h-full min-h-[380px] sm:min-h-[440px]',
        'flex flex-col items-center justify-center',
        'rounded-[var(--radius-2xl)]',
        'border border-[var(--border-default)]',
        'bg-[var(--bg-secondary)]/50 backdrop-blur-xl',
        'shadow-[0_16px_48px_rgba(0,0,0,0.5)]',
        'relative overflow-hidden group',
        'transition-all duration-500 hover:border-[var(--accent-primary)]/40'
      )}
      aria-hidden="true"
      role="presentation"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 grid-bg opacity-30 group-hover:opacity-40 transition-opacity duration-500" />

      {/* Ambient Pulsing Glow Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-72 h-72 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, rgba(168,85,247,0.15) 50%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Floating Status Pill */}
      <div className="absolute top-4 right-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-medium text-[var(--accent-primary)] bg-[var(--accent-muted)] border border-[var(--accent-primary)]/20 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-ping" />
          R3F Canvas Ready
        </span>
      </div>

      {/* Center Watermark & Indicator */}
      <div className="relative z-10 flex flex-col items-center gap-4 text-center p-8">
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className={cn(
            'w-16 h-16 rounded-[var(--radius-xl)]',
            'bg-gradient-to-br from-[var(--bg-tertiary)] to-[var(--bg-secondary)]',
            'border border-[var(--border-strong)]',
            'flex items-center justify-center',
            'shadow-[0_8px_24px_rgba(0,0,0,0.4)]',
            'group-hover:border-[var(--accent-primary)]/50 transition-colors'
          )}
        >
          <Box size={26} className="text-[var(--accent-primary)]" />
        </motion.div>
        <div>
          <p className="text-sm font-semibold text-[var(--text-primary)] tracking-tight">
            Interactive 3D Scene Slot
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-1 font-mono">
            React Three Fiber · Three.js · GLTF Ready
          </p>
        </div>
      </div>

      {/* Subtle corner matrix lines */}
      <div className="absolute bottom-4 left-4 text-[10px] font-mono text-[var(--text-muted)] opacity-60">
        [0.0, 0.0, 0.0] · Perspective
      </div>
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
export function Hero() {
  const handleContactClick = (e) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWorkClick = (e) => {
    e.preventDefault();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className={cn(
        'relative min-h-screen flex flex-col justify-center',
        'pt-24 pb-16 lg:pt-32 lg:pb-24',
        'overflow-hidden'
      )}
      aria-label="Introduction"
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" aria-hidden="true" />

      {/* Ambient background light */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(99,102,241,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left Column: Typography & CTAs ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6 lg:gap-7"
          >
            {/* Availability & Location */}
            <motion.div variants={staggerItem} className="flex items-center gap-3 flex-wrap">
              {site.availabilityStatus && (
                <Badge variant="success" className="gap-1.5 py-1 px-3">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
                    aria-hidden="true"
                  />
                  {site.availability}
                </Badge>
              )}
              <div className="flex items-center gap-1.5 text-[var(--text-muted)] text-xs font-medium">
                <MapPin size={12} className="text-[var(--accent-primary)]" aria-hidden="true" />
                <span>{site.location}</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div variants={staggerItem}>
              <h1
                className={cn(
                  'text-[clamp(2.5rem,5.5vw,4.5rem)]',
                  'font-bold leading-[1.06] tracking-[-0.035em]',
                  'text-[var(--text-primary)]'
                )}
              >
                {site.tagline}{' '}
                <span className="gradient-text-accent">{site.taglineAccent}</span>
              </h1>
            </motion.div>

            {/* Role & Bio */}
            <motion.div variants={staggerItem} className="space-y-2">
              <p className="text-base sm:text-lg font-semibold text-[var(--text-primary)]">
                {site.role}
              </p>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-[1.8] max-w-[500px]">
                {site.bio}
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={staggerItem} className="flex items-center gap-3.5 flex-wrap pt-1">
              <Button
                variant="primary"
                size="lg"
                as="a"
                href="#contact"
                onClick={handleContactClick}
                icon={<ArrowRight size={16} />}
                iconPosition="right"
                className="rounded-full shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:shadow-[0_0_45px_rgba(99,102,241,0.5)]"
              >
                Get in touch
              </Button>
              <Button
                variant="secondary"
                size="lg"
                as="a"
                href={site.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                icon={<Download size={15} />}
                iconPosition="left"
                className="rounded-full"
              >
                Resume
              </Button>
              <Button
                variant="ghost"
                size="lg"
                as="a"
                href="#projects"
                onClick={handleWorkClick}
                className="rounded-full"
              >
                View Work
              </Button>
            </motion.div>

            {/* Stats row with glass cards */}
            <motion.div
              variants={staggerItem}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[var(--border-subtle)]"
            >
              {site.stats.map((stat) => (
                <div
                  key={stat.label}
                  className={cn(
                    'p-3.5 rounded-[var(--radius-lg)]',
                    'bg-[var(--bg-secondary)]/40 backdrop-blur-sm',
                    'border border-[var(--border-subtle)]',
                    'flex flex-col gap-1',
                    'transition-all duration-300 hover:border-[var(--border-default)] hover:bg-[var(--bg-secondary)]/70'
                  )}
                >
                  <span className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-[11px] font-medium text-[var(--text-muted)] leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right Column: 3D Scene Slot ── */}
          <motion.div
            variants={blurIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="relative w-full aspect-square max-w-[540px] mx-auto lg:mx-0"
          >
            {/* Outer ambient glow halo */}
            <div
              className="absolute -inset-6 rounded-[var(--radius-2xl)] pointer-events-none"
              aria-hidden="true"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(99,102,241,0.12) 0%, transparent 70%)',
              }}
            />
            <ThreePlaceholder />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-[10px] font-mono text-[var(--text-muted)] tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-6 bg-gradient-to-b from-[var(--text-muted)] to-transparent"
        />
      </motion.div>
    </section>
  );
}

export default Hero;

