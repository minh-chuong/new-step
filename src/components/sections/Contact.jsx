/**
 * Contact Section
 * Email CTA, 1-click clipboard copy, and interactive social glass cards.
 * Data from site.js and social.js.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Copy, Check, Sparkles } from 'lucide-react';
import { Github, Twitter, Linkedin, Dribbble } from '../ui/Icons';
import { cn } from '../../lib/cn';
import { site } from '../../data/site';
import { social } from '../../data/social';
import { SectionLabel } from '../ui/SectionLabel';
import { Button } from '../ui/Button';
import { staggerContainer, staggerItem } from '../../config/animations';
import { useInView } from '../../hooks/useInView';

const iconMap = {
  Github,
  Twitter,
  Linkedin,
  Dribbble,
};

function EmailCopy() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: no-op
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCopy}
      className={cn(
        'group flex items-center justify-between gap-3 w-full',
        'px-5 py-3.5 rounded-full',
        'border border-[var(--border-default)] hover:border-[var(--accent-primary)]/40',
        'bg-[var(--bg-secondary)]/60 backdrop-blur-md hover:bg-[var(--bg-tertiary)]',
        'transition-all duration-300',
        'text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
        'focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] shadow-sm'
      )}
      aria-label={copied ? 'Email copied to clipboard!' : `Copy email address: ${site.email}`}
    >
      <span className="font-mono text-xs sm:text-sm text-[var(--text-primary)] tracking-tight">
        {site.email}
      </span>
      <div className="text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] transition-colors">
        {copied ? (
          <span className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
            <Check size={14} className="text-emerald-400" aria-hidden="true" />
            Copied!
          </span>
        ) : (
          <Copy size={14} aria-hidden="true" />
        )}
      </div>
    </motion.button>
  );
}

export function Contact() {
  const { ref: containerRef, inView } = useInView({ threshold: 0.1 });
  const contactSocial = social.filter((s) => s.showInContact);

  return (
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <div className="container">
        <motion.div
          ref={containerRef}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-2xl mx-auto flex flex-col items-center text-center gap-8"
        >
          {/* Label */}
          <motion.div variants={staggerItem}>
            <SectionLabel>Let's Connect</SectionLabel>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={staggerItem}
            id="contact-heading"
            className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.035em] text-[var(--text-primary)] leading-[1.08]"
          >
            Have a project in mind?{' '}
            <span className="gradient-text-accent">Let's build together.</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={staggerItem}
            className="text-base text-[var(--text-secondary)] leading-relaxed max-w-[460px]"
          >
            Currently open for select freelance contracts, design system consultations, and full-time senior engineering opportunities.
          </motion.p>

          {/* Primary CTA Row */}
          <motion.div variants={staggerItem} className="flex flex-col sm:flex-row items-center gap-3.5 w-full justify-center">
            <Button
              variant="primary"
              size="lg"
              as="a"
              href={`mailto:${site.email}`}
              icon={<Send size={15} />}
              iconPosition="left"
              className="w-full sm:w-auto rounded-full px-7 shadow-[0_0_35px_rgba(99,102,241,0.35)] hover:shadow-[0_0_50px_rgba(99,102,241,0.5)]"
            >
              Send an email
            </Button>

            {/* Interactive Copy Button */}
            <div className="w-full sm:w-auto min-w-[240px]">
              <EmailCopy />
            </div>
          </motion.div>

          {/* Minimal Divider */}
          <motion.div
            variants={staggerItem}
            className="flex items-center gap-4 w-full max-w-xs py-2"
          >
            <div className="flex-1 h-px bg-[var(--border-subtle)]" />
            <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest">or find me on</span>
            <div className="flex-1 h-px bg-[var(--border-subtle)]" />
          </motion.div>

          {/* Social Cards Grid */}
          <motion.div
            variants={staggerItem}
            className="flex items-center gap-4 flex-wrap justify-center"
            aria-label="Social media links"
          >
            {contactSocial.map((item) => {
              const Icon = iconMap[item.icon] || Github;
              return (
                <motion.a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.platform}: ${item.handle} — opens in new tab`}
                  className={cn(
                    'group flex items-center gap-2.5 px-4 py-2.5 rounded-full',
                    'bg-[var(--bg-secondary)]/50 backdrop-blur-md',
                    'border border-[var(--border-default)] hover:border-[var(--accent-primary)]/40',
                    'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
                    'transition-all duration-300 shadow-sm'
                  )}
                  whileHover={{ y: -4, scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Icon size={16} className="text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] transition-colors" aria-hidden="true" />
                  <span className="text-xs font-medium">{item.platform.split(' /')[0]}</span>
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
