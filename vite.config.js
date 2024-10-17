import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/login': {
        target: 'http://localhost:8080',
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
              proxyRes.headers.location = proxyRes.headers.location.replace('http://localhost:8080', 'http://localhost:3000');
            }
          });
        }
      },
      '/login?error': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    }
  }
})
