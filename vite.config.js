import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Hapus base: './' jika di Vercel
  // Hapus external react-scroll
})