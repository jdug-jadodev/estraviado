# Informe de Exploración del Proyecto — estraviado / RutaCo

> Generado automáticamente el 27 de abril de 2026

---

## 1. Contexto Detectado

| Atributo | Valor |
|---|---|
| **Nombre del proyecto** | estraviado (producto: RutaCo) |
| **Tipo de aplicación** | Aplicación móvil multiplataforma (iOS / Android / Web) |
| **Framework principal** | React Native + Expo SDK 54 (`newArchEnabled: true`) |
| **Lenguaje** | TypeScript 5.9 |
| **Backend** | Supabase (BaaS) + servidor externo `loggin-mcp.onrender.com` |
| **Estado global** | Zustand 5 |
| **Caché / fetch remoto** | TanStack React Query 5 |
| **Navegación** | React Navigation 7 (Stack + Bottom Tabs) |
| **Persistencia local** | AsyncStorage (sesión de auth) + react-native-mmkv (datos rápidos) |
| **Gestos / animaciones** | React Native Gesture Handler + Reanimated 4 |
| **Dominio** | Ciclismo urbano y de montaña: rutas, grabación GPS, rodadas grupales, feed social |
| **Arquitectura nueva RN** | Habilitada (`newArchEnabled: true` en `app.json`) |

---

## 2. Archivos Analizados

| Archivo / Directorio | Propósito |
|---|---|
| `package.json` | Dependencias y scripts de Expo |
| `app.json` | Configuración de la app (íconos, splash, plataformas) |
| `App.tsx` | Punto de entrada; monta `QueryClientProvider` y `GestureHandlerRootView` |
| `index.ts` | Entrypoint de Expo |
| `src/api/supabase.ts` | Cliente Supabase con persistencia de sesión vía AsyncStorage |
| `src/api/auth.ts` | Autenticación híbrida: login con Supabase, registro vía backend propio |
| `src/store/authStore.ts` | Store Zustand para sesión, perfil y signOut |
| `src/interface/authStore.ts` | Interfaz TypeScript del store de auth |
| `src/navigation/RootNavigator.tsx` | Navegador raíz; detecta sesión y bifurca entre AuthStack y MainTabs |
| `src/navigation/MainTabs.tsx` | 5 tabs principales: Mapa, Feed, Grabar, Rodadas, Perfil |
| `src/navigation/AuthStack.tsx` | Stack de autenticación |
| `src/navigation/{Map,Record,Rides,Profile}Stack.tsx` | Sub-stacks de cada sección |
| `src/screens/auth/{Login,Register,Welcome}Screen.tsx` | Pantallas de autenticación |
| `src/screens/map/{Map,Planner,RouteDetail,ServicePoints}Screen.tsx` | Pantallas de mapa y rutas |
| `src/screens/activity/{Recording,ActivitySummary,ActivityReplay}Screen.tsx` | Grabación GPS y resumen de actividad |
| `src/screens/rides/{RidesList,CreateRide,RideDetail,RideRequests}Screen.tsx` | Gestión de rodadas grupales |
| `src/screens/social/FeedScreen.tsx` | Feed social |
| `src/screens/profile/{Profile,EditProfile,Medals}Screen.tsx` | Perfil de usuario y medallas |
| `src/types/database/*.ts` | Contratos TypeScript para entidades de BD (Profile, Route, Activity, GroupRide, etc.) |
| `src/types/navigation/navigation.ts` | Tipado de parámetros de navegación |
| `src/constants/colors.ts` | Sistema de color dark-theme con paleta deportiva |
| `src/hooks/useRequireVerifiedPhone.ts` | Hook de guardia para rodadas grupales |
| `planes/desarrollo/00_INDICE.md` | Hoja de ruta técnica de 24 sub-fases |
| `monitor.cjs` | Script de monitoreo local (Node) |

---

## 3. Explicación Detallada

### Arquitectura general

El proyecto sigue una arquitectura **feature-based** con separación clara entre capas:

```
App.tsx (providers)
  └── RootNavigator (sesión → bifurcación de flujo)
        ├── AuthStack (Welcome → Login → Register)
        └── MainTabs (5 secciones)
              ├── MapStack    → Mapa, Planner, RouteDetail, ServicePoints
              ├── FeedScreen  → Feed social
              ├── RecordStack → Recording, ActivitySummary, ActivityReplay
              ├── RidesStack  → RidesList, CreateRide, RideDetail, RideRequests
              └── ProfileStack → Profile, EditProfile, Medals
```

### Gestión de estado

- **Zustand** gestiona el estado global de autenticación (`session`, `profile`, `isLoading`).
- **TanStack React Query** se configura en el root con `staleTime: 5 min` y `gcTime: 30 min`, listo para cachear llamadas de servidor en pantallas que aún no se han implementado.
- El estado local de formularios usa `useState` de React (apropiado para UI efímera).

### Autenticación híbrida

El flujo de registro es **dual**:
1. El registro llama al backend propio (`loggin-mcp.onrender.com/auth/self-register`) en lugar de Supabase directamente. Esto permite ejecutar lógica de servidor (creación de perfil, validaciones de negocio, etc.) fuera del cliente.
2. El login usa `supabase.auth.signInWithPassword()` directamente.
3. `onAuthStateChange` en `RootNavigator` actúa como fuente de verdad: detecta la sesión y carga el perfil automáticamente.

### Modelo de datos

Entidades principales tipadas en `src/types/database/`:

- **Profile**: estadísticas de ciclismo (distancia, elevación, rachas), plan free/premium, push token.
- **Route**: GeoJSON `LineString` con segmentos de elevación, visibilidad (public/connections/private), métricas sociales.
- **Activity**: GPS recording con velocidad por segmentos, pausas, duración de movimiento.
- **GroupRide**: rodadas grupales con zona de encuentro, participantes máx., requisito mínimo de rutas y visibilidad.

### Sistema de color

Dark-theme deportivo: fondo `#0f1117`, acento eléctrico `#0ea5e9`. Gradiente de elevación con 5 niveles de color (flat→muy empinado) ya definido en `COLORS`.

### Plan de desarrollo

Se documentan **24 sub-fases** distribuidas en 6 fases principales, desde el setup inicial hasta el lanzamiento. Actualmente el proyecto se encuentra en las fases 1-2 (MVP base completado en scaffolding, la mayoría de pantallas muestran "Próximamente").

---

## 4. Puntos Fuertes

- **TypeScript estricto en todo el proyecto** — contratos de navegación y modelos de BD completamente tipados.
- **Arquitectura escalable desde el inicio** — separación clara de `api/`, `store/`, `types/`, `screens/`, `navigation/`.
- **Backend híbrido bien justificado** — el registro delegado al servidor evita exponer lógica sensible en el cliente.
- **TanStack Query preconfigurado** — la caché global está lista antes de que la mayoría de pantallas la usen.
- **React Navigation con tipado completo** — `AuthStackParams`, `MapStackParams`, etc. eliminan errores de navegación en tiempo de compilación.
- **New Architecture habilitada** — preparado para Fabric y JSI desde el principio.
- **Modelo de datos rico** — `Activity` y `Route` con segmentos de velocidad/elevación permiten funcionalidades avanzadas (replay, gráficos) sin reestructurar la BD.
- **Hook `useRequireVerifiedPhone`** — patrón de guardia de navegación reutilizable y desacoplado.
- **Paleta de color semántica** — los colores de elevación y semáforo de seguridad están nominados, no hardcodeados.
- **Documentación de desarrollo exhaustiva** — 24 archivos de guía técnica con contexto de aprendizaje.

---

## 5. Áreas de Mejora

### Prioridad alta

1. **Variables de entorno expuestas a `console.log`** — `auth.ts` imprime email, fullName, payload completo y detalles de error en producción. Agregar un guard `if (__DEV__)` o eliminar los logs antes del release.

2. **`navigation.goBack()` sin tipo** — `useRequireVerifiedPhone` usa `useNavigation<any>()`. Debería tiparlo contra `AuthStackParams` para evitar navegaciones inválidas.

3. **Pantallas "Próximamente" sin estructura** — casi todas las pantallas fuera de auth son placeholders vacíos. El scaffolding está listo pero el trabajo real está pendiente.

4. **`BACKEND_URL` usa `REACT_APP_` en vez de `EXPO_PUBLIC_`** — `process.env.REACT_APP_BACKEND_URL` no funciona en Expo; debería ser `process.env.EXPO_PUBLIC_BACKEND_URL`.

### Prioridad media

5. **Sin manejo de errores en `loadProfile`** — si la query a `profiles` falla, el error se ignora silenciosamente.

6. **Sin librería de iconos real** — los iconos del tab bar son emojis Unicode en `Text`. Se recomienda `@expo/vector-icons` o `react-native-vector-icons`.

7. **Sin tests** — no existe directorio `__tests__/` ni configuración de Jest/Testing Library.

8. **Sin `.env.example`** — no hay plantilla de variables de entorno; un desarrollador nuevo no sabe qué variables configurar.

9. **`monitor.cjs` sin documentar** — el script de monitoreo existe pero falló al ejecutarse (`exit code 1`); su propósito y dependencias no están claros.

### Prioridad baja

10. **Contraseña sin indicador de fortaleza** — `RegisterScreen` valida longitud mínima 8 pero no da feedback visual de fortaleza.

11. **Sin estrategia de refresh de perfil** — `loadProfile` se llama en `onAuthStateChange` pero no hay invalidación si el usuario edita su perfil desde otra sesión.

---

## 6. Próximos Pasos

Según el plan de desarrollo interno (`planes/desarrollo/`), las próximas sub-fases son:

1. **06 — Mapa principal**: integrar `react-native-maps` o Mapbox con visualización de rutas GeoJSON.
2. **07 — Gráfico de elevación**: usar los `elevation_segments` del tipo `Route` para renderizar el gráfico.
3. **08 — Modo grabación GPS**: implementar `expo-location` con tracking en background para `Activity`.
4. **09 — Directorio de servicios**: listar talleres, tiendas y fuentes de agua en el mapa.
5. **Corregir `EXPO_PUBLIC_BACKEND_URL`** — cambio crítico para que el registro funcione en build de producción.
6. **Añadir `.env.example`** con todas las variables requeridas (`EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY`, `EXPO_PUBLIC_BACKEND_URL`).
7. **Proteger `console.log` de producción** en `auth.ts`.
8. **Configurar Jest + Testing Library** para comenzar con tests de componentes críticos (formularios de auth).

---

## 7. Recursos Útiles

| Recurso | URL |
|---|---|
| Expo SDK 54 Docs | https://docs.expo.dev |
| React Navigation 7 | https://reactnavigation.org/docs/getting-started |
| Supabase JS Client v2 | https://supabase.com/docs/reference/javascript |
| Zustand 5 | https://zustand.docs.pmnd.rs |
| TanStack Query v5 | https://tanstack.com/query/latest |
| React Native New Architecture | https://reactnative.dev/docs/the-new-architecture/landing-page |
| expo-location Background | https://docs.expo.dev/versions/latest/sdk/location/ |
| react-native-maps | https://github.com/react-native-maps/react-native-maps |
| Reanimated 4 | https://docs.swmansion.com/react-native-reanimated/ |
| MMKV Storage | https://github.com/mrousavy/react-native-mmkv |

---

*Informe generado por análisis estático del código fuente. No se ejecutó ningún build ni prueba dinámica.*
