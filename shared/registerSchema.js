import { z } from 'zod';

// Este esquema se usa en DOS lugares:
//  - client/src/demos/RegisterFormDemo.jsx  → valida el formulario antes de enviar
//  - server/index.js                        → vuelve a validar lo que llega a la API
// Una sola fuente de verdad: si cambiás una regla acá, cambia en ambos lados.
export const registerSchema = z
  .object({
    nombre: z.string().trim().min(2, 'Mínimo 2 caracteres'),
    email: z.email('Email inválido'),
    edad: z
      .number({ error: 'Ingresá tu edad' })
      .int('Tiene que ser un número entero')
      .min(18, 'Tenés que ser mayor de edad'),
    password: z.string().min(8, 'Mínimo 8 caracteres'),
    confirmPassword: z.string(),
    rol: z.enum(['alumno', 'docente'], { error: 'Elegí un rol' }),
  })
  // Validación entre campos: el error se asigna a confirmPassword
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });
