import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Polyfill process.env for the application code to prevent runtime crashes
    'process.env': {}
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});