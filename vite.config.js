import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5050',  // Proxy API requests to the Express server
      '/auth': 'http://localhost:5050', // Proxy authentication-related routes
    },
  },
})
