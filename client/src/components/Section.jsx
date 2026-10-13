import { Box, Chip, Paper, Stack, Typography } from '@mui/material';

export function Section({ id, eyebrow, color = 'primary', title, description, children }) {
  return (
    <Box component="section" id={id} sx={{ scrollMarginTop: 80 }}>
      <Typography variant="overline" color={`${color}.main`} sx={{ fontWeight: 800 }}>
        {eyebrow}
      </Typography>
      <Typography variant="h2" sx={{ fontSize: { xs: 26, sm: 32 }, mt: 0.5 }}>
        {title}
      </Typography>
      {description && (
        <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 760 }}>
          {description}
        </Typography>
      )}
      <Stack spacing={4} sx={{ mt: 4 }}>{children}</Stack>
    </Box>
  );
}

// Tarjeta de una librería (o combinación): título, chips, explicación y demo
export function LibraryCard({ libs, title, children }) {
  return (
    <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3.5 } }}>
      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap', alignItems: 'center', mb: 1.5 }}>
        {libs.map((l, i) => (
          <Stack key={l.name} direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            {i > 0 && <Typography color="text.secondary">+</Typography>}
            <Chip label={l.name} size="small" sx={{ fontWeight: 700, bgcolor: l.bg, color: l.fg }} />
          </Stack>
        ))}
      </Stack>
      <Typography variant="h3" sx={{ fontSize: { xs: 20, sm: 22 } }}>{title}</Typography>
      <Stack spacing={3} sx={{ mt: 3 }}>{children}</Stack>
    </Paper>
  );
}

// Grilla de conceptos clave (emoji + título + texto)
export function Concepts({ items }) {
  return (
    <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: `repeat(${Math.min(items.length, 4)}, 1fr)` } }}>
      {items.map((c) => (
        <Box key={c.title} sx={{ border: 1, borderColor: 'divider', borderRadius: 3, p: 2 }}>
          <Typography sx={{ fontSize: 22 }}>{c.icon}</Typography>
          <Typography sx={{ fontWeight: 700, mt: 0.5 }}>{c.title}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{c.text}</Typography>
        </Box>
      ))}
    </Box>
  );
}

// Recuadro de "idea clave" / advertencia
export function Callout({ severity = 'info', children }) {
  const colors = { info: 'info', warning: 'warning', tip: 'secondary' };
  const c = colors[severity];
  return (
    <Box
      sx={(theme) => ({
        borderLeft: 4, borderColor: `${c}.main`, borderRadius: 2, p: 2,
        bgcolor: `rgba(${theme.vars.palette[c].mainChannel} / 0.08)`,
        fontSize: 14,
      })}
    >
      {children}
    </Box>
  );
}
