// Updated Hero.jsx – integrates the persistent 3D avatar via ThreeScene

/**
 * Hero Section – premium hero with integrated 3D avatar.
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
import { ThreeScene } from '../../three/ThreeScene'; // Import the modular 3D scene

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

          {/* ── Left Column: Text & CTAs ── */}
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

          {/* ── Right Column: 3D Scene ── */}
          <motion.div
            variants={blurIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="relative w-full mx-auto lg:mx-0"
            style={{ height: 620, maxWidth: 560 }}
          >
            {/* Subtle ambient glow – NOT a visible box frame */}
            <div
              className="absolute -inset-8 pointer-events-none"
              aria-hidden="true"
              style={{
                background:
                  'radial-gradient(ellipse 70% 60% at 50% 60%, rgba(99,102,241,0.13) 0%, transparent 70%)',
              }}
            />
            {/* 3D scene – transparent, no border */}
            <ThreeScene height="620px" />
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
