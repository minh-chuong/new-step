/**
 * Experience Section
 * Interactive vertical timeline with glass cards, pulsing current role dot,
 * and refined typography hierarchy.
 */

import { motion } from 'framer-motion';
import { MapPin, ExternalLink, Calendar, CheckCircle } from 'lucide-react';
import { cn } from '../../lib/cn';
import { experience } from '../../data/experience';
import { SectionLabel } from '../ui/SectionLabel';
import { Badge } from '../ui/Badge';
import { staggerContainer, staggerItem } from '../../config/animations';
import { useInView } from '../../hooks/useInView';

function ExperienceItem({ item, index, isLast }) {
  const { ref, inView } = useInView({ threshold: 0.1, once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex gap-6 md:gap-8 group"
    >
      {/* Timeline Column */}
      <div className="flex flex-col items-center flex-shrink-0">
        {/* Timeline Node Dot */}
        <div
          className={cn(
            'relative z-10 w-4 h-4 rounded-full mt-2',
            'border-2 border-[var(--bg-primary)]',
            'transition-transform duration-300 group-hover:scale-125',
            item.current
              ? 'bg-[var(--accent-primary)] shadow-[0_0_16px_var(--accent-glow)]'
              : 'bg-[var(--bg-elevated)] group-hover:bg-[var(--accent-primary)]'
          )}
          aria-hidden="true"
        >
          {item.current && (
            <span
              className="absolute -inset-1 rounded-full bg-[var(--accent-primary)] animate-ping opacity-35"
              aria-hidden="true"
            />
          )}
        </div>

        {/* Vertical Line Connector */}
        {!isLast && (
          <div
            className="w-px flex-1 my-2 bg-gradient-to-b from-[var(--border-default)] via-[var(--border-subtle)] to-transparent group-hover:from-[var(--accent-primary)]/40 transition-colors duration-500"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Experience Glass Card */}
      <div
        className={cn(
          'flex flex-col flex-1 p-6 sm:p-7 rounded-[var(--radius-2xl)]',
          'border border-[var(--border-default)]',
          'bg-[var(--bg-secondary)]/50 backdrop-blur-md',
          'transition-all duration-300',
          'hover:border-[var(--border-strong)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.4)]',
          isLast ? 'mb-0' : 'mb-8'
        )}
      >
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-3 border-b border-[var(--border-subtle)]">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] leading-tight tracking-tight">
              {item.role}
            </h3>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              {item.companyUrl ? (
                <a
                  href={item.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm font-semibold text-[var(--accent-primary)] hover:underline flex items-center gap-1"
                  aria-label={`Visit ${item.company} website`}
                >
                  {item.company}
                  <ExternalLink size={12} aria-hidden="true" />
                </a>
              ) : (
                <span className="text-xs sm:text-sm font-semibold text-[var(--text-secondary)]">
                  {item.company}
                </span>
              )}
              <Badge variant="muted" className="text-[10px] py-0.5 px-2">{item.type}</Badge>
              {item.current && <Badge variant="success" className="text-[10px] py-0.5 px-2">Present Role</Badge>}
            </div>
          </div>

          {/* Date & Location Badges */}
          <div className="flex flex-col items-start sm:items-end gap-1.5 text-xs text-[var(--text-muted)] font-mono">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--bg-tertiary)]/60 border border-[var(--border-subtle)]">
              <Calendar size={11} className="text-[var(--accent-primary)]" aria-hidden="true" />
              {item.period.start} — {item.period.end}
            </span>
            <span className="flex items-center gap-1 text-[11px]">
              <MapPin size={10} aria-hidden="true" />
              {item.location}
            </span>
          </div>
        </div>

        {/* Role Overview */}
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed pt-4">
          {item.description}
        </p>

        {/* Key Highlights */}
        {item.highlights?.length > 0 && (
          <div className="pt-4 flex flex-col gap-2">
            <span className="text-[11px] font-mono font-medium text-[var(--text-muted)] uppercase tracking-wider">
              Key Contributions & Impact
            </span>
            <ul className="flex flex-col gap-2" aria-label="Key highlights">
              {item.highlights.map((highlight, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-tertiary)] leading-normal"
                >
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] flex-shrink-0" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function Experience() {
  const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.1 });

  return (
    <section
      id="experience"
      className="section bg-[var(--bg-secondary)]/20"
      aria-labelledby="experience-heading"
    >
      <div className="container">
        {/* Header */}
        <motion.div
          ref={headerRef}
          variants={staggerContainer}
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
          className="flex flex-col items-center text-center gap-4 mb-16"
        >
          <motion.div variants={staggerItem}>
            <SectionLabel>Career Trajectory</SectionLabel>
          </motion.div>
          <motion.h2
            variants={staggerItem}
            id="experience-heading"
            className="text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-tight text-[var(--text-primary)]"
          >
            Engineering & Product Experience
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="max-w-[460px] text-[var(--text-secondary)] text-base leading-relaxed"
          >
            A history of leading design systems, front-end architecture, and product growth across scale-ups.
          </motion.p>
        </motion.div>

        {/* Timeline List */}
        <div className="max-w-3xl mx-auto">
          {experience.map((item, index) => (
            <ExperienceItem
              key={item.id}
              item={item}
              index={index}
              isLast={index === experience.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;

