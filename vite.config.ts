import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Keep the 34 skill logos as separate files rather than inlining them into
    // the JS bundle: they're lazy-loaded when Skills scrolls into view, and
    // inlining them added ~52 KB to the JavaScript every visitor downloads.
    assetsInlineLimit: (file) => (file.includes('/assets/skills/') ? false : undefined),
  },
})
