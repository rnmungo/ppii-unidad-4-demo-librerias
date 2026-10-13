import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import {
  Alert, Button, Chip, FormControl, FormControlLabel, FormHelperText, FormLabel,
  Radio, RadioGroup, Stack, TextField, Typography,
} from '@mui/material';
import { registerSchema } from '../../../shared/registerSchema'; // ← el mismo que usa el servidor
import { http } from '../api/http';
import { useRenderCount } from '../hooks/useRenderCount';

// ✅ React Hook Form + Zod (+ TanStack Query para enviar)
export function RegisterFormDemo() {
  const renders = useRenderCount();

  const {
    register, // conecta un input al formulario (sin useState)
    control, // para componentes controlados (RadioGroup de MUI)
    handleSubmit, // valida con Zod y, si todo está bien, llama a onSubmit
    setError, // para mostrar errores que vienen del servidor
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema), // 🔗 el puente entre Zod y RHF
    defaultValues: { nombre: '', email: '', edad: '', password: '', confirmPassword: '', rol: 'alumno' },
  });

  const signup = useMutation({
    mutationFn: (user) => http.post('/users', user).then((res) => res.data),
  });

  // Si el servidor rechaza los datos, pintamos sus errores en cada campo
  const showServerErrors = (err) => {
    err.response?.data?.errors?.forEach(({ field, message }) =>
      setError(field, { type: 'server', message: `${message} (servidor)` })
    );
  };

  const onSubmit = (data) => signup.mutateAsync(data).then(() => reset()).catch(showServerErrors);

  // Solo para la demo: mandamos los datos SIN validar en el cliente
  const sendWithoutValidation = () => signup.mutateAsync(getValues()).catch(showServerErrors);

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2} noValidate>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>React Hook Form + Zod</Typography>
        <Chip color="success" label={`Renders: ${renders}`} sx={{ fontFamily: 'monospace' }} />
      </Stack>

      <Field label="Nombre" error={errors.nombre} {...register('nombre')} />
      <Field label="Email" type="email" error={errors.email} {...register('email')} />
      <Field label="Edad" type="number" error={errors.edad} {...register('edad', { valueAsNumber: true })} />
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Field label="Contraseña" type="password" error={errors.password} {...register('password')} />
        <Field label="Repetir contraseña" type="password" error={errors.confirmPassword} {...register('confirmPassword')} />
      </Stack>

      {/* Componentes controlados (como RadioGroup de MUI) se conectan con <Controller> */}
      <Controller
        name="rol"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl error={!!fieldState.error}>
            <FormLabel>Rol</FormLabel>
            <RadioGroup row {...field}>
              <FormControlLabel value="alumno" control={<Radio size="small" />} label="Alumno" />
              <FormControlLabel value="docente" control={<Radio size="small" />} label="Docente" />
            </RadioGroup>
            <FormHelperText>{fieldState.error?.message}</FormHelperText>
          </FormControl>
        )}
      />

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
        <Button type="submit" variant="contained" loading={isSubmitting}>
          Registrarme
        </Button>
        <Button color="warning" onClick={sendWithoutValidation} disabled={signup.isPending}>
          Enviar sin validar en el cliente
        </Button>
      </Stack>

      {signup.isSuccess && (
        <Alert severity="success">
          Usuario creado: <code>{JSON.stringify(signup.data)}</code>
        </Alert>
      )}
    </Stack>
  );
}

// TextField de MUI necesita el ref en `inputRef` (no en `ref`)
function Field({ ref, error, ...props }) {
  return <TextField inputRef={ref} error={!!error} helperText={error?.message} {...props} />;
}
