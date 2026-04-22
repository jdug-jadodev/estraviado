# RutaCo - Guía de Inicio Rápido
## Cómo empezar a construir la app HOY

Fecha de creación: 17 de abril de 2026

---

## ✅ ORDEN CORRECTO DE IMPLEMENTACIÓN

### FASE 0: Preparación del Entorno (1 día)
### FASE 1: Supabase - Base de Datos (2-3 días)
### FASE 2: Proyecto Expo - Estructura Base (1 día)
### FASE 3: Autenticación (3-4 días)
### FASE 4: Mapa Principal (5-7 días)

---

## FASE 0: PREPARACIÓN DEL ENTORNO

### Paso 0.1: Instalar herramientas en tu PC

```powershell
# Verificar si ya tienes Node.js instalado
node --version
# Si no está instalado, descargar de: https://nodejs.org (versión LTS)

# Verificar Git
git --version
# Si no está instalado, descargar de: https://git-scm.com
```

### Paso 0.2: Instalar editor y extensiones

1. **VS Code:** https://code.visualstudio.com
2. **Extensiones recomendadas:**
   - ES7+ React/Redux/React-Native snippets
   - Prettier - Code formatter
   - ESLint
   - GitLens

### Paso 0.3: Instalar Expo Go en tu celular

- **Android:** Play Store → buscar "Expo Go"
- **iOS:** App Store → buscar "Expo Go"

### Paso 0.4: Crear cuentas gratuitas

Crear TODAS estas cuentas ANTES de empezar a programar:

| Servicio | URL | Para qué |
|----------|-----|----------|
| Supabase | https://supabase.com | Base de datos y autenticación |
| Mapbox | https://mapbox.com | Mapas y navegación |
| Expo | https://expo.dev | Desarrollo y deploy de la app |
| GitHub | https://github.com | Control de versiones |

**IMPORTANTE:** Guarda todas las contraseñas en un lugar seguro.

---

## FASE 1: SUPABASE - BASE DE DATOS

### ⭐ EMPIEZA POR AQUÍ ⭐

### Paso 1.1: Crear proyecto en Supabase

1. Ir a https://supabase.com
2. Click en "Start your project"
3. Crear organización (nombre: "RutaCo" o tu nombre)
4. Crear nuevo proyecto:
   - **Name:** rutaco-prod
   - **Database Password:** Generar contraseña fuerte (GUARDARLA)
   - **Region:** South America (sao-paulo) - más cerca de Colombia
   - Click "Create new project"
5. Esperar 2-3 minutos mientras Supabase crea todo

### Paso 1.2: Guardar credenciales

1. En el proyecto creado, ir a **Settings** → **API**
2. Copiar y guardar en un archivo temporal:
   ```
   Project URL: https://xxxxxxxxxxxxx.supabase.co
   anon public key: eyJhbGc....(cadena muy larga)
   service_role key: eyJhbGc.... (NO COMPARTIR NUNCA)
   ```

### Paso 1.3: Crear las tablas principales

1. Ir a **SQL Editor** en el panel izquierdo
2. Click en "New query"
3. Copiar y pegar este SQL (tablas esenciales del MVP):

```sql
-- ============================================
-- RUTACO - SCHEMA INICIAL MVP
-- Versión: 1.0
-- Fecha: Abril 2026
-- ============================================

-- TABLA: PERFILES DE USUARIO
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  full_name text,
  avatar_url text,
  phone text unique,
  phone_verified boolean default false,
  bio text,
  total_distance_km float default 0,
  total_elevation_m float default 0,
  total_rides int default 0,
  plan text default 'free', -- 'free' | 'premium'
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- TABLA: RUTAS
create table routes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade not null,
  title text not null,
  description text,
  geojson jsonb not null,
  distance_km float not null,
  elevation_gain_m float not null,
  elevation_loss_m float not null,
  elevation_segments jsonb,
  difficulty text, -- 'plano' | 'moderado' | 'dificil' | 'muy_dificil'
  visibility text default 'public', -- 'public' | 'connections' | 'private'
  start_lat float,
  start_lng float,
  end_lat float,
  end_lng float,
  cover_image_url text,
  likes_count int default 0,
  saves_count int default 0,
  is_recorded boolean default false,
  recorded_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- TABLA: ACTIVIDADES (grabaciones en vivo)
create table activities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade not null,
  route_id uuid references routes(id),
  title text,
  geojson jsonb not null,
  distance_km float not null,
  duration_seconds int not null,
  moving_seconds int not null,
  elevation_gain_m float not null,
  elevation_loss_m float not null,
  avg_speed_kmh float,
  max_speed_kmh float,
  started_at timestamptz not null,
  ended_at timestamptz not null,
  created_at timestamptz default now()
);

-- TABLA: PUNTOS DE SERVICIO (talleres, tiendas)
create table service_points (
  id uuid primary key default gen_random_uuid(),
  added_by uuid references profiles(id),
  name text not null,
  service_type text not null, -- 'formal_shop' | 'informal_stand' | 'water' | 'food'
  lat float not null,
  lng float not null,
  address text,
  schedule text,
  phone text,
  is_verified boolean default false,
  is_active boolean default true,
  upvotes int default 0,
  created_at timestamptz default now()
);

-- TABLA: REPORTES DE SEGURIDAD
create table security_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  lat float not null,
  lng float not null,
  report_type text not null, -- 'theft' | 'assault' | 'high_traffic' | 'road_damage'
  description text,
  is_active boolean default true,
  expires_at timestamptz,
  created_at timestamptz default now()
);

-- TABLA: SEGUIDORES
create table follows (
  follower_id uuid references profiles(id) on delete cascade,
  following_id uuid references profiles(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (follower_id, following_id)
);

-- TABLA: LIKES
create table likes (
  user_id uuid references profiles(id) on delete cascade,
  target_id uuid not null,
  target_type text not null, -- 'route' | 'activity'
  created_at timestamptz default now(),
  primary key (user_id, target_id)
);

-- TABLA: COMENTARIOS
create table comments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  target_id uuid not null,
  target_type text not null,
  content text not null,
  created_at timestamptz default now()
);

-- ============================================
-- INDICES PARA OPTIMIZACIÓN
-- ============================================

create index idx_routes_user_id on routes(user_id);
create index idx_routes_visibility on routes(visibility);
create index idx_activities_user_id on activities(user_id);
create index idx_service_points_location on service_points(lat, lng);
create index idx_security_reports_location on security_reports(lat, lng);

-- ============================================
-- TRIGGER: Crear perfil automático al registrarse
-- ============================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'username',
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Activar RLS en todas las tablas
alter table profiles enable row level security;
alter table routes enable row level security;
alter table activities enable row level security;
alter table service_points enable row level security;
alter table security_reports enable row level security;
alter table follows enable row level security;
alter table likes enable row level security;
alter table comments enable row level security;

-- POLÍTICAS: PROFILES
create policy "Perfiles públicos visibles para todos"
  on profiles for select
  using (true);

create policy "Usuarios pueden actualizar su propio perfil"
  on profiles for update
  using (auth.uid() = id);

-- POLÍTICAS: ROUTES
create policy "Ver rutas públicas o propias"
  on routes for select
  using (
    visibility = 'public'
    or user_id = auth.uid()
    or (
      visibility = 'connections'
      and exists (
        select 1 from follows
        where follower_id = auth.uid()
        and following_id = routes.user_id
      )
    )
  );

create policy "Usuarios crean sus propias rutas"
  on routes for insert
  with check (auth.uid() = user_id);

create policy "Usuarios editan sus propias rutas"
  on routes for update
  using (auth.uid() = user_id);

create policy "Usuarios eliminan sus propias rutas"
  on routes for delete
  using (auth.uid() = user_id);

-- POLÍTICAS: ACTIVITIES
create policy "Ver actividades públicas"
  on activities for select
  using (true);

create policy "Usuarios crean sus propias actividades"
  on activities for insert
  with check (auth.uid() = user_id);

create policy "Usuarios editan sus propias actividades"
  on activities for update
  using (auth.uid() = user_id);

-- POLÍTICAS: SERVICE POINTS
create policy "Todos ven puntos de servicio activos"
  on service_points for select
  using (is_active = true);

create policy "Usuarios autenticados agregan servicios"
  on service_points for insert
  with check (auth.uid() = added_by);

-- POLÍTICAS: SECURITY REPORTS
create policy "Todos ven reportes activos"
  on security_reports for select
  using (is_active = true);

create policy "Usuarios autenticados crean reportes"
  on security_reports for insert
  with check (auth.uid() = user_id);

-- POLÍTICAS: FOLLOWS
create policy "Todos ven las conexiones"
  on follows for select
  using (true);

create policy "Usuarios gestionan sus propios follows"
  on follows for insert
  with check (auth.uid() = follower_id);

create policy "Usuarios eliminan sus propios follows"
  on follows for delete
  using (auth.uid() = follower_id);

-- POLÍTICAS: LIKES
create policy "Todos ven los likes"
  on likes for select
  using (true);

create policy "Usuarios gestionan sus propios likes"
  on likes for insert
  with check (auth.uid() = user_id);

create policy "Usuarios eliminan sus propios likes"
  on likes for delete
  using (auth.uid() = user_id);

-- POLÍTICAS: COMMENTS
create policy "Todos ven comentarios"
  on comments for select
  using (true);

create policy "Usuarios crean sus propios comentarios"
  on comments for insert
  with check (auth.uid() = user_id);

create policy "Usuarios editan sus propios comentarios"
  on comments for update
  using (auth.uid() = user_id);

create policy "Usuarios eliminan sus propios comentarios"
  on comments for delete
  using (auth.uid() = user_id);
```

4. Click en **Run** (esquina inferior derecha)
5. Verificar que aparezca "Success. No rows returned"

### Paso 1.4: Verificar que las tablas se crearon

1. Ir a **Database** → **Tables** en el panel izquierdo
2. Deberías ver 8 tablas:
   - profiles
   - routes
   - activities
   - service_points
   - security_reports
   - follows
   - likes
   - comments

### Paso 1.5: Crear datos de prueba (OPCIONAL)

Si quieres tener datos de ejemplo para probar:

```sql
-- Nota: Primero debes crear un usuario en la app,
-- luego obtener su ID y usarlo aquí.
-- Por ahora, saltear este paso y volver después.
```

---

## FASE 2: PROYECTO EXPO - ESTRUCTURA BASE

### Paso 2.1: Crear carpeta del proyecto

```powershell
# Ir a la ubicación donde quieres crear el proyecto
cd C:\Users\Usuario\Documents

# Crear carpeta para el código
mkdir rutaco-app
cd rutaco-app
```

### Paso 2.2: Instalar Expo CLI

```powershell
npm install -g expo-cli eas-cli
```

### Paso 2.3: Crear proyecto Expo

```powershell
# Crear proyecto con TypeScript
npx create-expo-app . --template blank-typescript
```

### Paso 2.4: Crear archivo de variables de entorno

Crear archivo `.env` en la raíz con tus credenciales de Supabase:

```
EXPO_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJI...tu_anon_key_aqui
EXPO_PUBLIC_MAPBOX_TOKEN=pendiente
EXPO_PUBLIC_OPEN_METEO_URL=https://api.open-meteo.com/v1
```

**IMPORTANTE:** Reemplaza con tus valores reales de Supabase.

### Paso 2.5: Crear .gitignore

Crear archivo `.gitignore` en la raíz:

```
node_modules/
.env
.expo/
dist/
npm-debug.*
*.jks
*.p8
*.p12
*.key
*.mobileprovision
*.orig.*
web-build/
.vscode/
```

### Paso 2.6: Instalar dependencias principales

```powershell
# Navegación
npx expo install @react-navigation/native
npx expo install @react-navigation/bottom-tabs
npx expo install @react-navigation/stack
npx expo install react-native-screens
npx expo install react-native-safe-area-context
npx expo install react-native-gesture-handler
npx expo install react-native-reanimated

# Supabase
npx expo install @supabase/supabase-js

# Estado y cache
npx expo install zustand
npx expo install @tanstack/react-query
npx expo install react-native-mmkv

# Funcionalidades Expo
npx expo install expo-location
npx expo install expo-speech
```

**NOTA:** Mapbox lo instalaremos después, requiere configuración adicional.

### Paso 2.7: Crear estructura de carpetas

```powershell
# Crear todas las carpetas necesarias
mkdir src
mkdir src\api
mkdir src\components
mkdir src\components\common
mkdir src\components\map
mkdir src\components\route
mkdir src\components\social
mkdir src\hooks
mkdir src\navigation
mkdir src\screens
mkdir src\screens\auth
mkdir src\screens\map
mkdir src\screens\activity
mkdir src\screens\profile
mkdir src\screens\social
mkdir src\store
mkdir src\types
mkdir src\utils
mkdir src\constants
```

### Paso 2.8: Configurar TypeScript

Editar `tsconfig.json`:

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### Paso 2.9: Probar que funciona

```powershell
npx expo start
```

1. Debe aparecer un código QR en la terminal
2. Abrir Expo Go en tu celular
3. Escanear el código QR
4. Debe aparecer una pantalla blanca con texto "Open up App.tsx to start working"

Si ves eso, ¡FELICITACIONES! El proyecto base está funcionando.

---

## FASE 3: AUTENTICACIÓN

### Paso 3.1: Crear cliente de Supabase

Crear archivo `src/api/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'
import { MMKV } from 'react-native-mmkv'

const storage = new MMKV()

const mmkvStorage = {
  getItem: (key: string): string | null => {
    return storage.getString(key) ?? null
  },
  setItem: (key: string, value: string): void => {
    storage.set(key, value)
  },
  removeItem: (key: string): void => {
    storage.delete(key)
  },
}

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      storage: mmkvStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
)
```

### Paso 3.2: Crear tipos TypeScript

Crear archivo `src/types/database.ts`:

```typescript
export interface Profile {
  id: string
  username: string
  full_name: string | null
  avatar_url: string | null
  phone: string | null
  phone_verified: boolean
  bio: string | null
  total_distance_km: number
  total_elevation_m: number
  total_rides: number
  plan: 'free' | 'premium'
  created_at: string
  updated_at: string
}

export interface Route {
  id: string
  user_id: string
  title: string
  description: string | null
  geojson: any
  distance_km: number
  elevation_gain_m: number
  elevation_loss_m: number
  difficulty: 'plano' | 'moderado' | 'dificil' | 'muy_dificil' | null
  visibility: 'public' | 'connections' | 'private'
  likes_count: number
  saves_count: number
  created_at: string
}
```

### Paso 3.3: Crear store de autenticación

Crear archivo `src/store/authStore.ts`:

```typescript
import { create } from 'zustand'
import { supabase } from '@/api/supabase'
import type { Profile } from '@/types/database'
import type { Session } from '@supabase/supabase-js'

interface AuthStore {
  session: Session | null
  profile: Profile | null
  loading: boolean
  setSession: (session: Session | null) => void
  setProfile: (profile: Profile | null) => void
  signOut: () => Promise<void>
  initialize: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  session: null,
  profile: null,
  loading: true,

  setSession: (session) => set({ session }),
  
  setProfile: (profile) => set({ profile }),

  signOut: async () => {
    await supabase.auth.signOut()
    set({ session: null, profile: null })
  },

  initialize: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      set({ session, loading: false })

      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
        
        set({ profile })
      }
    } catch (error) {
      console.error('Error initializing auth:', error)
      set({ loading: false })
    }
  },
}))
```

### Paso 3.4: Crear funciones de autenticación

Crear archivo `src/api/auth.ts`:

```typescript
import { supabase } from './supabase'

export async function signUp(email: string, password: string, fullName: string, username: string) {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim().toLowerCase(),
    password,
    options: {
      data: {
        full_name: fullName.trim(),
        username: username.trim().toLowerCase(),
      },
    },
  })

  return { data, error }
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  })

  return { data, error }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}
```

### Paso 3.5: Crear constantes de colores

Crear archivo `src/constants/colors.ts`:

```typescript
export const COLORS = {
  primary: '#22c55e',      // verde ciclista
  background: '#000000',   // fondo negro
  surface: '#1a1a1a',      // cartas
  border: '#333333',
  text: '#ffffff',
  textSecondary: '#a3a3a3',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
}
```

Ahora tienes todo listo para crear las pantallas de autenticación.

---

## 🎯 PRÓXIMOS PASOS DESPUÉS DE ESTA GUÍA

Una vez completada esta guía de inicio, seguir con:

1. **Implementar pantallas de autenticación** (documento 05_autenticacion.md)
2. **Configurar Mapbox** y crear el mapa principal (documento 06_mapa_principal.md)
3. **Implementar gráfico de elevación** (documento 07_grafico_de_elevacion.md)
4. **Modo de grabación GPS** (documento 08_modo_grabacion.md)

---

## ✅ CHECKLIST DE VERIFICACIÓN

Marca cada item cuando lo completes:

**Entorno:**
- [ ] Node.js instalado
- [ ] Git instalado
- [ ] VS Code instalado con extensiones
- [ ] Expo Go instalado en celular

**Cuentas:**
- [ ] Cuenta Supabase creada
- [ ] Cuenta Mapbox creada
- [ ] Cuenta Expo creada
- [ ] Cuenta GitHub creada

**Supabase:**
- [ ] Proyecto creado
- [ ] Tablas creadas correctamente
- [ ] Credenciales guardadas

**Proyecto:**
- [ ] Proyecto Expo creado
- [ ] Dependencias instaladas
- [ ] Estructura de carpetas creada
- [ ] App corriendo en el celular
- [ ] Cliente Supabase configurado
- [ ] Store de autenticación creado

---

## 📞 AYUDA Y RECURSOS

- **Documentación Supabase:** https://supabase.com/docs
- **Documentación Expo:** https://docs.expo.dev
- **React Navigation:** https://reactnavigation.org/docs/getting-started
- **Mapbox Maps SDK:** https://docs.mapbox.com

---

**Creado para RutaCo - La app de ciclismo hecha para Colombia**
