import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // qualquer rota que começar com /tasks vai para o backend
      '/tasks': {
        target: 'https://my-checklist-backend.vercel.app',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
