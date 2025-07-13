// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port: 5173,
    strictPort: true,
    https: false // 👈 This forces HTTP
  },
  plugins: [react()]
});
