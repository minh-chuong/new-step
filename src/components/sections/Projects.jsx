/**
 * Projects Section
 * Filterable project grid with interactive card elevation, image zoom,
 * arrow micro-motion, and color-matched ambient hover glows.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowUpRight, Folder, Sparkles } from 'lucide-react';
import { Github } from '../ui/Icons';
import { cn } from '../../lib/cn';
import { projects, projectCategories } from '../../data/projects';
import { SectionLabel } from '../ui/SectionLabel';
import { Badge } from '../ui/Badge';
import { staggerContainer, staggerItem, scaleIn } from '../../config/animations';
import { useInView } from '../../hooks/useInView';

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  const { ref, inView } = useInView({ threshold: 0.05, once: true });

  return (
    <motion.article
      ref={ref}
      variants={scaleIn}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.07 }}
      whileHover={{ y: -8 }}
      className={cn(
        'group relative flex flex-col',
        'rounded-[var(--radius-2xl)]',
        'border border-[var(--border-default)]',
        'bg-[var(--bg-secondary)]/60 backdrop-blur-md',
        'overflow-hidden',
        'transition-all duration-500 ease-out',
        'hover:border-[var(--border-strong)]',
        'hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]'
      )}
      aria-label={project.title}
    >
      {/* Image / Color Media Area */}
      <div
        className="relative w-full aspect-[16/10] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: `${project.color}08` }}
        aria-hidden="true"
      >
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        ) : (
          <>
            {/* Ambient Radial Gradient Visual */}
            <div
              className="absolute inset-0 group-hover:scale-110 transition-transform duration-700 ease-out"
              style={{
                background: `radial-gradient(circle at 35% 35%, ${project.color}25 0%, transparent 65%)`,
              }}
            />
            {/* Center Icon Frame */}
            <div
              className="w-14 h-14 rounded-[var(--radius-xl)] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300"
              style={{
                backgroundColor: `${project.color}18`,
                border: `1px solid ${project.color}35`,
              }}
            >
              <Folder size={24} style={{ color: project.color }} />
            </div>
          </>
        )}

        {/* Top Overlay Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
          {project.featured ? (
            <Badge variant="accent" className="shadow-sm py-1 px-3 bg-[var(--bg-primary)]/80 backdrop-blur-md">
              <Sparkles size={11} className="text-[var(--accent-primary)]" />
              Featured
            </Badge>
          ) : <span />}

          <span className="text-[11px] font-mono text-[var(--text-secondary)] bg-[var(--bg-primary)]/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-[var(--border-subtle)]">
            {project.year}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1 p-6 gap-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors leading-tight">
            {project.title}
          </h3>
          <ArrowUpRight
            size={18}
            className="flex-shrink-0 text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 mt-0.5"
            aria-hidden="true"
          />
        </div>

        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[var(--bg-tertiary)]/70 text-[var(--text-secondary)] border border-[var(--border-subtle)] group-hover:border-[var(--border-default)] transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Links */}
      <div className="px-6 pb-6 pt-0 flex items-center gap-4 border-t border-transparent group-hover:border-[var(--border-subtle)] transition-colors pt-3">
        {project.links.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex items-center gap-1.5 text-xs font-medium',
              'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
              'transition-colors duration-200'
            )}
            aria-label={`Visit ${project.title} live site`}
          >
            <ExternalLink size={13} aria-hidden="true" />
            Live Preview
          </a>
        )}
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex items-center gap-1.5 text-xs font-medium',
              'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
              'transition-colors duration-200'
            )}
            aria-label={`View ${project.title} source code on GitHub`}
          >
            <Github size={13} aria-hidden="true" />
            Source Code
          </a>
        )}
        {project.links.case_study && (
          <a
            href={project.links.case_study}
            className={cn(
              'flex items-center gap-1.5 text-xs font-medium ml-auto',
              'text-[var(--accent-primary)] hover:opacity-80',
              'transition-opacity duration-200'
            )}
            aria-label={`Read ${project.title} case study`}
          >
            Case Study →
          </a>
        )}
      </div>

      {/* Ambient Color Glow Ring on Hover */}
      <div
        className="absolute inset-0 rounded-[var(--radius-2xl)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: `inset 0 0 0 1px ${project.color}35` }}
        aria-hidden="true"
      />
    </motion.article>
  );
}

// ─── Projects Section ─────────────────────────────────────────────────────────
export function Projects() {
  const [activeCategory, setActiveCategory] = useState('all');
  const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.1 });

  const filtered =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="projects"
      className="section bg-[var(--bg-secondary)]/20"
      aria-labelledby="projects-heading"
    >
      <div className="container">
        {/* Header */}
        <motion.div
          ref={headerRef}
          variants={staggerContainer}
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
          className="flex flex-col items-center text-center gap-4 mb-12"
        >
          <motion.div variants={staggerItem}>
            <SectionLabel>Selected Work</SectionLabel>
          </motion.div>
          <motion.h2
            variants={staggerItem}
            id="projects-heading"
            className="text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-tight text-[var(--text-primary)]"
          >
            Featured Projects & Systems
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="max-w-[480px] text-[var(--text-secondary)] text-base leading-relaxed"
          >
            A curated collection of production systems, design toolkits, and web apps built for scale.
          </motion.p>

          {/* Category Filter Bar */}
          <motion.div
            variants={staggerItem}
            className="flex items-center gap-2 flex-wrap justify-center pt-3 p-1.5 rounded-full bg-[var(--bg-secondary)]/50 border border-[var(--border-subtle)] backdrop-blur-md"
            role="tablist"
            aria-label="Filter projects by category"
          >
            {projectCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    'relative px-4 py-1.5 text-xs font-medium rounded-full',
                    'transition-colors duration-200',
                    'focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]',
                    isActive
                      ? 'text-[var(--text-primary)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-project-tab"
                      className="absolute inset-0 rounded-full bg-[var(--accent-muted)] border border-[var(--accent-primary)]/30"
                      style={{ zIndex: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Project Cards Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeCategory}
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default Projects;

