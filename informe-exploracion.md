# Informe de Exploración Automática — RutaCo

> Generado el 28 de abril de 2026

---

## 1. Contexto Detectado

| Atributo | Valor |
|---|---|
| **Nombre del proyecto** | `estraviado` / RutaCo |
| **Tipo** | Aplicación móvil multiplataforma (Android/iOS/Web) |
| **Dominio** | App de ciclismo — rutas, grabación de actividades, rodadas grupales |
| **Mercado objetivo** | Colombia |
| **Plataforma** | React Native con Expo SDK 54 |
| **Lenguaje principal** | TypeScript 5.9 (modo `strict`) |
| **Arquitectura nueva** | Sí — `newArchEnabled: true` (Fabric + TurboModules) |
| **Estado del proyecto** | Desarrollo activo, MVP en construcción |

### Stack tecnológico principal

| Capa | Tecnología |
|---|---|
| Framework móvil | Expo ~54 + React Native 0.81.5 + React 19 |
| Mapas | Mapbox GL (`@rnmapbox/maps ^10`) |
| Backend / Auth | Supabase JS v2 |
| Estado global | Zustand v5 |
| Caché y servidor | TanStack React Query v5 |
| Almacenamiento local | AsyncStorage + react-native-mmkv |
| Navegación | React Navigation v7 (Stack + Bottom Tabs) |
| Gestos y animaciones | react-native-gesture-handler + react-native-reanimated 4 |
| Geocoding inverso | Nominatim (OpenStreetMap) |
| Cálculo de rutas | OSRM público (`router.project-osrm.org`) |
| Backend propio | API REST en Render (`loggin-mcp.onrender.com`) |
| Voz / audio | expo-speech |
| Geolocalización | expo-location |

---

## 2. Archivos Analizados

### Raíz del proyecto
- App.tsx — Punto de entrada, proveedores globales
- app.json — Configuración Expo, permisos, plugins
- package.json — Dependencias y scripts
- tsconfig.json — Alias `@/*` → `src/*`

### Navegación
- src/navigation/RootNavigator.tsx
- src/navigation/MainTabs.tsx
- src/navigation/AuthStack.tsx
- src/navigation/MapStack.tsx, RecordStack.tsx, RidesStack.tsx, ProfileStack.tsx

### Stores (Zustand)
- src/store/authStore.ts — Sesión y perfil de usuario
- src/store/mapStore.ts — Estado de cámara, marcadores y planner UI
- src/store/plannerStore.ts — Origen/destino, búsqueda, ruta calculada

### API / Servicios
- src/api/supabase.ts — Cliente Supabase configurado
- src/api/auth/signUp.ts — Registro directo (deprecado)
- src/api/auth/selfRegister.ts — Registro vía backend propio
- src/api/geocoding/searchPlaces.ts — Búsqueda Nominatim
- src/api/geocoding/reverseGeocode.ts — Geocoding inverso
- src/api/routing/getRoute.ts — Cálculo de rutas OSRM

### Pantallas (20 screens)
- Auth: WelcomeScreen, LoginScreen, RegisterScreen
- Mapa: MapScreen, PlannerScreen, LocationSearchScreen, RouteDetailScreen, ServicePointsScreen
- Actividad: RecordingScreen, ActivitySummaryScreen, ActivityReplayScreen
- Social: FeedScreen
- Rodadas: RidesListScreen, CreateRideScreen, RideDetailScreen, RideRequestsScreen
- Perfil: ProfileScreen, EditProfileScreen, MedalsScreen

### Hooks personalizados
- src/hooks/useLocationManager.ts — Permisos y ubicación en tiempo real
- src/hooks/useLocationSearch.ts — Búsqueda con debounce
- src/hooks/useLocationValidation.ts — Validación de puntos
- src/hooks/useRequireVerifiedPhone.ts — Guard de teléfono verificado

### Tipos (TypeScript)
- src/types/database/profile.ts, activity.ts, group-ride.ts, route.ts
- src/types/map.ts, planner.ts, route.ts, search.ts

---

## 3. Explicación Detallada

### 3.1 Flujo de autenticación

```
App.tsx
  └── RootNavigator
        ├── [sin sesión] → AuthStack (Welcome → Login / Register)
        └── [con sesión] → MainTabs
```

RootNavigator se suscribe al bus de eventos de Supabase (onAuthStateChange) para reaccionar a cambios de sesión en tiempo real. El perfil se carga desde la tabla `profiles` de Supabase inmediatamente después de obtener la sesión. La sesión se persiste en AsyncStorage.

El registro tiene dos caminos:
- **signUp** — llamada directa a Supabase Auth (marcada como deprecated).
- **selfRegister** — llamada HTTP al backend propio en Render, que maneja lógica adicional (creación de perfil, posiblemente validaciones de negocio).

### 3.2 Arquitectura de estado

El proyecto usa **Zustand v5** con tres stores independientes:

| Store | Responsabilidad |
|---|---|
| authStore | Sesión Supabase, perfil de usuario, signOut |
| mapStore | Estado de cámara Mapbox, marcadores, panel UI |
| plannerStore | Planificador de rutas: origen/destino, búsqueda, ruta calculada |

Cada store tiene interfaces TypeScript explícitas. La separación de stores por dominio es una buena práctica que evita re-renders innecesarios.

**TanStack React Query** está configurado con `staleTime: 5 min` y `gcTime: 30 min`, pero aún no se usa ampliamente — la mayoría de llamadas API se hacen directamente con `fetch`. Esta es un área de crecimiento natural.

### 3.3 Sistema de mapas

RutaCoMap es un componente genérico y reutilizable basado en @rnmapbox/maps. Usa `MapboxGL.StyleURL.Outdoors` — ideal para ciclismo de ruta/montaña. Implementa:
- `forwardRef` para exponer la referencia del MapView.
- `LocationPuck` con `puckBearingEnabled` para mostrar orientación del usuario.
- Cámara programática con animación `flyTo`.

PlannerMap extiende RutaCoMap con capacidades de renderizado de rutas GeoJSON.

### 3.4 Planificador de rutas

```
PlannerScreen / MapScreen
  ├── usePlannerStore (origen, destino, estado)
  ├── useLocationManager (GPS, permisos)
  ├── LocationSearchScreen (búsqueda con debounce → Nominatim)
  └── useRouteCalculation → getRoute() → OSRM (perfil: bike)
```

La búsqueda de lugares usa Nominatim con `countrycodes: 'co'` y viewbox dinámico basado en la posición del usuario. La validación de ubicaciones (no permitir origen = destino) se implementa tanto en el store como en el hook `useLocationValidation`.

OSRM usa el perfil `bike` (ciclismo) y devuelve geometría GeoJSON completa con distancia en metros y duración en segundos.

### 3.5 Modelo de datos

El esquema de base de datos en Supabase incluye:
- **profiles** — usuario extendido con estadísticas, plan (free/premium), token push.
- **activities** — actividades grabadas con GeoJSON de trazado, segmentos de velocidad, pausas, métricas de elevación.
- **group_rides** — rodadas grupales con zona de encuentro, punto GPS, dificultad, visibilidad pública/privada.

### 3.6 Mapa de navegación

```
MainTabs (bottom tabs)
  ├── MapTab → MapStack (MapScreen → PlannerScreen → RouteDetailScreen, ServicePoints, LocationSearch)
  ├── FeedTab → FeedScreen
  ├── RecordTab → RecordStack (RecordingScreen → ActivitySummaryScreen → ActivityReplayScreen)
  ├── RidesTab → RidesStack (RidesListScreen → CreateRideScreen → RideDetailScreen → RideRequests)
  └── ProfileTab → ProfileStack (ProfileScreen → EditProfile, Medals)
```

---

## 4. Puntos Fuertes

1. **TypeScript estricto en todo el proyecto** — `"strict": true` en tsconfig.json. Los tipos de base de datos están modelados fielmente, incluyendo tipos compuestos como GeoJSONLineString, Pause, SpeedSegment.

2. **Arquitectura de stores bien separada** — Tres stores Zustand con responsabilidades claras evitan el "mega-store" y minimizan re-renders.

3. **Custom hooks bien encapsulados** — useLocationManager, useLocationSearch, useLocationValidation siguen el principio de responsabilidad única. useLocationSearch implementa debounce correcto con useRef para limpiar timers.

4. **Componente de mapa reutilizable** — RutaCoMap como componente genérico con forwardRef es un patrón correcto para exponer referencias de mapa a pantallas padre.

5. **APIs de terceros gratuitas** — Combinación estratégica de Nominatim + OSRM elimina costos de geocoding/routing durante la fase MVP.

6. **Alias de paths con `@/*`** — Configurado en tsconfig.json, evita imports relativos de múltiples niveles.

7. **React Query configurado globalmente** — Aunque subutilizado, tener QueryClientProvider en la raíz con opciones sensatas facilita adoptarlo gradualmente.

8. **Nueva arquitectura de React Native habilitada** — `newArchEnabled: true` en app.json prepara la app para mejor rendimiento futuro.

9. **Validación de negocio en el store** — setOrigin/setDestination en plannerStore validan que origen ≠ destino antes de mutar el estado.

10. **Modelo de perfil rico** — Profile incluye métricas gamificadas (racha de días, total de rodadas) que soportan el sistema de medallas.

---

## 5. Áreas de Mejora

### 5.1 Seguridad

- **console.log con datos sensibles en producción** — selfRegister.ts y signUp.ts loguean email, nombre, y longitud de contraseña. Deben eliminarse o envolverse en un guard `__DEV__`.
- **Falta manejo de EXPO_PUBLIC_MAPBOX_TOKEN** — El token se accede sin validación previa (! non-null assertion). Si la variable no existe, el mapa fallará silenciosamente en runtime.
- **BACKEND_URL usa REACT_APP_*** — El prefijo correcto en Expo es `EXPO_PUBLIC_*`. La variable REACT_APP_BACKEND_URL nunca será leída por Expo, siempre se usará el fallback hardcodeado.

### 5.2 Arquitectura

- **Duplicación en MapScreen y PlannerScreen** — Ambas pantallas reimplementan lógica de animación de panel (Animated.Value, PanResponder) y obtención de ubicación GPS. Candidato para un hook usePanelAnimation y reutilizar useLocationManager.
- **signUp.ts (deprecated) no eliminado** — Código muerto que puede confundir. Debería removerse.
- **mapStore y plannerStore con estado superpuesto** — El estado de plannerActive, isPanelExpanded, panelHeight en mapStore existe pero en MapScreen se usa estado local (useState). Los stores no están siendo la fuente de verdad.
- **useRequireVerifiedPhone usa navigation<any>** — Pérdida del tipado de navegación.

### 5.3 Experiencia de usuario

- **Iconos de tabs con emojis Unicode** — Funcionan pero no escalan bien en diferentes tamaños de pantalla. Reemplazar con una librería de iconos (ej. @expo/vector-icons).
- **Sin manejo de errores de red en OSRM/Nominatim** — No hay retry automático ni mensajes de error específicos al usuario cuando estas APIs están caídas o lentas.
- **Atribución de Mapbox desactivada** — `attributionEnabled={false}` puede violar los términos de servicio de Mapbox.

### 5.4 Calidad de código

- **React Query infrautilizado** — La mayoría de llamadas API son fetch imperativo en callbacks, sin aprovechar useQuery/useMutation para caché, loading states y retry automático.
- **`any` tipado en geocoding** — `data.map((item: any) => ...)` en searchPlaces.ts. Debería tiparlo con una interfaz NominatimResult.
- **Sin tests** — No hay archivos de test (*.test.ts, *.spec.ts, Jest config) en el proyecto.
- **Sin ESLint/Prettier configurados** — No hay .eslintrc, .prettierrc en el proyecto.

---

## 6. Próximos Pasos (por prioridad)

### Crítico (antes de cualquier usuario real)
1. **Eliminar console.log con datos de usuario** en archivos de auth — reemplazar por logging condicional `if (__DEV__)`.
2. **Corregir prefijo de variable de entorno** — cambiar REACT_APP_BACKEND_URL → EXPO_PUBLIC_BACKEND_URL en src/config/backendUrl.ts.
3. **Agregar validación de variables de entorno** al inicio de la app (en App.tsx o en los módulos que las usan).

### Alta prioridad (deuda técnica)
4. **Extraer hook usePanelAnimation** para eliminar la duplicación entre MapScreen y PlannerScreen.
5. **Eliminar signUp.ts (deprecated)** y cualquier referencia a él.
6. **Tipar la respuesta de Nominatim** con una interfaz NominatimResult en lugar de any.
7. **Reemplazar emojis en tabs** con @expo/vector-icons (incluido en Expo sin configuración adicional).

### Media prioridad (mejoras de calidad)
8. **Configurar ESLint + Prettier** — usar expo/eslint-config como base.
9. **Migrar llamadas API a React Query** (useQuery/useMutation) empezando por las de perfil y rodadas.
10. **Agregar tests unitarios** a los hooks y funciones de API con Jest.
11. **Tipar correctamente la navegación** en useRequireVerifiedPhone usando los tipos definidos en src/types/navigation/.

### Futuro (funcionalidades pendientes según plan)
12. **Módulo de grabación GPS** — RecordingScreen existe pero la lógica de grabación continua está pendiente.
13. **Feed social** — FeedScreen existe pero su contenido no está implementado.
14. **Guía auditiva** — expo-speech está instalado, listo para implementar instrucciones por voz.
15. **Sistema de medallas** — MedalsScreen existe, la lógica de cómputo de medallas está pendiente.
16. **Plan premium** — El campo `plan: 'free' | 'premium'` en Profile ya está modelado.

---

## 7. Recursos Útiles

### Documentación de las tecnologías principales
- Expo Docs: https://docs.expo.dev — SDK 54, plugins, EAS Build
- React Native 0.81: https://reactnative.dev/docs/getting-started — Nueva arquitectura
- Supabase Docs: https://supabase.com/docs — Auth, Realtime, Storage
- Mapbox Maps SDK for React Native: https://github.com/rnmapbox/maps
- Zustand v5: https://zustand.docs.pmnd.rs
- TanStack Query v5: https://tanstack.com/query/v5
- React Navigation v7: https://reactnavigation.org/docs/getting-started

### APIs de terceros en uso
- Nominatim API: https://nominatim.org/release-docs/latest/api/Search/ — Geocoding (gratuita)
- OSRM API: http://project-osrm.org/docs/v5.24.0/api/ — Routing engine (gratuita, pública)

### Herramientas recomendadas para continuar
- EAS Build: https://docs.expo.dev/build/introduction/ — Build en la nube
- Expo Atlas: https://docs.expo.dev/guides/analyzing-bundles/ — Análisis del bundle
- @expo/vector-icons: https://icons.expo.fyi — Iconos ya incluidos en Expo
- Supabase CLI: https://supabase.com/docs/guides/cli — Migraciones de BD, types auto-generados

### Referencia interna del proyecto
- planes/desarrollo/RutaCo_Plan_de_Desarrollo.md — Roadmap completo por fases
- planes/negocio/RutaCo_Plan_de_Negocio.md — Contexto de negocio
- DICCIONARIO.md — Glosario del proyecto
- cambios-registro.md — Registro de cambios

---

*Informe generado automáticamente por análisis estático del código fuente.*
