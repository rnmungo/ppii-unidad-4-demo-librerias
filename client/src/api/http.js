import axios from 'axios';

// Una instancia de Axios configurada UNA vez y reutilizada en toda la app.
// '/api' lo redirige Vite al backend (ver vite.config.js).
export const http = axios.create({
  baseURL: '/api',
  timeout: 10_000,
});
