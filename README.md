# Librerías esenciales para React en el mundo real

Guía interactiva para clase (Práctica Profesional II · Unidad 4). Cada sección explica una librería
**y la muestra funcionando**. En cada demo hay pestañas con el **código fuente real** que está corriendo.

| Librería | Dónde se ve |
| --- | --- |
| **TanStack Query + Axios** | Lista de productos con caché, `isLoading`/`isFetching`, reintentos y `useMutation` |
| **React Hook Form + Zod** | Formulario de registro con contador de renders vs. un formulario con `useState` |
| **Multer (Express)** | Subida de avatar con progreso; el servidor rechaza archivos grandes o que no son imágenes |
| **Material UI** | Mini panel de administración + theming claro/oscuro (toda la página usa MUI) |

## Cómo correrlo

Requiere Node.js 20 o superior.

```bash
npm install
npm run dev
```

- Front (Vite + React): <http://localhost:5173>
- API (Express): <http://localhost:3000> — Vite redirige `/api` y `/uploads` hacia acá.
- Versión estática tipo *cheat sheet*: <http://localhost:5173/guia.html>

## Estructura

```
client/                 → app React (Vite)
  src/api/              → Axios: instancia y funciones que llaman a la API
  src/hooks/            → useProducts (TanStack Query), useRenderCount
  src/demos/            → una demo por librería (es el código que se muestra en pantalla)
  src/components/       → piezas de la guía: secciones, panel de demo, bloque de código
  src/theme.js          → tema de MUI
  public/guia.html      → guía estática en un solo HTML (Tailwind por CDN)
server/index.js         → Express: productos, registro (valida con Zod) y subida con Multer
shared/registerSchema.js → esquema de Zod que usan TANTO el cliente como el servidor
```

## Ideas para la clase

1. **Query:** activar *Simular error del servidor* y mirar `failureCount` subir hasta 3. Abrir las Devtools de TanStack Query (botón abajo a la izquierda).
2. **Formularios:** escribir en los dos formularios y comparar los renders. Después usar *Enviar sin validar en el cliente* para ver que el servidor valida con el mismo esquema.
3. **Multer:** subir un PDF o una imagen de más de 2 MB para ver los errores. Los archivos quedan en `server/uploads/`.
4. **MUI:** cambiar `primary.main` en `client/src/theme.js` y ver cómo cambia toda la página.

> Los datos de productos y usuarios viven en memoria: se reinician al reiniciar el servidor.
