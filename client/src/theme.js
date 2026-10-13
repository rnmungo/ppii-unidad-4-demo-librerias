import { createTheme } from '@mui/material/styles';

// Un solo lugar para definir colores, tipografía y estilos de TODA la app.
// Cambiá primary.main y mirá cómo se actualizan botones, chips, tabs, etc.
export const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'data' }, // permite alternar claro/oscuro
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#5b21b6' },
        secondary: { main: '#db2777' },
        background: { default: '#f6f7fb', paper: '#ffffff' },
      },
    },
    dark: {
      palette: {
        primary: { main: '#a78bfa' },
        secondary: { main: '#f472b6' },
        background: { default: '#0a0d16', paper: '#111627' },
      },
    },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: '"Inter", system-ui, sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, letterSpacing: '-0.01em' },
    h3: { fontWeight: 700 },
  },
  components: {
    // Personalización global de un componente
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { textTransform: 'none', fontWeight: 600 } },
    },
    MuiTextField: {
      defaultProps: { size: 'small', fullWidth: true },
    },
  },
});
