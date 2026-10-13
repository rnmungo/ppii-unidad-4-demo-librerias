import { useState } from 'react';
import {
  Avatar, AvatarGroup, Box, Button, Card, CardContent, Chip, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle, IconButton, Paper, Rating, Skeleton,
  Slider, Snackbar, Alert, Stack, Switch, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Tooltip, Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../utils/format';

// Un mini "panel de administración" armado SOLO con componentes de MUI.
// Bonus: la tabla usa el mismo useProducts() de la sección 1 → sale de la caché.
export function MuiShowcase() {
  const { data: products, isLoading } = useProducts();
  const [toDelete, setToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState('');

  const confirmDelete = () => {
    setSnackbar(`"${toDelete.name}" eliminado (simulado)`);
    setToDelete(null);
  };

  return (
    <Stack spacing={3}>
      {/* Tarjetas de métricas */}
      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' } }}>
        <StatCard icon={<Inventory2Icon />} label="Productos" value={products?.length ?? '–'} color="primary" />
        <StatCard icon={<PeopleIcon />} label="Alumnos" value="128" color="secondary" />
        <StatCard icon={<TrendingUpIcon />} label="Ventas del mes" value="+18%" color="success" />
      </Box>

      {/* Tabla de datos */}
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Producto</TableCell>
              <TableCell align="right">Precio</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading
              ? [1, 2, 3].map((i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={4}><Skeleton /></TableCell>
                  </TableRow>
                ))
              : products?.map((p) => (
                  <TableRow key={p.id} hover>
                    <TableCell>{p.name}</TableCell>
                    <TableCell align="right">{formatPrice(p.price)}</TableCell>
                    <TableCell>
                      <Chip size="small" label={p.price > 100000 ? 'Premium' : 'En stock'}
                        color={p.price > 100000 ? 'secondary' : 'success'} />
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Eliminar">
                        <IconButton size="small" onClick={() => setToDelete(p)} aria-label={`Eliminar ${p.name}`}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Componentes sueltos */}
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="subtitle2" gutterBottom>Más componentes listos para usar</Typography>
        <Stack direction="row" spacing={2} useFlexGap sx={{ flexWrap: 'wrap', alignItems: 'center' }}>
          <Button variant="contained">Contained</Button>
          <Button variant="outlined">Outlined</Button>
          <Button>Text</Button>
          <Switch defaultChecked />
          <Rating defaultValue={4} />
          <AvatarGroup max={4}>
            {['A', 'B', 'C', 'D', 'E'].map((l) => <Avatar key={l}>{l}</Avatar>)}
          </AvatarGroup>
          <Slider defaultValue={60} sx={{ width: 160 }} aria-label="Volumen" />
        </Stack>
      </Paper>

      {/* Diálogo accesible: maneja foco, Esc para cerrar y aria-* solo */}
      <Dialog open={!!toDelete} onClose={() => setToDelete(null)}>
        <DialogTitle>¿Eliminar producto?</DialogTitle>
        <DialogContent>
          <DialogContentText>Vas a eliminar "{toDelete?.name}". Esta acción no se puede deshacer.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setToDelete(null)}>Cancelar</Button>
          <Button color="error" variant="contained" onClick={confirmDelete}>Eliminar</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={!!snackbar} autoHideDuration={3000} onClose={() => setSnackbar('')}>
        <Alert severity="success" variant="filled" onClose={() => setSnackbar('')}>{snackbar}</Alert>
      </Snackbar>
    </Stack>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <Card variant="outlined">
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: `${color}.main` }}>{icon}</Avatar>
        <Box>
          <Typography variant="body2" color="text.secondary">{label}</Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>{value}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
