import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const workDir = resolve(import.meta.dirname, 'work');
const workPages = existsSync(workDir)
  ? Object.fromEntries(
      readdirSync(workDir)
        .filter((f) => f.endsWith('.html'))
        .map((f) => [`work/${f.replace('.html', '')}`, resolve(workDir, f)])
    )
  : {};

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': resolve(import.meta.dirname, 'src') } },
  build: {
    target: 'es2022',
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        about: resolve(import.meta.dirname, 'about.html'),
        contact: resolve(import.meta.dirname, 'contact.html'),
        ...workPages,
      },
    },
  },
});
