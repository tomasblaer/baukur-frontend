import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/login': {
        target: 'https://baukur.onrender.com',
        changeOrigin: true,
        secure: false,
        ws: true,
        configure: (proxyReq, req) => {
          proxyReq.on('proxyReq', (proxyReq) => {
            if (req.url === '/login') {
              proxyReq.setHeader('Origin', 'http://localhost:3000');
            }
          });
          proxyReq.on('proxyRes', (proxyRes) => {
            if (proxyRes.headers.location) {
              proxyRes.headers.location = proxyRes.headers.location.replace('https://baukur.onrender.com', 'http://localhost:3000');
            }
          });
        }
      },
      '/login?error': {
        target: 'https://baukur.onrender.com',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    }
  }
})
