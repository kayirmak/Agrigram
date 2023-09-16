import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Slider from 'react-slick'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Slider
  ],
})
