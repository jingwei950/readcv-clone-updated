/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  root: './',
  publicDir: 'assets',
  build: {
    target: ['es2020'],
    outDir: 'dist',
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [analog(), viteTsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
  // define: {
  //   'import.meta.vitest': mode !== 'production',
  // },
}));
