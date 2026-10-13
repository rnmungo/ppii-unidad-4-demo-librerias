import {
  AppBar, Box, Button, Chip, Container, Link, Paper, Stack, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography,
} from '@mui/material';
import { Section, LibraryCard, Concepts, Callout } from './components/Section';
import { DemoPanel } from './components/DemoPanel';
import { ThemeToggle } from './components/ThemeToggle';
import { ProductsDemo } from './demos/ProductsDemo';
import { ControlledFormDemo } from './demos/ControlledFormDemo';
import { RegisterFormDemo } from './demos/RegisterFormDemo';
import { AvatarUploadDemo } from './demos/AvatarUploadDemo';
import { MuiShowcase } from './demos/MuiShowcase';

// Código fuente real de cada archivo (Vite lo importa como texto con ?raw)
import httpSrc from './api/http.js?raw';
import productsApiSrc from './api/products.js?raw';
import useProductsSrc from './hooks/useProducts.js?raw';
import productsDemoSrc from './demos/ProductsDemo.jsx?raw';
import mainSrc from './main.jsx?raw';
import registerFormSrc from './demos/RegisterFormDemo.jsx?raw';
import controlledFormSrc from './demos/ControlledFormDemo.jsx?raw';
import schemaSrc from '../../shared/registerSchema.js?raw';
import serverSrc from '../../server/index.js?raw';
import avatarUploadSrc from './demos/AvatarUploadDemo.jsx?raw';
import muiShowcaseSrc from './demos/MuiShowcase.jsx?raw';
import themeSrc from './theme.js?raw';

const LIBS = {
  query: { name: 'TanStack Query', bg: '#ffe4e6', fg: '#be123c' },
  axios: { name: 'Axios', bg: '#ede9fe', fg: '#6d28d9' },
  rhf: { name: 'React Hook Form', bg: '#fce7f3', fg: '#be185d' },
  zod: { name: 'Zod', bg: '#e0f2fe', fg: '#0369a1' },
  multer: { name: 'Multer', bg: '#d1fae5', fg: '#047857' },
  express: { name: 'Node.js · Express', bg: '#e2e8f0', fg: '#334155' },
  mui: { name: 'Material UI', bg: '#dbeafe', fg: '#1d4ed8' },
};

const NAV = [
  { href: '#datos', label: 'Datos y formularios' },
  { href: '#backend', label: 'Subida de archivos' },
  { href: '#ui', label: 'Interfaz (UI)' },
  { href: '#resumen', label: 'Resumen' },
];

export default function App() {
  return (
    <>
      <AppBar position="sticky" elevation={0} color="default" sx={{ borderBottom: 1, borderColor: 'divider', backdropFilter: 'blur(8px)' }}>
        <Toolbar sx={{ gap: 1 }}>
          <Typography sx={{ fontWeight: 800, flexGrow: 1 }}>⚛️ React en el mundo real</Typography>
          <Stack direction="row" spacing={0.5} sx={{ display: { xs: 'none', md: 'flex' } }}>
            {NAV.map((n) => (
              <Button key={n.href} href={n.href} color="inherit" size="small">{n.label}</Button>
            ))}
          </Stack>
          <ThemeToggle />
        </Toolbar>
      </AppBar>

      <Hero />

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Stack spacing={{ xs: 10, md: 14 }}>
          <DataSection />
          <BackendSection />
          <UiSection />
          <SummarySection />
        </Stack>
      </Container>

      <Box component="footer" sx={{ borderTop: 1, borderColor: 'divider', py: 3 }}>
        <Container maxWidth="lg" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">Práctica Profesional II · Unidad 4</Typography>
          <Link href="/guia.html" target="_blank" variant="body2">Ver la guía estática (cheat sheet)</Link>
        </Container>
      </Box>
    </>
  );
}

function Hero() {
  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', color: 'white', background: 'linear-gradient(135deg, #4f46e5, #7c3aed 50%, #c026d3)' }}>
      <Box sx={{ position: 'absolute', inset: 0, opacity: 0.18, backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '22px 22px' }} />
      <Container maxWidth="lg" sx={{ position: 'relative', py: { xs: 7, md: 11 } }}>
        <Chip label="Guía práctica · con demos en vivo" sx={{ bgcolor: 'rgba(255,255,255,.18)', color: 'white', fontWeight: 600 }} />
        <Typography variant="h1" sx={{ fontSize: { xs: 34, sm: 52 }, mt: 3, maxWidth: 820, lineHeight: 1.1 }}>
          Librerías esenciales para React en el mundo real
        </Typography>
        <Typography sx={{ mt: 2.5, fontSize: { xs: 17, sm: 20 }, opacity: 0.88, maxWidth: 680 }}>
          Saber React es el punto de partida. Saber <strong>qué herramientas combinar</strong> es lo que te
          convierte en un desarrollador listo para proyectos de verdad. Cada ejemplo de esta página está
          funcionando: tocalo, rompelo y mirá su código.
        </Typography>
        <Box sx={{ mt: 5, display: 'grid', gap: 1.5, gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' } }}>
          {NAV.map((n, i) => (
            <Box key={n.href} component="a" href={n.href}
              sx={{ color: 'inherit', textDecoration: 'none', bgcolor: 'rgba(255,255,255,.1)', borderRadius: 3, px: 2, py: 1.5, transition: '.2s', '&:hover': { bgcolor: 'rgba(255,255,255,.2)' } }}>
              <Typography variant="caption" sx={{ opacity: 0.7 }}>{i < 3 ? `Sección ${i + 1}` : 'Cierre'}</Typography>
              <Typography sx={{ fontWeight: 600 }}>{n.label}</Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

const code = (text) => <Box component="code" sx={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.9em', bgcolor: 'action.selected', px: 0.5, borderRadius: 0.5 }}>{text}</Box>;

// ─────────────────────────── Sección 1 ───────────────────────────
function DataSection() {
  return (
    <Section id="datos" eyebrow="Sección 1" title="El tridente de datos y formularios"
      description="Combinaciones potentes: cada librería hace una cosa muy bien, y juntas cubren lo que vas a hacer en casi cualquier app: traer datos del servidor y mandarle datos validados.">

      <LibraryCard libs={[LIBS.query, LIBS.axios]} title={<>Pedir datos al servidor… sin escribir 40 líneas de {code('useEffect')}</>}>
        <Concepts items={[
          { icon: '📡', title: 'Axios = el mensajero', text: 'Hace la petición HTTP: arma la URL, headers, convierte a JSON y maneja errores de red.' },
          { icon: '🧠', title: 'TanStack Query = el cerebro', text: 'Decide cuándo pedir, guarda la respuesta en caché y te avisa el estado (isLoading, isError, data).' },
          { icon: '🔁', title: 'Reintentos automáticos', text: 'Si la petición falla, reintenta sola. Activá "Simular error" y mirá el contador de intentos.' },
          { icon: '🔄', title: 'Sincronización', text: 'Al crear un producto se invalida la lista y se vuelve a pedir. También al volver a la pestaña.' },
        ]} />
        <Callout>
          <strong>💡 Probá en clase:</strong> recargá la página y mirá {code('isLoading')}; tocá <em>Refetch</em> y
          mirá {code('isFetching')} (hay datos en caché, así que no aparece el spinner grande). Abrí el panel de
          <strong> Devtools</strong> (abajo a la izquierda) para ver la caché en vivo.
        </Callout>
        <DemoPanel files={[
          { name: 'hooks/useProducts.js', code: useProductsSrc, language: 'javascript', note: 'TanStack Query: queryKey, queryFn, retry y la mutation que invalida la caché.' },
          { name: 'api/products.js', code: productsApiSrc, language: 'javascript', note: 'Axios solo hace la petición. No sabe nada de caché ni de estados.' },
          { name: 'api/http.js', code: httpSrc, language: 'javascript' },
          { name: 'demos/ProductsDemo.jsx', code: productsDemoSrc },
          { name: 'main.jsx', code: mainSrc, note: 'El QueryClientProvider envuelve la app UNA sola vez.' },
        ]}>
          <ProductsDemo />
        </DemoPanel>
      </LibraryCard>

      <LibraryCard libs={[LIBS.rhf, LIBS.zod]} title="Formularios rápidos y validación declarativa">
        <Concepts items={[
          { icon: '⚡', title: 'React Hook Form', text: 'Usa inputs no controlados (refs): escribir en un campo no re-renderiza todo el formulario.' },
          { icon: '🛡️', title: 'Zod', text: 'Describís cómo deben ser los datos en un esquema. Zod valida y genera los mensajes de error.' },
          { icon: '🔗', title: 'zodResolver', text: 'Es el puente: le dice a RHF que use el esquema de Zod para validar.' },
          { icon: '♻️', title: 'Un esquema, dos lados', text: 'El mismo esquema valida en el navegador y en el servidor Express. Una sola fuente de verdad.' },
        ]} />
        <Callout severity="tip">
          <strong>🧪 Experimento:</strong> escribí en ambos formularios y compará el contador de <strong>Renders</strong>.
          Después usá <em>"Enviar sin validar en el cliente"</em>: el servidor rechaza los datos con el mismo esquema
          y los errores aparecen marcados como <em>(servidor)</em>.
        </Callout>
        <DemoPanel files={[
          { name: 'demos/RegisterFormDemo.jsx', code: registerFormSrc },
          { name: 'shared/registerSchema.js', code: schemaSrc, language: 'javascript', note: 'Este archivo lo importan TANTO el cliente como el servidor.' },
          { name: 'demos/ControlledFormDemo.jsx', code: controlledFormSrc, note: 'La versión "a mano" para comparar.' },
        ]}>
          <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: { xs: '1fr', md: '1fr 1.6fr' }, alignItems: 'start' }}>
            <Box sx={{ opacity: 0.92 }}><ControlledFormDemo /></Box>
            <RegisterFormDemo />
          </Box>
        </DemoPanel>
      </LibraryCard>
    </Section>
  );
}

// ─────────────────────────── Sección 2 ───────────────────────────
function BackendSection() {
  const steps = [
    { n: '1 · React', t: <>{code('<input type="file">')} → arma un {code('FormData')}</>, c: 'info' },
    { n: '2 · HTTP', t: <>POST {code('multipart/form-data')} con Axios</>, c: 'primary' },
    { n: '3 · Multer', t: <>Parsea, filtra (tipo/tamaño) y guarda en {code('/uploads')}</>, c: 'success' },
    { n: '4 · Tu ruta', t: <>Usa {code('req.file')} y responde la URL</>, c: 'warning' },
  ];

  return (
    <Section id="backend" eyebrow="Sección 2" color="success" title="Backend y subida de archivos"
      description="React vive en el navegador; los archivos se guardan en el servidor. Hay que cruzar ese puente.">
      <LibraryCard libs={[LIBS.multer, LIBS.express]} title={<>Recibir archivos {code('multipart/form-data')} en Express</>}>
        <Typography color="text.secondary">
          {code('express.json()')} entiende JSON, pero <strong>no archivos</strong>. Multer es un <em>middleware</em> que
          lee el cuerpo {code('multipart/form-data')}, guarda el archivo (en disco o en memoria) y te lo deja listo en {code('req.file')}.
        </Typography>

        <Box sx={{ display: 'grid', gap: 1.5, gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' } }}>
          {steps.map((s) => (
            <Box key={s.n} sx={{ border: 1, borderColor: `${s.c}.main`, borderRadius: 3, p: 2, position: 'relative' }}>
              <Typography sx={{ fontWeight: 700, color: `${s.c}.main` }}>{s.n}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{s.t}</Typography>
            </Box>
          ))}
        </Box>

        <Callout severity="warning">
          <strong>⚠️ Errores típicos:</strong> el nombre en {code("formData.append('avatar')")} debe coincidir con{' '}
          {code("upload.single('avatar')")}. Y siempre limitá <strong>tamaño</strong> y <strong>tipo</strong> en el
          servidor: nunca confíes en el cliente. Probá subir un PDF o una imagen de más de 2 MB.
        </Callout>

        <DemoPanel files={[
          { name: 'server/index.js', code: serverSrc, language: 'javascript', note: 'Buscá la sección "3) Subida de archivos": diskStorage, limits, fileFilter y upload.single().' },
          { name: 'demos/AvatarUploadDemo.jsx', code: avatarUploadSrc },
        ]}>
          <AvatarUploadDemo />
        </DemoPanel>
      </LibraryCard>
    </Section>
  );
}

// ─────────────────────────── Sección 3 ───────────────────────────
function UiSection() {
  return (
    <Section id="ui" eyebrow="Sección 3" color="info" title="Interfaz de usuario (UI)"
      description="No reinventes el botón. En proyectos reales, el tiempo vale más que el CSS artesanal. Dato: toda esta página está hecha con MUI.">
      <LibraryCard libs={[LIBS.mui]} title="Componentes preconstruidos, accesibles y personalizables">
        <Concepts items={[
          { icon: '🧩', title: '+50 componentes', text: 'Tablas, diálogos, menús, tabs, snackbars, skeletons… listos para usar.' },
          { icon: '♿', title: 'Accesibles por defecto', text: 'Roles ARIA, manejo de foco y navegación por teclado ya resueltos.' },
          { icon: '🎨', title: 'Theming central', text: 'Colores y tipografía en un solo archivo. Tocá el botón 🌙 de arriba: cambia toda la app.' },
          { icon: '🏢', title: 'Ideal para paneles', text: 'Dashboards, back-offices y apps corporativas en tiempo récord.' },
        ]} />
        <Callout>
          <strong>🤔 ¿MUI o Tailwind?</strong> MUI te da <em>componentes</em> terminados (rápido y consistente).
          Tailwind te da <em>utilidades</em> para diseñar a medida (más libertad, más trabajo). Para un panel de
          administración, MUI suele ganar.
        </Callout>
        <DemoPanel files={[
          { name: 'demos/MuiShowcase.jsx', code: muiShowcaseSrc },
          { name: 'theme.js', code: themeSrc, language: 'javascript', note: 'Cambiá primary.main y mirá cómo cambia toda la página.' },
        ]}>
          <MuiShowcase />
        </DemoPanel>
      </LibraryCard>
    </Section>
  );
}

// ─────────────────────────── Resumen ───────────────────────────
function SummarySection() {
  const rows = [
    [LIBS.axios, 'Hacer peticiones HTTP de forma simple', 'npm i axios'],
    [LIBS.query, 'Caché, carga, errores y sincronización de datos del servidor', 'npm i @tanstack/react-query'],
    [LIBS.rhf, 'Formularios performantes sin re-renders', 'npm i react-hook-form'],
    [LIBS.zod, 'Validación declarativa (cliente y servidor)', 'npm i zod @hookform/resolvers'],
    [LIBS.multer, 'Recibir archivos en Express (backend)', 'npm i multer'],
    [LIBS.mui, 'Componentes de UI listos y accesibles', 'npm i @mui/material @emotion/react @emotion/styled'],
  ];

  return (
    <Section id="resumen" eyebrow="Cierre" color="secondary" title="Resumen rápido: ¿cuál uso para qué?">
      <TableContainer component={Paper} variant="outlined">
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Librería</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Problema que resuelve</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Instalación</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(([lib, problem, install]) => (
              <TableRow key={lib.name}>
                <TableCell><Chip size="small" label={lib.name} sx={{ fontWeight: 700, bgcolor: lib.bg, color: lib.fg }} /></TableCell>
                <TableCell sx={{ color: 'text.secondary' }}>{problem}</TableCell>
                <TableCell sx={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12 }}>{install}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ borderRadius: 4, p: { xs: 3, sm: 4 }, color: 'white', background: 'linear-gradient(90deg, #4f46e5, #c026d3)' }}>
        <Typography variant="h3" sx={{ fontSize: 22 }}>🎯 La regla de oro</Typography>
        <Typography sx={{ mt: 1, opacity: 0.92, maxWidth: 760 }}>
          No se trata de usar <em>muchas</em> librerías, sino de entender <strong>qué problema resuelve cada una</strong>.
          Si podés explicarlo en una frase, estás listo para usarla en un proyecto real.
        </Typography>
      </Box>
    </Section>
  );
}
