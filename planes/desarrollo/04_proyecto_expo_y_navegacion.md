# 04 - Proyecto Expo y Navegacion
## Fase 1 - MVP Base

**Proposito de este documento:**
Crear el proyecto base de RutaCo con Expo, configurar TypeScript, instalar todas
las dependencias necesarias y montar la estructura de navegacion. Al terminar
este documento tendras la app corriendo en tu celular con la navegacion principal
funcionando, aunque las pantallas esten vacias.

**Por que empezamos por aqui:**
La navegacion es el esqueleto de la app. Todo lo demas (mapa, grabacion, feed)
son organos que van dentro de ese esqueleto. Definirlo bien desde el inicio
evita reestructuraciones costosas despues.

---

## 1. Crear el proyecto

```bash
# Crear el proyecto con la plantilla de TypeScript
npx create-expo-app rutaco --template blank-typescript

# Entrar al proyecto
cd rutaco

# Verificar que funciona
npx expo start
```

Al ejecutar `expo start` aparece un codigo QR en la terminal.
Escanear con Expo Go en el celular. Debe aparecer una pantalla blanca con texto.

---

## 2. Estructura de carpetas

Crear la estructura completa desde el inicio:

```bash
mkdir -p src/api
mkdir -p src/components/common
mkdir -p src/components/map
mkdir -p src/components/route
mkdir -p src/components/social
mkdir -p src/hooks
mkdir -p src/navigation
mkdir -p src/screens/auth
mkdir -p src/screens/map
mkdir -p src/screens/activity
mkdir -p src/screens/profile
mkdir -p src/screens/social
mkdir -p src/screens/rides
mkdir -p src/screens/settings
mkdir -p src/store
mkdir -p src/types
mkdir -p src/utils
mkdir -p src/constants
mkdir -p supabase/migrations
mkdir -p supabase/seed
```

---

## 3. Instalar dependencias

```bash
# Navegacion
npx expo install @react-navigation/native
npx expo install @react-navigation/bottom-tabs
npx expo install @react-navigation/stack
npx expo install react-native-screens
npx expo install react-native-safe-area-context
npx expo install react-native-gesture-handler

# Supabase
npx expo install @supabase/supabase-js

# Estado
npx expo install zustand
npx expo install @tanstack/react-query

# Almacenamiento local rapido
npx expo install react-native-mmkv

# Animaciones (necesario para react-navigation)
npx expo install react-native-reanimated

# GPS, voz, notificaciones (de Expo)
npx expo install expo-location
npx expo install expo-speech
npx expo install expo-notifications

# Mapbox
npm install @rnmapbox/maps

# Utiles
npx expo install date-fns
```

**Por que `npx expo install` y no `npm install`:**
`expo install` verifica que la version de cada paquete sea compatible con
la version de Expo que tienes instalada. Usar `npm install` puede instalar
versiones incompatibles que generan errores crypticos.

---

## 4. Configurar TypeScript

Editar `tsconfig.json` en la raiz:

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

**Que hace `strict: true`:**
Activa todas las verificaciones estrictas de TypeScript. Esto incluye:
- No permitir variables que puedan ser `null` sin verificarlo primero
- No permitir tipos `any` implicitos
- Detectar mas errores antes de ejecutar el codigo

**Que hace `paths`:**
Permite importar archivos usando `@/` en lugar de rutas relativas largas:
```typescript
// Sin paths (ruta relativa)
import { Button } from '../../../components/common/Button'

// Con paths (mas limpio)
import { Button } from '@/components/common/Button'
```

---

## 5. Configurar variables de entorno

Crear `.env` en la raiz:
```
EXPO_PUBLIC_SUPABASE_URL=tu_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=tu_key
EXPO_PUBLIC_MAPBOX_TOKEN=tu_token
EXPO_PUBLIC_OPEN_METEO_URL=https://api.open-meteo.com/v1
```

Crear `.gitignore` y agregar:
```
node_modules/
.env
.expo/
dist/
```

---

## 6. Configurar Supabase

```typescript
// src/api/supabase.ts

import { createClient } from '@supabase/supabase-js'
import { MMKV } from 'react-native-mmkv'

// MMKV es el almacenamiento local donde guardamos la sesion del usuario.
// Esto hace que el usuario no tenga que iniciar sesion cada vez que abre la app.
const storage = new MMKV()

// Adaptador que conecta MMKV con el sistema de sesiones de Supabase.
// Supabase necesita un "storage" para guardar el token de sesion.
// Por defecto usaria AsyncStorage (lento), nosotros le damos MMKV (rapido).
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
      autoRefreshToken: true,   // renueva el token automaticamente antes de que expire
      persistSession: true,     // guarda la sesion entre cierres de app
      detectSessionInUrl: false, // en apps moviles no usamos URLs para sesiones
    },
  }
)
```

**El signo `!` al final:**
`process.env.EXPO_PUBLIC_SUPABASE_URL!` - el `!` le dice a TypeScript "confio en
que esto no es undefined". Lo usamos porque sabemos que las variables de entorno
estan configuradas. En produccion, agregar validacion extra.

---

## 7. Tipos de TypeScript para la base de datos

```typescript
// src/types/database.ts
// Estos tipos corresponden 1 a 1 con las tablas de Supabase.
// Si cambia una tabla, actualizar el tipo aqui.

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
  total_group_rides: number
  current_streak_days: number
  last_activity_date: string | null
  plan: 'free' | 'premium'
  plan_expires_at: string | null
  push_token: string | null
  created_at: string
  updated_at: string
}

export interface Route {
  id: string
  user_id: string
  title: string
  description: string | null
  geojson: GeoJSONLineString
  distance_km: number
  elevation_gain_m: number
  elevation_loss_m: number
  max_elevation_m: number | null
  min_elevation_m: number | null
  elevation_segments: ElevationSegment[] | null
  has_return: boolean
  difficulty: 'plano' | 'moderado' | 'dificil' | 'muy_dificil' | null
  visibility: 'public' | 'connections' | 'private'
  start_lat: number | null
  start_lng: number | null
  end_lat: number | null
  end_lng: number | null
  start_location_name: string | null
  cover_image_url: string | null
  likes_count: number
  saves_count: number
  comments_count: number
  is_recorded: boolean
  recorded_at: string | null
  created_at: string
}

export interface Activity {
  id: string
  user_id: string
  route_id: string | null
  title: string | null
  geojson: GeoJSONLineString
  distance_km: number
  duration_seconds: number
  moving_seconds: number
  elevation_gain_m: number
  elevation_loss_m: number
  avg_speed_kmh: number | null
  max_speed_kmh: number | null
  pauses: Pause[]
  speed_segments: SpeedSegment[]
  started_at: string
  ended_at: string
  created_at: string
}

export interface GroupRide {
  id: string
  organizer_id: string
  title: string
  description: string | null
  route_id: string | null
  scheduled_at: string
  meeting_zone: string
  meeting_point_lat: number | null  
  meeting_point_lng: number | null
  meeting_point_address: string | null
  difficulty: string | null
  max_participants: number | null
  min_routes_required: number
  visibility: 'private' | 'community'
  status: 'open' | 'full' | 'cancelled' | 'completed'
  created_at: string
}

// Tipos auxiliares
export interface ElevationSegment {
  startKm: number
  endKm: number
  startElevation: number
  endElevation: number
  gradientPercent: number
  type: 'flat' | 'mild' | 'moderate' | 'steep' | 'very_steep'
  description: string
}

export interface GeoJSONLineString {
  type: 'LineString'
  coordinates: [number, number][] | [number, number, number][]
}

export interface Pause {
  lat: number
  lng: number
  duration_seconds: number
  timestamp: string
}

export interface SpeedSegment {
  start_index: number
  end_index: number
  speed_kmh: number
}
```

---

## 8. Store de autenticacion

```typescript
// src/store/authStore.ts

import { create } from 'zustand'
import { supabase } from '@/api/supabase'
import type { Profile } from '@/types/database'
import type { Session } from '@supabase/supabase-js'

// La interfaz define exactamente que datos y funciones tiene este store
interface AuthStore {
  session: Session | null          // la sesion de Supabase (contiene el token)
  profile: Profile | null          // los datos del perfil del usuario
  isLoading: boolean               // true mientras carga la sesion inicial

  // Funciones para modificar el estado
  setSession: (session: Session | null) => void
  setProfile: (profile: Profile | null) => void
  signOut: () => Promise<void>
  loadProfile: (userId: string) => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
  session: null,
  profile: null,
  isLoading: true,

  setSession: (session) => set({ session }),

  setProfile: (profile) => set({ profile }),

  loadProfile: async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (data) set({ profile: data })
  },

  signOut: async () => {
    await supabase.auth.signOut()
    set({ session: null, profile: null })
  },
}))
```

---

## 9. Configurar la navegacion

### 9.1 Tipos de navegacion

```typescript
// src/types/navigation.ts
// Definir los parametros que cada pantalla puede recibir.
// Si una pantalla no recibe parametros, su valor es undefined.

import type { StackScreenProps } from '@react-navigation/stack'
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

// Pantallas del stack de autenticacion
export type AuthStackParams = {
  Welcome: undefined
  Login: undefined
  Register: undefined
  VerifyPhone: { phone: string }
}

// Tabs principales
export type MainTabsParams = {
  MapTab: undefined
  ExploreTab: undefined
  RecordTab: undefined
  RidesTab: undefined
  ProfileTab: undefined
}

// Stack del mapa (pantallas que se apilan sobre el tab de mapa)
export type MapStackParams = {
  Map: undefined
  RouteDetail: { routeId: string }
  Planner: { initialCoords?: [number, number] }
  ServicePoints: undefined
}

// Stack de actividad
export type ActivityStackParams = {
  Recording: undefined
  ActivitySummary: { activityId: string }
  ActivityReplay: { activityId: string }
}

// Stack de perfil
export type ProfileStackParams = {
  Profile: { userId?: string }  // si no hay userId, muestra el propio
  EditProfile: undefined
  Medals: { userId: string }
}

// Stack de rodadas
export type RidesStackParams = {
  RidesList: undefined
  CreateRide: undefined
  RideDetail: { rideId: string }
  RideRequests: { rideId: string }
}
```

### 9.2 Navegador raiz

```typescript
// src/navigation/RootNavigator.tsx

import { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { supabase } from '@/api/supabase'
import { useAuthStore } from '@/store/authStore'
import { AuthStack } from './AuthStack'
import { MainTabs } from './MainTabs'
import { LoadingScreen } from '@/screens/LoadingScreen'

const Stack = createStackNavigator()

export function RootNavigator() {
  const { session, isLoading, setSession, loadProfile } = useAuthStore()

  useEffect(() => {
    // Al iniciar la app, verificar si hay una sesion guardada
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session?.user) loadProfile(session.user.id)
      useAuthStore.setState({ isLoading: false })
    })

    // Escuchar cambios de sesion (login, logout, token refreshed)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session)
        if (session?.user) loadProfile(session.user.id)
      }
    )

    // Limpiar el listener cuando el componente se desmonta
    return () => subscription.unsubscribe()
  }, [])

  // Mostrar pantalla de carga mientras verificamos la sesion
  if (isLoading) return <LoadingScreen />

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {session ? (
          // Usuario autenticado: mostrar la app principal
          <Stack.Screen name="Main" component={MainTabs} />
        ) : (
          // Usuario no autenticado: mostrar pantallas de login
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
```

**Como funciona `onAuthStateChange`:**
Supabase emite eventos cuando cambia el estado de autenticacion: cuando el usuario
inicia sesion, cierra sesion, o cuando el token se renueva automaticamente.
Al escuchar estos eventos, la app siempre sabe si el usuario esta autenticado.

### 9.3 Tabs principales

```typescript
// src/navigation/MainTabs.tsx

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MapStack } from './MapStack'
import { RecordStack } from './RecordStack'
import { RidesStack } from './RidesStack'
import { ProfileStack } from './ProfileStack'
import { FeedScreen } from '@/screens/social/FeedScreen'
import { COLORS } from '@/constants/colors'

const Tabs = createBottomTabNavigator()

export function MainTabs() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopColor: COLORS.border,
        },
      }}
    >
      <Tabs.Screen
        name="MapTab"
        component={MapStack}
        options={{ title: 'Mapa', tabBarIcon: ({ color }) => <MapIcon color={color} /> }}
      />
      <Tabs.Screen
        name="FeedTab"
        component={FeedScreen}
        options={{ title: 'Feed', tabBarIcon: ({ color }) => <FeedIcon color={color} /> }}
      />
      <Tabs.Screen
        name="RecordTab"
        component={RecordStack}
        options={{ title: 'Grabar', tabBarIcon: ({ color }) => <RecordIcon color={color} /> }}
      />
      <Tabs.Screen
        name="RidesTab"
        component={RidesStack}
        options={{ title: 'Rodadas', tabBarIcon: ({ color }) => <RidesIcon color={color} /> }}
      />
      <Tabs.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{ title: 'Perfil', tabBarIcon: ({ color }) => <ProfileIcon color={color} /> }}
      />
    </Tabs.Navigator>
  )
}
```

### 9.4 Colores de RutaCo

```typescript
// src/constants/colors.ts

export const COLORS = {
  // Verde principal de RutaCo - representa naturaleza, ciclismo, Colombia
  primary: '#22c55e',
  primaryDark: '#16a34a',
  primaryLight: '#86efac',

  // Fondo y superficies
  background: '#0f1117',     // fondo oscuro
  surface: '#1a1d27',        // tarjetas y modales
  surfaceAlt: '#252836',     // alternativo

  // Texto
  text: '#f8fafc',
  textSecondary: '#94a3b8',
  textMuted: '#475569',

  // Bordes
  border: '#2d3748',

  // Colores de gradiente de elevacion
  gradientFlat: '#22c55e',
  gradientMild: '#eab308',
  gradientModerate: '#f97316',
  gradientSteep: '#ef4444',
  gradientVerySteep: '#a855f7',

  // Semaforo de seguridad
  safeGreen: '#22c55e',
  cautionYellow: '#eab308',
  dangerRed: '#ef4444',

  // Estados
  error: '#ef4444',
  warning: '#f59e0b',
  success: '#22c55e',
  info: '#3b82f6',
}
```

---

## 10. Configurar React Query

```typescript
// App.tsx (archivo raiz)

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RootNavigator } from '@/navigation/RootNavigator'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

// QueryClient es el gestor central de todas las consultas de la app.
// Configuramos cuanto tiempo cachear los datos y cuando revalidar.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,       // los datos son frescos por 5 minutos
      gcTime: 1000 * 60 * 30,          // mantener en cache 30 minutos aunque no se usen
      retry: 2,                         // reintentar 2 veces si falla
      refetchOnWindowFocus: false,      // no recargar al volver a la app (costoso en movil)
    },
  },
})

export default function App() {
  return (
    // GestureHandlerRootView es requerido por react-native-gesture-handler
    // Debe envolver TODA la app
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <RootNavigator />
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}
```

---

## 11. Pantallas placeholder

Crear pantallas vacias para que la navegacion funcione sin errores:

```typescript
// Ejemplo: src/screens/map/MapScreen.tsx
import { View, Text, StyleSheet } from 'react-native'
import { COLORS } from '@/constants/colors'

export function MapScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Mapa - Proximamente</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: COLORS.text,
    fontSize: 18,
  },
})
```

Crear el mismo archivo placeholder para todas las pantallas listadas en la
estructura de carpetas.

---

## Checklist de esta sub-fase

```
[ ] Proyecto creado con expo y corriendo en el celular
[ ] Estructura de carpetas creada completa
[ ] Todas las dependencias instaladas sin errores
[ ] TypeScript configurado con strict: true y paths @/*
[ ] Variables de entorno configuradas
[ ] Supabase conectado (sin errores al importar)
[ ] Tipos de base de datos definidos en database.ts
[ ] Store de autenticacion funcionando
[ ] Navegacion con tabs visibles en el celular
[ ] RootNavigator muestra AuthStack o MainTabs segun sesion
[ ] Colores de RutaCo definidos
[ ] React Query configurado en App.tsx
[ ] Pantallas placeholder en todas las rutas
```

---

Siguiente documento: 05_autenticacion.md
