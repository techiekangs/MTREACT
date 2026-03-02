import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  //base: 'http://172.18.0.31/mtonline-dev.com/', 
  base: 'https://main.manilateachersonline.com/',
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    historyApiFallback: true, // <-- this ensures all routes serve index.html
  },
})