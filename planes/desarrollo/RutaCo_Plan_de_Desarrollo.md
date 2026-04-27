# RutaCo - Plan de Desarrollo Tecnico
## Guia completa de implementacion por fases

Version 1.0 - 2026

---

## Indice

1. Prerequisitos y configuracion inicial
2. Arquitectura general
3. Fase 1 - MVP: Base y mapa
4. Fase 2 - Navegacion y social
5. Fase 3 - Rodadas con seguridad
6. Fase 4 - Replay, medallas y premium
7. Fase 5 - Crecimiento y escala
8. Estandares de codigo y buenas practicas
9. Checklist de lanzamiento

---

## 1. Prerequisitos y Configuracion Inicial

### 1.1 Herramientas que debes instalar

```
Node.js v20 o superior         https://nodejs.org
Git                            https://git-scm.com
VS Code                        https://code.visualstudio.com
Expo Go (en tu celular)        App Store o Play Store
```

Extensiones recomendadas para VS Code:
```
ES7+ React/Redux/React-Native snippets
Prettier - Code formatter
ESLint
Tailwind CSS IntelliSense
GitLens
```

### 1.2 Cuentas que debes crear (todas gratis)

```
Supabase        https://supabase.com         Base de datos y autenticacion
Mapbox          https://mapbox.com           Mapas y elevacion
Render          https://render.com           Backend adicional
Expo            https://expo.dev             Deploy de la app
GitHub          https://github.com           Control de versiones
```

### 1.3 Crear el proyecto base

```bash
# Instalar Expo CLI globalmente
npm install -g expo-cli eas-cli

# Crear el proyecto
npx create-expo-app rutaco --template blank-typescript

# Entrar al proyecto
cd rutaco

# Instalar dependencias base desde el inicio
npm install @supabase/supabase-js
npm install @rnmapbox/maps
npm install expo-location
npm install expo-speech
npm install @react-navigation/native
npm install @react-navigation/bottom-tabs
npm install @react-navigation/stack
npm install react-native-screens react-native-safe-area-context
npm install react-native-gesture-handler
npm install react-native-reanimated
npm install zustand
npm install @tanstack/react-query
npm install react-native-mmkv
npm install date-fns
```

### 1.4 Estructura de carpetas desde el inicio

Definir esto bien desde el principio evita deuda tecnica despues:

```
rutaco/
  src/
    api/               Llamadas a Supabase y APIs externas
    components/        Componentes reutilizables
      common/          Botones, inputs, cards genericos
      map/             Componentes del mapa
      route/           Componentes de rutas
      social/          Feed, comentarios, perfiles
    hooks/             Custom hooks
    navigation/        Configuracion de navegacion
    screens/           Pantallas de la app
      auth/
      map/
      route/
      profile/
      social/
      rides/           Rodadas grupales
    store/             Estado global con Zustand
    types/             Tipos TypeScript
    utils/             Funciones de utilidad
    constants/         Colores, tamanos, textos fijos
  assets/
    fonts/
    images/
  supabase/
    migrations/        Migraciones de base de datos
    seed/              Datos iniciales
```

### 1.5 Variables de entorno

Crear archivo `.env` en la raiz (nunca subir a GitHub):

```
EXPO_PUBLIC_SUPABASE_URL=tu_url_de_supabase
EXPO_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
EXPO_PUBLIC_MAPBOX_TOKEN=tu_token_de_mapbox
EXPO_PUBLIC_OPEN_METEO_URL=https://api.open-meteo.com/v1
```

Crear `.env.example` con las mismas claves pero sin valores para el repositorio.

---

## 2. Arquitectura General

### 2.1 Diagrama de capas

```
App (React Native + Expo)
  |
  |-- Navigation (React Navigation)
  |-- State (Zustand + React Query)
  |-- UI (componentes propios)
       |
       |-- Supabase (DB, Auth, Storage, Realtime)
       |-- Mapbox (Mapas, Rutas, Elevacion, Trafico)
       |-- Open-Meteo (Clima)
       |-- Expo Speech (Guia auditiva)
       |-- Expo Location (GPS)
       |-- Wompi (Pagos - fase 4)
```

### 2.2 Manejo de estado

- **Zustand**: estado global de sesion de usuario, configuracion, estado de navegacion activa
- **React Query**: cache y sincronizacion de datos remotos (rutas, feed, rodadas)
- **MMKV**: almacenamiento local rapido para preferencias y cache offline

### 2.3 Base de datos - Esquema completo

Definir todas las tablas desde el inicio aunque no todas se usen en el MVP. Esto evita migraciones dolorosas despues.

```sql
-- USUARIOS
create table profiles (
  id uuid references auth.users primary key,
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
  plan_expires_at timestamptz,
  created_at timestamptz default now()
);

-- RUTAS
create table routes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  title text not null,
  description text,
  geojson jsonb not null,          -- LineString con coordenadas
  distance_km float not null,
  elevation_gain_m float not null,
  elevation_loss_m float not null,
  elevation_segments jsonb,        -- Array de segmentos con pendiente
  has_return boolean default false,
  difficulty text,                 -- 'plano' | 'moderado' | 'dificil' | 'muy_dificil'
  visibility text default 'public', -- 'public' | 'connections' | 'private'
  start_lat float,
  start_lng float,
  end_lat float,
  end_lng float,
  cover_image_url text,
  likes_count int default 0,
  saves_count int default 0,
  is_recorded boolean default false, -- grabado en vivo vs planificado
  recorded_at timestamptz,
  created_at timestamptz default now()
);

-- WAYPOINTS Y PARADAS DE UNA RUTA
create table route_waypoints (
  id uuid primary key default gen_random_uuid(),
  route_id uuid references routes(id) on delete cascade,
  order_index int not null,
  lat float not null,
  lng float not null,
  label text,
  waypoint_type text default 'stop', -- 'stop' | 'water' | 'shop' | 'rest'
  estimated_arrival_minutes int,
  stay_minutes int default 0
);

-- ACTIVIDAD - GRABACIONES EN VIVO
create table activities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
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
  pauses jsonb,                    -- Array de pausas con duracion y ubicacion
  speed_segments jsonb,            -- Velocidad por segmento para el replay
  started_at timestamptz not null,
  ended_at timestamptz not null,
  created_at timestamptz default now()
);

-- RITMO HISTORICO DEL USUARIO (para estimaciones de tiempo)
create table user_pace_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  terrain_type text not null,      -- 'flat' | 'uphill_mild' | 'uphill_steep' | 'downhill'
  avg_speed_kmh float not null,
  sample_count int default 1,
  updated_at timestamptz default now()
);

-- REPORTES DE SEGURIDAD
create table security_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  lat float not null,
  lng float not null,
  report_type text not null,       -- 'theft' | 'assault' | 'high_traffic' | 'road_damage'
  description text,
  is_active boolean default true,
  expires_at timestamptz,          -- se desactiva automaticamente despues de X dias
  created_at timestamptz default now()
);

-- TALLERES Y SERVICIOS
create table service_points (
  id uuid primary key default gen_random_uuid(),
  added_by uuid references profiles(id),
  name text not null,
  service_type text not null,      -- 'formal_shop' | 'informal_stand' | 'water' | 'food'
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

-- SEGUIDORES
create table follows (
  follower_id uuid references profiles(id) on delete cascade,
  following_id uuid references profiles(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (follower_id, following_id)
);

-- LIKES EN RUTAS Y ACTIVIDADES
create table likes (
  user_id uuid references profiles(id) on delete cascade,
  target_id uuid not null,
  target_type text not null,       -- 'route' | 'activity'
  created_at timestamptz default now(),
  primary key (user_id, target_id)
);

-- COMENTARIOS
create table comments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  target_id uuid not null,
  target_type text not null,
  content text not null,
  created_at timestamptz default now()
);

-- RODADAS GRUPALES
create table group_rides (
  id uuid primary key default gen_random_uuid(),
  organizer_id uuid references profiles(id) on delete cascade,
  title text not null,
  description text,
  route_id uuid references routes(id),
  scheduled_at timestamptz not null,
  meeting_zone text not null,      -- zona general, no direccion exacta
  meeting_point_lat float,         -- solo visible para participantes aprobados
  meeting_point_lng float,
  difficulty text,
  max_participants int,
  visibility text default 'community', -- 'private' | 'community'
  min_routes_required int default 0,
  status text default 'open',      -- 'open' | 'full' | 'cancelled' | 'completed'
  created_at timestamptz default now()
);

-- PARTICIPANTES DE RODADAS
create table ride_participants (
  id uuid primary key default gen_random_uuid(),
  ride_id uuid references group_rides(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  status text default 'pending',   -- 'pending' | 'approved' | 'rejected' | 'removed'
  requested_at timestamptz default now(),
  responded_at timestamptz,
  unique(ride_id, user_id)
);

-- RESENAS ENTRE CICLISTAS
create table rider_reviews (
  id uuid primary key default gen_random_uuid(),
  ride_id uuid references group_rides(id) on delete cascade,
  reviewer_id uuid references profiles(id),
  reviewed_id uuid references profiles(id),
  rating int check (rating between 1 and 5),
  comment text,
  created_at timestamptz default now(),
  unique(ride_id, reviewer_id, reviewed_id)
);

-- MEDALLAS
create table medals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  medal_type text not null,
  medal_data jsonb,                -- datos especificos de la medalla
  earned_at timestamptz default now()
);

-- SEGMENTOS DE RUTA (para tabla de lideres)
create table route_segments (
  id uuid primary key default gen_random_uuid(),
  route_id uuid references routes(id) on delete cascade,
  name text not null,
  segment_type text,               -- 'climb' | 'sprint' | 'descent'
  start_index int,
  end_index int,
  distance_km float,
  elevation_gain_m float
);

-- TIEMPOS EN SEGMENTOS
create table segment_times (
  id uuid primary key default gen_random_uuid(),
  segment_id uuid references route_segments(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  activity_id uuid references activities(id) on delete cascade,
  time_seconds int not null,
  recorded_at timestamptz default now()
);

-- SUSCRIPCIONES PREMIUM
create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  plan text not null,
  status text not null,            -- 'active' | 'cancelled' | 'expired'
  started_at timestamptz not null,
  expires_at timestamptz not null,
  payment_reference text,
  created_at timestamptz default now()
);
```

### 2.4 Row Level Security (RLS) en Supabase

Activar RLS en todas las tablas. Reglas basicas:

```sql
-- Ejemplo: un usuario solo puede editar sus propias rutas
alter table routes enable row level security;

create policy "usuarios ven rutas publicas o propias"
on routes for select using (
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

create policy "usuarios crean sus propias rutas"
on routes for insert with check (user_id = auth.uid());

create policy "usuarios editan sus propias rutas"
on routes for update using (user_id = auth.uid());

create policy "usuarios eliminan sus propias rutas"
on routes for delete using (user_id = auth.uid());
```

Aplicar logica similar a todas las tablas sensibles.

---

## 3. Fase 1 - MVP: Base y Mapa

**Duracion estimada:** 6-8 semanas  
**Objetivo:** Una app funcional con mapa, rutas cargadas manualmente, grafico de elevacion y grabacion basica.

### 3.1 Semana 1-2: Navegacion y autenticacion

#### Configurar React Navigation

```typescript
// src/navigation/RootNavigator.tsx
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useAuthStore } from '../store/authStore'

const Stack = createStackNavigator()

export function RootNavigator() {
  const { session } = useAuthStore()

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {session ? (
          <Stack.Screen name="Main" component={MainTabs} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
```

#### Configurar Supabase

```typescript
// src/api/supabase.ts
import { createClient } from '@supabase/supabase-js'
import { MMKV } from 'react-native-mmkv'

const storage = new MMKV()

const supabaseStorage = {
  getItem: (key: string) => storage.getString(key) ?? null,
  setItem: (key: string, value: string) => storage.set(key, value),
  removeItem: (key: string) => storage.delete(key),
}

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      storage: supabaseStorage,
      autoRefreshToken: true,
      persistSession: true,
    },
  }
)
```

#### Pantallas de autenticacion

- `screens/auth/WelcomeScreen.tsx` - pantalla inicial con logo y botones
- `screens/auth/LoginScreen.tsx` - email y password
- `screens/auth/RegisterScreen.tsx` - nombre, email, password
- `screens/auth/VerifyPhoneScreen.tsx` - verificacion OTP por SMS (requerida para rodadas, opcional en MVP)

#### Store de autenticacion con Zustand

```typescript
// src/store/authStore.ts
import { create } from 'zustand'
import { supabase } from '../api/supabase'

interface AuthStore {
  session: any | null
  profile: Profile | null
  setSession: (session: any) => void
  signOut: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
  session: null,
  profile: null,
  setSession: (session) => set({ session }),
  signOut: async () => {
    await supabase.auth.signOut()
    set({ session: null, profile: null })
  },
}))
```

### 3.2 Semana 2-3: Mapa principal

#### Configurar Mapbox

```typescript
// src/components/map/MapView.tsx
import MapboxGL from '@rnmapbox/maps'
import { useEffect } from 'react'

MapboxGL.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_TOKEN!)

export function MapView({ children }: { children?: React.ReactNode }) {
  return (
    <MapboxGL.MapView
      style={{ flex: 1 }}
      styleURL={MapboxGL.StyleURL.Outdoors} // estilo outdoor, ideal para ciclismo
      compassEnabled
      logoEnabled={false}
    >
      <MapboxGL.Camera
        zoomLevel={12}
        centerCoordinate={[-74.0721, 4.7110]} // Bogota
        animationMode="flyTo"
      />
      {children}
    </MapboxGL.MapView>
  )
}
```

Usar `StyleURL.Outdoors` porque muestra curvas de nivel, terreno y rutas de senderismo, ideal para ciclismo de montana.

#### Cargar rutas en el mapa

```typescript
// src/components/map/RouteLayer.tsx
import MapboxGL from '@rnmapbox/maps'

interface Props {
  geojson: GeoJSON.Feature
  color?: string
  width?: number
  onPress?: () => void
}

export function RouteLayer({ geojson, color = '#22c55e', width = 4, onPress }: Props) {
  return (
    <MapboxGL.ShapeSource
      id={`route-${geojson.id}`}
      shape={geojson}
      onPress={onPress}
    >
      <MapboxGL.LineLayer
        id={`route-line-${geojson.id}`}
        style={{
          lineColor: color,
          lineWidth: width,
          lineCap: 'round',
          lineJoin: 'round',
        }}
      />
    </MapboxGL.ShapeSource>
  )
}
```

#### Filtros del mapa

Panel inferior con filtros: dificultad, distancia maxima, solo rutas grabadas, solo rutas planificadas. Implementar como bottom sheet usando `@gorhom/bottom-sheet`.

### 3.3 Semana 3-4: Grafico de elevacion

#### Calcular segmentos de elevacion

```typescript
// src/utils/elevation.ts

interface ElevationSegment {
  startKm: number
  endKm: number
  startElevation: number
  endElevation: number
  gradientPercent: number
  type: 'flat' | 'mild' | 'moderate' | 'steep' | 'very_steep'
  description: string
}

export function calculateElevationSegments(
  coordinates: [number, number, number][] // [lng, lat, elevation]
): ElevationSegment[] {
  const SEGMENT_DISTANCE_KM = 0.1 // segmentos de 100 metros
  const segments: ElevationSegment[] = []

  let currentDistance = 0
  let segmentStart = 0
  let segmentStartElevation = coordinates[0][2]
  let segmentStartDistance = 0

  for (let i = 1; i < coordinates.length; i++) {
    const dist = haversineDistance(
      coordinates[i - 1][1], coordinates[i - 1][0],
      coordinates[i][1], coordinates[i][0]
    )
    currentDistance += dist

    if (currentDistance - segmentStartDistance >= SEGMENT_DISTANCE_KM || i === coordinates.length - 1) {
      const elevationDiff = coordinates[i][2] - segmentStartElevation
      const distanceDiff = currentDistance - segmentStartDistance
      const gradient = distanceDiff > 0 ? (elevationDiff / (distanceDiff * 1000)) * 100 : 0

      segments.push({
        startKm: segmentStartDistance,
        endKm: currentDistance,
        startElevation: segmentStartElevation,
        endElevation: coordinates[i][2],
        gradientPercent: Math.round(gradient * 10) / 10,
        type: classifyGradient(gradient),
        description: describeSegment(segmentStartDistance, currentDistance, gradient),
      })

      segmentStartDistance = currentDistance
      segmentStartElevation = coordinates[i][2]
    }
  }

  return segments
}

function classifyGradient(gradient: number): ElevationSegment['type'] {
  const abs = Math.abs(gradient)
  if (abs <= 2) return 'flat'
  if (abs <= 5) return 'mild'
  if (abs <= 8) return 'moderate'
  if (abs <= 12) return 'steep'
  return 'very_steep'
}

function describeSegment(startKm: number, endKm: number, gradient: number): string {
  const distance = ((endKm - startKm) * 1000).toFixed(0)
  const abs = Math.abs(gradient)
  const direction = gradient > 0 ? 'subida' : gradient < 0 ? 'bajada' : 'plano'

  if (abs <= 2) return `${distance}m plano`
  if (gradient > 0) return `${distance}m de subida al ${abs}%`
  return `${distance}m de bajada al ${abs}%`
}

// Color del segmento para el grafico
export const GRADIENT_COLORS = {
  flat: '#22c55e',
  mild: '#eab308',
  moderate: '#f97316',
  steep: '#ef4444',
  very_steep: '#a855f7',
}
```

#### Componente del grafico

```typescript
// src/components/route/ElevationChart.tsx
// Usar Victory Native XL para graficos de alto rendimiento en React Native
// npm install victory-native-xl react-native-skia

import { CartesianChart, Area, useChartPressState } from 'victory-native-xl'
import { useFont } from '@shopify/react-native-skia'

interface Props {
  segments: ElevationSegment[]
  onSegmentPress?: (segmentIndex: number) => void
  waypoints?: RouteWaypoint[]
}

export function ElevationChart({ segments, onSegmentPress, waypoints }: Props) {
  // Construir datos para el grafico con colores por gradiente
  const data = segments.map((seg, index) => ({
    x: seg.startKm,
    y: seg.startElevation,
    color: GRADIENT_COLORS[seg.type],
    index,
  }))

  return (
    <CartesianChart
      data={data}
      xKey="x"
      yKeys={["y"]}
      domainPadding={{ top: 20 }}
      onPress={(value) => onSegmentPress?.(value?.index)}
    >
      {({ points, chartBounds }) => (
        <Area
          points={points.y}
          y0={chartBounds.bottom}
          color="#22c55e"
          opacity={0.8}
        />
      )}
    </CartesianChart>
  )
}
```

### 3.4 Semana 4-5: Modo grabacion basico

```typescript
// src/hooks/useActivityRecording.ts
import * as Location from 'expo-location'
import { useState, useRef, useCallback } from 'react'

export function useActivityRecording() {
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [coordinates, setCoordinates] = useState<Coordinate[]>([])
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [distance, setDistance] = useState(0)

  const watcherRef = useRef<Location.LocationSubscription | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const lastCoordRef = useRef<Coordinate | null>(null)

  const startRecording = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') return

    // Solicitar permiso de background para que siga grabando con pantalla apagada
    await Location.requestBackgroundPermissionsAsync()

    setIsRecording(true)
    setIsPaused(false)

    watcherRef.current = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 3000,       // cada 3 segundos
        distanceInterval: 5,      // o cada 5 metros
      },
      (location) => {
        if (isPaused) return

        const newCoord: Coordinate = {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
          elevation: location.coords.altitude ?? 0,
          speed: (location.coords.speed ?? 0) * 3.6, // m/s a km/h
          timestamp: location.timestamp,
        }

        setCoordinates((prev) => {
          if (lastCoordRef.current) {
            const dist = haversineDistance(
              lastCoordRef.current.lat, lastCoordRef.current.lng,
              newCoord.lat, newCoord.lng
            )
            setDistance((d) => d + dist)
          }
          lastCoordRef.current = newCoord
          return [...prev, newCoord]
        })
      }
    )

    timerRef.current = setInterval(() => {
      setElapsedSeconds((s) => s + 1)
    }, 1000)
  }, [isPaused])

  const stopRecording = useCallback(async () => {
    watcherRef.current?.remove()
    if (timerRef.current) clearInterval(timerRef.current)
    setIsRecording(false)
    // retorna los datos para guardar
    return { coordinates, elapsedSeconds, distance }
  }, [coordinates, elapsedSeconds, distance])

  return { isRecording, isPaused, coordinates, elapsedSeconds, distance, startRecording, stopRecording }
}
```

### 3.5 Semana 5-6: Directorio de servicios y pulido

- Pantalla de mapa de servicios con pins diferenciados por tipo
- Formulario para agregar un nuevo punto de servicio
- Detalle de punto de servicio con horario, telefono y votos
- Pulido general de UI, navegacion y transiciones

### 3.6 Checklist Fase 1

```
[ ] Registro e inicio de sesion funcionando
[ ] Mapa de Bogota cargando correctamente
[ ] Al menos 20 rutas cargadas manualmente en la DB
[ ] Grafico de elevacion interactivo funcionando
[ ] Modo grabacion guarda la ruta al terminar
[ ] Directorio de talleres visible en el mapa
[ ] App corre en iOS y Android sin errores criticos
[ ] RLS activado en todas las tablas
```

---

## 4. Fase 2 - Navegacion y Social

**Duracion estimada:** 4-6 semanas  
**Objetivo:** Guia auditiva, clima, feed social y subida de rutas por usuarios.

### 4.1 Guia auditiva

```typescript
// src/hooks/useVoiceGuide.ts
import * as Speech from 'expo-speech'
import { useCallback } from 'react'

export function useVoiceGuide() {
  const speak = useCallback((text: string, priority: 'high' | 'normal' = 'normal') => {
    // Cancelar lo que se este diciendo si la prioridad es alta
    if (priority === 'high') Speech.stop()

    Speech.speak(text, {
      language: 'es-CO',
      rate: 0.95,
      onDone: () => {},
    })
  }, [])

  const announceUpcomingGradient = useCallback((segment: ElevationSegment, distanceAheadM: number) => {
    if (segment.type === 'flat') return

    const distText = distanceAheadM >= 1000
      ? `${(distanceAheadM / 1000).toFixed(1)} kilometros`
      : `${distanceAheadM} metros`

    const gradientText = segment.gradientPercent > 0
      ? `subida del ${Math.abs(segment.gradientPercent)} por ciento`
      : `bajada del ${Math.abs(segment.gradientPercent)} por ciento`

    const durationText = `por ${((segment.endKm - segment.startKm) * 1000).toFixed(0)} metros`

    speak(`En ${distText}, ${gradientText} ${durationText}`)
  }, [speak])

  const announceDistanceRemaining = useCallback((distanceKm: number) => {
    if (distanceKm < 0.2) {
      speak('Llegando al destino', 'high')
    } else if (distanceKm < 1) {
      speak(`${(distanceKm * 1000).toFixed(0)} metros para llegar`)
    } else {
      speak(`${distanceKm.toFixed(1)} kilometros para llegar`)
    }
  }, [speak])

  const announceSecurityAlert = useCallback((reportType: string) => {
    const messages: Record<string, string> = {
      theft: 'Atencion. Zona con reportes de hurto adelante. Mantente alerta.',
      assault: 'Precaucion. Zona con reportes de inseguridad. Considera desviar la ruta.',
      high_traffic: 'Alto flujo vehicular en la proxima via. Circula con cuidado.',
    }
    speak(messages[reportType] ?? 'Zona de precaucion adelante.', 'high')
  }, [speak])

  return { speak, announceUpcomingGradient, announceDistanceRemaining, announceSecurityAlert }
}
```

#### Logica de activacion durante navegacion

Durante la navegacion activa, en cada actualizacion de GPS:
1. Verificar si hay un segmento pronunciado a menos de 300 metros, anunciarlo si no se anuncio ya
2. Cada 2 km anunciar distancia restante
3. Verificar si hay reportes de seguridad a menos de 500 metros, alertar

### 4.2 Clima con Open-Meteo

```typescript
// src/api/weather.ts
interface WeatherData {
  temperature: number
  precipitation_probability: number
  wind_speed: number
  description: string
}

export async function getWeatherForRoute(
  lat: number,
  lng: number
): Promise<WeatherData> {
  const url = `${process.env.EXPO_PUBLIC_OPEN_METEO_URL}/forecast?` +
    `latitude=${lat}&longitude=${lng}` +
    `&current=temperature_2m,precipitation_probability,wind_speed_10m,weather_code` +
    `&hourly=precipitation_probability` +
    `&timezone=America/Bogota` +
    `&forecast_days=1`

  const res = await fetch(url)
  const data = await res.json()

  return {
    temperature: data.current.temperature_2m,
    precipitation_probability: data.current.precipitation_probability,
    wind_speed: data.current.wind_speed_10m,
    description: interpretWeatherCode(data.current.weather_code),
  }
}

function interpretWeatherCode(code: number): string {
  if (code === 0) return 'Despejado'
  if (code <= 3) return 'Parcialmente nublado'
  if (code <= 67) return 'Lluvia'
  if (code <= 77) return 'Nieve'
  if (code <= 99) return 'Tormenta'
  return 'Variable'
}
```

### 4.3 Planificador de rutas

#### Snap-to-road con Mapbox

```typescript
// src/api/mapbox.ts
const MAPBOX_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_TOKEN

export async function snapToRoad(
  coordinates: [number, number][]
): Promise<[number, number][]> {
  const coordStr = coordinates.map(c => c.join(',')).join(';')
  const url = `https://api.mapbox.com/matching/v5/mapbox/cycling/${coordStr}` +
    `?access_token=${MAPBOX_TOKEN}` +
    `&geometries=geojson` +
    `&radiuses=${coordinates.map(() => 25).join(';')}` +
    `&steps=false`

  const res = await fetch(url)
  const data = await res.json()

  if (data.matchings?.[0]?.geometry?.coordinates) {
    return data.matchings[0].geometry.coordinates
  }
  return coordinates
}

export async function getRouteBetweenPoints(
  waypoints: [number, number][]
): Promise<{ coordinates: [number, number][], distance: number, duration: number }> {
  const coordStr = waypoints.map(c => c.join(',')).join(';')
  const url = `https://api.mapbox.com/directions/v5/mapbox/cycling/${coordStr}` +
    `?access_token=${MAPBOX_TOKEN}` +
    `&geometries=geojson` +
    `&overview=full`

  const res = await fetch(url)
  const data = await res.json()

  const route = data.routes?.[0]
  return {
    coordinates: route?.geometry?.coordinates ?? [],
    distance: (route?.distance ?? 0) / 1000,
    duration: route?.duration ?? 0,
  }
}
```

### 4.4 Feed social

```typescript
// src/api/feed.ts
export async function getFeed(userId: string, page = 0) {
  const limit = 20
  const offset = page * limit

  // Obtener actividades de usuarios que sigo + propias
  const { data } = await supabase
    .from('activities')
    .select(`
      *,
      profiles (id, username, avatar_url),
      likes (user_id)
    `)
    .or(`user_id.eq.${userId},user_id.in.(
      select following_id from follows where follower_id = '${userId}'
    )`)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  return data
}
```

### 4.5 Checklist Fase 2

```
[ ] Guia auditiva funcionando en espanol colombiano
[ ] Alertas de gradiente se activan a 300m
[ ] Alertas de seguridad se activan a 500m
[ ] Clima muestra temperatura y probabilidad de lluvia
[ ] Planificador con dedo libre hace snap-to-road
[ ] Planificador con waypoints calcula ruta ciclista
[ ] Feed muestra actividades de conexiones
[ ] Likes y comentarios funcionando
[ ] Usuarios pueden subir sus propias rutas
[ ] Sistema de seguidores funcionando
```

---

## 5. Fase 3 - Rodadas con Seguridad

**Duracion estimada:** 4-5 semanas  
**Objetivo:** Sistema completo de rodadas grupales con todos los controles de seguridad.

### 5.1 Verificacion de telefono

```typescript
// src/api/auth.ts
export async function sendPhoneOTP(phone: string) {
  // Formato colombiano: +57XXXXXXXXXX
  const formatted = phone.startsWith('+57') ? phone : `+57${phone}`

  const { error } = await supabase.auth.signInWithOtp({
    phone: formatted,
  })
  return { error }
}

export async function verifyPhoneOTP(phone: string, token: string) {
  const formatted = phone.startsWith('+57') ? phone : `+57${phone}`

  const { error } = await supabase.auth.verifyOtp({
    phone: formatted,
    token,
    type: 'sms',
  })

  if (!error) {
    // Marcar telefono como verificado en el perfil
    await supabase
      .from('profiles')
      .update({ phone: formatted, phone_verified: true })
      .eq('id', (await supabase.auth.getUser()).data.user?.id)
  }

  return { error }
}
```

### 5.2 Creacion y gestion de rodadas

Pantallas necesarias:

- `screens/rides/CreateRideScreen.tsx` - formulario de creacion
- `screens/rides/RideDetailScreen.tsx` - detalle con mapa y participantes
- `screens/rides/RideRequestsScreen.tsx` - lista de solicitudes para el organizador
- `screens/rides/MyRidesScreen.tsx` - rodadas creadas y en las que participa

Logica clave en creacion:
- El campo `meeting_point_lat/lng` se guarda en DB pero no se muestra en la UI publica
- Solo se muestra `meeting_zone` (ej: "Norte de Bogota, cerca de la Calle 127") hasta aprobacion
- Al aprobar un participante, se le envia notificacion push con la ubicacion exacta

### 5.3 Notificaciones push

```typescript
// src/api/notifications.ts
import * as Notifications from 'expo-notifications'

export async function registerPushToken(userId: string) {
  const { status } = await Notifications.requestPermissionsAsync()
  if (status !== 'granted') return

  const token = (await Notifications.getExpoPushTokenAsync()).data

  await supabase
    .from('profiles')
    .update({ push_token: token })
    .eq('id', userId)
}

// En el backend (Render) cuando el organizador aprueba a alguien:
export async function sendRideApprovalNotification(
  participantPushToken: string,
  rideName: string,
  meetingAddress: string
) {
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: participantPushToken,
      title: 'Fuiste aprobado en una rodada',
      body: `${rideName} - Punto de encuentro: ${meetingAddress}`,
      data: { type: 'ride_approved' },
    }),
  })
}
```

### 5.4 Sistema de resenas

Despues de que una rodada pasa su fecha programada, activar automaticamente la opcion de resenar a los otros participantes. Usar Supabase Edge Functions o un cron job en Render para esto.

### 5.5 Checklist Fase 3

```
[ ] Verificacion de telefono colombiano funcionando
[ ] Creacion de rodadas con zona general visible y punto exacto oculto
[ ] Organizador puede aprobar o rechazar solicitudes
[ ] Participante aprobado recibe notificacion con punto exacto
[ ] Resenas mutuas se habilitan 2 horas despues de la rodada
[ ] Rating promedio visible en el perfil publico
[ ] Usuarios con rating bajo no pueden unirse a rodadas con requisito minimo
[ ] Terminos y condiciones aceptados antes de crear la primera rodada
```

---

## 6. Fase 4 - Replay, Medallas y Premium

**Duracion estimada:** 3-4 semanas  
**Objetivo:** Replay animado, sistema de medallas y monetizacion con plan premium.

### 6.1 Replay animado del recorrido

```typescript
// src/components/activity/ActivityReplay.tsx
import MapboxGL from '@rnmapbox/maps'
import { useEffect, useRef, useState } from 'react'
import Animated, { useSharedValue, withTiming, runOnJS } from 'react-native-reanimated'

interface Props {
  activity: Activity
  onFinish?: () => void
}

export function ActivityReplay({ activity, onFinish }: Props) {
  const [displayedCoords, setDisplayedCoords] = useState<[number, number][]>([])
  const frameRef = useRef(0)
  const allCoords = activity.geojson.geometry.coordinates as [number, number][]

  useEffect(() => {
    const totalFrames = allCoords.length
    const durationMs = Math.min(totalFrames * 50, 15000) // maximo 15 segundos
    const framesPerMs = totalFrames / durationMs

    let startTime: number
    let animFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const frameIndex = Math.min(
        Math.floor(elapsed * framesPerMs),
        totalFrames - 1
      )

      setDisplayedCoords(allCoords.slice(0, frameIndex + 1))

      if (frameIndex < totalFrames - 1) {
        animFrame = requestAnimationFrame(animate)
      } else {
        onFinish?.()
      }
    }

    animFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animFrame)
  }, [])

  const geojson: GeoJSON.Feature = {
    type: 'Feature',
    geometry: { type: 'LineString', coordinates: displayedCoords },
    properties: {},
  }

  return (
    <MapboxGL.MapView style={{ flex: 1 }} styleURL={MapboxGL.StyleURL.Outdoors}>
      <MapboxGL.Camera
        bounds={{
          ne: getBounds(allCoords).ne,
          sw: getBounds(allCoords).sw,
          paddingTop: 40,
          paddingBottom: 40,
          paddingLeft: 20,
          paddingRight: 20,
        }}
        animationMode="flyTo"
      />
      <RouteLayer geojson={geojson} color="#22c55e" width={5} />
      {/* Marcador animado en la posicion actual */}
      {displayedCoords.length > 0 && (
        <MapboxGL.PointAnnotation
          id="current-position"
          coordinate={displayedCoords[displayedCoords.length - 1]}
        >
          <View style={styles.riderDot} />
        </MapboxGL.PointAnnotation>
      )}
    </MapboxGL.MapView>
  )
}
```

Para exportar como video usar `react-native-view-shot` para capturar frames y `ffmpeg-kit-react-native` para ensamblar el video.

### 6.2 Sistema de medallas

```typescript
// src/utils/medals.ts

interface MedalDefinition {
  type: string
  title: string
  description: string
  check: (stats: UserStats, activity?: Activity) => boolean
}

export const MEDAL_DEFINITIONS: MedalDefinition[] = [
  {
    type: 'first_ride',
    title: 'Primera pedalada',
    description: 'Completaste tu primera ruta en RutaCo',
    check: (stats) => stats.total_rides === 1,
  },
  {
    type: 'climber_100',
    title: 'Escalador',
    description: 'Acumulaste 100 metros de desnivel en una sola ruta',
    check: (_, activity) => (activity?.elevation_gain_m ?? 0) >= 100,
  },
  {
    type: 'century',
    title: 'Centurion',
    description: 'Completaste una ruta de 100 km o mas',
    check: (_, activity) => (activity?.distance_km ?? 0) >= 100,
  },
  {
    type: 'streak_7',
    title: 'Semana perfecta',
    description: '7 dias consecutivos rodando',
    check: (stats) => stats.current_streak_days >= 7,
  },
  {
    type: 'first_group_ride',
    title: 'Ciclista social',
    description: 'Participaste en tu primera rodada grupal',
    check: (stats) => stats.total_group_rides >= 1,
  },
]

export async function checkAndAwardMedals(
  userId: string,
  activity: Activity,
  userStats: UserStats
) {
  for (const medal of MEDAL_DEFINITIONS) {
    if (!medal.check(userStats, activity)) continue

    // Verificar que no tenga ya esa medalla
    const { data: existing } = await supabase
      .from('medals')
      .select('id')
      .eq('user_id', userId)
      .eq('medal_type', medal.type)
      .single()

    if (!existing) {
      await supabase.from('medals').insert({
        user_id: userId,
        medal_type: medal.type,
        medal_data: { activity_id: activity.id },
      })
      // Notificar al usuario
      await notifyMedalEarned(userId, medal.title)
    }
  }
}
```

### 6.3 Suscripcion premium con Wompi

Wompi es el gateway de pagos colombiano mas confiable. Flujo de pago:

1. Usuario toca "Ir a Premium"
2. Backend en Render crea un link de pago en Wompi con la referencia del usuario
3. Se abre el browser de Wompi
4. Al completar, Wompi hace webhook a tu backend
5. Backend actualiza el campo `plan` en Supabase
6. App detecta el cambio y desbloquea funciones premium

```typescript
// En Render - src/routes/payments.ts (Express o Hono)
app.post('/create-payment', async (req, res) => {
  const { userId, plan } = req.body

  const response = await fetch('https://production.wompi.co/v1/payment_links', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.WOMPI_PRIVATE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: plan === 'monthly' ? 'RutaCo Premium Mensual' : 'RutaCo Premium Anual',
      description: 'Acceso premium sin anuncios y funciones avanzadas',
      single_use: true,
      collect_shipping: false,
      amount_in_cents: plan === 'monthly' ? 890000 : 7990000, // COP en centavos
      currency: 'COP',
      redirect_url: 'rutaco://payment-success',
      reference: `premium_${userId}_${Date.now()}`,
    }),
  })

  const data = await response.json()
  res.json({ url: data.data.url })
})

// Webhook de Wompi cuando el pago se completa
app.post('/webhooks/wompi', async (req, res) => {
  const { data } = req.body
  if (data.transaction.status !== 'APPROVED') return res.sendStatus(200)

  const reference = data.transaction.reference
  const userId = reference.split('_')[1]
  const isPremiumMonthly = reference.includes('monthly')

  const expiresAt = new Date()
  expiresAt.setMonth(expiresAt.getMonth() + (isPremiumMonthly ? 1 : 12))

  await supabase
    .from('profiles')
    .update({ plan: 'premium', plan_expires_at: expiresAt.toISOString() })
    .eq('id', userId)

  res.sendStatus(200)
})
```

### 6.4 Checklist Fase 4

```
[ ] Replay animado funciona en iOS y Android
[ ] Exportacion de replay como video o gif
[ ] Medallas se asignan automaticamente al completar actividades
[ ] Medallas visibles en el perfil publico
[ ] Tabla de lideres por segmento y por categoria
[ ] Pago con Wompi funciona end-to-end
[ ] Plan premium elimina anuncios
[ ] Plan premium desbloquea rutas ilimitadas y analisis avanzado
[ ] Plan premium desbloquea descarga offline
[ ] Verificacion de plan al abrir la app
```

---

## 7. Fase 5 - Crecimiento y Escala

**Duracion estimada:** Continuo  
**Objetivo:** Expansion, optimizacion y alianzas.

### 7.1 Optimizaciones de rendimiento antes de escalar

- **Paginacion** en feed, rutas y comentarios (ya contemplada con offset/limit)
- **Indices en Supabase** para consultas frecuentes:

```sql
create index on routes (user_id, created_at desc);
create index on activities (user_id, created_at desc);
create index on security_reports (lat, lng) where is_active = true;
create index on service_points (lat, lng) where is_active = true;
create index on follows (follower_id);
create index on follows (following_id);
```

- **Compresion de geojson**: las rutas largas pueden pesar mucho. Usar el algoritmo Ramer-Douglas-Peucker para simplificar coordenadas antes de guardar
- **Cache de tiles de mapa offline** con Mapbox para zonas frecuentes

### 7.2 Monitoreo en produccion

```
Sentry (gratis hasta 5k errores/mes)    Errores en tiempo real
Supabase Dashboard                       Metricas de DB y uso
Render Metrics                           CPU y memoria del backend
Expo Updates                             Despliegue de actualizaciones OTA
```

### 7.3 Actualizaciones OTA con Expo

Con Expo Updates puedes enviar correcciones de bugs y mejoras de UI sin pasar por la revision de las tiendas. Solo los cambios en codigo nativo requieren nuevo build.

```bash
# Publicar actualizacion OTA
eas update --branch production --message "Fix grafico de elevacion"
```

### 7.4 Expansion a nuevas ciudades

Estrategia: no lanzar en toda Colombia de golpe. Proceso por ciudad:

1. Recolectar 20-30 rutas de esa ciudad antes de lanzar
2. Encontrar 3-5 ciclistas locales como embajadores
3. Publicar en grupos de ciclismo de esa ciudad
4. Monitorear engagement las primeras 2 semanas

Ciudades en orden recomendado: Bogota, Medellin, Cali, Bucaramanga, Manizales.

### 7.5 Checklist Fase 5

```
[ ] Indices de DB aplicados
[ ] Sentry configurado y monitoreando
[ ] Expo Updates configurado para OTA
[ ] Performance en dispositivos gama media verificada
[ ] Carga de mapa en menos de 2 segundos con conexion normal
[ ] Al menos 1000 usuarios activos en Bogota antes de expandir
```

---

## 8. Estandares de Codigo y Buenas Practicas

### 8.1 TypeScript estricto

Configurar `tsconfig.json` con:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

Nunca usar `any`. Si no se sabe el tipo, usar `unknown` y hacer validacion.

### 8.2 Manejo de errores

Nunca mostrar errores tecnicos al usuario. Siempre mensajes humanos:

```typescript
// Mal
catch (error) {
  Alert.alert(error.message)
}

// Bien
catch (error) {
  console.error('Error guardando ruta:', error) // para el desarrollador
  Alert.alert('No pudimos guardar tu ruta', 'Revisa tu conexion e intentalo de nuevo')
}
```

### 8.3 Commits y ramas

```
main          Solo codigo listo para produccion
develop       Integracion de features en desarrollo
feature/xxx   Una rama por funcionalidad
fix/xxx       Correcciones de bugs
```

Mensajes de commit en formato convencional:

```
feat: agregar guia auditiva durante navegacion
fix: corregir calculo de desnivel en rutas con retorno
chore: actualizar dependencias de mapbox
```

### 8.4 Pruebas minimas recomendadas

- Funciones de calculo de elevacion: probar con rutas reales conocidas
- Logica de seguridad de rodadas: probar que el punto exacto no se filtra en respuestas publicas
- Flujo de pago: probar con el ambiente sandbox de Wompi antes de produccion

---

## 9. Checklist de Lanzamiento

Antes de publicar en App Store y Play Store:

```
Tecnico:
[ ] App corre sin crashes en iOS 16+ y Android 10+
[ ] Todos los errores reportados en Sentry resueltos
[ ] RLS verificado en todas las tablas de Supabase
[ ] Variables de entorno de produccion configuradas
[ ] Backup automatico de Supabase activado
[ ] Dominio propio configurado (rutaco.co)

Legal:
[ ] Terminos y condiciones redactados y visibles en la app
[ ] Politica de privacidad redactada (obligatoria para App Store y Play Store)
[ ] Politica de privacidad menciona explicitamente el manejo de datos de ubicacion
[ ] Revision con abogado colombiano de responsabilidad en rodadas

Tiendas:
[ ] Iconos en todos los tamanos requeridos
[ ] Screenshots en espanol para App Store y Play Store
[ ] Descripcion de la app en espanol
[ ] Configuracion de permisos explicada claramente (ubicacion, microfono para voz)
[ ] Build firmado con certificados de produccion via EAS

Lanzamiento:
[ ] 20-30 rutas de Bogota cargadas y verificadas
[ ] Al menos 5 ciclistas beta testers han probado la app
[ ] Post de lanzamiento listo para grupos de Facebook y WhatsApp
[ ] Cuenta de Instagram de RutaCo creada
```

---

RutaCo - Plan de Desarrollo Tecnico
Version 1.0 - 2026
