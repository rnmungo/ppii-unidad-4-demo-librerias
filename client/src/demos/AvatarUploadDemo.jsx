import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Alert, Avatar, Box, Button, LinearProgress, Paper, Stack, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { http } from '../api/http';
import { formatBytes } from '../utils/format';

export function AvatarUploadDemo() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(0);

  // Vista previa local (antes de subir) — se libera la memoria al cambiar de archivo
  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const upload = useMutation({
    mutationFn: async (file) => {
      // 1) FormData: el "sobre" para mandar archivos
      const formData = new FormData();
      formData.append('avatar', file); // ← mismo nombre que upload.single('avatar')

      // 2) Axios detecta FormData y envía multipart/form-data automáticamente
      const { data } = await http.post('/avatar', formData, {
        onUploadProgress: (e) => setProgress(Math.round((e.loaded * 100) / (e.total ?? e.loaded))),
      });
      return data;
    },
  });

  const handleChange = (e) => {
    setFile(e.target.files[0] ?? null);
    setProgress(0);
    upload.reset();
  };

  return (
    <Stack spacing={2.5}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} sx={{ alignItems: 'center' }}>
        <Avatar src={preview ?? undefined} sx={{ width: 96, height: 96, fontSize: 36 }}>?</Avatar>

        <Stack spacing={1} sx={{ flexGrow: 1, width: '100%' }}>
          <Stack direction="row" spacing={1.5}>
            <Button component="label" variant="outlined">
              Elegir archivo
              {/* Sin `accept` a propósito: probá subir un PDF para ver cómo Multer lo rechaza */}
              <input type="file" hidden onChange={handleChange} />
            </Button>
            <Button
              variant="contained"
              startIcon={<CloudUploadIcon />}
              disabled={!file}
              loading={upload.isPending}
              onClick={() => upload.mutate(file)}
            >
              Subir
            </Button>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            {file ? `${file.name} · ${file.type || 'tipo desconocido'} · ${formatBytes(file.size)}` : 'Ningún archivo seleccionado'}
          </Typography>
          {upload.isPending && <LinearProgress variant="determinate" value={progress} />}
        </Stack>
      </Stack>

      {upload.isError && (
        <Alert severity="error">
          Multer lo rechazó: <strong>{upload.error.response?.data?.message ?? upload.error.message}</strong>
        </Alert>
      )}

      {upload.isSuccess && (
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Alert severity="success" sx={{ mb: 2 }}>
            ¡Guardado en el servidor! Esta imagen ya se sirve desde <code>{upload.data.url}</code>
          </Alert>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ alignItems: 'flex-start' }}>
            <Box component="img" src={upload.data.url} alt="Subida" sx={{ width: 140, borderRadius: 2 }} />
            <Box component="pre" sx={{ m: 0, fontSize: 12, overflow: 'auto', maxWidth: '100%' }}>
              {/* req.file que armó Multer → respuesta de la API */}
              {JSON.stringify(upload.data, null, 2)}
            </Box>
          </Stack>
        </Paper>
      )}
    </Stack>
  );
}
