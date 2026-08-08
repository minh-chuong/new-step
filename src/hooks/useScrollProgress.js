import { useState, useEffect } from 'react';

const SECTIONS = ['hero', 'about', 'projects', 'skills', 'experience', 'contact'];

export function useScrollProgress() {
  const [scrollData, setScrollData] = useState({
    scrollY: 0,
    scrollProgress: 0,
    activeSection: 'hero',
    activeSectionIndex: 0,
    sectionProgress: 0,
    isMobile: false,
    isTablet: false,
  });

  useEffect(() => {
    let requestID;

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );

      const maxScroll = Math.max(1, docHeight - windowHeight);
      const currentScrollY = window.scrollY || window.pageYOffset || 0;
      const progress = Math.min(Math.max(currentScrollY / maxScroll, 0), 1);

      const viewportWidth = window.innerWidth;
      const isMobile = viewportWidth < 768;
      const isTablet = viewportWidth >= 768 && viewportWidth < 1024;

      // Find active section based on section element positions
      let currentSection = 'hero';
      let currentSectionIdx = 0;
      let secProg = 0;

      for (let i = 0; i < SECTIONS.length; i++) {
        const id = SECTIONS[i];
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top;
          const height = rect.height;

          // Section is active if center of viewport is within section top and bottom
          if (top <= windowHeight * 0.5 && top + height >= windowHeight * 0.2) {
            currentSection = id;
            currentSectionIdx = i;

            // Calculate progress within section
            const distScrolledInSec = windowHeight * 0.5 - top;
            secProg = Math.min(Math.max(distScrolledInSec / height, 0), 1);
            break;
          }
        }
      }

      setScrollData({
        scrollY: currentScrollY,
        scrollProgress: progress,
        activeSection: currentSection,
        activeSectionIndex: currentSectionIdx,
        sectionProgress: secProg,
        isMobile,
        isTablet,
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(requestID);
      requestID = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Initial check
    handleScroll();

    return () => {
      cancelAnimationFrame(requestID);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return scrollData;
}

export default useScrollProgress;
