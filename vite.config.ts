import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  server: {
    proxy: {
      '/oauth/token': {
        target: 'https://dev-fbckponuw7qdmzgh.us.auth0.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/oauth/, '')
      }
    }
  }
});
