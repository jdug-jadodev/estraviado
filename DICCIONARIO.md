# 📖 Diccionario del Proyecto — RutaCo / Estraviado

> **Propósito:** Referencia rápida de todo lo que existe en el proyecto: funciones, componentes, pantallas, tipos, stores y configuración.
> Útil para desarrolladores e IAs para entender el proyecto con el mínimo de tokens.
>
> **App:** App de ciclismo colombiana (React Native + Expo + Mapbox + Supabase)
> **Actualizado:** Abril 2026

---

## Índice

0. [Archivos Raíz](#0-archivos-raíz)
1. [Estructura General](#1-estructura-general)
2. [Config](#2-config)
3. [API](#3-api)
   - [supabase.ts](#supabasetssupabasets)
   - [auth/ — Barrels](#authts--authindexts)
   - [auth/ — Funciones](#authauth)
   - [geocoding/ — Barrels](#geocodingts--geocodingindexts)
   - [geocoding/ — Funciones](#geocodinggeocoding)
4. [Store (Estado Global)](#4-store-estado-global)
   - [Interface authStore.ts](#srcinterfaceauthstorets)
5. [Types (Tipos)](#5-types-tipos)
   - [Database Types](#database-types)
   - [Navigation Types](#navigation-types)
   - [Planner Types](#planner-types)
6. [Navegación](#6-navegación)
7. [Pantallas (Screens)](#7-pantallas-screens)
   - [Auth](#auth)
   - [Map](#map)
   - [Profile](#profile)
   - [Activity](#activity)
   - [Rides](#rides)
   - [Social](#social)
8. [Componentes](#8-componentes)
   - [Map Components](#map-components)
   - [Planner Components](#planner-components)
   - [Carpetas vacías preparadas](#carpetas-vacías-preparadas)
9. [Hooks](#9-hooks)
10. [Debug](#10-debug)
11. [Constantes](#11-constantes)
12. [Dependencias Clave](#12-dependencias-clave)
13. [Variables de Entorno](#13-variables-de-entorno)
14. [Flujos Principales](#14-flujos-principales)

---

## 0. Archivos Raíz

### `App.tsx` — `App` (default export)
Componente raíz de la aplicación. **Primer componente que React Native monta.**

| | |
|---|---|
| **Qué hace** | Envuelve toda la app en dos providers: `GestureHandlerRootView` (requerido por react-native-gesture-handler) y `QueryClientProvider` (para @tanstack/react-query). Renderiza `RootNavigator`. |
| **QueryClient config** | `staleTime: 5min`, `gcTime: 30min`, `retry: 2`, `refetchOnWindowFocus: false` |
| **Usada en** | `index.ts` (registrada como root component) |

---

### `index.ts` — Entry Point
Punto de entrada de Expo/React Native.

| | |
|---|---|
| **Qué hace** | Llama a `registerRootComponent(App)` de Expo. Equivale a `AppRegistry.registerComponent('main', () => App)`. Funciona tanto en Expo Go como en build nativo. |
| **No modificar** | Este archivo raramente necesita cambios. |

---

### `app.json` — Configuración de Expo

| Campo clave | Valor | Descripción |
|-------------|-------|-------------|
| `name` / `slug` | `estraviado` | Nombre interno del proyecto |
| `version` | `1.0.0` | Versión de la app |
| `newArchEnabled` | `true` | Usa la nueva arquitectura de React Native (JSI, Fabric) |
| `plugins[0]` | `@rnmapbox/maps` | Plugin necesario para compilar el SDK nativo de Mapbox |
| `RNMAPBOX_MAPS_DOWNLOAD_TOKEN` | `$RNMAPBOX_MAPS_DOWNLOAD_TOKEN` | Lee de variable de entorno del sistema (nunca hardcodeado) |
| `android.package` | `com.anonymous.estraviado` | Identificador Android — **cambiar antes de publicar** |
| `android.edgeToEdgeEnabled` | `true` | Layout edge-to-edge en Android |
| `permissions` | `ACCESS_FINE_LOCATION`, `ACCESS_COARSE_LOCATION` | Permisos Android declarados |

---

### `tsconfig.json` — Configuración TypeScript

| | |
|---|---|
| **Extiende** | `expo/tsconfig.base` (strict mode activado) |
| **Path alias** | `@/*` → `src/*` — Esto permite escribir `import X from '@/api/auth'` en lugar de rutas relativas. **Todos los imports internos deben usar `@/`** |
| **Impacta** | Todos los archivos `.ts` y `.tsx` del proyecto |

---

## 1. Estructura General

```
src/
  api/              ← Llamadas a servicios externos (Supabase, Mapbox, backend)
    auth/           ← Funciones de autenticación (1 por archivo)
    geocoding/      ← Funciones de geocodificación (1 por archivo)
    auth.ts         ← Re-export barrel de auth/
    geocoding.ts    ← Re-export barrel de geocoding/
    supabase.ts     ← Cliente Supabase singleton
  components/       ← Componentes reutilizables
    common/         ← [VACÍO — preparado para componentes compartidos]
    map/            ← Componentes específicos de mapa
    planner/        ← Componentes del planificador de rutas
    route/          ← [VACÍO — preparado para componentes de rutas]
    social/         ← [VACÍO — preparado para componentes del feed]
  config/           ← Constantes de configuración global
  constants/        ← Paleta de colores y constantes UI
  debug/            ← Utilidades de diagnóstico y desarrollo
  hooks/            ← Custom React hooks (useLocationManager, useLocationSearch, useLocationValidation)
  interface/        ← Interfaces TypeScript de los stores
  navigation/       ← Navegadores de React Navigation
  screens/          ← Pantallas de la app
    auth/           ← Login, registro, bienvenida
    map/            ← Mapa, planificador, búsqueda
    activity/       ← Grabación y resumen de actividades
    profile/        ← Perfil de usuario
    rides/          ← Rodadas grupales
    social/         ← Feed social
  store/            ← Estado global con Zustand (plannerStore, mapStore)
  types/            ← Tipos TypeScript
    database/       ← Tipos espejo de tablas Supabase
    navigation/     ← Tipos de parámetros de navegación
    map.ts          ← Tipos para mapas (CameraCoords, CameraState, MarkerState)
    search.ts       ← Tipos para búsqueda (SearchState, SearchConfig)
    planner.ts      ← Tipos para planificador (LocationPoint, RouteCoordinates)
  utils/            ← [VACÍO — preparado para funciones utilitarias]
```

---

## 2. Config

### `src/config/backendUrl.ts`
| | |
|---|---|
| **Exporta** | `BACKEND_URL: string` |
| **Qué hace** | Constante con la URL del backend Node.js. Lee de `REACT_APP_BACKEND_URL` o usa `https://loggin-mcp.onrender.com` como fallback. |
| **Usada en** | `src/api/auth/selfRegister.ts`, `src/debug/*` |

### `src/config/mapbox.ts`
| | |
|---|---|
| **Exporta** | `MAPBOX_TOKEN: string \| undefined`, `SEARCH_COUNTRY: string` |
| **Qué hace** | Token de acceso Mapbox (`EXPO_PUBLIC_MAPBOX_TOKEN`) usado solo para reverse geocoding y el mapa. `SEARCH_COUNTRY: 'CO'` (Colombia) es referencia histórica. |
| **Usada en** | `src/api/geocoding/reverseGeocode.ts` (reverse geocoding), `src/components/map/RutaCoMap.tsx` (mapa) |

---

## 3. API

### `src/api/supabase.ts`
| | |
|---|---|
| **Exporta** | `supabase` (cliente Supabase) |
| **Qué hace** | Crea el cliente Supabase singleton usando `@supabase/supabase-js`. Configura `AsyncStorage` para persistir la sesión entre reinicios de la app. `autoRefreshToken: true` renueva el JWT automáticamente. |
| **Usada en** | `src/api/auth/signIn.ts`, `src/api/auth/signUp.ts`, `src/api/auth/signOut.ts`, `src/api/auth/sendPhoneOTP.ts`, `src/api/auth/verifyPhoneOTP.ts`, `src/store/authStore.ts`, `src/navigation/RootNavigator.tsx` |

---

### `src/api/auth.ts` + `src/api/auth/index.ts`
Dos archivos barrel. Las importaciones externas siempre usan `@/api/auth`.

**`src/api/auth.ts`** (re-exporta desde la carpeta):
```ts
export { selfRegister, signUp, signIn, signOut, sendPhoneOTP, verifyPhoneOTP, formatColombianPhone } from './auth/index'
```

**`src/api/auth/index.ts`** (re-exporta desde cada archivo SRP):
```ts
export { selfRegister } from './selfRegister'
export { signUp } from './signUp'
export { signIn } from './signIn'
export { signOut } from './signOut'
export { sendPhoneOTP } from './sendPhoneOTP'
export { verifyPhoneOTP } from './verifyPhoneOTP'
export { formatColombianPhone } from './formatColombianPhone'
```

---

### `src/api/auth/` — Autenticación — Funciones

> Cada función vive en su propio archivo. Principio de Responsabilidad Única (SRP).

#### `selfRegister.ts`
| | |
|---|---|
| **Firma** | `selfRegister(email, password, fullName, username?) → Promise<{data, error}>` |
| **Qué hace** | Registra un usuario nuevo llamando al **backend propio** (`POST /auth/self-register`), no directamente a Supabase. Detecta y clasifica errores de red con mensajes descriptivos (`NETWORK_FAILED`, `TIMEOUT`, `HOST_NOT_FOUND`, `ECONNREFUSED`, `ECONNRESET`). |
| **Usada en** | `src/screens/auth/RegisterScreen.tsx` |
| **Nota** | Es el método principal de registro. `signUp` (directo a Supabase) está deprecado. |

#### `signUp.ts`
| | |
|---|---|
| **Firma** | `signUp(email, password, fullName, username?) → Promise<{data, error}>` |
| **Qué hace** | Registro directo a Supabase Auth. **Deprecado** — usar `selfRegister` que pasa por el backend. |
| **Usada en** | No usada actualmente |

#### `signIn.ts`
| | |
|---|---|
| **Firma** | `signIn(email, password) → Promise<{data, error}>` |
| **Qué hace** | Inicia sesión con email y contraseña via Supabase Auth. Al hacer login exitoso, `onAuthStateChange` en `RootNavigator` detecta la sesión y navega automáticamente a `MainTabs`. |
| **Usada en** | `src/screens/auth/LoginScreen.tsx` |

#### `signOut.ts`
| | |
|---|---|
| **Firma** | `signOut() → Promise<{error}>` |
| **Qué hace** | Cierra la sesión en Supabase Auth. |
| **Usada en** | `src/store/authStore.ts` (método `signOut` del store) |

#### `sendPhoneOTP.ts`
| | |
|---|---|
| **Firma** | `sendPhoneOTP(phone) → Promise<{error}>` |
| **Qué hace** | Envía un código OTP (6 dígitos) por SMS al número de teléfono. Primero formatea el número con `formatColombianPhone`. |
| **Usada en** | No usada actualmente (pantalla `VerifyPhoneScreen` pendiente) |

#### `verifyPhoneOTP.ts`
| | |
|---|---|
| **Firma** | `verifyPhoneOTP(phone, token) → Promise<{error}>` |
| **Qué hace** | Verifica el código OTP recibido por SMS. Si es correcto, actualiza el perfil en Supabase marcando `phone_verified: true`. |
| **Usada en** | No usada actualmente |

#### `formatColombianPhone.ts`
| | |
|---|---|
| **Firma** | `formatColombianPhone(phone) → string` |
| **Qué hace** | Normaliza un número de teléfono al formato internacional colombiano `+57XXXXXXXXXX`. Maneja: números con `+57`, sin prefijo, o con `57`. Elimina espacios, guiones y paréntesis. |
| **Usada en** | `src/api/auth/sendPhoneOTP.ts`, `src/api/auth/verifyPhoneOTP.ts` |

---

### `src/api/geocoding.ts` + `src/api/geocoding/index.ts`
Dos archivos barrel. Las importaciones externas siempre usan `@/api/geocoding`.

**`src/api/geocoding.ts`**:
```ts
export { reverseGeocode, searchPlaces, calculateDistance, isSameLocation } from './geocoding/index'
```

**`src/api/geocoding/index.ts`**:
```ts
export { reverseGeocode } from './reverseGeocode'
export { searchPlaces } from './searchPlaces'
export { calculateDistance } from './calculateDistance'
export { isSameLocation } from './isSameLocation'
```

---

### `src/api/geocoding/` — Geocodificación — Funciones

> Cada función vive en su propio archivo. Importar siempre desde `@/api/geocoding`.

#### `reverseGeocode.ts`
| | |
|---|---|
| **Firma** | `reverseGeocode(latitude, longitude) → Promise<string \| null>` |
| **Qué hace** | Convierte coordenadas GPS en una dirección legible en español. Usa Mapbox Geocoding API v5. Prefiere resultados de tipo `address` o `place` sobre otros. |
| **Usada en** | `src/screens/map/PlannerScreen.tsx` (al seleccionar punto en mapa) |

#### `searchPlaces.ts`
| | |
|---|---|
| **Firma** | `searchPlaces(query, userLocation?) → Promise<LocationPoint[]>` |
| **Qué hace** | Busca lugares por nombre, dirección, POIs y lugares emblemáticos usando **Nominatim (OpenStreetMap)**. Sin API key requerida. **Limitado a Colombia**. Devuelve hasta 10 resultados con coordenadas y dirección legible en español. Si hay `userLocation`, sesga resultados hacia esa zona (viewbox). |
| **Usada en** | `src/screens/map/LocationSearchScreen.tsx`, `src/components/planner/LocationSearch.tsx` |
| **Nota** | Nominatim tiene excelente cobertura de POIs colombianos (Salto del Tequendama, Jardín Botánico, etc.) a diferencia de Mapbox que tenía data limitada. |

#### `calculateDistance.ts`
| | |
|---|---|
| **Firma** | `calculateDistance(lat1, lon1, lat2, lon2) → number` |
| **Qué hace** | Calcula la distancia en kilómetros entre dos puntos geográficos usando la fórmula de **Haversine** (considera la curvatura terrestre). |
| **Usada en** | `src/api/geocoding/isSameLocation.ts` |

#### `isSameLocation.ts`
| | |
|---|---|
| **Firma** | `isSameLocation(loc1, loc2, toleranceKm?) → boolean` |
| **Qué hace** | Determina si dos `LocationPoint` son prácticamente el mismo lugar. Por defecto, `toleranceKm = 0.1` (100 metros). Retorna `false` si alguno es `null`. |
| **Usada en** | `src/store/plannerStore.ts` (validación origen ≠ destino) |

---

## 4. Store (Estado Global)

> Todos los stores usan **Zustand**. Se acceden con hooks: `useAuthStore()`, `usePlannerStore()`.

### `src/interface/authStore.ts`
Define el contrato TypeScript del `authStore`. Importada por `src/store/authStore.ts`.

```ts
interface AuthStore {
  session: Session | null
  profile: Profile | null
  isLoading: boolean
  setSession: (session: Session | null) => void
  setProfile: (profile: Profile | null) => void
  signOut: () => Promise<void>
  loadProfile: (userId: string) => Promise<void>
}
```

**Imports:** `Profile` de `@/types/database/profile`, `Session` de `@supabase/supabase-js`

---

### `src/store/authStore.ts`
| | |
|---|---|
| **Hook** | `useAuthStore()` |
| **Interface** | `src/interface/authStore.ts` → `AuthStore` |
| **Estado** | `session: Session \| null`, `profile: Profile \| null`, `isLoading: boolean` |

| Acción | Qué hace |
|--------|----------|
| `setSession(session)` | Guarda la sesión de Supabase. Llamada por `RootNavigator` en `onAuthStateChange`. |
| `setProfile(profile)` | Establece manualmente el perfil del usuario. |
| `loadProfile(userId)` | Consulta `profiles` en Supabase y guarda el resultado en `profile`. |
| `signOut()` | Llama a `supabase.auth.signOut()` y resetea `session` y `profile` a `null`. |

**Usada en:** `RootNavigator.tsx`, `ProfileScreen.tsx`, `useRequireVerifiedPhone.ts`

---

### `src/store/plannerStore.ts` (Expandido)
| | |
|---|---|
| **Hook** | `usePlannerStore()` |
| **Estado** | `origin`, `destination`, `selectingMode`, `error`, `userLocation`, `locationError`, `searchState` |

**Estado de ubicaciones:**

| Acción | Retorna | Qué hace |
|--------|---------|----------|
| `setOrigin(location)` | `boolean` | Guarda el punto de salida. Valida que no sea igual al destino (tolerancia 50m). |
| `setDestination(location)` | `boolean` | Igual que `setOrigin` pero para el destino. |
| `setSelectingMode(mode)` | `void` | Activa el modo de selección (`'origin'`, `'destination'`, o `null`). |
| `setError(error)` | `void` | Guarda mensaje de error. |
| `swapLocations()` | `void` | Intercambia origen y destino. |
| `clearLocations()` | `void` | Resetea ubicaciones. |
| `getCoordinates()` | `RouteCoordinates` | Devuelve `{origin, destination}`. |
| `isValid()` | `boolean` | `true` si origen Y destino existen. |

**Estado del usuario (NUEVO):**

| Acción | Retorna | Qué hace |
|--------|---------|----------|
| `setUserLocation(location)` | `void` | Guarda ubicación GPS actual del usuario. Sincroniza con MapScreen y PlannerScreen. |
| `setLocationError(error)` | `void` | Guarda errores de permisos/GPS. |

**Estado de búsqueda (NUEVO):**

| Acción | Retorna | Qué hace |
|--------|---------|----------|
| `setSearchQuery(query)` | `void` | Establece el texto de búsqueda. |
| `setSearchResults(results)` | `void` | Guarda resultados de búsqueda. |
| `setSearchLoading(isLoading)` | `void` | Indica si está buscando. |
| `setSearchError(error)` | `void` | Guarda errores de búsqueda. |
| `clearSearch()` | `void` | Resetea búsqueda. |

**Usada en:** `LocationSearchScreen.tsx`, `MapScreen.tsx`, `PlannerScreen.tsx`, `useLocationSearch.ts`

---

### `src/store/mapStore.ts` (NUEVO)
| | |
|---|---|
| **Hook** | `useMapStore()` |
| **Propósito** | Centralizar estado del mapa: cámara, panel y marcadores |
| **Estado** | `cameraCoords`, `cameraState`, `plannerActive`, `isPanelExpanded`, `panelHeight`, `markerState`, `mapError` |

**Acciones:**

| Acción | Qué hace |
|--------|----------|
| `setCameraCoords(coords)` | Guarda posición de cámara y mantiene histórico en `cameraState`. |
| `updateCameraCoords(coords)` | Actualiza parcialmente coordenadas. |
| `saveCameraCoords(coords)` | Guarda coordenadas con histórico. |
| `setPlannerActive(active)` | Activa/desactiva modo planificador. |
| `setIsPanelExpanded(expanded)` | Expande/contrae panel deslizable. |
| `setPanelHeight(height)` | Guarda altura total del panel. |
| `setMarkerState(state)` | Actualiza estado de marcadores. |
| `setMarkerPosition(position)` | Establece posición del marcador. |
| `setMapError(error)` | Guarda errores del mapa. |
| `resetMapState()` | Resetea todo a valores iniciales. |

**Usada en:** `MapScreen.tsx`, `RutaCoMap.tsx`

---

## 5. Types (Tipos)

### Database Types
Espejo exacto de las tablas en Supabase. **No deben modificarse** sin sincronizar con el schema de la base de datos.

#### `src/types/database/profile.ts` → `Profile`
Perfil público del usuario ciclista.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | `string` | UUID, mismo que `auth.users.id` |
| `username` | `string \| null` | Apodo único opcional |
| `full_name` | `string \| null` | Nombre completo |
| `avatar_url` | `string \| null` | URL de la foto de perfil |
| `phone` | `string \| null` | Teléfono en formato `+57XXXXXXXXXX` |
| `phone_verified` | `boolean` | Requerido para unirse a rodadas grupales |
| `total_distance_km` | `number` | Distancia acumulada total |
| `total_elevation_m` | `number` | Elevación acumulada total |
| `total_rides` | `number` | Número de actividades grabadas |
| `total_group_rides` | `number` | Número de rodadas grupales completadas |
| `current_streak_days` | `number` | Días consecutivos con actividad |
| `plan` | `'free' \| 'premium'` | Plan del usuario |
| `plan_expires_at` | `string \| null` | Fecha de expiración del plan premium |

---

#### `src/types/database/activity.ts` → `Activity`
Registro de una actividad de ciclismo grabada.

| Campo clave | Tipo | Descripción |
|-------------|------|-------------|
| `geojson` | `GeoJSONLineString` | Ruta GPS completa |
| `distance_km` | `number` | Distancia en km |
| `duration_seconds` | `number` | Duración total incluyendo pausas |
| `moving_seconds` | `number` | Tiempo efectivo en movimiento |
| `elevation_gain_m` | `number` | Metros de subida acumulados |
| `pauses` | `Pause[]` | Array de pausas durante la actividad |
| `speed_segments` | `SpeedSegment[]` | Segmentos de velocidad |

---

#### `src/types/database/route.ts` → `Route`
Ruta ciclista publicada en la plataforma.

| Campo clave | Tipo | Descripción |
|-------------|------|-------------|
| `geojson` | `GeoJSONLineString` | Geometría de la ruta |
| `difficulty` | `'plano' \| 'moderado' \| 'dificil' \| 'muy_dificil' \| null` | Nivel de esfuerzo |
| `visibility` | `'public' \| 'connections' \| 'private'` | Quién puede ver la ruta |
| `elevation_segments` | `ElevationSegment[] \| null` | Segmentos de gradiente |
| `has_return` | `boolean` | Si la ruta regresa al punto de inicio |
| `likes_count` | `number` | Número de likes |

---

#### `src/types/database/group-ride.ts` → `GroupRide`
Rodada grupal programada.

| Campo clave | Tipo | Descripción |
|-------------|------|-------------|
| `scheduled_at` | `string` | Fecha y hora ISO de la rodada |
| `meeting_zone` | `string` | Zona de encuentro (texto libre) |
| `meeting_point_lat/lng` | `number \| null` | Coordenadas del punto de encuentro |
| `status` | `'open' \| 'full' \| 'cancelled' \| 'completed'` | Estado de la rodada |
| `visibility` | `'private' \| 'community'` | Si es visible para todos o solo invitados |
| `min_routes_required` | `number` | Rutas mínimas en la app para unirse |

---

#### `src/types/database/pause.ts` → `Pause`
```ts
{ position: number; duration_seconds: number }
```
Pausa dentro de una actividad. `position` es el índice en el array de coordenadas donde ocurrió.

---

#### `src/types/database/speed-segment.ts` → `SpeedSegment`
```ts
{ start_index: number; end_index: number; speed_kmh: number }
```
Segmento de velocidad uniforme dentro de una actividad.

---

#### `src/types/database/geo-json-line-string.ts` → `GeoJSONLineString`
```ts
{ type: 'LineString'; coordinates: [number, number][] | [number, number, number][] }
```
Formato estándar GeoJSON para líneas. Coordenadas en formato `[longitud, latitud, (altitud?)]`.

---

#### `src/types/database/Elevation-segment.ts` → `ElevationSegment`
```ts
{ startKm, endKm, startElevation, endElevation, gradientPercent, type, description }
```
Segmento de elevación entre dos kilómetros de la ruta. `type` puede ser: `'flat' | 'mild' | 'moderate' | 'steep' | 'very_steep'`.

---

### Map Types (NUEVO)
`src/types/map.ts`

#### `CameraCoords`
```ts
{ longitude: number; latitude: number; zoom?: number; heading?: number; pitch?: number }
```
Coordenadas y configuración de la cámara Mapbox. **Centralizado** — antes estaba duplicado en `MapScreen` y `RutaCoMap`.

#### `CameraState`
```ts
{ current: CameraCoords | null; previous: CameraCoords | null; isAnimating: boolean }
```
Histórico de posiciones de cámara para transiciones suaves.

#### `MarkerState`
```ts
{ isVisible: boolean; position: CameraCoords | null; isDragging: boolean }
```
Estado de marcadores interactivos en el mapa.

#### `MapConfig`
```ts
{ centerLatitude: number; centerLongitude: number; zoomLevel: number; maxZoom?: number; minZoom?: number }
```
Configuración inicial del mapa.

---

### Search Types (NUEVO)
`src/types/search.ts`

#### `SearchState`
```ts
{ query: string; results: LocationPoint[]; isLoading: boolean; error: string | null; lastSearchTime?: number }
```
Estado completo de una búsqueda. Almacenado en `usePlannerStore().searchState`.

#### `SearchConfig`
```ts
{ debounceMs: number; minQueryLength: number; maxResults: number }
```
Configuración de búsquedas (debounce, longitud mínima, etc.).

#### `SearchResult`
```ts
{ location: LocationPoint; relevance: number; distance?: number }
```
Resultado individual de búsqueda con score de relevancia.

#### `SearchType`
```ts
type SearchType = 'origin' | 'destination'
```
Tipo de búsqueda según qué punto se está seleccionando.

---

### Navigation Types
`src/types/navigation/navigation.ts`

| Tipo | Pantallas que define |
|------|---------------------|
| `AuthStackParams` | `Welcome`, `Login`, `Register`, `VerifyPhone` |
| `MainTabsParams` | `MapTab`, `ExploreTab`, `RecordTab`, `RidesTab`, `ProfileTab` |
| `MapStackParams` | `Map`, `RouteDetail {routeId}`, `Planner {initialCoords?}`, `ServicePoints` |
| `ActivityStackParams` | `Recording`, `ActivitySummary {activityId}`, `ActivityReplay {activityId}` |
| `ProfileStackParams` | `Profile {userId?}`, `EditProfile`, `Medals {userId}` |
| `RidesStackParams` | `RidesList`, `CreateRide`, `RideDetail {rideId}`, `RideRequests {rideId}` |

---

### Planner Types
`src/types/planner.ts`

#### `LocationPoint`
```ts
{
  id?: string          // ID de Mapbox del lugar
  latitude: number
  longitude: number
  address?: string     // Dirección legible en español (de reverseGeocode)
  placeType?: 'origin' | 'destination'
  timestamp?: number   // Momento de selección (ms)
}
```
**Usada en:** `usePlannerStore`, `PlannerMap`, `LocationSearchScreen`, `LocationInput`, `useLocationSearch`, `useLocationValidation`, `geocoding/*`

#### `RouteCoordinates`
```ts
{ origin: LocationPoint | null; destination: LocationPoint | null }
```
Retornado por `usePlannerStore().getCoordinates()`.

---

## 6. Navegación

### `src/navigation/RootNavigator.tsx` — `RootNavigator`
Navegador raíz de la app. Escucha `onAuthStateChange` de Supabase para reaccionar a cambios de sesión en tiempo real.

| Estado | Muestra |
|--------|---------|
| `isLoading: true` | `LoadingScreen` |
| `session: null` | `AuthStack` (login/registro) |
| `session: Session` | `MainTabs` (app principal) |

**Lógica clave:** Al iniciar, llama `supabase.auth.getSession()` para restaurar sesión persistida en `AsyncStorage`. No requiere que el usuario vuelva a loguearse si la sesión no expiró.

---

### `src/navigation/AuthStack.tsx` — `AuthStack`
Stack de pantallas para usuarios no autenticados.

```
Welcome → Login
       → Register
```
Animación: slide horizontal desde la derecha.

---

### `src/navigation/MainTabs.tsx` — `MainTabs`
Bottom tab navigator con 5 pestañas. Iconos Unicode.

| Tab | Componente | Icono |
|-----|-----------|-------|
| Mapa | `MapStack` | 🗺️ |
| Feed | `FeedScreen` | 📰 |
| Grabar | `RecordStack` | 🎙️ |
| Rodadas | `RidesStack` | 🚴 |
| Perfil | `ProfileStack` | 👤 |

---

### `src/navigation/MapStack.tsx` — `MapStack`
Stack del módulo de mapas.

```
Map (principal) → Planner
               → RouteDetail
               → ServicePoints
```

---

### Stacks secundarios (placeholders)
| Archivo | Navigator | Pantallas |
|---------|-----------|-----------|
| `ProfileStack.tsx` | Stack | `ProfileScreen`, `EditProfileScreen`, `MedalsScreen` |
| `RecordStack.tsx` | Stack | `RecordingScreen`, `ActivitySummaryScreen`, `ActivityReplayScreen` |
| `RidesStack.tsx` | Stack | `RidesListScreen`, `CreateRideScreen`, `RideDetailScreen`, `RideRequestsScreen` |

---

## 7. Pantallas (Screens)

### Auth

#### `src/screens/auth/WelcomeScreen.tsx` — `WelcomeScreen`
Pantalla de bienvenida con logo "RutaCo" y dos botones. Primera pantalla que ve un usuario sin sesión.
- **Navega a:** `Register`, `Login`
- **Estado:** Sin estado local. Sin API calls.

---

#### `src/screens/auth/LoginScreen.tsx` — `LoginScreen`
Formulario de inicio de sesión (email + contraseña).
- **API:** `signIn()` de `@/api/auth`
- **Post-login:** La navegación la maneja `RootNavigator` automáticamente via `onAuthStateChange`. No llama a `navigation.navigate()`.
- **Error handling:** No revela si el email existe por seguridad.

---

#### `src/screens/auth/RegisterScreen.tsx` — `RegisterScreen`
Formulario de registro con campos: nombre completo, username (opcional), email, contraseña.
- **API:** `selfRegister()` de `@/api/auth` (pasa por backend, no directo a Supabase)
- **Validaciones locales:** nombre vacío, email sin `@`, contraseña < 8 chars.
- **Post-registro:** Navega a `Login` con instrucción de confirmar email.
- **Helper:** `translateAuthError()` (local) traduce códigos de error de Supabase al español.

---

### Map

#### `src/screens/map/MapScreen.tsx` — `MapScreen` (Actualizado ✅)
Pantalla principal del mapa. Muestra Mapbox con el mapa Outdoors y la ubicación del usuario. Incluye panel planificador deslizable con gestos táctiles.

**CAMBIOS del refactor:**
- ✅ Ahora obtiene `userLocation` de `usePlannerStore()` (antes estado local)
- ✅ Usa `setUserLocation` del store (sincroniza con PlannerScreen y LocationSearchScreen)
- ✅ Llama `LocationSearchScreen` sin props
- ✅ Usa tipos centralizados (`CameraCoords` de `@/types/map.ts`)

| Elemento | Descripción |
|----------|-------------|
| `RutaCoMap` | Componente de mapa con cámara y puck de usuario |
| Botón "+ Planificar ruta" | Abre modo planificador con panel deslizable inferior |
| Panel deslizable | Muestra inputs de origen/destino. Se arrastra arriba/abajo. Estado compacto cuando se oculta |
| Botón circunflejo | Centra cámara en ruta. Sube con el panel para mantenerse visible |
| Botón toggle | Muestra u oculta el panel expandido (duración 700ms) |
| Banner de error | Muestra si los permisos fueron denegados |

**Estado local (reducido):**
- `cameraCoords` — Posición y zoom de la cámara
- `locationError` — Mensaje de error de permisos
- `panelHeight` — Alto total del panel medido con `onLayout`

**Estado global (del store):**
- `userLocation` — Ubicación GPS actual (SINCRONIZADO)
- `origin`, `destination`, `selectingMode` — Puntos de ruta

**Gestos (PanResponder):**
- **Panel expandido:** deslizar hacia abajo → oculta (300ms)
- **Panel oculto:** deslizar hacia arriba → muestra (700ms)
- Los gestos solo funcionan si hay origen Y destino

**Al montar:** Solicita permisos de ubicación y centra el mapa en la posición del usuario.

**Al montar:** Solicita permisos de ubicación y centra el mapa en la posición del usuario.

---

#### `src/screens/map/PlannerScreen.tsx` — `PlannerScreen` (Actualizado ✅)
Pantalla de planificación de rutas integrada en `MapScreen.tsx` como panel deslizable.

**CAMBIOS del refactor:**
- ✅ Ahora obtiene `userLocation` de `usePlannerStore()` (antes estado local)
- ✅ Usa `setUserLocation` del store (sincroniza con MapScreen)
- ✅ Llama `LocationSearchScreen` sin props

**Flujo:**
1. Usuario ve `PlannerMap` (mapa) + panel inferior deslizable con `LocationInput` x2
2. Al tocar un input → cambia a pantalla fullscreen `LocationSearchScreen`
3. Usuario busca o toca en el mapa
4. Al seleccionar → llama `reverseGeocode()` para obtener dirección legible
5. Guarda en `PlannerStore` con validación (origen ≠ destino)
6. Muestra error si intenta poner la misma ubicación
7. Panel se puede deslizar arriba/abajo con gestos o botones toggle

**Componentes usados:** `PlannerMap`, `LocationInput`, `LocationSearchScreen`, `SwapLocationsButton`

**State (del store):**
- `origin`, `destination`, `selectingMode`, `error` — Ubicaciones
- `userLocation` — Ubicación GPS (SINCRONIZADO con MapScreen)

**Pendiente:** Conectar botón "Calcular Ruta" con API de ruteo.

---

#### `src/screens/map/LocationSearchScreen.tsx` — `LocationSearchScreen` (Refactorizado ✅)
Pantalla fullscreen para buscar una ubicación por nombre/dirección.

✨ **CAMBIO ARQUITECTÓNICO (Refactor):** 
- **ANTES:** Recibía 6 props (prop drilling de 4+ niveles)
- **AHORA:** Sin props. Obtiene todo del store. Usar custom hooks.

```tsx
// ✅ Nuevo uso (sin props)
<LocationSearchScreen />
```

**Integración con estado global:**
- Usa `usePlannerStore()` directamente para: `selectingMode`, `origin`, `destination`, `userLocation`, `setSelectingMode`, `setOrigin`, `setDestination`
- Usa `useLocationSearch()` para debounce de búsqueda (300ms) y gestión de resultados
- Usa `useLocationValidation()` para validar que ubicaciones no sean duplicadas

**Lógica:**
1. Debounce de 300ms en input
2. Busca con `searchPlaces()` (Nominatim/OpenStreetMap)
3. Valida resultado con tolerancia (no puede ser igual a otra ubicación)
4. Guarda en store y cierra pantalla automáticamente
5. "Usar mi ubicación" → geocoding inverso + store

**Beneficios del refactor:**
- Eliminó prop drilling masivo
- Componente más independiente y reutilizable
- Lógica de búsqueda encapsulada en custom hook
- Estado sincronizado entre MapScreen y PlannerScreen

---

#### `src/screens/map/RouteDetailScreen.tsx` — `RouteDetailScreen`
Placeholder. Mostrará el detalle de una ruta seleccionada.

#### `src/screens/map/ServicePointsScreen.tsx` — `ServicePointsScreen`
Placeholder. Mostrará puntos de servicio (talleres, bombas de agua, etc.) en el mapa.

---

### Profile

#### `src/screens/profile/ProfileScreen.tsx` — `ProfileScreen`
Pantalla de perfil del usuario autenticado.
- Muestra: avatar placeholder, nombre, email, estadísticas (`total_distance_km`, `total_elevation_m`, `total_rides`), plan (`free` / `premium`).
- Botón de cierre de sesión con confirmación `Alert`.
- **Store:** `useAuthStore()` para `profile`, `session`, `signOut`.

#### `src/screens/profile/EditProfileScreen.tsx` — Placeholder
#### `src/screens/profile/MedalsScreen.tsx` — Placeholder

---

### Activity (Placeholders)
| Pantalla | Ruta | Estado |
|----------|------|--------|
| `RecordingScreen` | `src/screens/activity/RecordingScreen.tsx` | Placeholder |
| `ActivitySummaryScreen` | `src/screens/activity/ActivitySummaryScreen.tsx` | Placeholder |
| `ActivityReplayScreen` | `src/screens/activity/ActivityReplayScreen.tsx` | Placeholder |

---

### Rides (Placeholders)
| Pantalla | Ruta | Estado |
|----------|------|--------|
| `RidesListScreen` | `src/screens/rides/RidesListScreen.tsx` | Placeholder |
| `CreateRideScreen` | `src/screens/rides/CreateRideScreen.tsx` | Placeholder |
| `RideDetailScreen` | `src/screens/rides/RideDetailScreen.tsx` | Placeholder |
| `RideRequestsScreen` | `src/screens/rides/RideRequestsScreen.tsx` | Placeholder |

---

### Social (Placeholders)
| Pantalla | Ruta | Estado |
|----------|------|--------|
| `FeedScreen` | `src/screens/social/FeedScreen.tsx` | Placeholder |

---

## 8. Componentes

### Map Components

#### `src/components/map/RutaCoMap.tsx` — `RutaCoMap`
Wrapper de `MapboxGL.MapView`. Componente base del mapa usado en toda la app.

| Prop | Tipo | Descripción |
|------|------|-------------|
| `children` | `ReactNode` | Capas, fuentes, pines adicionales |
| `onMapReady` | `() => void` | Callback cuando el mapa termina de cargar |
| `onPress` | `([lon, lat]) => void` | Tap en el mapa → devuelve coordenadas |
| `followUser` | `boolean` | Si la cámara sigue al usuario (default `false`) |
| `cameraRef` | `Ref<Camera>` | Ref externo para controlar la cámara |
| `cameraCoords` | `{longitude, latitude, zoom?}` | Posición declarativa de la cámara |

**Configura:**
- Estilo `Outdoors` (curvas de nivel, relieve, ideal para ciclismo)
- `LocationPuck` (punto azul del usuario con bearing)
- Brújula visible al rotar el mapa con márgenes personalizados: `compassViewMargins={{ x: 5, y: 100 }}` (100px hacia arriba)
- `MapboxGL.setAccessToken()` al importar el módulo
- ✅ Usa `CameraCoords` centralizado de `@/types/map.ts` (eliminó duplicado)

**Usada en:** `MapScreen.tsx`, `PlannerMap.tsx`

---

#### `src/components/map/PlannerMap.tsx` — `PlannerMap` (Actualizado ✅)
Mapa interactivo del planificador. Extiende `RutaCoMap` con capas para origen, destino y línea de ruta provisional.

**CAMBIOS del refactor:**
- ✅ Usa `CameraCoords` centralizado de `@/types/map.ts` (unificó tipos con RutaCoMap)

| Prop | Tipo | Descripción |
|------|------|-------------|
| `origin` | `LocationPoint \| null` | Punto de salida (círculo verde) |
| `destination` | `LocationPoint \| null` | Punto de llegada (círculo rojo) |
| `selectingMode` | `'origin' \| 'destination' \| null` | Si está activo, el tap en el mapa crea un punto |
| `onLocationSelect` | `(location, type) => void` | Callback al tocar el mapa en modo selección |

**Capas:**
- **Origen:** `CircleLayer` verde (#10b981) con borde
- **Destino:** `CircleLayer` rojo (#ef4444) con borde
- **Línea provisional:** `LineLayer` azul punteado entre ambos puntos (visible solo si hay ambos puntos)

**Usada en:** `PlannerScreen.tsx`

---

### Planner Components

#### `src/components/planner/LocationInput.tsx` — `LocationInput`
Input visual para mostrar/seleccionar un punto de ruta en el panel inferior.

| Prop | Tipo | Descripción |
|------|------|-------------|
| `label` | `string` | Texto del label (ej: "📍 Punto de Salida") |
| `value` | `LocationPoint \| null` | Punto actualmente seleccionado |
| `type` | `'origin' \| 'destination'` | Tipo de punto |
| `onPress` | `() => void` | Abre la selección (activa `selectingMode`) |
| `isSelecting` | `boolean` | Si está en modo de selección activo |
| `onClear` | `() => void` | Limpia el punto seleccionado |
| `placeholder` | `string` | Texto cuando no hay valor |

**Visual:** Muestra coordenadas + dirección si hay valor. Spinner si está seleccionando. Botón `✕` para limpiar.

**Usada en:** `PlannerScreen.tsx`

---

#### `src/components/planner/LocationSearch.tsx` — `LocationSearch`
Buscador de ubicaciones con debounce. ⚠️ **Componente legacy** — la pantalla fullscreen `LocationSearchScreen` lo reemplaza en el flujo actual. Puede reutilizarse en otros contextos embebidos.

| Prop | Tipo | Descripción |
|------|------|-------------|
| `onSelect` | `(location) => void` | Callback al elegir resultado |
| `placeholder` | `string` | Texto del input |
| `type` | `'origin' \| 'destination'` | Para mensajes de error de duplicado |
| `excludeLocation` | `LocationPoint \| null` | Excluir una ubicación de los resultados |

**Usada en:** No usada actualmente en el flujo principal.

---

### Carpetas Vacías Preparadas

Estas carpetas existen en el repositorio pero aún no tienen archivos. Están preparadas para futuras funcionalidades:

| Carpeta | Propósito previsto |
|---------|-------------------|
| `src/components/common/` | Botones genéricos, inputs, modales reutilizables en toda la app |
| `src/components/route/` | Componentes para mostrar/previsualizar rutas publicadas |
| `src/components/social/` | Cards de publicaciones, comentarios, likes para el feed |
| `src/utils/` | Funciones utilitarias puras (formatters, validators, helpers) |

---

#### `src/components/planner/SwapLocationsButton.tsx` — `SwapLocationsButton`
Botón que intercambia origen y destino.

| Prop | Tipo | Descripción |
|------|------|-------------|
| `onPress` | `() => void` | Llama a `usePlannerStore().swapLocations()` |
| `disabled` | `boolean` | Deshabilitado si falta origen o destino |

**Usada en:** `PlannerScreen.tsx`

---

## 9. Hooks

### `src/hooks/useRequireVerifiedPhone.ts` — `useRequireVerifiedPhone()`
Hook que protege pantallas que requieren teléfono verificado.

**Qué hace:** Al montar, revisa `profile.phone_verified`. Si es `false`, muestra un `Alert` con opciones "Cancelar" (go back) o "Verificar ahora" (navega a `VerifyPhone`).

**Usada en:** Pensada para `CreateRideScreen` y `RideDetailScreen`. Actualmente no usada (esas pantallas son placeholder).

---

### `src/hooks/useLocationManager.ts` — `useLocationManager()` (NUEVO ✨)
Custom hook para gestionar permisos y ubicación actual del usuario. Encapsula lógica de Location Expo.

**Configuración:**
```ts
useLocationManager({
  autoStart: true,              // Inicia automáticamente al montar
  highAccuracy: true            // Usa GPS de alta precisión
})
```

**Returns:**
```ts
{
  userLocation: LocationPoint | null,
  isLoading: boolean,
  error: string | null,
  requestPermissions: () => Promise<boolean>,
  startWatchingLocation: () => Promise<void>,
  stopWatchingLocation: () => void,
  getCurrentLocation: () => Promise<LocationPoint | null>
}
```

**Qué hace:**
- ✅ Solicita permisos de ubicación (ForegroundPermissions)
- ✅ Obtiene ubicación actual con `Location.getCurrentPositionAsync()`
- ✅ Realiza geocoding inverso (dirección legible)
- ✅ Monitorea ubicación continuamente con `watchPositionAsync()` (cada 5s o 10m)
- ✅ Integrado con `usePlannerStore().setUserLocation()` para sincronizar con store

**Características:**
- Auto-cleanup al desmontar (detiene watchPosition automáticamente)
- Manejo de errores con mensajes en español
- Soporta alta precisión o modo equilibrado

**Usada en:** `MapScreen.tsx`, `PlannerScreen.tsx` (opcional)

---

### `src/hooks/useLocationSearch.ts` — `useLocationSearch()` (NUEVO ✨)
Custom hook para búsqueda de lugares con debounce. Centraliza lógica de búsqueda.

**Configuración:**
```ts
useLocationSearch({
  debounceMs: 300,              // Espera antes de buscar (ms)
  minQueryLength: 2             // Mínimo caracteres para buscar
})
```

**Returns:**
```ts
{
  query: string,
  results: LocationPoint[],
  isLoading: boolean,
  error: string | null,
  setQuery: (query: string) => void,
  clearSearch: () => void,
  search: (query: string) => Promise<LocationPoint[]>
}
```

**Qué hace:**
- ✅ Búsqueda con debounce (300ms por defecto)
- ✅ Llama `searchPlaces()` (Nominatim/OpenStreetMap)
- ✅ Gestiona estado vía `usePlannerStore().searchState`
- ✅ Limpia timer al desmontar
- ✅ Manejo de errores integrado

**Características:**
- `setQuery()`: búsqueda con debounce automático
- `search()`: búsqueda inmediata (sin espera)
- `clearSearch()`: resetea búsqueda

**Usada en:** `LocationSearchScreen.tsx`

---

### `src/hooks/useLocationValidation.ts` — `useLocationValidation()` (NUEVO ✨)
Custom hook para validación de ubicaciones. Centraliza reglas de negocio.

**Returns:**
```ts
{
  validateExcludedLocation: (location, excludedLocation) => ValidationResult,
  validateOriginDestination: (location, otherLocation, type) => ValidationResult,
  validateLocationPoint: (location) => ValidationResult,
  validateCoordinates: (latitude, longitude) => ValidationResult
}
```

**ValidationResult:**
```ts
{ isValid: boolean; message?: string; code?: string }
```

**Validaciones:**
- ✅ `validateExcludedLocation()`: ubicación no sea igual a la excluida (tolerancia 100m)
- ✅ `validateOriginDestination()`: origen ≠ destino (tolerancia 50m)
- ✅ `validateLocationPoint()`: estructura válida
- ✅ `validateCoordinates()`: lat -90 a 90, lng -180 a 180

**Mensajes de error en español:**
- "Esta ubicación ya fue seleccionada"
- "El punto de salida/llegada no puede ser igual al de llegada/salida"
- "Coordenadas inválidas"

**Usada en:** `LocationSearchScreen.tsx`

---

## 10. Debug

> Solo para desarrollo. No incluir en producción.

#### `src/debug/checkBackendConnection.ts` — `checkBackendConnection()`
Diagnóstico completo del backend: verifica `/health` y `/auth/self-register`. Imprime tiempos de respuesta y status HTTP en consola.

#### `src/debug/quickConnectionTest.ts` — `quickConnectionTest()`
Test rápido: `fetch` a `/health`. Retorna `boolean`. Para verificación rápida de conectividad.

#### `src/debug/testEndpoint.ts` — `testEndpoint(endpoint, method?, body?)`
Test de cualquier endpoint del backend. Imprime status y response en consola.

---

## 11. Constantes

### `src/constants/colors.ts` — `COLORS`

| Grupo | Claves |
|-------|--------|
| Principal | `primary` (#0ea5e9 azul eléctrico), `primaryDark`, `primaryLight` |
| Secundario | `secondary` (#f5f5f5) |
| Fondos | `background` (#0f1117 oscuro), `surface` (#1a1d27), `surfaceAlt` (#252836) |
| Texto | `text` (#f8fafc), `textSecondary` (#94a3b8), `textMuted` (#475569) |
| Bordes | `border` (#2d3748) |
| Elevación (gradientes) | `gradientFlat`, `gradientMild`, `gradientModerate`, `gradientSteep`, `gradientVerySteep` |
| Semáforo seguridad | `safeGreen`, `cautionYellow`, `dangerRed` |
| Estados | `error` (#ef4444), `warning`, `success`, `info` |

---

## 12. Dependencias Clave

| Paquete | Versión | Uso |
|---------|---------|-----|
| `expo` | ~54.0.33 | Framework base |
| `react-native` | 0.81.5 | UI nativa |
| `@rnmapbox/maps` | ^10.1.0 | Mapas Mapbox |
| `@supabase/supabase-js` | ^2.104.1 | Backend BaaS (auth, DB) |
| `@react-navigation/native` | ^7.2.2 | Navegación |
| `@react-navigation/bottom-tabs` | ^7.15.10 | Tabs inferiores |
| `@react-navigation/stack` | ^7.8.11 | Stack navigation |
| `zustand` | ^5.0.12 | Estado global |
| `expo-location` | ~19.0.8 | GPS del dispositivo |
| `react-native-mmkv` | ^4.3.1 | Storage rápido |
| `@tanstack/react-query` | ^5.99.2 | Cache de datos del servidor (instalado, no usado aún) |
| `expo-speech` | ~14.0.8 | Guía auditiva (instalado, no usado aún) |
| `react-native-reanimated` | ~4.1.1 | Animaciones |

---

## 13. Variables de Entorno

Archivo local: `.env` (ignorado por git, **nunca commitear**)
Plantilla: `.env.example`

| Variable | Usado en | Descripción |
|----------|----------|-------------|
| `EXPO_PUBLIC_SUPABASE_URL` | `src/api/supabase.ts` | URL del proyecto Supabase |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | `src/api/supabase.ts` | Clave anónima de Supabase |
| `EXPO_PUBLIC_MAPBOX_TOKEN` | `src/config/mapbox.ts`, `RutaCoMap.tsx`, `reverseGeocode.ts` | Token público de Mapbox (para mapa y reverse geocoding; búsquedas usan Nominatim gratuito) |
| `RNMAPBOX_MAPS_DOWNLOAD_TOKEN` | `app.json` (build nativo) | Token secreto de Mapbox para descargar el SDK nativo |
| `REACT_APP_BACKEND_URL` | `src/config/backendUrl.ts` | URL del backend Node.js (loggin-mcp) |
| `EXPO_PUBLIC_OPEN_METEO_URL` | No usado aún | URL de Open-Meteo para clima |

---

## 14. Flujos Principales

### 🎨 Gestos de Panel Deslizable (Planificador)
**Implementado en:** `MapScreen.tsx` usando `PanResponder` de React Native

```
Panel expandido (muestra inputs)
  ├─ Deslizar 50px+ hacia ABAJO → Ocultar (300ms animation)
  ├─ Velocidad > 0.3 hacia abajo → Ocultar instantáneo
  ├─ Tocar botón "−" → Ocultar (300ms)
  └─ Tocar botón "⌃" cuando está oculto → Mostrar (700ms)

Panel oculto (vista compacta con dirección resumida)
  ├─ Deslizar 50px+ hacia ARRIBA → Mostrar (700ms animation)
  ├─ Velocidad > 0.3 hacia arriba → Mostrar instantáneo
  ├─ Tocar botón "⌃" → Mostrar (700ms)
  └─ Tocar lápiz "✎" → Mostrar (700ms)
```

**Detalles técnicos:**
- Velocidad de animación: 300ms ocultar (rápido), 700ms mostrar (lento, efecto "suave")
- Refs congelados: `isPanelExpandedRef`, `isGestureEnabledRef` mantienen valores actuales en el `PanResponder`
- Botón `⊙` se anima con `panelDragY` para subir cuando el panel baja
- Brújula nativa sube 100px con `compassViewMargins={{ x: 5, y: 100 }}`

---

### 🔐 Flujo de Autenticación
```
App abre
  └─ RootNavigator → supabase.getSession()
        ├─ Sesión válida en AsyncStorage → MainTabs
        └─ Sin sesión → AuthStack
              └─ WelcomeScreen
                    ├─ RegisterScreen → selfRegister() → backend → Supabase → OK → LoginScreen
                    └─ LoginScreen → signIn() → Supabase → OK → onAuthStateChange → MainTabs
```

### 🗺️ Flujo de Planificación de Ruta (Refactor ✅)
```
MapScreen → toca "Planificar ruta"
  └─ PlannerScreen (obtiene estado del store, NO pasa props)
        ├─ Toca "Punto de Salida"
        │     └─ LocationSearchScreen (fullscreen, SIN PROPS)
        │           ├─ Obtiene selectingMode, origin, destination, userLocation del store
        │           ├─ useLocationSearch() → búsqueda con debounce (300ms)
        │           │     └─ searchPlaces() → Nominatim/OpenStreetMap
        │           ├─ useLocationValidation() → valida duplicados
        │           ├─ Selecciona resultado → setOrigin(location) al store
        │           └─ "Usar mi ubicación" → useLocationManager() → GPS + reverseGeocode
        ├─ Toca "Punto de Llegada"
        │     └─ igual que arriba → setDestination(location)
        │           └─ Validación automática: no puede ser igual al origen (50m tolerancia)
        ├─ Error si intenta duplicada → mensaje de error en alert
        ├─ "⇅ Intercambiar" → swapLocations()
        └─ "Calcular Ruta 🚴" → [PENDIENTE: API de ruteo]

✨ CAMBIOS DEL REFACTOR:
- LocationSearchScreen NO recibe props (eliminó prop drilling)
- Estado sincronizado en usePlannerStore (userLocation compartido)
- Custom hooks encapsulan lógica (useLocationSearch, useLocationManager, useLocationValidation)
- Validación centralizada y reutilizable
```

### 📡 Flujo de Sesión en Tiempo Real
```
Cualquier cambio de sesión (login, logout, token refresh)
  └─ supabase.auth.onAuthStateChange → RootNavigator
        ├─ Si session → loadProfile(userId) → authStore.profile
        └─ Si null → AuthStack
```

---

## 📋 Resumen del Refactor Arquitectónico (✅ Completado)

**Objetivo:** Mejorar arquitectura sin modificar funcionalidad.

**Cambios Realizados:**

| Categoría | Detalles |
|-----------|----------|
| **Tipos Centralizados** | ✅ `src/types/map.ts`, `src/types/search.ts` (eliminó duplicación de `CameraCoords`) |
| **Stores Expandidos** | ✅ `usePlannerStore` ahora maneja: origin, destination, userLocation, searchState |
| **Nuevas Stores** | ✅ `useMapStore` para estado del mapa (camera, panel, markers) |
| **Custom Hooks** | ✅ `useLocationManager` (GPS + reverse geocoding) |
| | ✅ `useLocationSearch` (búsqueda con debounce 300ms) |
| | ✅ `useLocationValidation` (validación de ubicaciones) |
| **Prop Drilling** | ✅ Eliminado: LocationSearchScreen ahora obtiene estado del store (0 props) |
| **Componentes Refactor** | ✅ MapScreen, PlannerScreen, LocationSearchScreen, RutaCoMap, PlannerMap |
| **Compilación** | ✅ 0 errores TypeScript en todo el proyecto |
| **Funcionalidad** | ✅ 100% preservada (sin cambios UI, mismo comportamiento) |

**Beneficios:**
- Mayor reutilizabilidad de lógica a través de custom hooks
- Estado centralizado y sincronizado entre pantallas
- Componentes más simples y predecibles
- Facilita testing y mantenimiento futuro
- Escalabilidad mejorada para nuevas funciones

---

*Fin del diccionario. Actualizar este archivo cuando se añadan nuevas funciones, pantallas o cambios estructurales.*
