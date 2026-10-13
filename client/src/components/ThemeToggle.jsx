import { IconButton, Tooltip } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

// Theming de MUI: un solo hook cambia el esquema de colores de TODA la app
export function ThemeToggle() {
  const { mode, systemMode, setMode } = useColorScheme();
  if (!mode) return null;
  const isDark = (mode === 'system' ? systemMode : mode) === 'dark';

  return (
    <Tooltip title={isDark ? 'Modo claro' : 'Modo oscuro'}>
      <IconButton color="inherit" onClick={() => setMode(isDark ? 'light' : 'dark')} aria-label="Cambiar tema">
        {isDark ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
}
