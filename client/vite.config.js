import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Todo lo que empiece con /api o /uploads se reenvía al backend Express.
    // Así el front llama a '/api/...' sin preocuparse por CORS ni puertos.
    proxy: {
      '/api': 'http://localhost:3000',
      '/uploads': 'http://localhost:3000',
    },
  },
});
