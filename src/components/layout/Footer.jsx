/**
 * Footer Component
 * Minimal, elegant footer with social links, copyright, and back-to-top.
 */

import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { Github, Twitter, Linkedin, Dribbble } from '../ui/Icons';
import { cn } from '../../lib/cn';
import { site } from '../../data/site';
import { social } from '../../data/social';
import { navigation } from '../../data/navigation';
import { fadeInUp } from '../../config/animations';

// Map icon names to Lucide components
const iconMap = {
  Github,
  Twitter,
  Linkedin,
  Dribbble,
};

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerSocial = social.filter((s) => s.showInFooter);

  return (
    <footer
      className="border-t border-[var(--border-subtle)] bg-[var(--bg-primary)]"
      role="contentinfo"
    >
      <div className="container">
        {/* Main Footer Row */}
        <div className="py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <a
              href="#"
              className="text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors"
              aria-label={`${site.name} — Back to top`}
              onClick={(e) => { e.preventDefault(); scrollToTop(); }}
            >
              {site.name}
            </a>
            <p className="text-xs text-[var(--text-muted)] text-center md:text-left">
              {site.role}
            </p>
          </div>

          {/* Nav Links */}
          <nav
            className="flex items-center gap-6"
            aria-label="Footer navigation"
          >
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-3" aria-label="Social media links">
            {footerSocial.map((item) => {
              const Icon = iconMap[item.icon] || Github;
              return (
                <motion.a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.platform} — opens in new tab`}
                  className={cn(
                    'w-8 h-8 rounded-[var(--radius-md)]',
                    'flex items-center justify-center',
                    'text-[var(--text-muted)] hover:text-[var(--text-primary)]',
                    'hover:bg-[var(--bg-secondary)]',
                    'border border-transparent hover:border-[var(--border-subtle)]',
                    'transition-all duration-200'
                  )}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={14} aria-hidden="true" />
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-5 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-muted)]">{site.copyright}</p>

          <div className="flex items-center gap-4">
            <span className="text-xs text-[var(--text-muted)]">
              Built with React & Framer Motion
            </span>

            {/* Back to top */}
            <motion.button
              onClick={scrollToTop}
              className={cn(
                'w-7 h-7 rounded-[var(--radius-md)]',
                'flex items-center justify-center',
                'text-[var(--text-muted)] hover:text-[var(--text-primary)]',
                'hover:bg-[var(--bg-secondary)]',
                'border border-[var(--border-subtle)] hover:border-[var(--border-default)]',
                'transition-all duration-200'
              )}
              whileHover={{ scale: 1.1, y: -1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Back to top"
            >
              <ArrowUp size={12} aria-hidden="true" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
