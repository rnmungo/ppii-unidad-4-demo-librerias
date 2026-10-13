import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { registerSchema } from '../shared/registerSchema.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOADS_DIR = path.join(__dirname, 'uploads');
fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const app = express();
app.use(cors());
app.use(express.json()); // entiende JSON... pero NO archivos (para eso está Multer)

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ─────────────────────────────────────────────
// 1) Productos → demo de TanStack Query + Axios
// ─────────────────────────────────────────────
let nextId = 4;
const products = [
  { id: 1, name: 'Teclado mecánico', price: 85000 },
  { id: 2, name: 'Mouse inalámbrico', price: 32000 },
  { id: 3, name: 'Monitor 24"', price: 260000 },
];

app.get('/api/products', async (req, res) => {
  await sleep(900); // latencia artificial para VER el estado de carga
  if (req.query.fail === 'true') {
    return res.status(500).json({ message: 'El servidor falló (simulado)' });
  }
  res.json(products);
});

app.post('/api/products', async (req, res) => {
  await sleep(600);
  const { name, price } = req.body;
  if (!name || !(Number(price) > 0)) {
    return res.status(400).json({ message: 'Nombre y precio son obligatorios' });
  }
  const product = { id: nextId++, name, price: Number(price) };
  products.push(product);
  res.status(201).json(product);
});

// ─────────────────────────────────────────────
// 2) Registro → demo de React Hook Form + Zod
//    El MISMO esquema de Zod valida en el servidor
// ─────────────────────────────────────────────
app.post('/api/users', async (req, res) => {
  await sleep(700);
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      message: 'Datos inválidos',
      errors: result.error.issues.map((i) => ({ field: i.path.join('.'), message: i.message })),
    });
  }
  const { password, confirmPassword, ...user } = result.data; // nunca devolver la contraseña
  res.status(201).json({ id: Date.now(), ...user });
});

// ─────────────────────────────────────────────
// 3) Subida de archivos → demo de Multer
// ─────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: UPLOADS_DIR,
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname).toLowerCase()}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // máx. 2 MB
  fileFilter: (req, file, cb) => {
    const ok = ['image/png', 'image/jpeg', 'image/webp'].includes(file.mimetype);
    cb(ok ? null : new Error('Solo se permiten imágenes PNG, JPG o WEBP'), ok);
  },
});

// 'avatar' tiene que coincidir con formData.append('avatar', ...) en React
app.post('/api/avatar', upload.single('avatar'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No llegó ningún archivo' });
  res.status(201).json({
    url: `/uploads/${req.file.filename}`,
    originalName: req.file.originalname,
    size: req.file.size,
    mimetype: req.file.mimetype,
  });
});

app.use('/uploads', express.static(UPLOADS_DIR));

// Manejo de errores de Multer (tamaño excedido, tipo inválido, etc.)
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ message: 'El archivo supera los 2 MB' });
  }
  res.status(400).json({ message: err.message });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`API escuchando en http://localhost:${PORT}`));
