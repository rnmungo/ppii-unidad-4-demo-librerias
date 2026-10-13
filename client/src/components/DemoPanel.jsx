import { useState } from 'react';
import { Box, Paper, Tab, Tabs, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { CodeBlock } from './CodeBlock';

// Pestaña 1: la demo funcionando. Resto de pestañas: el código fuente REAL
// de esos archivos (importado con `?raw`), así lo que se ve es lo que corre.
export function DemoPanel({ files, children }) {
  const [tab, setTab] = useState(0);
  const current = files[tab - 1];

  return (
    <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'action.hover' }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable" scrollButtons="auto">
          <Tab icon={<PlayArrowIcon fontSize="small" />} iconPosition="start" label="Demo en vivo" sx={{ minHeight: 48, fontWeight: 700 }} />
          {files.map((f) => (
            <Tab key={f.name} label={f.name} sx={{ minHeight: 48, textTransform: 'none', fontFamily: '"JetBrains Mono", monospace', fontSize: 13 }} />
          ))}
        </Tabs>
      </Box>

      {/* La demo queda montada (oculta) para no perder su estado al mirar el código */}
      <Box sx={{ p: { xs: 2, md: 3 }, display: tab === 0 ? 'block' : 'none' }}>{children}</Box>

      {current && (
        <>
          {current.note && (
            <Typography variant="body2" sx={{ px: 2, py: 1.25, bgcolor: 'action.selected' }}>
              💡 {current.note}
            </Typography>
          )}
          <CodeBlock code={current.code} language={current.language ?? 'jsx'} />
        </>
      )}
    </Paper>
  );
}
