import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [
      '083d-2402-a00-162-ee0-7fad-79e2-33ec-1403.ngrok-free.app',
      'http://192.168.1.25:5173'
    ]
  }
})
