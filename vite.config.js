import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Tailwind v3 is handled via PostCSS — no Vite plugin needed
export default defineConfig({
  plugins: [react()],
})
