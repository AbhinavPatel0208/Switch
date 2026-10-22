import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('react-syntax-highlighter')) {
            return 'syntax-highlighter';
          }
          if (id.includes('react-markdown') || id.includes('remark-gfm')) {
            return 'markdown';
          }
        },
      },
    },
  },
})
