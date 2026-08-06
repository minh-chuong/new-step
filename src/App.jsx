/**
 * App Root
 * Applies theme, renders Navbar + Footer around pages.
 */

import { useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';

function App() {
  const { theme } = useTheme();

  // Apply initial theme on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="noise-bg">
      {/* Skip to main content (accessibility) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[var(--accent-secondary)] focus:text-white focus:rounded-[var(--radius-md)] focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>

      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
