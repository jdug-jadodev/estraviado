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
10. [Utils](#10-utils-nuevas-)
11. [Debug](#11-debug)
12. [Constantes](#12-constantes)
13. [Dependencias Clave](#13-dependencias-clave)
14. [Variables de Entorno](#14-variables-de-entorno)
15. [Flujos Principales](#15-flujos-principales)

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

### `src/api/routing/` — Cálculo de Rutas (NUEVO ✨)

#### `getRoute.ts` — Función Principal
Calcula rutas reales entre dos puntos usando **OSRM (Open Source Routing Machine)**.

**Firma:**
```ts
export async function getRoute(
  origin: LocationPoint,
  destination: LocationPoint,
  options?: RouteCalculationOptions
): Promise<CalculatedRoute>
```

**Qué retorna:**
```ts
{
  id?: string
  geometry: GeoJSONLineString     // Coordenadas reales siguiendo calles
  distance_km: number             // Distancia real (no línea recta)
  duration_minutes: number        // Tiempo estimado pedalando
  steps?: RouteStep[]             // Instrucciones paso a paso (futuro)
  elevation_gain_m?: number       // Ganancia elevación (futuro)
  difficulty?: 'plano' | 'moderado' | 'dificil'
  calculatedAt: number
}
```

**Opciones por defecto:**
```ts
{
  profile: 'bike',                // Perfil: ciclismo optimizado
  overview: 'full',               // Geometría: detallada completa
  geometries: 'geojson'           // Formato: GeoJSON (no polyline)
}
```

**Validaciones:**
- ✅ Rechaza coordenadas NaN o inválidas
- ✅ Rechaza puntos separados menos de 1 metro
- ✅ Valida rango: lat [-90, 90], lng [-180, 180]

**Manejo de errores OSRM:**
| Código | Significado | Ejemplo |
|--------|-------------|---------|
| `NoRoute` | No hay ruta posible | Isla sin puente |
| `InvalidInput` | Coordenadas fuera de rango | lat > 90 |
| `ServerError` | OSRM no responde | Servidor caído |

**Logs de debugging:**
```
[OSRM] ✅ Ruta calculada: 15.2 km en 45 min (moderado)
[OSRM] ❌ Error: NoRoute - no hay ruta disponible
[OSRM] ⚠️ Invalid coordinates: NaN detected in origin
```

**Ejemplo:**
```ts
const route = await getRoute(
  { latitude: 4.7110, longitude: -74.0721, address: 'Centro Bogotá' },
  { latitude: 4.6516, longitude: -74.0976, address: 'Usaquén' }
)

console.log(`${route.distance_km} km | ${route.duration_minutes} min`)
// Output: "15.2 km | 45 min"
```

**API OSRM:**
- Base: `https://router.project-osrm.org/route/v1`
- Ruta: `/bike/{lng1},{lat1};{lng2},{lat2}`
- Query: `?overview=full&geometries=geojson`
- **✨ Totalmente gratuito, sin API key**

**Usada en:** `useRouteCalculation()` hook

---

#### `index.ts` — Barrel Export
```ts
export { getRoute, getRouteWithWaypoints, matchDrawnRoute, calculateGreatCircleDistance } from './getRoute'
export type { CalculatedRoute, RouteStep, RouteCalculationOptions } from '@/types/route'
```

Centraliza exports. Permite: `import { getRoute, matchDrawnRoute } from '@/api/routing'`

> **`matchDrawnRoute`** — Firma: `matchDrawnRoute(points, options?) → Promise<CalculatedRoute>`. Usa el endpoint OSRM `/match/v1` (map-matching) para adherir un trazo GPS a las calles. Disponible pero no usada en el flujo principal actual (se usa `getRoute` simple).

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
| **Estado** | `origin`, `destination`, `selectingMode`, `error`, `userLocation`, `locationError`, `searchState`, `route`, `isCalculatingRoute`, `routeError`, `isDrawingMode`, `drawnStrokes` |

**Estado de ubicaciones:**

| Acción | Retorna | Qué hace |
|--------|---------|----------|
| `setOrigin(location)` | `boolean` | Guarda el punto de salida. Valida que no sea igual al destino (tolerancia 50m). |
| `setDestination(location)` | `boolean` | Igual que `setOrigin` pero para el destino. |
| `setSelectingMode(mode)` | `void` | Activa el modo de selección por búsqueda (`'origin'`, `'destination'`, o `null`). Muestra `LocationSearchScreen`. |
| `setPinDropMode(mode)` | `void` | ⭐ Activa el modo de pin drop (`'origin'`, `'destination'`, o `null`). Cierra `LocationSearchScreen` y muestra banner en el mapa para tocar y marcar el punto. |
| `setError(error)` | `void` | Guarda mensaje de error. |
| `swapLocations()` | `void` | Intercambia origen y destino. |
| `clearLocations()` | `void` | Resetea ubicaciones + `selectingMode` + `pinDropMode`. |
| `getCoordinates()` | `RouteCoordinates` | Devuelve `{origin, destination}`. |
| `isValid()` | `boolean` | `true` si origen Y destino existen. |

**Estado del usuario:**

| Acción | Retorna | Qué hace |
|--------|---------|----------|
| `setUserLocation(location)` | `void` | Guarda ubicación GPS actual del usuario. Sincroniza con MapScreen y LocationSearchScreen. |
| `setLocationError(error)` | `void` | Guarda errores de permisos/GPS. |

**Estado de búsqueda:**

| Acción | Retorna | Qué hace |
|--------|---------|----------|
| `setSearchQuery(query)` | `void` | Establece el texto de búsqueda. |
| `setSearchResults(results)` | `void` | Guarda resultados de búsqueda. |
| `setSearchLoading(isLoading)` | `void` | Indica si está buscando. |
| `setSearchError(error)` | `void` | Guarda errores de búsqueda. |
| `clearSearch()` | `void` | Resetea búsqueda. |

**Estado de ruta (NUEVO ✨):**

| Acción | Retorna | Qué hace |
|--------|---------|----------|
| `setRoute(route)` | `void` | Guarda la ruta calculada. Sincroniza automáticamente con MapScreen para renderizar en el mapa. |
| `setIsCalculatingRoute(isCalculating)` | `void` | Indica si está calculando (muestra spinner). |
| `setRouteError(error)` | `void` | Guarda errores del cálculo de ruta. |
| `clearRoute()` | `void` | Resetea la ruta calculada. |

**Estado de dibujo manual:**

| Acción | Retorna | Qué hace |
|--------|---------|----------|
| `setIsDrawingMode(mode)` | `void` | Activa/desactiva el modo de dibujo. Al activar: limpia `selectingMode`, `pinDropMode`, **y también `route` + `routeError`** (evita datos rancios en la card). |
| `beginNewStroke()` | `void` | Abre un nuevo array vacío en la pila `drawnStrokes`. Llamado al poner el dedo en el mapa. |
| `addDrawnPoint(point)` | `void` | Añade un `LocationPoint` al **último** stroke de la pila. |
| `undoLastStroke()` | `void` | Elimina únicamente el último trazo de la pila (ctrl+z). Los anteriores se conservan. |
| `clearDrawnPoints()` | `void` | Vacía `drawnStrokes` completamente y desactiva `isDrawingMode`. |

**Usada en:** `LocationSearchScreen.tsx`, `MapScreen.tsx`, `useLocationSearch.ts`, `useRouteCalculation.ts`, `DrawingModeBanner.tsx`

> **Estado de dibujo:** `drawnStrokes: LocationPoint[][]` — pila de trazos. Cada elemento es un array de puntos de un trazo individual. Permite deshacer trazo a trazo con `undoLastStroke()`. `setSelectingMode` y `setPinDropMode` (al activar con valor no-null) resetean `drawnStrokes: []` automáticamente.

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

### Route Types (NUEVO ✨)
`src/types/route.ts`

#### `CalculatedRoute`
```ts
{
  id?: string
  geometry: GeoJSONLineString           // Coordenadas reales de la ruta
  distance_km: number                   // Distancia en kilómetros
  duration_minutes: number              // Tiempo estimado en minutos
  steps?: RouteStep[]                   // Instrucciones (para futuro)
  elevation_gain_m?: number             // Elevación acumulada (para futuro)
  difficulty?: 'plano' | 'moderado' | 'dificil'
  calculatedAt?: number                 // Timestamp de cálculo
}
```
Retornada por `getRoute()` y almacenada en `usePlannerStore().route`.

#### `RouteStep`
```ts
{
  instruction: string
  distance_m: number
  duration_seconds: number
  coordinates: [number, number][]
  maneuver?: 'turn-left' | 'turn-right' | 'straight' | 'u-turn'
}
```
Paso individual dentro de una ruta (para instrucciones giro a giro en el futuro).

#### `RouteCalculationOptions`
```ts
{
  profile?: 'bike' | 'foot'             // Perfil de ruteo (default: 'bike')
  overview?: 'full' | 'simplified'      // Nivel de detalle (default: 'full')
  geometries?: 'geojson'                // Formato de geometría (default: 'geojson')
  includeElevation?: boolean            // Incluir datos de elevación
}
```
Opciones de configuración para `getRoute()`.

---

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

#### `src/screens/map/MapScreen.tsx` — `MapScreen` (Refactorizado ✅)
Pantalla principal del mapa. Muestra Mapbox con el mapa Outdoors, ubicación del usuario, y panel planificador deslizable. **Integrado con ruteo real (OSRM)**.

**CAMBIOS RECIENTES — Modo Dibujo (trazo libre) ✅:**
- ✅ **Bug corregido:** primer punto ya no se registra al pulsar el botón lápiz — `isDrawingMode` removido del `onPress` de Mapbox
- ✅ **Trazo continuo:** overlay transparente con Responder API captura movimiento de 1 dedo → `getCoordinateFromView` convierte píxeles a coordenadas → punto añadido cada 15px de movimiento
- ✅ **2 dedos = pan/zoom:** `onStartShouldSetResponder` retorna `false` con más de 1 toque → Mapbox recibe el gesto nativamente
- ✅ **Panel colapsa automáticamente** al activar el modo dibujo (250ms) → deja el mapa libre
- ✅ Refs nuevos: `isDrawingModeRef`, `lastDrawnScreenPos`, constante `MIN_DRAW_DISTANCE_PX = 15`
- ✅ Callbacks nuevos: `handleDrawGestureStart`, `handleDrawGestureMove`, `handleDrawGestureEnd`

**CAMBIOS ANTERIORES (REFACTOR):**
- ✅ Componente `PinDropBanner` extraído como componente independiente
- ✅ Componente `RouteDetailsCard` extraído como componente independiente
- ✅ Eliminado código JSX inline duplicado (~95 líneas)
- ✅ Bug de solapamiento: `RouteDetailsCard` retorna `null` cuando `pinDropMode` está activo
- ✅ Mejor mantenibilidad: cada componente auto-contiene su lógica y estilos
- ✅ Estado global para evitar prop drilling: ambos componentes leen de `usePlannerStore`

**CAMBIOS ANTERIORES:**
- ✅ Panel deslizable con animaciones suaves (300ms ocultar, 400ms mostrar)
- ✅ Vista compacta y expandida del panel (toggle con botones − / ⌃)
- ✅ Auto-colapso del panel al presionar "Calcular Ruta 🚴" (ambos botones: expandido y compacto)
- ✅ Route details card flotante mostrando: distancia (km), duración (Xh Ym), dificultad (color)
- ✅ Indicador de carga (spinner) durante cálculo de OSRM
- ✅ Renderiza línea **sólida** azul cuando ruta está calculada (geometría real OSRM)
- ✅ Renderiza línea **punteada** gris como fallback cuando no hay ruta
- ✅ Integración con `useRouteCalculation()` hook
- ✅ `clearRoute()` llamado al iniciar nuevo cálculo → evita mostrar ruta anterior

| Elemento | Descripción | Estado |
|----------|-------------|--------|
| `RutaCoMap` | Componente de mapa con cámara y puck de usuario | ✅ Actualizado |
| Botón "+ Planificar ruta" | Abre modo planificador con panel deslizable | ✅ Funcional |
| Panel deslizable | Muestra inputs de origen/destino. Se arrastra arriba/abajo. Dos vistas: expandida/compacta | ✅ Completo |
| Botón "Calcular Ruta 🚴" | Llama a `useRouteCalculation().calculateRoute()` → OSRM API → renderiza ruta real. **Ahora colapsa panel automáticamente** | ✅ Completo |
| Spinner de carga | Visible durante petición a OSRM (mientras `isCalculating: true`) | ✅ Funcional |
| Botón circunflejo | Centra cámara en ruta. Sube con el panel para mantenerse visible | ✅ Funcional |
| Botón toggle − / ⌃ | Expande/colapsa el panel con animación (solo visible cuando hay origen y destino) | ✅ Nuevo |
| Route Details Card | Card flotante en la parte superior mostrando distancia, duración, dificultad. Solo visible cuando panel colapsado | ✅ Nuevo |
| Banner de error | Muestra permisos denegados o errores de cálculo | ✅ Funcional |
| Botón lápiz ✏️ | Activa modo de dibujo libre. Posicionado flotante a la derecha. Rojo cuando activo. **Oculto cuando `selectingMode !== null` (búsqueda de dirección abierta).** | ✅ Completo |
| Overlay de dibujo | `View` transparente `absoluteFillObject` zIndex 15. 1 dedo = trazo, 2 dedos = pan/zoom | ✅ Completo |
| `DrawingModeBanner` | Banner púrpura con contador de trazos, botón **Calcular**, **↩ Deshacer** (undo stack) y **Limpiar** | ✅ Completo |

**Estado local (Animated refs y state):**
- `cameraCoords` — Posición y zoom de la cámara
- `locationError` — Mensaje de error de permisos
- `panelHeight` — Alto total del panel medido con `onLayout`
- `panelDragY` — Animated.Value para la posición Y del panel (se modifica con gestos)
- `plannerActive` — Si está en modo planificador
- `isPanelExpanded` — Si panel está expandido (true) o compacto (false)
- `panelHiddenY` — Ref: altura a la que se oculta el panel (panelHeight - 80)
- `isPanelExpandedRef` — Ref: valor actual de isPanelExpanded para acceso en PanResponder
- `isGestureEnabledRef` — Ref: habilitar gestos solo cuando hay origen y destino
- `isDrawingModeRef` — Ref: espejo sincronizado de `isDrawingMode` para uso en callbacks async
- `lastDrawnScreenPos` — Ref: última posición (x,y) del dedo para throttle de puntos
- `MIN_DRAW_DISTANCE_PX = 15` — Constante: distancia mínima en píxeles para registrar nuevo punto

**Estado global (del store via `useRouteCalculation`):**
- `origin`, `destination` — Puntos de ruta
- `route` — Ruta calculada (null hasta que se presiona botón)
- `isCalculatingRoute` — Si está esperando respuesta de OSRM
- `routeError` — Error del cálculo
- `pinDropMode` — Si está activo, el mapa captura el siguiente toque como punto de salida o llegada
- `isDrawingMode` — Si está activo, el overlay captura trazos libres del dedo
- `drawnStrokes` — Pila de trazos: `LocationPoint[][]`. Cada elemento es un trazo individual del dedo.

**Flujo de cálculo de ruta (ACTUALIZADO):**
```
Usuario presiona "Calcular Ruta 🚴" (panel expandido o compacto)
  ↓
Panel se colapsa automáticamente (250ms) → hideTarget = panelHeight - 80
  ↓
useRouteCalculation.calculateRoute() inicia
  ↓
clearRoute() → ruta anterior eliminada del store (mapa muestra línea punteada)
  ↓
setIsCalculatingRoute(true) → spinner visible en botón
  ↓
getRoute(origin, destination) → petición a OSRM
  ↓
OSRM retorna geometría GeoJSON
  ↓
setRoute(calculatedRoute) → guardado en store
  ↓
setIsCalculatingRoute(false) → spinner desaparece
  ↓
MapScreen renderiza automáticamente:
  - LineLayer sólida azul (ruta real de OSRM)
  - Route details card flotante: distancia, duración (Xh Ym), dificultad coloreada
  - Información visible sin cerrar el mapa
```

**Gestos (PanResponder - Actualizado):**
- **Panel expandido + deslizar 50px+ hacia abajo** → oculta (300ms)
- **Panel expandido + deslizar con velocidad > 0.3 hacia abajo** → oculta instantáneo
- **Panel oculto + deslizar 50px+ hacia arriba** → muestra (400ms)
- **Panel oculto + deslizar con velocidad > 0.3 hacia arriba** → muestra instantáneo
- **Botón toggle − (expandido)** → oculta panel
- **Botón toggle ⌃ (compacto)** → muestra panel
- **Activar `pinDropMode`** → colapsa panel automáticamente (250ms) para dejar el mapa despejado
- **Activar `isDrawingMode`** → colapsa panel automáticamente (250ms) para dejar el mapa libre
- Los gestos solo funcionan si hay origen Y destino

**Overlay de dibujo libre (zIndex 15, encima del mapa):**
- Solo montado cuando `isDrawingMode && plannerActive`
- `onStartShouldSetResponder`: retorna `true` solo si `touches.length === 1` → 1 dedo dibuja
- `onMoveShouldSetResponder`: igual que arriba
- `onResponderGrant` → `handleDrawGestureStart`: llama `beginNewStroke()` (nuevo trazo en la pila) y registra primer punto
- `onResponderMove` → `handleDrawGestureMove`: añade punto al trazo activo si el dedo se movió ≥15px
- `onResponderRelease/Terminate` → `handleDrawGestureEnd`: limpia `lastDrawnScreenPos`
- `onResponderTerminationRequest: true` → el mapa puede retomar el control al añadirse 2° dedo
- Conversión de píxeles a coords: `mapRef.current?.getCoordinateFromView([x, y])`

**Vistas visuales:**

1. **Vista expandida (isPanelExpanded: true)**
   - ScrollView con:
     - Botón "✕ Cancelar" para salir del modo planificador
     - Inputs de origin/destination
     - Botón "⇅ Intercambiar" (si hay ambos puntos)
     - Botón "Calcular Ruta 🚴" (si hay ambos puntos) - **AHORA COLAPSA PANEL**
     - Botón "Limpiar todo" (si hay al menos un punto)

2. **Vista compacta (isPanelExpanded: false)**
   - Barra de 80px mostrando:
     - Label resumido: "📍 Salida → 🎯 Llegada" (direcciones cortas)
     - Botón "🚴" (calcular ruta) - **AHORA COLAPSA PANEL**
     - Botón "✎" (editar/expandir panel)

3. **Route Details Card (NUEVO)**
   - Solo visible cuando: `route !== null AND plannerActive AND !isPanelExpanded`
   - Posición: `top: insets.top + 16` (debajo del safe area)
   - Contenido:
     ```
     ┌─────────────────┐
     │ 📍 Tu Ruta      │  ← Header azul claro
     ├─────────────────┤
     │ Distancia: 15.2 km
     │ Duración:  2h 14m
     │ Dificultad: 🔴 dificil (rojo)
     └─────────────────┘
     ```
   - Estilos:
     - Fondo blanco, bordes oscuros, sombra
     - Dificultad: colores verde (plano), naranja (moderado), rojo (dificil)
     - Font: semibold 14px

**Permisos al montar:**
- Solicita `Location.ForegroundPermissions`
- Centra mapa en ubicación del usuario
- Obtiene ubicación de alta precisión en background
- Mensaje de error si se deniegan permisos

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

#### `src/screens/map/LocationSearchScreen.tsx` — `LocationSearchScreen` (Actualizado ✅)
Pantalla fullscreen para buscar una ubicación por nombre/dirección. Adaptada según `selectingMode` (`'origin'` o `'destination'`).

```tsx
// Sin props — obtiene todo del store
<LocationSearchScreen />
```

**Integración con estado global:**
- Usa `usePlannerStore()` para: `selectingMode`, `origin`, `destination`, `userLocation`, `setSelectingMode`, `setPinDropMode`
- Usa `useLocationSearch()` para debounce de búsqueda (300ms)
- Usa `useLocationValidation()` para validar duplicados

**Lógica:**
1. Debounce de 300ms en input
2. Busca con `searchPlaces()` (Nominatim/OpenStreetMap)
3. Valida que el resultado no sea igual a la otra ubicación
4. Guarda en store y cierra pantalla automáticamente
5. "Usar mi ubicación" → usa `userLocation` del store directo
6. ⭐ Botón "Marcar en el mapa" → llama `setPinDropMode('origin'|'destination')` y cierra la pantalla

**Botón de pin drop (NUEVO ✨):**
- Si `selectingMode === 'origin'` → solo aparece botón verde **"Marcar punto de salida en el mapa"**
- Si `selectingMode === 'destination'` → solo aparece botón rojo **"Marcar punto de llegada en el mapa"**
- Al presionar: cierra `LocationSearchScreen`, activa `pinDropMode` → `MapScreen` muestra banner y captura el toque del usuario
- Muestra `✓ dirección` si ya hay un punto previamente guardado para ese modo

**Layout (pantalla inicial, sin búsqueda activa):**
```
← Atrás   📍 PUNTO DE SALIDA (o 🎯 PUNTO DE LLEGADA)
─────────────────────────────────────────────────────
🔍 [Busca una dirección...                        ✕]
─────────────────────────────────────────────────────
🗺️   Dónde empezamos tu viaje?
     Escribe una dirección o lugar

📌 Usar mi ubicación
   Mi ubicación actual

📍 Marcar punto de salida en el mapa     ← solo en modo origin
   Toca el mapa para marcar              (o 🎯 llegada en modo destination)
```

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
Mapa interactivo del planificador. Renderiza origen, destino, y línea de ruta (provisional o real).

**CAMBIOS RECIENTES:**
- ✅ Integrado soporte para rutas reales de OSRM
- ✅ Renderiza línea **sólida** cuando hay `route` calculada
- ✅ Renderiza línea **punteada** como fallback sin ruta

| Prop | Tipo | Descripción |
|------|------|-------------|
| `origin` | `LocationPoint \| null` | Punto de salida (círculo verde) |
| `destination` | `LocationPoint \| null` | Punto de llegada (círculo rojo) |
| `route` | `CalculatedRoute \| null` | ⭐ Ruta real de OSRM (NUEVO) |
| `selectingMode` | `'origin' \| 'destination' \| null` | Si está activo, tap en mapa crea punto |
| `onLocationSelect` | `(location, type) => void` | Callback al tocar en modo selección |

**Capas renderizadas:**
| Capa | Condición | Estilo | Datos |
|------|-----------|--------|-------|
| **Origen** | `origin !== null` | CircleLayer verde (#10b981) | Punto de salida |
| **Destino** | `destination !== null` | CircleLayer rojo (#ef4444) | Punto de llegada |
| **Línea sólida** | `route !== null` | LineLayer azul, width 4 | Geometría real OSRM |
| **Línea punteada** | `route === null` | LineLayer gris, dash [2,2] | Fallback directo |

**Ejemplo:**
```tsx
<PlannerMap
  origin={origin}
  destination={destination}
  route={calculatedRoute}      // Ruta real si está disponible
  selectingMode={selectingMode}
  onLocationSelect={handleSelect}
/>
```

**Usada en:** `MapScreen.tsx`

---

#### `src/components/map/PinDropBanner.tsx` — `PinDropBanner` (NUEVO ✨)
Banner flotante que instruye al usuario a tocar el mapa para marcar un punto de salida o llegada. Componente extraído de `MapScreen` para mejorar legibilidad.

| Acceso | Descripción |
|--------|-------------|
| `pinDropMode` | Lee del store `usePlannerStore()` |
| `setPinDropMode` | Llama al store para cancelar el modo |

**Qué hace:**
- ✅ Retorna `null` si `pinDropMode` es `null` (no montado si no hay pin drop activo)
- ✅ Muestra mensaje contextual según `pinDropMode === 'origin'` o `'destination'`
- ✅ Botón "Cancelar" para salir del modo
- ✅ Posicionado debajo de `insets.top` automáticamente
- ✅ Z-index: 30 (encima del mapa, pero debajo de otros modales si necesario)

**Renderizado en:** `MapScreen.tsx` como `<PinDropBanner />`

**Bug resuelto:** ⭐ Esta separación evita que el banner se sobreponza con la card de detalles de ruta. Ambos leen `pinDropMode` del store y `RouteDetailsCard` retorna `null` cuando `pinDropMode !== null`.

---

#### `src/components/map/DrawingModeBanner.tsx` — `DrawingModeBanner` (NUEVO ✨)
Tres botones circulares flotantes en el **lado derecho** de la pantalla durante el modo de dibujo. Reemplaza el antiguo banner horizontal que obstruía la vista del mapa.

| Prop | Tipo | Descripción |
|------|------|-------------|
| `onFinish` | `() => void \| Promise<void>` | Callback al presionar el botón Calcular (`✓`) |

**Acceso global:**
- Lee `isDrawingMode`, `drawnStrokes` del store `usePlannerStore()`
- Llama `undoLastStroke()` al presionar `↩`
- Llama `clearDrawnPoints()` al presionar `✕`

**Qué hace:**
- ✅ Retorna `null` si `!isDrawingMode`
- ✅ Tres botones circulares (44×44 px) apilados verticalmente a la derecha, debajo del safe area
- ✅ `✓` (morado sólido `#8b5cf6`) — calcula ruta con los trazos dibujados
- ✅ `↩` (fondo oscuro + borde morado) — deshace el último trazo (undo stack)
- ✅ `✕` (fondo oscuro + borde rojo) — borra todos los trazos y sale del modo dibujo
- ✅ Los tres botones tienen `opacity: 0.35` cuando no hay trazos (`disabled`)
- ✅ `pointerEvents="box-none"` en el contenedor → los toques entre botones pasan al overlay de dibujo
- ✅ Z-index: 30, `right: 14`, `top: insets.top + 80`

**Sistema de deshacer (Undo Stack):**
- Cada trazo del dedo se guarda como un elemento independiente en `drawnStrokes[][]`
- `↩` llama `undoLastStroke()` → `drawnStrokes.slice(0, -1)` → elimina solo el último
- Cada trazo se visualiza como una línea independiente en el mapa; al deshacer desaparece

**Flujo al presionar `✓` (en `MapScreen`):**
1. Aplana todos los trazos: `drawnStrokes.flat()` → array de todos los puntos crudos
2. Simplifica con RDP a **máximo 5 waypoints clave** (`simplifyDrawnPoints(allPoints, 5)`)
3. Primer waypoint = origen, último = destino
4. Llama `getRouteWithWaypoints(waypoints, { continue_straight: 'true' })` → OSRM sigue el trazo sin zigzags
5. Centra la cámara en el bounding box completo de la ruta calculada (`flyTo`)
6. Limpia trazos y muestra panel compacto con distancia/tiempo

**Renderizado en:** `MapScreen.tsx` como `<DrawingModeBanner onFinish={handleFinishDrawing} />`

---

#### `src/components/map/RouteDetailsCard.tsx` — `RouteDetailsCard` (NUEVO ✨)
Card flotante que muestra distancia, duración y dificultad de la ruta calculada. Componente extraído de `MapScreen` para mejorar mantenibilidad.

| Prop | Tipo | Descripción |
|------|------|-------------|
| `plannerActive` | `boolean` | Si el planificador está activo |
| `isPanelExpanded` | `boolean` | Si el panel deslizable está expandido |

**Acceso global:**
- Lee `route` del store `usePlannerStore()`
- Lee `pinDropMode` del store para evitar solapamiento

**Qué hace:**
- ✅ Retorna `null` si no hay ruta, si el planificador está inactivo, si el panel está expandido
- ✅ Retorna `null` si `!!pinDropMode` — evita solapamiento con `PinDropBanner`
- ✅ Retorna `null` si `isDrawingMode` — evita solapamiento con los botones de dibujo
- ✅ La ruta se limpia del store al activar `isDrawingMode`, doble protección contra datos rancios
- ✅ Muestra: distancia (km), duración (formato "Xh Ym")

**Renderizado en:** `MapScreen.tsx` como `<RouteDetailsCard plannerActive={plannerActive} isPanelExpanded={isPanelExpanded} />`

---

#### Refactor de `MapScreen.tsx` (Actualizado ✅)
`MapScreen` se simplificó extrayendo dos componentes y mejorando la legibilidad.

**Cambios:**
- ✅ Removidas 60+ líneas de JSX inline para pin drop banner
- ✅ Removidas 35+ líneas de JSX inline para route details card
- ✅ Removidos 15 estilos que vivían en `styles` y ahora están en sus respectivos componentes
- ✅ Componentes reutilizan estado global (`usePlannerStore`) sin prop drilling
- ✅ Bug de solapamiento corregido: `RouteDetailsCard` verifica `!!pinDropMode`

**Renderizado actual:**
```tsx
{isDrawingMode && plannerActive && <View {/* overlay transparente zIndex 15 con Responders */} />}
{plannerActive && <PinDropBanner />}
{plannerActive && <DrawingModeBanner onFinish={handleFinishDrawing} />}
<RouteDetailsCard plannerActive={plannerActive} isPanelExpanded={isPanelExpanded} />
```

**Beneficios:**
- 📉 Líneas en MapScreen reducidas (~880 → ~850)
- 🎯 Responsabilidades claras: cada componente auto-contiene su lógica y estilos
- 🔄 Reutilizables: si necesitas mostrar estos elementos en otra pantalla, solo importas los componentes
- 🐛 Bugs más fáciles de aislar: cada componente es independiente y testeable

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

### `src/hooks/useRouteCalculation.ts` — `useRouteCalculation()` (NUEVO ✨)
Custom hook para calcular rutas reales entre dos puntos. Integrado con OSRM y `usePlannerStore`.

**Returns:**
```ts
{
  calculateRoute: () => Promise<CalculatedRoute | null>,
  route: CalculatedRoute | null,
  isCalculating: boolean,
  error: string | null,
  clearRoute: () => void
}
```

**Qué hace:**
- ✅ Valida que existan origen y destino
- ✅ Valida que estén separados al menos 100 metros
- ✅ **Limpia la ruta anterior** (`clearRoute`) antes de iniciar el cálculo → evita mostrar la ruta vieja mientras se espera la nueva
- ✅ Llama a `getRoute()` con perfil `'bike'` (ciclismo)
- ✅ Maneja errores de OSRM: `NoRoute`, `InvalidInput`, `ServerError`
- ✅ Guarda ruta en `usePlannerStore().route` automáticamente
- ✅ Actualiza `isCalculatingRoute` y `routeError` del store

**Flujo:**
```ts
const { calculateRoute, route, isCalculating, error } = useRouteCalculation()

// Presionar botón
await calculateRoute()

// Resultado:
// - route ≠ null → línea sólida en mapa
// - route === null → error mostrado
// - isCalculating === true → spinner visible
```

**Usada en:** `MapScreen.tsx`

---

## 10. Utils (Nuevas ✨)

### `src/utils/formatDuration.ts` — `formatDuration()` (NUEVO ✨)
Función utilitaria para convertir duración en minutos a formato legible en español.

**Firma:**
```ts
export function formatDuration(minutes: number): string
```

**Qué retorna:**
```
45    → "45m"
60    → "1h"
90    → "1h 30m"
150   → "2h 30m"
```

**Usada en:**
- `src/api/routing/getRoute.ts` (logs de ruta)
- `src/hooks/useRouteCalculation.ts` (logs de resultado)
- `src/screens/map/MapScreen.tsx` (card de detalles)

---

### `src/utils/simplifyPoints.ts` — `simplifyDrawnPoints()`, `sampleEvenlyAlongPath()` (NUEVO ✨)
Utilidades para preprocesar trazos dibujados a mano antes de enviarlos a la API de ruteo.

**`simplifyDrawnPoints(points, maxWaypoints?)`**
```ts
export function simplifyDrawnPoints(points: LocationPoint[], maxWaypoints = 8): LocationPoint[]
```
Aplica el algoritmo **Ramer-Douglas-Peucker (RDP)** para eliminar puntos redundantes preservando cambios de dirección reales. Tolerancia progresiva: empieza en 0.0002° y aumenta hasta 0.01° hasta obtener ≤ `maxWaypoints` puntos.

**`sampleEvenlyAlongPath(points, count?)`**
```ts
export function sampleEvenlyAlongPath(points: LocationPoint[], count = 25): LocationPoint[]
```
Muestrea `count` puntos equidistantes a lo largo de la polilínea mediante interpolación lineal entre segmentos. Ideal para map-matching (OSRM `/match`).

**Nota:** Actualmente estas funciones están disponibles pero no se usan en el flujo principal de dibujo. El flujo activo usa `getRoute(firstPoint, lastPoint)` tomando solo inicio y fin del trazo.

---

## 11. Debug

> Solo para desarrollo. No incluir en producción.

#### `src/debug/checkBackendConnection.ts` — `checkBackendConnection()`
Diagnóstico completo del backend: verifica `/health` y `/auth/self-register`. Imprime tiempos de respuesta y status HTTP en consola.

#### `src/debug/quickConnectionTest.ts` — `quickConnectionTest()`
Test rápido: `fetch` a `/health`. Retorna `boolean`. Para verificación rápida de conectividad.

#### `src/debug/testEndpoint.ts` — `testEndpoint(endpoint, method?, body?)`
Test de cualquier endpoint del backend. Imprime status y response en consola.

---

## 12. Constantes

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

## 13. Dependencias Clave

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

## 14. Variables de Entorno

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

## 15. Flujos Principales

### 🎨 Gestos de Panel Deslizable (Planificador) — ACTUALIZADO
**Implementado en:** `MapScreen.tsx` usando `PanResponder` de React Native + `Animated.View`

```
Panel expandido (muestra inputs + ScrollView)
  ├─ Deslizar 50px+ hacia ABAJO → Ocultar (300ms animation)
  ├─ Deslizar con velocidad > 0.3 hacia abajo → Ocultar instantáneo (snap)
  ├─ Tocar botón "−" → Ocultar (300ms)
  ├─ Presionar "Calcular Ruta 🚴" → Ocultar automáticamente (250ms) ✨ NUEVO
  ├─ Activar Pin Drop Mode → Ocultar automáticamente (250ms) ✨ NUEVO
  └─ Tocar botón "⌃" cuando está compacto → Mostrar (400ms)

Panel compacto (80px - muestra label resumido + botones compactos)
  ├─ Deslizar 50px+ hacia ARRIBA → Mostrar (400ms)
  ├─ Deslizar con velocidad > 0.3 hacia arriba → Mostrar instantáneo (snap)
  ├─ Tocar botón "⌃" → Mostrar (400ms)
  ├─ Tocar botón "✎" (editar) → Mostrar (400ms)
  └─ Presionar botón "🚴" (calcular compacto) → Colapsa si necesario + calcula ✨ NUEVO
```

**Detalles técnicos:**
- Velocidad de animación:
  - 300ms para ocultar (rápido - snap)
  - 400ms para mostrar (un poco más lento - suave)
  - 250ms para auto-colapso al calcular ruta o al activar pin drop
  - 350ms para reapertura tras pin drop (si falta un punto)
- Refs congelados: `isPanelExpandedRef`, `isGestureEnabledRef` mantienen valores actuales en el `PanResponder`
- Botón `⊙` (centrar) se anima con `panelDragY` para subir cuando el panel baja
- Brújula nativa sube 100px con `compassViewMargins={{ x: 5, y: 100 }}`
- `panelHiddenY` = `panelHeight - 80` (la parte que se oculta, dejando 80px visibles)
- **Bugfix `panelDragY`:** `useEffect` de sincronización siempre corrige `panelDragY` sin condición `> 0`, ya que cuando el panel mide exactamente 80px `panelHiddenY = 0` y sin el fix el panel compacto quedaba fuera de pantalla

---

### 📍 Card Flotante de Detalles de Ruta (NUEVO ✨)
**Implementado en:** `MapScreen.tsx` dentro de JSX de renderizado

Muestra información de la ruta calculada sin bloquear la vista del mapa.

```
Condiciones de visibilidad:
  - route !== null (ruta calculada)
  AND
  - plannerActive === true (en modo planificador)
  AND
  - !isPanelExpanded (panel colapsado)

Contenido de la card:
  ┌─────────────────────────────┐
  │ 📍 Tu Ruta                  │  ← Header azul claro, border-bottom
  ├─────────────────────────────┤
  │ Distancia:  15.2 km         │  ← Flex row, space-between
  │ Duración:   2h 14m          │  ← Formato formatDuration()
  │ Dificultad: 🔴 dificil      │  ← Coloreado: verde/naranja/rojo
  └─────────────────────────────┘

Estilos:
  - Posición: absolute top (insets.top + 16 px desde arriba)
  - Fondo: blanco (#ffffff)
  - Border: 1px sólido gris oscuro
  - Sombra: elevation 4 (Android), shadow (iOS)
  - Padding: 16px interior
  - Border-radius: 8px
  - Font: Semibold 14px para labels/valores

Dificultad coloreada:
  - 'plano'     → Verde (#10b981)
  - 'moderado'  → Naranja (#f59e0b)
  - 'dificil'   → Rojo (#ef4444)
```

---

### 🔄 Flujo de Cálculo de Ruta (COMPLETO - ACTUALIZADO)
```
Usuario en MapScreen modo planificador (origen + destino seleccionados)
  │
  ├─ VE PANEL EXPANDIDO
  │   └─ Presiona "Calcular Ruta 🚴" (en ScrollView)
  │       ↓ (O DESLIZA ARRIBA DESDE VISTA COMPACTA)
  │
  └─ VE PANEL COMPACTO
      └─ Presiona botón "🚴" compacto
          ↓
        FLUJO CÁLCULO (igual para ambos botones):
          │
          ├─ Panel se colapsa automáticamente (250ms)
          │   └─ Animated.timing: toValue = panelHeight - 80
          │   └─ Start callback: setIsPanelExpanded(false)
          │
          ├─ Validación:
          │   ├─ origen && destination existen? ✅
          │   ├─ Distancia > 100 metros? ✅
          │   └─ Si falla → error, retorna null
          │
          ├─ Hook useRouteCalculation llama calculateRoute()
          │   ├─ clearRoute() → limpia ruta anterior del store (línea punteada visible mientras se calcula)
          │   └─ setIsCalculatingRoute(true) → spinner en botón
          │
          ├─ API getRoute(origin, destination, { profile: 'bike' })
          │   └─ petición a OSRM: https://router.project-osrm.org/...
          │
          ├─ OSRM responde:
          │   ├─ Éxito: geometry (GeoJSON), distance, duration (en segundos)
          │   │   └─ Convierte: duration_minutes = (distance_km / 15 km/h) * 60
          │   │   └─ Calcula dificultad según elevación
          │   ├─ Error NoRoute: "No hay ruta disponible entre estos puntos"
          │   ├─ Error InvalidInput: "Coordenadas inválidas"
          │   └─ Error ServerError: "Servidor OSRM no disponible"
          │
          ├─ Store actualiza:
          │   ├─ setRoute(calculatedRoute)
          │   ├─ setIsCalculatingRoute(false)
          │   └─ Si error: setRouteError(message)
          │
          └─ MapScreen re-renderiza automáticamente:
              ├─ PlannerMap detecta route !== null
              │   └─ Renderiza LineLayer sólida azul (geometría real OSRM)
              │
              ├─ Route Details Card aparece (si route && !isPanelExpanded)
              │   └─ Muestra: distancia (km), duración (Xh Ym), dificultad
              │
              ├─ Usuario puede:
              │   ├─ Deslizar arriba → panel expandido nuevamente
              │   ├─ Tocar "Calcular Ruta" otra vez → recalcula nueva ruta
              │   ├─ Deslizar mapa → ve la ruta completa
              │   └─ Tocar "✕ Cancelar" → exitPlannerMode (limpia todo)
              │
              └─ Logs console (para debugging):
                  ├─ [MapScreen] 🚴 INICIANDO CÁLCULO DE RUTA
                  ├─ [MapScreen] Colapsando panel... panelHeight=...
                  ├─ [MapScreen] ✅ Ruta calculada: 33.4 km | 2h 14m | dificil
                  └─ [MapScreen] Panel colapsado
```

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

### 🗺️ Flujo de Planificación de Ruta (Actualizado ✅)
```
MapScreen → toca "Planificar ruta"
  └─ Panel planificador (obtiene estado del store, NO pasa props)
        ├─ Toca "Punto de Salida" (LocationInput)
        │     └─ setSelectingMode('origin') → LocationSearchScreen (fullscreen, SIN PROPS)
        │           ├─ Obtiene selectingMode, origin, destination, userLocation del store
        │           ├─ useLocationSearch() → búsqueda con debounce (300ms)
        │           │     └─ searchPlaces() → Nominatim/OpenStreetMap
        │           ├─ useLocationValidation() → valida duplicados
        │           ├─ Selecciona resultado → setOrigin(location) → cierra pantalla
        │           ├─ "Usar mi ubicación" → userLocation del store → setOrigin → cierra
        │           └─ ⭐ "Marcar punto de salida en el mapa"
        │                 └─ setPinDropMode('origin') + cierra LocationSearchScreen
        │                       └─ MapScreen muestra banner "Toca el mapa para marcar..."
        │                             └─ Panel colapsa automáticamente (250ms) al activar pinDropMode
        │                                   └─ Usuario toca mapa → reverseGeocode → setOrigin
        │                                         ├─ Falta destino → panel reabre (350ms)
        │                                         └─ Ambos listos → panel compacto queda visible
        ├─ Toca "Punto de Llegada" → flujo idéntico con setSelectingMode('destination')
        │     └─ ⭐ "Marcar punto de llegada en el mapa" → setPinDropMode('destination')
        ├─ Error si intenta duplicada → mensaje de error en alert
        ├─ "⇅ Intercambiar" → swapLocations()
        └─ "Calcular Ruta 🚴" → useRouteCalculation() → OSRM → route + auto-collapse
            ├─ Panel colapsa automáticamente (250ms)
            ├─ Se calcula ruta real
            ├─ Route Details Card aparece
            └─ Mapa muestra línea sólida azul con geometría real

NOTAS:
- LocationSearchScreen NO recibe props
- Solo muestra el botón de pin drop correspondiente al modo activo (origin o destination)
- Estado sincronizado en usePlannerStore (userLocation, pinDropMode compartidos)
- Duración calculada según velocidad promedio bicicleta (15 km/h por defecto)
- Formato duración: "Xh Ym" (2h 14m), "45m", "1h"
```

### 📡 Flujo de Sesión en Tiempo Real
```
Cualquier cambio de sesión (login, logout, token refresh)
  └─ supabase.auth.onAuthStateChange → RootNavigator
        ├─ Si session → loadProfile(userId) → authStore.profile
        └─ Si null → AuthStack
```

---

## 📋 Resumen del Refactor Arquitectónico y Últimas Actualizaciones

**Objetivo:** Mejorar arquitectura sin modificar funcionalidad + agregar ruteo real con OSRM.

**Cambios Realizados (Completados ✅):**

| Categoría | Detalles | Estado |
|-----------|----------|--------|
| **Tipos Centralizados** | ✅ `src/types/map.ts`, `src/types/search.ts`, `src/types/route.ts` (eliminó duplicación de `CameraCoords`) | ✅ Completo |
| **Stores Expandidos** | ✅ `usePlannerStore` maneja: origin, destination, userLocation, searchState, route, pinDropMode, isDrawingMode, drawnPoints | ✅ Completo |
| **Nuevas Stores** | ✅ `useMapStore` para estado del mapa (camera, panel, markers) | ✅ Completo |
| **Custom Hooks** | ✅ `useLocationManager` (GPS + reverse geocoding) | ✅ Completo |
| | ✅ `useLocationSearch` (búsqueda con debounce 300ms) | ✅ Completo |
| | ✅ `useLocationValidation` (validación de ubicaciones) | ✅ Completo |
| | ✅ `useRouteCalculation` (cálculo de rutas con OSRM + clearRoute en inicio) | ✅ Completo |
| **Prop Drilling** | ✅ Eliminado: LocationSearchScreen obtiene estado del store (0 props) | ✅ Completo |
| | ✅ Reducido: PinDropBanner y RouteDetailsCard leen del store, sin props innecesarias | ✅ Completo |
| **Componentes Refactor** | ✅ MapScreen, PlannerScreen, LocationSearchScreen, RutaCoMap, PlannerMap | ✅ Completo |
| | ✅ **NUEVO:** PinDropBanner (extraído de MapScreen) | ✅ Completo |
| | ✅ **NUEVO:** RouteDetailsCard (extraído de MapScreen) | ✅ Completo |
| | ✅ **NUEVO:** DrawingModeBanner (modo dibujo libre) | ✅ Completo |
| **Modo Dibujo Libre** | ✅ Overlay transparente con Responder API — 1 dedo dibuja, 2 dedos pan/zoom | ✅ Completo |
| | ✅ Bug fix: primer punto ya no se registra al pulsar botón lápiz | ✅ Completo |
| | ✅ Trazo continuo: puntos cada 15px de movimiento vía `getCoordinateFromView` | ✅ Completo |
| | ✅ Panel colapsa automáticamente al activar modo dibujo (250ms) | ✅ Completo |
| | ✅ **Undo stack por trazo:** `drawnStrokes: LocationPoint[][]` — cada gesto del dedo es un elemento independiente en la pila | ✅ Completo |
| | ✅ `beginNewStroke()` al iniciar cada gesto → `undoLastStroke()` borra solo el último trazo (ctrl+z) | ✅ Completo |
| | ✅ Visualización: una capa de línea por trazo en el mapa; al deshacer desaparece la capa correspondiente | ✅ Completo |
| | ✅ `DrawingModeBanner` rediseñado: 3 botones circulares a la derecha (✓ / ↩ / ✕), sin modal que obstruya la vista | ✅ Completo |
| | ✅ Waypoints reducidos a 5 (RDP) + `continue_straight: true` → ruta sigue el trazo sin zigzags | ✅ Completo |
| | ✅ Cámara centra bounding box de la ruta calculada tras presionar ✓ (`flyTo` automático) | ✅ Completo |
| | ✅ Modos mutuamente excluyentes: activar `selectingMode`, `pinDropMode` o `isDrawingMode` apaga los otros dos | ✅ Completo |
| | ✅ Botón lápiz ✏️ oculto cuando `selectingMode !== null` (búsqueda de dirección abierta) | ✅ Completo |
| | ✅ Al activar modo dibujo: `route` se limpia en el store → `RouteDetailsCard` no muestra datos rancios | ✅ Completo |
| **Ruteo Real (OSRM)** | ✅ Integración OSRM bike profile, cálculo de velocidad (default 15 km/h) | ✅ Completo |
| | ✅ `clearRoute()` al inicio del cálculo → evita ruta anterior visible | ✅ Completo |
| **Utilidades** | ✅ `src/utils/formatDuration.ts` - formato "Xh Ym" para duraciones | ✅ Completo |
| **Panel Deslizable** | ✅ Auto-colapso al presionar "Calcular Ruta 🚴" (ambos botones) | ✅ Completo |
| **Route Details Card** | ✅ Card flotante mostrando: distancia (km), duración (Xh Ym) | ✅ Completo |
| | ✅ No aparece cuando `pinDropMode` está activo — evita solapamiento | ✅ Completo |
| | ✅ No aparece cuando `isDrawingMode` está activo — evita solapamiento con botones de dibujo | ✅ Completo |
| | ✅ `route` se borra del store al activar modo dibujo — sin datos rancios de búsquedas anteriores | ✅ Completo |
| **Pin Drop Mode** | ✅ `pinDropMode` en store + banner overlay en mapa + `handleMapPinDrop` + botones contextuales en `LocationSearchScreen` | ✅ Completo |
| | ✅ Banner ahora es componente independiente (`PinDropBanner`) | ✅ Completo |
| **Compilación** | ✅ 0 errores TypeScript en todo el proyecto | ✅ Completo |
| **Funcionalidad** | ✅ 100% preservada (sin cambios UI no deseados, mismo comportamiento base) | ✅ Completo |

**Características Nuevas (ÚLTIMAS ACTUALIZACIONES):**
- 🆕 **Componente PinDropBanner:** Banner flotante extraído de MapScreen, auto-oculto cuando `pinDropMode` es null
- 🆕 **Componente RouteDetailsCard:** Card de distancia/tiempo extraída de MapScreen, reutilizable
- 🆕 **Bug fix solapamiento:** `RouteDetailsCard` verifica `!!pinDropMode` y retorna null para evitar que ambos modales se superpongan
- 🆕 **Mejor arquitectura:** Componentes leen estado global sin prop drilling, mejora mantenibilidad
- 🆕 **Panel collapse automático:** Al presionar "Calcular Ruta 🚴", el panel se anima hacia abajo en 250ms
- 🆕 **Route details card:** Muestra distancia, duración (formato "Xh Ym"), dificultad coloreada (verde/naranja/rojo)
- 🆕 **Vista compacta:** Panel reducido a 80px con label resumido y botones compactos
- 🆕 **Gestos mejorados:** Deslizar arriba/abajo para expandir/colapsar, velocidad threshold para snap instantáneo
- 🆕 **Pin Drop Mode:** Usuario puede tocar el mapa directamente para marcar puntos. Flujo: botón en `LocationSearchScreen` → `setPinDropMode` → panel colapsa (250ms) → banner instrucción en mapa → toque → `reverseGeocode` → guarda en store → si falta punto el panel reabre (350ms), si ambos listos el panel compacto queda visible
- 🆕 **Botón pin contextual:** En `LocationSearchScreen` solo aparece el botón de pin del modo activo (salida o llegada, no ambos)
- 🆕 **Bugfix panel compacto:** `panelDragY` siempre se corrige al colapsar, incluso cuando `panelHiddenY = 0` (panel de exactamente 80px)
- 🆕 **clearRoute() en cálculo:** Al iniciar nuevo cálculo de ruta, se limpia la anterior automáticamente → evita mostrar ruta vieja mientras espera OSRM
- 🆕 **Modo Dibujo Libre (trazo continuo):** Botón ✏️ activa overlay transparente. El dedo dibuja la ruta directamente en el mapa como un marcador. 1 dedo = dibuja, 2 dedos = pan/zoom del mapa. El overlay usa el sistema de Responders de React Native sobre el mapa.
- 🆕 **Bug fix primer punto al activar lápiz:** `isDrawingMode` eliminado del `onPress` de Mapbox. El overlay captura los gestos, no el sistema de tap de Mapbox.
- 🆕 **Throttle de dibujo:** Solo se registra un nuevo punto cuando el dedo se mueve ≥15px → trazo fluido sin exceso de puntos.
- 🆕 **Botones de dibujo rediseñados:** El banner horizontal que obstruia el mapa fue reemplazado por tres botones circulares (44px) flotantes en el lado derecho: `✓` (calcular, morado), `↩` (deshacer, borde morado), `✕` (limpiar, borde rojo). Sin texto, solo símbolos. `pointerEvents="box-none"` para no bloquear el trazo.
- 🆕 **Ruta limpia al activar modo dibujo:** `setIsDrawingMode(true)` ahora también resetea `route: null` y `routeError: null` en el store, evitando que `RouteDetailsCard` muestre datos de búsquedas anteriores.
- 🆕 **`RouteDetailsCard` oculta en modo dibujo:** condición `|| isDrawingMode` añadida al bail-out del componente.
- 🆕 **Ruta sigue el trazo sin zigzags:** `getRouteWithWaypoints` usa `continue_straight: 'true'` para que OSRM prefiera seguir recto en cada waypoint intermedio. Waypoints reducidos de 12 a **5** (RDP) para evitar maniobras forzadas entre puntos cercanos.
- 🆕 **Cámara centra la ruta al calcular:** tras recibir la ruta de OSRM en modo dibujo, calcula el bounding box de todas las coordenadas de la geometría y hace `flyTo` con zoom ajustado (×4 de margen) para que toda la ruta sea visible.

**Beneficios:**
- Mayor reutilizabilidad de lógica a través de custom hooks
- Estado centralizado y sincronizado entre pantallas
- Componentes más simples y predecibles
- Ruteo realista: OSRM usa perfil ciclismo (bike)
- Duración calculada según velocidad promedio bicicleta (15 km/h por defecto)
- UX mejorada: panel colapsa automáticamente al calcular para ver la ruta en el mapa
- Escalabilidad mejorada para nuevas funciones

---

*Fin del diccionario. Actualizar este archivo cuando se añadan nuevas funciones, pantallas o cambios estructurales.*
