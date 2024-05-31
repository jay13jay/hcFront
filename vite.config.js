import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/hcFront/",
  server: {
    host: "0.0.0.0",
    port: 5000,
  },
  plugins: [react()],
})
