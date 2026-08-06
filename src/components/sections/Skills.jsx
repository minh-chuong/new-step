/**
 * Skills Section
 * Clean categorized skill clouds with interactive hover states,
 * glass category containers, and subtle micro-motion.
 */

import { motion } from 'framer-motion';
import { Paintbrush, Code2, Server, Wrench } from 'lucide-react';
import { cn } from '../../lib/cn';
import { skills } from '../../data/skills';
import { SectionLabel } from '../ui/SectionLabel';
import { staggerContainer, staggerItem } from '../../config/animations';
import { useInView } from '../../hooks/useInView';

const iconMap = {
  Paintbrush,
  Code2,
  Server,
  Wrench,
};

function SkillGroup({ group, index }) {
  const { ref, inView } = useInView({ threshold: 0.1, once: true });
  const Icon = iconMap[group.icon] || Code2;

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.08 }}
      className={cn(
        'group p-6 sm:p-7 rounded-[var(--radius-2xl)]',
        'border border-[var(--border-default)]',
        'bg-[var(--bg-secondary)]/50 backdrop-blur-md',
        'flex flex-col gap-5',
        'transition-all duration-300',
        'hover:border-[var(--border-strong)]',
        'hover:shadow-[0_12px_36px_rgba(0,0,0,0.4)]'
      )}
    >
      {/* Category Header */}
      <motion.div variants={staggerItem} className="flex items-center gap-3">
        <div
          className={cn(
            'w-9 h-9 rounded-[var(--radius-xl)]',
            'flex items-center justify-center',
            'bg-[var(--accent-muted)] border border-[var(--accent-primary)]/20',
            'group-hover:scale-105 group-hover:border-[var(--accent-primary)]/40 transition-all duration-300'
          )}
          aria-hidden="true"
        >
          <Icon size={16} className="text-[var(--accent-primary)]" />
        </div>
        <h3 className="text-sm font-semibold text-[var(--text-primary)] tracking-tight">
          {group.category}
        </h3>
      </motion.div>

      {/* Interactive Skill Chips */}
      <motion.div variants={staggerItem} className="flex flex-wrap gap-2">
        {group.items.map((skill, i) => (
          <motion.div
            key={skill}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium cursor-default',
              'bg-[var(--bg-tertiary)]/70 text-[var(--text-secondary)]',
              'border border-[var(--border-subtle)]',
              'hover:bg-[var(--accent-muted)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)]/30',
              'transition-colors duration-200 shadow-sm'
            )}
          >
            {skill}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export function Skills() {
  const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.1 });

  return (
    <section id="skills" className="section" aria-labelledby="skills-heading">
      <div className="container">
        {/* Header */}
        <motion.div
          ref={headerRef}
          variants={staggerContainer}
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
          className="flex flex-col items-center text-center gap-4 mb-14"
        >
          <motion.div variants={staggerItem}>
            <SectionLabel>Capabilities</SectionLabel>
          </motion.div>
          <motion.h2
            variants={staggerItem}
            id="skills-heading"
            className="text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-tight text-[var(--text-primary)]"
          >
            Capabilities & Technical Toolkit
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="max-w-[460px] text-[var(--text-secondary)] text-base leading-relaxed"
          >
            A modern technology stack spanning user interface design, frontend engineering, backend services, and cloud platforms.
          </motion.p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {skills.map((group, i) => (
            <SkillGroup key={group.category} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;

