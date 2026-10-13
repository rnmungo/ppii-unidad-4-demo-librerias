import { useState } from 'react';
import { Alert, Button, Chip, Stack, TextField, Typography } from '@mui/material';
import { useRenderCount } from '../hooks/useRenderCount';

// ❌ El enfoque "a mano": un useState por campo y validación con ifs.
// Cada tecla → setState → se vuelve a renderizar TODO el formulario.
export function ControlledFormDemo() {
  const renders = useRenderCount();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (nombre.trim().length < 2) newErrors.nombre = 'Mínimo 2 caracteres';
    if (!email.includes('@')) newErrors.email = 'Email inválido';
    setErrors(newErrors);
    setSent(Object.keys(newErrors).length === 0);
  };

  return (
    <Stack component="form" onSubmit={handleSubmit} spacing={2} noValidate>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>useState + ifs</Typography>
        <Chip color="error" label={`Renders: ${renders}`} sx={{ fontFamily: 'monospace' }} />
      </Stack>

      <TextField label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)}
        error={!!errors.nombre} helperText={errors.nombre} />
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email} helperText={errors.email} />

      <Button type="submit" variant="outlined">Enviar</Button>
      {sent && <Alert severity="success">Válido (pero solo 2 campos y ya es largo…)</Alert>}
    </Stack>
  );
}
