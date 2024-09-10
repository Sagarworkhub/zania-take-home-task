import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { ViteAliases } from 'vite-aliases';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteAliases({
      prefix: '@',
    }),
  ],
});
