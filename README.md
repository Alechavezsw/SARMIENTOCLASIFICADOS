# Sarmiento Clasificados

Aplicación web de clasificados para Sarmiento, San Juan, Argentina. Construida con React, TypeScript, Vite y Supabase.

## Características

- 🏠 Sistema de categorías completo
- 📝 Publicación de anuncios
- 🔍 Búsqueda por categorías
- 📸 Subida de imágenes
- 🔐 Autenticación de usuarios
- 💾 Base de datos en Supabase

## Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anon-key
VITE_WEATHER_API_KEY=tu-api-key-de-openweathermap
```

### API Key de OpenWeatherMap (Opcional)

Para obtener datos de clima en tiempo real:

1. Ve a [OpenWeatherMap](https://openweathermap.org/api)
2. Crea una cuenta gratuita
3. Obtén tu API Key
4. Agrega `VITE_WEATHER_API_KEY` a tus variables de entorno

**Nota**: Sin la API key, la aplicación mostrará datos de ejemplo del clima.

### Configuración de Supabase Storage

Para que las imágenes funcionen correctamente, necesitas crear un bucket en Supabase Storage:

1. Ve a tu proyecto en Supabase Dashboard
2. Navega a Storage
3. Crea un nuevo bucket llamado `ads-images`
4. Configura las políticas:
   - **Política de lectura**: Pública (para que todos puedan ver las imágenes)
   - **Política de escritura**: Solo usuarios autenticados pueden subir

O ejecuta este SQL en el SQL Editor de Supabase:

```sql
-- Crear bucket para imágenes de anuncios
INSERT INTO storage.buckets (id, name, public)
VALUES ('ads-images', 'ads-images', true);

-- Política para lectura pública
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'ads-images');

-- Política para escritura (solo autenticados)
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'ads-images' AND auth.role() = 'authenticated');
```

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Construcción

```bash
npm run build
```

## Despliegue en Vercel

### Opción 1: Desde el Dashboard de Vercel (Recomendado)

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Haz clic en "Add New Project"
3. Importa tu repositorio de GitHub: `Alechavezsw/SARMIENTOCLASIFICADOS`
4. Vercel detectará automáticamente que es un proyecto Vite
5. **Configura las variables de entorno**:
   - `VITE_SUPABASE_URL`: Tu URL de Supabase
   - `VITE_SUPABASE_ANON_KEY`: Tu clave anónima de Supabase
6. Haz clic en "Deploy"

### Opción 2: Desde la CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel

# Para producción
vercel --prod
```

### Variables de Entorno en Vercel

Asegúrate de configurar estas variables en el dashboard de Vercel:

- `VITE_SUPABASE_URL`: https://zefnmyqcebaykvfnlmag.supabase.co
- `VITE_SUPABASE_ANON_KEY`: Tu clave anónima de Supabase

**Nota**: Las variables que empiezan con `VITE_` son expuestas al cliente, así que solo usa la clave anónima (anon key), nunca la service role key.

## Estructura de Base de Datos

### Tabla `categories`
- id (UUID)
- name (TEXT)
- slug (TEXT, único)
- color (TEXT)
- icon (TEXT, nullable)
- created_at, updated_at

### Tabla `ads`
- id (UUID)
- title (TEXT)
- price (DECIMAL)
- currency (TEXT: 'ARS' | 'USD')
- description (TEXT)
- category_id (UUID, FK a categories)
- image_url (TEXT, nullable)
- location (TEXT)
- seller_name, seller_email, seller_phone (TEXT, nullable)
- user_id (UUID, FK a auth.users, nullable)
- status (TEXT: 'pending' | 'approved' | 'rejected' | 'sold')
- views (INTEGER)
- created_at, updated_at

## Tecnologías

- React 19
- TypeScript
- Vite
- Supabase
- Tailwind CSS
- Lucide React Icons

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
