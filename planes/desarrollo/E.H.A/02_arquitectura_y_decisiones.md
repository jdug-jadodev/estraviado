# 02 - Arquitectura y Decisiones Tecnicas
## Fase 0 - Fundamentos

**Proposito de este documento:**
Antes de escribir codigo, necesitamos entender como esta organizada la app por dentro:
que tecnologias usamos, por que las elegimos sobre las alternativas, y como se
comunican entre si. Este documento es la "vista de pajaro" del proyecto. Cualquier
desarrollador que lo lea debe entender la estructura completa de RutaCo sin haber
visto una sola linea de codigo.

---

## 1. Que es la arquitectura de una app?

La arquitectura es el plano de construccion del software. Define:
- Que tecnologias usamos en cada capa
- Como fluye la informacion entre esas capas
- Donde vive cada tipo de logica
- Como escala cuando crecen los usuarios

Una buena arquitectura hace que agregar nuevas funcionalidades sea predecible
y que los bugs sean faciles de encontrar. Una mala arquitectura hace que todo
se vuelva un caos a medida que el proyecto crece.

---

## 2. Las capas de RutaCo

RutaCo tiene cuatro capas principales:

```
CAPA 1: Interfaz de usuario (React Native + Expo)
  Lo que el usuario ve y toca en su celular.
  Pantallas, botones, mapas, graficos.
        |
        | (llama a)
        v
CAPA 2: Estado y logica de negocio (Zustand + React Query)
  El cerebro de la app. Decide que mostrar, cuando actualizar datos,
  como manejar errores.
        |
        | (llama a)
        v
CAPA 3: Servicios externos
  - Supabase: base de datos, usuarios, archivos
  - Mapbox: mapas, rutas, elevacion
  - Open-Meteo: clima
  - Expo: GPS, voz, notificaciones
        |
        | (en algunos casos llama a)
        v
CAPA 4: Backend propio (Node.js en Render)
  Solo para tareas que no pueden hacerse desde la app:
  procesar pagos, webhooks, tareas programadas.
```

---

## 3. Tecnologias y por que cada una

### 3.1 React Native con Expo

**Que es React Native:**
React Native es un framework creado por Facebook que permite escribir apps para
iOS y Android usando JavaScript/TypeScript. En lugar de escribir dos apps separadas
(una en Swift para iOS y otra en Kotlin para Android), escribes una sola vez y
funciona en ambos sistemas.

**Que es Expo:**
Expo es una capa sobre React Native que simplifica enormemente el desarrollo.
Sin Expo necesitarias configurar manualmente compiladores para iOS y Android,
lo cual es complejo. Expo maneja eso por ti.

**Por que React Native + Expo y no Flutter o nativo:**
- Flutter requiere aprender Dart, un lenguaje nuevo. React Native usa JavaScript
  que ya conoces o es mas facil de aprender
- Desarrollo nativo (Swift + Kotlin) requiere aprender dos lenguajes y mantener
  dos codebases completamente separadas
- La comunidad de React Native es enorme: facil encontrar soluciones a problemas
- Expo tiene integraciones listas para GPS, camara, notificaciones, voz, etc.

**TypeScript:**
Usamos TypeScript en lugar de JavaScript puro. TypeScript agrega tipos al codigo:
```typescript
// JavaScript (sin tipos - propenso a errores)
function calcularDistancia(lat1, lng1, lat2, lng2) { ... }

// TypeScript (con tipos - el editor detecta errores)
function calcularDistancia(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number { ... }
```
Si intentas pasar un texto donde va un numero, TypeScript te avisa antes de ejecutar.

---

### 3.2 Zustand (manejo de estado global)

**Que es el estado de una app:**
El estado son todos los datos que la app necesita recordar mientras esta abierta:
el usuario que inicio sesion, si la grabacion esta activa, las rutas cargadas, etc.

**El problema sin una solucion de estado:**
Cuando dos pantallas necesitan los mismos datos, sin estado global habria que
"pasar" esos datos de pantalla en pantalla a traves de props, lo que se vuelve
un desastre con muchas pantallas.

**Por que Zustand y no Redux:**
Redux es la solucion tradicional pero requiere mucho codigo repetitivo para
tareas simples. Zustand hace lo mismo con 10 veces menos codigo:

```typescript
// Zustand: simple y directo
const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))

// Usar en cualquier pantalla:
const { user } = useAuthStore()
```

**Que guardaremos en Zustand:**
- Sesion del usuario autenticado
- Estado de la grabacion activa (si esta grabando o no)
- Configuracion de la app (unidades, preferencias de voz)

---

### 3.3 React Query (sincronizacion con el servidor)

**El problema que resuelve:**
Cada vez que una pantalla necesita datos del servidor (rutas, perfil, feed),
necesitamos manejar: la carga inicial, los errores, actualizar cuando cambian
los datos, el cache para no hacer la misma consulta dos veces.
Sin React Query tendriamos que escribir ese codigo manualmente en cada pantalla.

**Como funciona:**
```typescript
// Sin React Query: mucho codigo manual
const [rutas, setRutas] = useState([])
const [cargando, setCargando] = useState(true)
const [error, setError] = useState(null)

useEffect(() => {
  setCargando(true)
  fetch('/api/rutas')
    .then(r => r.json())
    .then(data => { setRutas(data); setCargando(false) })
    .catch(e => { setError(e); setCargando(false) })
}, [])

// Con React Query: limpio y automatico
const { data: rutas, isLoading, error } = useQuery({
  queryKey: ['rutas'],
  queryFn: () => obtenerRutas(),
})
```

React Query ademas cachea los datos, los revalida cuando el usuario vuelve
a la pantalla y maneja reintentos automaticamente.

**Que consultas manejara React Query:**
- Feed de actividades
- Lista de rutas
- Perfil de usuario
- Rodadas grupales
- Puntos de servicio en el mapa

---

### 3.4 React Navigation

**Que es la navegacion en una app movil:**
Las apps moviles tienen multiples pantallas y el usuario navega entre ellas.
React Navigation es la libreria que maneja esas transiciones y el historial
de pantallas.

**Tipos de navegacion que usaremos:**

Stack Navigator (pantallas apiladas):
```
Pantalla A -> Pantalla B -> Pantalla C
              (atras)        (atras)
```
Usado para: flujo de registro, detalle de ruta, detalle de rodada.

Bottom Tabs Navigator (tabs en la parte inferior):
```
[ Mapa ] [ Explorar ] [ Grabar ] [ Rodadas ] [ Perfil ]
```
Usado para la navegacion principal de la app.

---

### 3.5 MMKV (almacenamiento local)

**Que es:**
MMKV es una forma de guardar datos directamente en el celular, sin conexion
a internet. Es similar a localStorage en web pero mucho mas rapido.

**Para que lo usamos:**
- Guardar la sesion del usuario para que no tenga que iniciar sesion cada vez
- Cache de preferencias y configuracion
- Datos de rutas descargadas offline (plan premium)

**Por que MMKV y no AsyncStorage:**
AsyncStorage es la opcion clasica de React Native pero es lenta porque es
asincrona. MMKV es sincrona y hasta 10 veces mas rapida.

---

## 4. Estructura de carpetas explicada

```
rutaco/
  src/
    api/
      supabase.ts        Cliente de Supabase configurado
      mapbox.ts          Funciones de Mapbox (rutas, elevacion)
      weather.ts         Funciones de clima (Open-Meteo)
      feed.ts            Consultas del feed social
      routes.ts          CRUD de rutas
      rides.ts           CRUD de rodadas

    components/
      common/            Componentes usados en toda la app
        Button.tsx       Boton personalizado de RutaCo
        Card.tsx         Tarjeta generica
        Avatar.tsx       Foto de perfil
        Loading.tsx      Indicador de carga
      map/               Componentes del mapa
        MapView.tsx      Mapa principal con Mapbox
        RouteLayer.tsx   Una ruta dibujada en el mapa
        ServicePin.tsx   Pin de taller o servicio
        SecurityZone.tsx Zona marcada como peligrosa
      route/             Componentes de rutas
        ElevationChart.tsx  Grafico de elevacion
        RouteCard.tsx    Tarjeta de ruta en listas
        WaypointMarker.tsx  Marcador de parada
      social/            Componentes sociales
        ActivityCard.tsx Tarjeta de actividad en el feed
        CommentItem.tsx  Un comentario
        UserBadge.tsx    Medalla de usuario

    hooks/               Logica reutilizable
      useActivityRecording.ts  Todo lo de grabar una ruta
      useVoiceGuide.ts         Guia auditiva
      useLocation.ts           GPS en tiempo real
      useWeather.ts            Clima de la ruta

    navigation/
      RootNavigator.tsx  Navegacion raiz (auth vs app)
      MainTabs.tsx       Tabs principales
      AuthStack.tsx      Pantallas de login/registro

    screens/
      auth/
        WelcomeScreen.tsx
        LoginScreen.tsx
        RegisterScreen.tsx
        VerifyPhoneScreen.tsx
      map/
        MapScreen.tsx          Pantalla principal del mapa
        RouteDetailScreen.tsx  Detalle de una ruta
        PlannerScreen.tsx      Planificador de rutas
      activity/
        RecordingScreen.tsx    Pantalla de grabacion activa
        ActivitySummaryScreen.tsx  Resumen al terminar
        ActivityReplayScreen.tsx   Replay animado
      profile/
        ProfileScreen.tsx
        EditProfileScreen.tsx
        MedalsScreen.tsx
      social/
        FeedScreen.tsx
        CommentsScreen.tsx
      rides/
        RidesListScreen.tsx
        CreateRideScreen.tsx
        RideDetailScreen.tsx
        RideRequestsScreen.tsx
      settings/
        SettingsScreen.tsx
        PremiumScreen.tsx

    store/
      authStore.ts       Estado de autenticacion
      recordingStore.ts  Estado de grabacion activa
      settingsStore.ts   Preferencias del usuario

    types/
      database.ts        Tipos que corresponden a tablas de Supabase
      navigation.ts      Tipos para parametros de navegacion
      mapbox.ts          Tipos para respuestas de Mapbox

    utils/
      elevation.ts       Calculos de elevacion y pendiente
      distance.ts        Formula de distancia entre coordenadas
      format.ts          Formatear distancias, tiempos, velocidades
      geojson.ts         Convertir coordenadas a GeoJSON

    constants/
      colors.ts          Paleta de colores de RutaCo
      typography.ts      Tamanos y familias de fuente
      config.ts          Constantes de configuracion

  assets/
    fonts/
    images/
    icons/

  supabase/
    migrations/          Cambios a la base de datos en orden cronologico
    seed/                Datos iniciales (rutas de prueba)
```

**Por que esta organizacion:**
- `api/`: todo lo que habla con servicios externos en un solo lugar.
  Si Supabase cambia algo en su API, solo tocamos un archivo
- `components/`: piezas reutilizables. Un componente se escribe una vez
  y se usa en 10 pantallas
- `hooks/`: logica compleja separada de la interfaz visual.
  La pantalla de grabacion solo llama `useActivityRecording()` sin
  necesitar saber como funciona el GPS
- `types/`: con TypeScript necesitamos definir la forma de los datos.
  Si la base de datos cambia, actualizamos el tipo aqui y el editor
  nos dice en todas las pantallas que hay que ajustar

---

## 5. Flujo de datos en la app

Ejemplo completo: el usuario guarda una ruta grabada.

```
1. Usuario toca "Terminar grabacion" en RecordingScreen
         |
2. RecordingScreen llama a stopRecording() del hook useActivityRecording
         |
3. useActivityRecording procesa las coordenadas y calcula estadisticas
         |
4. RecordingScreen navega a ActivitySummaryScreen con los datos
         |
5. Usuario toca "Guardar ruta"
         |
6. ActivitySummaryScreen llama a saveActivity() de src/api/routes.ts
         |
7. saveActivity() llama a supabase.from('activities').insert(...)
         |
8. Supabase guarda en la base de datos y retorna el registro creado
         |
9. React Query invalida el cache del feed (para que aparezca la nueva actividad)
         |
10. ActivitySummaryScreen navega al ActivityReplayScreen
```

Este flujo unidireccional (siempre en la misma direccion) hace que los bugs
sean faciles de encontrar: si algo falla, revisas cada paso en orden.

---

## 6. Convenciones de codigo

Todo el equipo debe seguir estas reglas para que el codigo sea consistente:

### Nombres de archivos
- Componentes: PascalCase -> `RouteCard.tsx`
- Hooks: camelCase empezando con "use" -> `useActivityRecording.ts`
- Utilidades: camelCase -> `elevation.ts`
- Pantallas: PascalCase terminando en Screen -> `MapScreen.tsx`

### Nombres de variables y funciones
```typescript
// Variables: camelCase
const distanciaKm = 12.5
const estaGrabando = true

// Funciones: camelCase, verbo al inicio
function calcularElevacion() {}
function guardarRuta() {}
function mostrarAlerta() {}

// Componentes: PascalCase
function RouteCard() {}
function ElevationChart() {}

// Tipos e interfaces: PascalCase
interface Route {}
type ActivityStatus = 'recording' | 'paused' | 'stopped'

// Constantes: SCREAMING_SNAKE_CASE
const MAX_RUTAS_GRATUITAS = 5
const DISTANCIA_ALERTA_METROS = 300
```

### Commits de Git
Formato: `tipo: descripcion corta en presente`

```
feat: agregar grafico de elevacion interactivo
fix: corregir calculo de distancia en rutas con retorno
chore: actualizar dependencias de Mapbox
docs: agregar documentacion del hook useVoiceGuide
refactor: simplificar logica de verificacion de telefono
```

Tipos validos:
- `feat`: nueva funcionalidad
- `fix`: correccion de bug
- `chore`: tareas de mantenimiento sin afectar funcionalidad
- `docs`: cambios en documentacion
- `refactor`: reestructuracion de codigo sin cambiar comportamiento

---

## Checklist de esta sub-fase

```
[ ] Entiendo las cuatro capas de la arquitectura de RutaCo
[ ] Entiendo por que usamos React Native + Expo (y no alternativas)
[ ] Entiendo para que es Zustand vs React Query
[ ] Entiendo la estructura de carpetas y por que esta organizada asi
[ ] Conozco el flujo de datos de un ejemplo completo
[ ] Conozco las convenciones de nombres y commits del proyecto
```

---

Siguiente documento: 03_base_de_datos_supabase.md
