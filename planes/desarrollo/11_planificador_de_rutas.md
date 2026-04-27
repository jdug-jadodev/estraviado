# 11 - Planificador de Rutas
## Fase 2 - Navegacion y Social

**Proposito de este documento:**
Implementar el planificador de rutas de RutaCo: la herramienta con la que el
ciclista puede crear una ruta antes de salir. Tiene tres modos: dedo libre sobre
el mapa con snap-to-road, puntos de paso y paradas planificadas. Ademas el usuario
define si la ruta tiene retorno al punto de partida.

**Por que es complejo:**
El planificador combina interaccion con el mapa (toques, arrastre), llamadas a la
API de Mapbox para ajustar el trazo a vias reales, calculo de elevacion y tiempo
estimado. Cada una de estas partes es sencilla por separado pero la integracion
requiere cuidado.

---

## 1. Las tres formas de crear una ruta

### Modo 1: Dedo libre (snap-to-road)
El usuario pone el dedo en el mapa y arrastra. La app va capturando puntos y los
ajusta a la via mas cercana usando la API de Map Matching de Mapbox. El trazo
se dibuja en tiempo real y siempre sigue calles o caminos reales.

### Modo 2: Puntos de paso (waypoints)
El usuario toca el mapa para poner marcadores. La app calcula automaticamente la
ruta optima para ciclistas entre cada par de puntos usando la API de Directions
de Mapbox con perfil `cycling`. Es el modo mas preciso para planificar una ruta
sin sorpresas.

### Modo 3: Paradas planificadas
Igual que el modo de waypoints pero cada punto puede tener un tipo (agua, comida,
taller, descanso) y un tiempo estimado de estadia. Esto permite calcular el tiempo
total del recorrido incluyendo paradas.

---

## 2. APIs de Mapbox que usamos

```typescript
// src/api/mapbox.ts

const MAPBOX_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_TOKEN!

// Map Matching: ajustar un trazo libre a vias reales
// Documentacion: https://docs.mapbox.com/api/navigation/map-matching/
export async function snapToRoad(
  coordinates: [number, number][]  // [lng, lat]
): Promise<[number, number][]> {
  // Mapbox Map Matching acepta maximo 100 puntos por llamada
  // Si hay mas, hay que dividirlos en chunks y unirlos
  if (coordinates.length > 100) {
    return snapToRoadInChunks(coordinates)
  }

  const coordString = coordinates.map(c => c.join(',')).join(';')
  const url = `https://api.mapbox.com/matching/v5/mapbox/cycling/${coordString}`

  const res = await fetch(url + '?' + new URLSearchParams({
    access_token: MAPBOX_TOKEN,
    geometries: 'geojson',
    overview: 'full',
    steps: 'false',
    tidy: 'true',  // elimina puntos redundantes
  }))

  const data = await res.json()

  if (!data.matchings?.[0]?.geometry?.coordinates) {
    // Si falla el snap (por ejemplo en zonas sin mapa detallado), devolver las
    // coordenadas originales para no perder el trazo del usuario
    return coordinates
  }

  return data.matchings[0].geometry.coordinates
}

// Dividir en chunks de 100 puntos con superposicion para unirlos sin cortes
async function snapToRoadInChunks(
  coordinates: [number, number][]
): Promise<[number, number][]> {
  const CHUNK_SIZE = 90  // 90 para tener margen con el limite de 100
  const OVERLAP = 5      // superponer 5 puntos entre chunks para union suave
  const result: [number, number][] = []

  for (let i = 0; i < coordinates.length; i += CHUNK_SIZE - OVERLAP) {
    const chunk = coordinates.slice(i, i + CHUNK_SIZE)
    const snapped = await snapToRoad(chunk)

    if (i === 0) {
      result.push(...snapped)
    } else {
      // Evitar duplicar los puntos de superposicion
      result.push(...snapped.slice(OVERLAP))
    }
  }

  return result
}

// Directions: ruta optima entre dos o mas puntos
// Con perfil 'cycling' Mapbox prioriza ciclovia, caminos bajos en trafico, etc.
export async function getRoute(
  waypoints: [number, number][]  // minimo 2 puntos: origen y destino
): Promise<{ coordinates: [number, number][]; distanceKm: number; durationMin: number }> {
  const coordString = waypoints.map(c => c.join(',')).join(';')
  const url = `https://api.mapbox.com/directions/v5/mapbox/cycling/${coordString}`

  const res = await fetch(url + '?' + new URLSearchParams({
    access_token: MAPBOX_TOKEN,
    geometries: 'geojson',
    overview: 'full',
    steps: 'false',
  }))

  const data = await res.json()
  const route = data.routes?.[0]

  if (!route) {
    throw new Error('No se encontro ruta entre los puntos indicados')
  }

  return {
    coordinates: route.geometry.coordinates,
    distanceKm: route.distance / 1000,
    durationMin: Math.round(route.duration / 60),
  }
}

// Elevacion: obtener la elevacion de un array de coordenadas
// Mapbox Terrain-RGB: la elevacion se codifica en los colores de los tiles del mapa.
// Esta funcion usa el endpoint de elevacion de Mapbox para obtener los valores.
export async function getElevationProfile(
  coordinates: [number, number][]
): Promise<number[]> {
  // Mapbox no tiene un endpoint directo de elevacion para arrays de puntos.
  // La forma correcta es usar el tileset de terrain-RGB y decodificar los colores.
  // Para simplificar en el MVP usamos la API de Open-Elevation como alternativa gratuita.
  const res = await fetch('https://api.open-elevation.com/api/v1/lookup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      locations: coordinates.map(([lng, lat]) => ({ latitude: lat, longitude: lng })),
    }),
  })

  const data = await res.json()
  return data.results.map((r: any) => r.elevation as number)
}
```

---

## 3. Estado del planificador con Zustand

```typescript
// src/store/plannerStore.ts

import { create } from 'zustand'
import type { RouteWaypoint } from '@/types/database'

type PlannerMode = 'free_draw' | 'waypoints' | 'waypoints_with_stops'

interface PlannedWaypoint {
  id: string
  lat: number
  lng: number
  label?: string
  waypoint_type: 'stop' | 'water' | 'shop' | 'rest'
  stay_minutes: number
}

interface PlannerStore {
  mode: PlannerMode
  setMode: (mode: PlannerMode) => void

  // Puntos que puso el usuario
  waypoints: PlannedWaypoint[]
  addWaypoint: (lat: number, lng: number) => void
  updateWaypoint: (id: string, updates: Partial<PlannedWaypoint>) => void
  removeWaypoint: (id: string) => void
  clearWaypoints: () => void

  // Trazo final calculado (snap-to-road o directions)
  routeCoordinates: [number, number][]
  setRouteCoordinates: (coords: [number, number][]) => void

  // Metadatos calculados
  distanceKm: number
  elevationGainM: number
  estimatedDurationMin: number
  setRouteStats: (stats: {
    distanceKm: number
    elevationGainM: number
    estimatedDurationMin: number
  }) => void

  // Opciones de la ruta
  hasReturn: boolean
  setHasReturn: (value: boolean) => void

  // Resetear todo
  reset: () => void
}

export const usePlannerStore = create<PlannerStore>((set, get) => ({
  mode: 'waypoints',
  setMode: (mode) => set({ mode, waypoints: [], routeCoordinates: [] }),

  waypoints: [],
  addWaypoint: (lat, lng) => set(state => ({
    waypoints: [...state.waypoints, {
      id: Date.now().toString(),
      lat,
      lng,
      waypoint_type: 'stop',
      stay_minutes: 0,
    }],
  })),
  updateWaypoint: (id, updates) => set(state => ({
    waypoints: state.waypoints.map(w => w.id === id ? { ...w, ...updates } : w),
  })),
  removeWaypoint: (id) => set(state => ({
    waypoints: state.waypoints.filter(w => w.id !== id),
    routeCoordinates: [], // resetear el trazo al eliminar un punto
  })),
  clearWaypoints: () => set({ waypoints: [], routeCoordinates: [] }),

  routeCoordinates: [],
  setRouteCoordinates: (coords) => set({ routeCoordinates: coords }),

  distanceKm: 0,
  elevationGainM: 0,
  estimatedDurationMin: 0,
  setRouteStats: (stats) => set(stats),

  hasReturn: false,
  setHasReturn: (value) => set({ hasReturn: value }),

  reset: () => set({
    waypoints: [],
    routeCoordinates: [],
    distanceKm: 0,
    elevationGainM: 0,
    estimatedDurationMin: 0,
    hasReturn: false,
  }),
}))
```

---

## 4. Pantalla del planificador

```typescript
// src/screens/planner/PlannerScreen.tsx

import { useRef, useState, useCallback } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import MapboxGL from '@rnmapbox/maps'
import { RutaCoMap } from '@/components/map/RutaCoMap'
import { PlannerRouteLayer } from '@/components/planner/PlannerRouteLayer'
import { WaypointMarkers } from '@/components/planner/WaypointMarkers'
import { PlannerBottomPanel } from '@/components/planner/PlannerBottomPanel'
import { usePlannerStore } from '@/store/plannerStore'
import { getRoute, snapToRoad } from '@/api/mapbox'
import { calculateElevationGain } from '@/utils/elevation'
import { estimateDuration } from '@/utils/time'
import { COLORS } from '@/constants/colors'

export function PlannerScreen() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const [isCalculating, setIsCalculating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const drawingPointsRef = useRef<[number, number][]>([])

  const {
    mode, waypoints, routeCoordinates, hasReturn,
    addWaypoint, setRouteCoordinates, setRouteStats, distanceKm,
    elevationGainM, estimatedDurationMin,
  } = usePlannerStore()

  // Cuando el usuario toca el mapa en modo waypoints
  const handleMapPress = useCallback(async (coordinates: [number, number]) => {
    if (mode === 'free_draw') return // el dedo libre usa onPanMove, no onPress

    addWaypoint(coordinates[1], coordinates[0]) // lat, lng

    // Si hay al menos 2 waypoints, calcular la ruta
    const updated = usePlannerStore.getState().waypoints
    if (updated.length >= 2) {
      await recalculateRoute(updated)
    }
  }, [mode])

  const recalculateRoute = async (currentWaypoints: typeof waypoints) => {
    setIsCalculating(true)
    setError(null)

    try {
      // Puntos para la API: origen + waypoints intermedios + destino
      let points = currentWaypoints.map(w => [w.lng, w.lat] as [number, number])

      // Si hay retorno, agregar el punto de origen al final
      if (hasReturn) {
        points = [...points, points[0]]
      }

      const routeData = await getRoute(points)

      // Calcular desnivel positivo
      const elevationGain = calculateElevationGain(routeData.coordinates as any)

      // Estimar duracion basada en el ritmo del usuario (o promedio si no hay historial)
      const durationMin = await estimateDuration(routeData.distanceKm, elevationGain)

      setRouteCoordinates(routeData.coordinates)
      setRouteStats({
        distanceKm: routeData.distanceKm,
        elevationGainM: elevationGain,
        estimatedDurationMin: durationMin,
      })
    } catch (e) {
      setError('No se pudo calcular la ruta. Revisa los puntos marcados.')
    } finally {
      setIsCalculating(false)
    }
  }

  const handleSaveRoute = () => {
    if (routeCoordinates.length < 2) return
    navigation.navigate('SaveRoute' as never)
  }

  return (
    <View style={styles.container}>
      <RutaCoMap onPress={handleMapPress}>
        {/* Trazo de la ruta calculada */}
        {routeCoordinates.length > 0 && (
          <PlannerRouteLayer coordinates={routeCoordinates} />
        )}

        {/* Marcadores de los waypoints */}
        <WaypointMarkers waypoints={waypoints} />
      </RutaCoMap>

      {/* Barra superior con modo y acciones */}
      <View style={[styles.topBar, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Planificar ruta</Text>
        {isCalculating && <ActivityIndicator color={COLORS.primary} />}
      </View>

      {/* Panel inferior con estadisticas y acciones */}
      <PlannerBottomPanel
        distanceKm={distanceKm}
        elevationGainM={elevationGainM}
        estimatedDurationMin={estimatedDurationMin}
        hasRoute={routeCoordinates.length > 0}
        error={error}
        onSave={handleSaveRoute}
        onRecalculate={() => recalculateRoute(waypoints)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12,
  },
  backButton: {
    backgroundColor: COLORS.surface,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: { color: COLORS.text, fontSize: 16 },
  screenTitle: {
    flex: 1,
    color: COLORS.text,
    fontSize: 17,
    fontWeight: '600',
  },
})
```

---

## 5. Estimacion de tiempo personalizada por ritmo del usuario

Una de las funcionalidades diferenciadoras: RutaCo aprende el ritmo real del usuario
y usa ese dato para estimar cuanto va a durar una ruta. Esto lo hace mucho mas util
que Strava que usa valores genericos.

```typescript
// src/utils/time.ts

import { supabase } from '@/api/supabase'
import { useAuthStore } from '@/store/authStore'

// Velocidades promedio por tipo de terreno cuando no hay historial
const DEFAULT_SPEEDS_KMH = {
  flat: 22,
  uphill_mild: 14,    // 2-5% de pendiente
  uphill_steep: 10,   // mas de 5% de pendiente
  downhill: 35,
}

// Obtener el ritmo personalizado del usuario desde Supabase
async function getUserPace(): Promise<typeof DEFAULT_SPEEDS_KMH> {
  const userId = useAuthStore.getState().session?.user?.id
  if (!userId) return DEFAULT_SPEEDS_KMH

  const { data } = await supabase
    .from('user_pace_history')
    .select('terrain_type, avg_speed_kmh')
    .eq('user_id', userId)

  if (!data || data.length === 0) return DEFAULT_SPEEDS_KMH

  const pace = { ...DEFAULT_SPEEDS_KMH }
  for (const row of data) {
    if (row.terrain_type in pace) {
      pace[row.terrain_type as keyof typeof pace] = row.avg_speed_kmh
    }
  }

  return pace
}

// Estimar la duracion total de una ruta en minutos
export async function estimateDuration(
  distanceKm: number,
  elevationGainM: number,
  waypointStopMinutes: number = 0
): Promise<number> {
  const pace = await getUserPace()

  // Approximacion simple: dividir la distancia en plano, subida y bajada
  // basada en el desnivel total. Esta es una heuristica razonable sin el
  // perfil de elevacion completo.
  const flatRatio = 0.5
  const uphillRatio = elevationGainM > 0 ? Math.min(0.35, elevationGainM / (distanceKm * 100)) : 0
  const downhillRatio = uphillRatio * 0.8
  const remainingRatio = Math.max(0, 1 - flatRatio - uphillRatio - downhillRatio)

  const flatKm = distanceKm * (flatRatio + remainingRatio)
  const uphillKm = distanceKm * uphillRatio
  const downhillKm = distanceKm * downhillRatio

  const speedForUphill = uphillKm > 0 && elevationGainM / (uphillKm * 1000) > 0.05
    ? pace.uphill_steep
    : pace.uphill_mild

  const movingMinutes =
    (flatKm / pace.flat) * 60 +
    (uphillKm / speedForUphill) * 60 +
    (downhillKm / pace.downhill) * 60

  return Math.round(movingMinutes + waypointStopMinutes)
}

// Actualizar el ritmo del usuario despues de completar una actividad
export async function updateUserPace(
  userId: string,
  terrainType: string,
  newSpeedKmh: number
) {
  // Usar upsert para crear o actualizar
  const { data: existing } = await supabase
    .from('user_pace_history')
    .select('avg_speed_kmh, sample_count')
    .eq('user_id', userId)
    .eq('terrain_type', terrainType)
    .single()

  if (existing) {
    // Media movil ponderada: el historial pesa mas que el nuevo dato
    const newAvg =
      (existing.avg_speed_kmh * existing.sample_count + newSpeedKmh) /
      (existing.sample_count + 1)

    await supabase
      .from('user_pace_history')
      .update({
        avg_speed_kmh: Math.round(newAvg * 10) / 10,
        sample_count: existing.sample_count + 1,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .eq('terrain_type', terrainType)
  } else {
    await supabase.from('user_pace_history').insert({
      user_id: userId,
      terrain_type: terrainType,
      avg_speed_kmh: Math.round(newSpeedKmh * 10) / 10,
    })
  }
}

export function formatDuration(totalMinutes: number): string {
  if (totalMinutes < 60) return `${totalMinutes} min`
  const h = Math.floor(totalMinutes / 60)
  const m = totalMinutes % 60
  return m === 0 ? `${h}h` : `${h}h ${m}min`
}
```

---

## 6. Pantalla de guardado de ruta planificada

```typescript
// src/screens/planner/SaveRouteScreen.tsx

import { useState } from 'react'
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, Switch, StyleSheet
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import { usePlannerStore } from '@/store/plannerStore'
import { saveRoute } from '@/api/routes'
import { COLORS } from '@/constants/colors'

export function SaveRouteScreen() {
  const navigation = useNavigation()
  const {
    routeCoordinates, waypoints, distanceKm,
    elevationGainM, hasReturn, estimatedDurationMin, reset
  } = usePlannerStore()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [visibility, setVisibility] = useState<'public' | 'connections' | 'private'>('public')

  const { mutate: save, isPending } = useMutation({
    mutationFn: () => saveRoute({
      title,
      description,
      visibility,
      geojson: { type: 'LineString', coordinates: routeCoordinates },
      waypoints,
      distance_km: distanceKm,
      elevation_gain_m: elevationGainM,
      has_return: hasReturn,
      is_recorded: false,
    }),
    onSuccess: (savedRoute) => {
      reset() // limpiar el planificador
      navigation.navigate('RouteDetail' as never, { routeId: savedRoute.id } as never)
    },
  })

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Guardar ruta</Text>

      {/* Resumen de la ruta */}
      <View style={styles.summaryCard}>
        <SummaryItem label="Distancia" value={`${distanceKm.toFixed(1)} km`} />
        <SummaryItem label="Desnivel" value={`+${elevationGainM}m`} />
        <SummaryItem label="Tiempo estimado" value={formatDuration(estimatedDurationMin)} />
        <SummaryItem label="Paradas" value={waypoints.length.toString()} />
        <SummaryItem label="Con retorno" value={hasReturn ? 'Si' : 'No'} />
      </View>

      {/* Nombre */}
      <Text style={styles.label}>Nombre de la ruta *</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Ej: Subida a La Calera"
        placeholderTextColor={COLORS.textSecondary}
        maxLength={80}
      />

      {/* Descripcion opcional */}
      <Text style={styles.label}>Descripcion (opcional)</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Comenta los detalles de la ruta: estado del pavimento, puntos de interes..."
        placeholderTextColor={COLORS.textSecondary}
        multiline
        maxLength={500}
      />

      {/* Visibilidad */}
      <Text style={styles.label}>Visibilidad</Text>
      <View style={styles.visibilityOptions}>
        {[
          { value: 'public', label: 'Publica', desc: 'Toda la comunidad RutaCo' },
          { value: 'connections', label: 'Conexiones', desc: 'Solo tus seguidores' },
          { value: 'private', label: 'Privada', desc: 'Solo tu' },
        ].map((opt) => (
          <TouchableOpacity
            key={opt.value}
            style={[
              styles.visibilityOption,
              visibility === opt.value && styles.visibilityOptionActive,
            ]}
            onPress={() => setVisibility(opt.value as any)}
          >
            <Text style={[
              styles.visibilityLabel,
              visibility === opt.value && styles.visibilityLabelActive,
            ]}>
              {opt.label}
            </Text>
            <Text style={styles.visibilityDesc}>{opt.desc}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.saveButton, (!title || isPending) && styles.saveButtonDisabled]}
        onPress={() => save()}
        disabled={!title || isPending}
      >
        <Text style={styles.saveButtonText}>
          {isPending ? 'Guardando...' : 'Guardar ruta'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.summaryItem}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20, paddingBottom: 40 },
  title: { color: COLORS.text, fontSize: 24, fontWeight: '700', marginBottom: 20 },
  summaryCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  summaryItem: { minWidth: '40%' },
  summaryLabel: { color: COLORS.textSecondary, fontSize: 12 },
  summaryValue: { color: COLORS.text, fontSize: 16, fontWeight: '600', marginTop: 2 },
  label: { color: COLORS.textSecondary, fontSize: 13, marginBottom: 8, marginTop: 16 },
  input: {
    backgroundColor: COLORS.surface,
    color: COLORS.text,
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
  },
  textArea: { minHeight: 100, textAlignVertical: 'top' },
  visibilityOptions: { gap: 8 },
  visibilityOption: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 14,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  visibilityOptionActive: { borderColor: COLORS.primary },
  visibilityLabel: { color: COLORS.text, fontWeight: '600' },
  visibilityLabelActive: { color: COLORS.primary },
  visibilityDesc: { color: COLORS.textSecondary, fontSize: 12, marginTop: 2 },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginTop: 32,
  },
  saveButtonDisabled: { opacity: 0.5 },
  saveButtonText: { color: '#000', fontWeight: '700', fontSize: 16 },
})
```

---

## Checklist de esta sub-fase

```
[ ] Modo waypoints: tocar el mapa agrega un marcador
[ ] Con 2 o mas waypoints la ruta se calcula automaticamente via Mapbox Directions
[ ] La ruta calculada se dibuja sobre el mapa en tiempo real
[ ] El trazo sigue calles y caminos reales, no lineas rectas
[ ] La opcion de retorno agrega el punto de origen como destino final
[ ] Se muestra distancia, desnivel estimado y tiempo estimado antes de guardar
[ ] Las paradas se pueden tipificar (agua, comida, taller, descanso)
[ ] El tiempo estimado usa el ritmo real del usuario si hay historial
[ ] La ruta se guarda en Supabase con la visibilidad elegida
[ ] El planificador se limpia al guardar la ruta
[ ] Funciona con hasta 10 waypoints sin crashes ni lentitud visible
[ ] Probado en zona de Bogota con rutas reales para verificar el snap-to-road
```

---

Siguiente documento: 12_clima.md
