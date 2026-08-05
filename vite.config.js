import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(projectRoot, './src'),
      '@components': path.resolve(projectRoot, './src/components'),
      '@pages': path.resolve(projectRoot, './src/pages'),
      '@sections': path.resolve(projectRoot, './src/sections'),
      '@hooks': path.resolve(projectRoot, './src/hooks'),
      '@utils': path.resolve(projectRoot, './src/utils'),
      '@config': path.resolve(projectRoot, './src/config'),
      '@assets': path.resolve(projectRoot, './src/assets'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          animation: ['framer-motion'],
        },
      },
    },
  },
});
