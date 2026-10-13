import { useState } from 'react';
import {
  Alert, Box, Button, Chip, CircularProgress, FormControlLabel, LinearProgress,
  List, ListItem, ListItemText, Paper, Stack, Switch, TextField, Typography,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useCreateProduct, useProducts } from '../hooks/useProducts';
import { formatPrice } from '../utils/format';

export function ProductsDemo() {
  const [simulateError, setSimulateError] = useState(false);

  // Todo el estado del servidor sale de UN hook. Sin useEffect, sin useState de "loading".
  const { data, isLoading, isFetching, isError, error, failureCount, refetch } =
    useProducts({ fail: simulateError });

  return (
    <Stack spacing={2.5}>
      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap', alignItems: 'center' }}>
        <StatusChip label="isLoading" active={isLoading} color="warning" />
        <StatusChip label="isFetching" active={isFetching} color="info" />
        <StatusChip label="isError" active={isError} color="error" />
        <Chip size="small" variant="outlined" label={`failureCount: ${failureCount}`} />
        <Box sx={{ flexGrow: 1 }} />
        <FormControlLabel
          control={<Switch checked={simulateError} onChange={(e) => setSimulateError(e.target.checked)} color="error" />}
          label="Simular error del servidor"
        />
        <Button size="small" startIcon={<RefreshIcon />} onClick={() => refetch()}>
          Refetch
        </Button>
      </Stack>

      <Paper variant="outlined" sx={{ minHeight: 220, position: 'relative', overflow: 'hidden' }}>
        {isFetching && <LinearProgress sx={{ position: 'absolute', inset: '0 0 auto 0' }} />}

        {isLoading && (
          <Stack sx={{ alignItems: 'center', justifyContent: 'center', height: 220, gap: 1 }}>
            <CircularProgress size={28} />
            <Typography variant="body2" color="text.secondary">
              {failureCount > 0 ? `Falló. Reintentando… (intento ${failureCount + 1} de 3)` : 'Cargando productos…'}
            </Typography>
          </Stack>
        )}

        {isError && (
          <Alert severity="error" sx={{ m: 2 }}>
            Después de 3 intentos se rindió: {error.response?.data?.message ?? error.message}
          </Alert>
        )}

        {data && (
          <List dense>
            {data.map((p) => (
              <ListItem key={p.id} divider>
                <ListItemText primary={p.name} secondary={`#${p.id}`} />
                <Typography sx={{ fontWeight: 600 }}>{formatPrice(p.price)}</Typography>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>

      <NewProductForm />
    </Stack>
  );
}

// useMutation: para crear/editar/borrar. Al terminar, invalida la lista.
function NewProductForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const createProduct = useCreateProduct();

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct.mutate(
      { name, price: Number(price) },
      { onSuccess: () => { setName(''); setPrice(''); } }
    );
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="subtitle2" gutterBottom>
        Agregar producto (useMutation + invalidateQueries)
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
        <TextField label="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Precio" type="number" value={price} onChange={(e) => setPrice(e.target.value)} sx={{ maxWidth: { sm: 160 } }} />
        <Button type="submit" variant="contained" loading={createProduct.isPending} sx={{ flexShrink: 0 }}>
          Agregar
        </Button>
      </Stack>
      {createProduct.isError && (
        <Alert severity="error" sx={{ mt: 1.5 }}>
          {createProduct.error.response?.data?.message}
        </Alert>
      )}
    </Box>
  );
}

function StatusChip({ label, active, color }) {
  return (
    <Chip
      size="small"
      label={`${label}: ${active}`}
      color={active ? color : 'default'}
      variant={active ? 'filled' : 'outlined'}
      sx={{ fontFamily: 'monospace' }}
    />
  );
}
