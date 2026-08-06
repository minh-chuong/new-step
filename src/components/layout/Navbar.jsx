/**
 * Navbar Component
 * Responsive navigation with high-craft glassmorphism, scroll detection,
 * smooth active section pill indicator, and mobile drawer physics.
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Sparkles } from 'lucide-react';
import { cn } from '../../lib/cn';
import { navigation } from '../../data/navigation';
import { site } from '../../data/site';
import { useTheme } from '../../hooks/useTheme';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { mobileMenuVariants, navbarVariants, staggerContainer, staggerItem } from '../../config/animations';
import { Button } from '../ui/Button';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const { isDark, toggleTheme } = useTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Detect scroll to activate glass background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const sectionIds = navigation.map((item) => item.id);
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.35 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Close menu when resizing to desktop
  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'transition-all duration-300 ease-out',
        scrolled
          ? 'bg-[var(--bg-primary)]/75 backdrop-blur-2xl border-b border-[var(--border-subtle)] shadow-[0_8px_32px_rgba(0,0,0,0.37)]'
          : 'bg-transparent'
      )}
      role="banner"
    >
      <div className="container">
        <nav
          className="flex items-center justify-between h-16 sm:h-20 transition-all duration-300"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <motion.a
            href="#"
            className={cn(
              'group flex items-center gap-3',
              'text-[var(--text-primary)] font-semibold text-sm',
              'focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] rounded-[var(--radius-md)] px-1 py-0.5'
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label={`${site.name} — Back to top`}
          >
            <div
              className={cn(
                'w-8 h-8 rounded-[var(--radius-lg)]',
                'bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)]',
                'text-white flex items-center justify-center',
                'text-xs font-bold tracking-tight',
                'shadow-[0_0_20px_rgba(99,102,241,0.35)]',
                'group-hover:shadow-[0_0_28px_rgba(99,102,241,0.55)]',
                'transition-all duration-300'
              )}
              aria-hidden="true"
            >
              {site.initials}
            </div>
            <span className="hidden sm:block text-sm tracking-tight group-hover:text-[var(--accent-primary)] transition-colors">
              {site.name}
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div
            className="hidden md:flex items-center gap-1 bg-[var(--bg-secondary)]/40 p-1.5 rounded-full border border-[var(--border-subtle)] backdrop-blur-md"
            role="list"
          >
            {navigation.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  role="listitem"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={cn(
                    'relative px-4 py-1.5 text-xs font-medium rounded-full',
                    'transition-colors duration-200',
                    'focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]',
                    isActive
                      ? 'text-[var(--text-primary)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="absolute inset-0 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-default)] shadow-[0_2px_12px_rgba(0,0,0,0.3)]"
                      style={{ zIndex: -1 }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2.5">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className={cn(
                'w-9 h-9 rounded-full',
                'flex items-center justify-center',
                'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
                'bg-[var(--bg-secondary)]/50 hover:bg-[var(--bg-tertiary)]',
                'border border-[var(--border-subtle)] hover:border-[var(--border-default)]',
                'transition-all duration-200'
              )}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div
                    key="sun"
                    initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun size={15} aria-hidden="true" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon size={15} aria-hidden="true" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* CTA */}
            <Button
              variant="primary"
              size="sm"
              as="a"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="hidden md:inline-flex rounded-full text-xs font-medium px-4"
              icon={<Sparkles size={13} />}
            >
              Get in touch
            </Button>

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={() => setMenuOpen((v) => !v)}
              className={cn(
                'md:hidden w-9 h-9 rounded-full',
                'flex items-center justify-center',
                'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
                'bg-[var(--bg-secondary)] border border-[var(--border-default)]',
                'transition-colors duration-200'
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X size={16} aria-hidden="true" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu size={16} aria-hidden="true" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={cn(
              'md:hidden overflow-hidden border-t border-[var(--border-subtle)]',
              'bg-[var(--bg-primary)]/95 backdrop-blur-2xl shadow-[0_16px_40px_rgba(0,0,0,0.5)]'
            )}
            role="navigation"
            aria-label="Mobile navigation"
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="container py-4 flex flex-col gap-1.5"
            >
              {navigation.map((item) => (
                <motion.a
                  key={item.id}
                  variants={staggerItem}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={cn(
                    'px-4 py-3 rounded-[var(--radius-lg)] text-sm font-medium',
                    'transition-all duration-200',
                    activeSection === item.id
                      ? 'bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-subtle)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  )}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.div variants={staggerItem} className="pt-2">
                <Button
                  variant="primary"
                  size="md"
                  as="a"
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#contact');
                  }}
                  className="w-full justify-center rounded-full"
                >
                  Get in touch
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;

