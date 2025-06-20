import { defineConfig } from 'vite';

export default defineConfig({
  root: './', // Specifies the root directory of your project
  build: {
    outDir: 'dist', // Specifies the output directory for the build
  },
  publicDir: 'public', // Specifies the directory for static assets
});