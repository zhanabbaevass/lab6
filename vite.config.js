import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vite from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [vite()],
  server: {
    open: true,
    port: 7292,
  }
})