import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import { theme } from './theme';
import App from './App';

// El QueryClient guarda la caché de TODAS las queries de la app.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000, // los datos se consideran "frescos" 30 s
      refetchOnWindowFocus: true, // al volver a la pestaña, se re-sincroniza
    },
  },
});

// Nota: no usamos <StrictMode> a propósito. En desarrollo renderiza cada
// componente dos veces y eso duplicaría los contadores de renders de la demo
// de formularios. En un proyecto real, dejalo activado.
createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
    {/* Panel flotante para inspeccionar la caché (solo en desarrollo) */}
    <ReactQueryDevtools buttonPosition="bottom-left" />
  </QueryClientProvider>
);
