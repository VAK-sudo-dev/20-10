import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// base './' => deploy ở đâu cũng chạy (Netlify, GitHub Pages...)
export default defineConfig({ plugins: [react()], base: './' })
