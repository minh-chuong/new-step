import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, './src'),
      '@components': resolve(import.meta.dirname, './src/components'),
      '@hooks': resolve(import.meta.dirname, './src/hooks'),
      '@lib': resolve(import.meta.dirname, './src/lib'),
      '@utils': resolve(import.meta.dirname, './src/utils'),
      '@data': resolve(import.meta.dirname, './src/data'),
      '@config': resolve(import.meta.dirname, './src/config'),
      '@styles': resolve(import.meta.dirname, './src/styles'),
      '@three': resolve(import.meta.dirname, './src/three'),
      '@assets': resolve(import.meta.dirname, './src/assets'),
    },
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor';
            }
            if (id.includes('framer-motion')) {
              return 'motion';
            }
            if (id.includes('three') || id.includes('@react-three')) {
              return 'three';
            }
            if (id.includes('lucide-react')) {
              return 'icons';
            }
          }
        },
      },
    },
  },
  optimizeDeps: {
    include: ['framer-motion', 'lucide-react'],
  },
});

