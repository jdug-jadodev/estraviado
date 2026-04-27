# 07 - Grafico de Elevacion
## Fase 1 - MVP Base

**Proposito de este documento:**
Implementar el grafico de elevacion interactivo que hace a RutaCo diferente.
No un grafico generico que muestra minimo y maximo, sino uno que segmenta
la ruta, colorea cada tramo segun la pendiente y describe en texto natural
lo que el ciclista va a encontrar.

---

## 1. Como se calcula la elevacion

### Datos de elevacion en el GeoJSON

Una ruta guardada en GeoJSON puede tener coordenadas en dos formatos:
```
[longitud, latitud]                  # sin elevacion
[longitud, latitud, elevacion]       # con elevacion en metros
```

Para rutas grabadas con GPS, la elevacion viene del GPS del celular (aunque
no siempre es precisa). Para rutas planificadas, pedimos la elevacion a
la API de Mapbox Terrain-RGB.

### La formula de distancia entre dos puntos (Haversine)

Para calcular cuantos metros hay entre dos coordenadas geograficas usamos
la formula de Haversine, que tiene en cuenta que la Tierra es esferica:

```typescript
// src/utils/distance.ts

/**
 * Calcula la distancia en kilometros entre dos puntos geograficos.
 * Usa la formula de Haversine que considera la curvatura de la Tierra.
 *
 * @param lat1 Latitud del punto 1 en grados decimales
 * @param lng1 Longitud del punto 1 en grados decimales
 * @param lat2 Latitud del punto 2 en grados decimales
 * @param lng2 Longitud del punto 2 en grados decimales
 * @returns Distancia en kilometros
 */
export function haversineDistance(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  const R = 6371 // Radio de la Tierra en kilometros

  // Convertir grados a radianes (la formula necesita radianes)
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180)
}
```

---

## 2. Calcular segmentos de elevacion

```typescript
// src/utils/elevation.ts

import { haversineDistance } from './distance'

export interface ElevationSegment {
  startKm: number          // km desde el inicio donde empieza este segmento
  endKm: number            // km desde el inicio donde termina
  startElevation: number   // metros sobre el nivel del mar al inicio
  endElevation: number     // metros sobre el nivel del mar al final
  gradientPercent: number  // pendiente en porcentaje (positivo = subida, negativo = bajada)
  type: GradientType       // clasificacion de la pendiente
  description: string      // descripcion en texto natural
  color: string            // color para el grafico
}

export type GradientType = 'flat' | 'mild' | 'moderate' | 'steep' | 'very_steep'

// Colores que representan la dificultad de cada tramo
export const GRADIENT_COLORS: Record<GradientType, string> = {
  flat: '#22c55e',       // verde - plano
  mild: '#eab308',       // amarillo - suave
  moderate: '#f97316',   // naranja - moderado
  steep: '#ef4444',      // rojo - pronunciado
  very_steep: '#a855f7', // morado - muy pronunciado
}

/**
 * Divide una ruta en segmentos de 100 metros y calcula la pendiente de cada uno.
 *
 * @param coordinates Array de [longitud, latitud, elevacion]
 * @returns Array de segmentos con pendiente, tipo, descripcion y color
 */
export function calculateElevationSegments(
  coordinates: [number, number, number][]
): ElevationSegment[] {
  if (coordinates.length < 2) return []

  const SEGMENT_LENGTH_KM = 0.1 // 100 metros por segmento
  const segments: ElevationSegment[] = []

  let accumulatedDistance = 0
  let segmentStartDistance = 0
  let segmentStartElevation = coordinates[0][2]

  for (let i = 1; i < coordinates.length; i++) {
    const [prevLng, prevLat] = coordinates[i - 1]
    const [currLng, currLat, currElevation] = coordinates[i]

    // Distancia entre el punto anterior y el actual
    const stepDistance = haversineDistance(prevLat, prevLng, currLat, currLng)
    accumulatedDistance += stepDistance

    // Cuando acumulamos 100 metros (o llegamos al final), crear un segmento
    const isLastPoint = i === coordinates.length - 1
    const segmentComplete = accumulatedDistance - segmentStartDistance >= SEGMENT_LENGTH_KM

    if (segmentComplete || isLastPoint) {
      const segmentDistance = accumulatedDistance - segmentStartDistance
      const elevationDiff = currElevation - segmentStartElevation

      // Pendiente = diferencia de elevacion / distancia horizontal * 100
      // Multiplicamos por 100 para expresarlo en porcentaje
      // Dividimos por 1000 para convertir km a metros
      const gradient = segmentDistance > 0
        ? (elevationDiff / (segmentDistance * 1000)) * 100
        : 0

      // Redondear a 1 decimal
      const roundedGradient = Math.round(gradient * 10) / 10

      const type = classifyGradient(roundedGradient)

      segments.push({
        startKm: segmentStartDistance,
        endKm: accumulatedDistance,
        startElevation: segmentStartElevation,
        endElevation: currElevation,
        gradientPercent: roundedGradient,
        type,
        description: buildDescription(segmentStartDistance, accumulatedDistance, roundedGradient),
        color: GRADIENT_COLORS[type],
      })

      // El proximo segmento empieza donde termino este
      segmentStartDistance = accumulatedDistance
      segmentStartElevation = currElevation
    }
  }

  return segments
}

/**
 * Clasifica una pendiente en una de las 5 categorias.
 * Usa el valor absoluto porque la clasificacion aplica igual para subidas y bajadas.
 */
function classifyGradient(gradientPercent: number): GradientType {
  const abs = Math.abs(gradientPercent)
  if (abs <= 2) return 'flat'
  if (abs <= 5) return 'mild'
  if (abs <= 8) return 'moderate'
  if (abs <= 12) return 'steep'
  return 'very_steep'
}

/**
 * Genera una descripcion en texto natural del segmento.
 * Ejemplo: "Kilometro 3.2 al 4.5: subida sostenida del 7%"
 */
function buildDescription(startKm: number, endKm: number, gradient: number): string {
  const distanceM = Math.round((endKm - startKm) * 1000)
  const absGradient = Math.abs(gradient)

  const location = `km ${startKm.toFixed(1)} al ${endKm.toFixed(1)}`

  if (absGradient <= 2) {
    return `${location}: tramo plano (${distanceM}m)`
  }

  const direction = gradient > 0 ? 'subida' : 'bajada'
  const intensity = absGradient <= 5 ? 'suave'
    : absGradient <= 8 ? 'moderada'
    : absGradient <= 12 ? 'pronunciada'
    : 'muy pronunciada'

  return `${location}: ${direction} ${intensity} del ${absGradient}% (${distanceM}m)`
}

/**
 * Calcula el desnivel positivo y negativo total de una ruta.
 * El desnivel positivo es la suma de todos los metros que se sube.
 * El desnivel negativo es la suma de todos los metros que se baja.
 */
export function calculateTotalElevation(
  coordinates: [number, number, number][]
): { gain: number; loss: number } {
  let gain = 0
  let loss = 0

  for (let i = 1; i < coordinates.length; i++) {
    const diff = coordinates[i][2] - coordinates[i - 1][2]
    if (diff > 0) gain += diff
    else loss += Math.abs(diff)
  }

  return {
    gain: Math.round(gain),
    loss: Math.round(loss),
  }
}
```

---

## 3. Componente del grafico

Instalamos Victory Native XL para graficos de alto rendimiento:

```bash
npx expo install victory-native-xl
npx expo install @shopify/react-native-skia
npx expo install react-native-reanimated
```

**Por que Victory Native XL y no otras opciones:**
- `react-native-svg`: funciona pero no tiene componentes de grafico listos
- `recharts`: es para web, no funciona bien en React Native
- `Victory Native XL`: usa Skia (motor de graficos de Google) que dibuja
  directamente en la GPU. Es muy rapido y fluido, ideal para graficos interactivos.

```typescript
// src/components/route/ElevationChart.tsx

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { CartesianChart, Area, Line, useChartPressState } from 'victory-native-xl'
import { Circle, useFont } from '@shopify/react-native-skia'
import type { ElevationSegment } from '@/utils/elevation'
import { COLORS } from '@/constants/colors'

interface ElevationChartProps {
  segments: ElevationSegment[]
  // Cuando el usuario toca el grafico, informamos el indice del segmento
  onSegmentPress?: (segmentIndex: number) => void
  height?: number
}

export function ElevationChart({
  segments,
  onSegmentPress,
  height = 160,
}: ElevationChartProps) {
  // Preparar datos para el grafico
  // Victory XL necesita un array de objetos con las claves que usaremos en el grafico
  const data = segments.map((seg, index) => ({
    x: Number(seg.startKm.toFixed(2)),   // posicion horizontal: km desde inicio
    y: Math.round(seg.startElevation),   // posicion vertical: metros de elevacion
    gradient: seg.gradientPercent,
    color: seg.color,
    index,
  }))

  // Agregar el punto final del ultimo segmento
  if (segments.length > 0) {
    const last = segments[segments.length - 1]
    data.push({
      x: Number(last.endKm.toFixed(2)),
      y: Math.round(last.endElevation),
      gradient: last.gradientPercent,
      color: last.color,
      index: segments.length - 1,
    })
  }

  // Estado del toque en el grafico
  const { state, isActive } = useChartPressState({ x: 0, y: { y: 0 } })

  // Estadisticas resumidas para mostrar sobre el grafico
  const totalGain = segments.reduce((acc, s) =>
    s.gradientPercent > 0 ? acc + (s.endElevation - s.startElevation) : acc, 0
  )
  const totalLoss = segments.reduce((acc, s) =>
    s.gradientPercent < 0 ? acc + Math.abs(s.endElevation - s.startElevation) : acc, 0
  )
  const maxElevation = Math.max(...data.map(d => d.y))
  const minElevation = Math.min(...data.map(d => d.y))

  return (
    <View style={styles.container}>
      {/* Estadisticas sobre el grafico */}
      <View style={styles.stats}>
        <StatItem label="Subida" value={`${Math.round(totalGain)}m`} color={COLORS.gradientSteep} />
        <StatItem label="Bajada" value={`${Math.round(totalLoss)}m`} color={COLORS.gradientMild} />
        <StatItem label="Max" value={`${maxElevation}m` } color={COLORS.textSecondary} />
        <StatItem label="Min" value={`${minElevation}m`} color={COLORS.textSecondary} />
      </View>

      {/* El grafico */}
      <CartesianChart
        data={data}
        xKey="x"
        yKeys={['y']}
        domainPadding={{ top: 20, bottom: 10 }}
        chartPressState={state}
        // El grafico llama a esto cuando el usuario toca
        onChartBoundsChange={() => {}}
      >
        {({ points, chartBounds }) => (
          <>
            {/* Area rellena bajo la linea, coloreada por segmento */}
            <Area
              points={points.y}
              y0={chartBounds.bottom}
              color={COLORS.gradientFlat}
              opacity={0.3}
              animate={{ type: 'spring' }}
            />

            {/* Linea del perfil de elevacion */}
            <Line
              points={points.y}
              color={COLORS.primary}
              strokeWidth={2}
              animate={{ type: 'spring' }}
            />

            {/* Punto indicador al tocar el grafico */}
            {isActive && (
              <Circle
                cx={state.x.position}
                cy={state.y.y.position}
                r={6}
                color={COLORS.primary}
              />
            )}
          </>
        )}
      </CartesianChart>

      {/* Tooltip cuando se toca el grafico */}
      {isActive && (
        <View style={styles.tooltip}>
          <Text style={styles.tooltipText}>
            km {state.x.value.toFixed(1)} · {Math.round(state.y.y.value)}m
          </Text>
        </View>
      )}

      {/* Leyenda de colores */}
      <View style={styles.legend}>
        <LegendItem color={COLORS.gradientFlat} label="Plano" />
        <LegendItem color={COLORS.gradientMild} label="Suave" />
        <LegendItem color={COLORS.gradientModerate} label="Moderado" />
        <LegendItem color={COLORS.gradientSteep} label="Pronunciado" />
        <LegendItem color={COLORS.gradientVerySteep} label="Muy pron." />
      </View>
    </View>
  )
}

function StatItem({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <View style={styles.statItem}>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  )
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendColor, { backgroundColor: color }]} />
      <Text style={styles.legendLabel}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    gap: 2,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: COLORS.surfaceAlt,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    top: 60,
    alignSelf: 'center',
  },
  tooltipText: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '600',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendColor: {
    width: 10,
    height: 10,
    borderRadius: 2,
  },
  legendLabel: {
    fontSize: 10,
    color: COLORS.textSecondary,
  },
})
```

---

## 4. Lista de segmentos en texto

Ademas del grafico visual, mostrar la descripcion textual de cada segmento:

```typescript
// src/components/route/ElevationSegmentList.tsx

import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import type { ElevationSegment } from '@/utils/elevation'
import { COLORS } from '@/constants/colors'

interface Props {
  segments: ElevationSegment[]
  // Al tocar un segmento de la lista, resaltar ese tramo en el mapa
  onSegmentPress?: (segment: ElevationSegment) => void
}

export function ElevationSegmentList({ segments, onSegmentPress }: Props) {
  // Agrupar segmentos consecutivos del mismo tipo para no mostrar 50 entradas
  // de "plano 100m" sino "plano 500m"
  const grouped = groupConsecutiveSegments(segments)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de la ruta</Text>
      {grouped.map((segment, index) => (
        <TouchableOpacity
          key={index}
          style={styles.segmentRow}
          onPress={() => onSegmentPress?.(segment)}
        >
          {/* Indicador de color */}
          <View style={[styles.colorBar, { backgroundColor: segment.color }]} />

          <View style={styles.segmentInfo}>
            <Text style={styles.segmentDescription}>{segment.description}</Text>
            <Text style={styles.segmentDetail}>
              {segment.gradientPercent > 0 ? '+' : ''}
              {segment.gradientPercent}% ·{' '}
              {Math.round((segment.endElevation + segment.startElevation) / 2)}m altitud
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )
}

// Combina segmentos consecutivos del mismo tipo
function groupConsecutiveSegments(segments: ElevationSegment[]): ElevationSegment[] {
  if (segments.length === 0) return []

  const result: ElevationSegment[] = []
  let current = { ...segments[0] }

  for (let i = 1; i < segments.length; i++) {
    const seg = segments[i]
    if (seg.type === current.type) {
      // Mismo tipo: extender el segmento actual
      current.endKm = seg.endKm
      current.endElevation = seg.endElevation
      current.gradientPercent = (current.gradientPercent + seg.gradientPercent) / 2
      current.description = buildDescription(current.startKm, current.endKm, current.gradientPercent)
    } else {
      result.push(current)
      current = { ...seg }
    }
  }
  result.push(current)

  return result
}

function buildDescription(startKm: number, endKm: number, gradient: number): string {
  const distanceM = Math.round((endKm - startKm) * 1000)
  const abs = Math.abs(gradient)
  if (abs <= 2) return `Tramo plano (${distanceM}m)`
  const dir = gradient > 0 ? 'Subida' : 'Bajada'
  const intensity = abs <= 5 ? 'suave' : abs <= 8 ? 'moderada' : abs <= 12 ? 'pronunciada' : 'muy pronunciada'
  return `${dir} ${intensity} del ${abs.toFixed(1)}% (${distanceM}m)`
}

const styles = StyleSheet.create({
  container: {
    gap: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  segmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
  },
  colorBar: {
    width: 4,
    height: 36,
    borderRadius: 2,
  },
  segmentInfo: {
    flex: 1,
    gap: 2,
  },
  segmentDescription: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
  },
  segmentDetail: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
})
```

---

## 5. Obtener elevacion desde Mapbox para rutas planificadas

Cuando el usuario planifica una ruta (no la graba con GPS), necesitamos
obtener los datos de elevacion desde Mapbox:

```typescript
// src/api/mapbox.ts

const TOKEN = process.env.EXPO_PUBLIC_MAPBOX_TOKEN!

/**
 * Dado un array de coordenadas [lng, lat], retorna el mismo array
 * con la elevacion agregada como tercer elemento [lng, lat, elevation].
 *
 * Usa la API de Mapbox Tilequery que consulta el tileset de elevacion
 * Terrain-RGB de Mapbox.
 */
export async function addElevationToCoordinates(
  coordinates: [number, number][]
): Promise<[number, number, number][]> {

  // La API de Mapbox tiene un limite de coordenadas por peticion.
  // Si la ruta tiene muchos puntos, procesamos en lotes de 300.
  const BATCH_SIZE = 300
  const result: [number, number, number][] = []

  for (let i = 0; i < coordinates.length; i += BATCH_SIZE) {
    const batch = coordinates.slice(i, i + BATCH_SIZE)
    const coordStr = batch.map(c => c.join(',')).join(';')

    const url = `https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/` +
      `${coordStr}.json?layers=contour&limit=1&access_token=${TOKEN}`

    const response = await fetch(url)
    const data = await response.json()

    // La API retorna los puntos en el mismo orden que los mandamos
    data.features.forEach((feature: any, index: number) => {
      const [lng, lat] = batch[index]
      const elevation = feature?.properties?.ele ?? 0
      result.push([lng, lat, elevation])
    })
  }

  return result
}
```

---

## 6. Pantalla de detalle de ruta

```typescript
// src/screens/map/RouteDetailScreen.tsx

import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { ElevationChart } from '@/components/route/ElevationChart'
import { ElevationSegmentList } from '@/components/route/ElevationSegmentList'
import { fetchRouteById } from '@/api/routes'
import { calculateElevationSegments } from '@/utils/elevation'
import { COLORS } from '@/constants/colors'

export function RouteDetailScreen() {
  const { params } = useRoute<any>()

  const { data: route, isLoading } = useQuery({
    queryKey: ['route', params.routeId],
    queryFn: () => fetchRouteById(params.routeId),
  })

  if (isLoading || !route) {
    return <LoadingView />
  }

  // Calcular segmentos de elevacion si no vienen precalculados de la DB
  const segments = route.elevation_segments
    ?? calculateElevationSegments(
         route.geojson.coordinates as [number, number, number][]
       )

  return (
    <ScrollView style={styles.container}>
      {/* Mini mapa de la ruta */}
      <RoutePreviewMap route={route} />

      {/* Informacion principal */}
      <View style={styles.content}>
        <Text style={styles.title}>{route.title}</Text>

        {/* Estadisticas rapidas */}
        <View style={styles.quickStats}>
          <QuickStat label="Distancia" value={`${route.distance_km.toFixed(1)} km`} />
          <QuickStat label="Subida" value={`${route.elevation_gain_m}m`} />
          <QuickStat label="Bajada" value={`${route.elevation_loss_m}m`} />
          <QuickStat label="Dificultad" value={route.difficulty ?? 'N/A'} />
        </View>

        {/* Grafico de elevacion */}
        <Text style={styles.sectionTitle}>Perfil de elevacion</Text>
        <ElevationChart
          segments={segments}
          height={180}
        />

        {/* Lista de segmentos en texto */}
        <ElevationSegmentList segments={segments} />
      </View>
    </ScrollView>
  )
}
```

---

## Checklist de esta sub-fase

```
[ ] La funcion haversineDistance retorna distancias correctas (verificar con Google Maps)
[ ] calculateElevationSegments divide correctamente en tramos de 100m
[ ] Los colores de los segmentos corresponden a la pendiente
[ ] Las descripciones en texto son claras y en espanol
[ ] El grafico de Victory XL se muestra sin errores
[ ] Al tocar el grafico aparece el tooltip con km y altitud
[ ] La leyenda de colores es visible
[ ] ElevationSegmentList agrupa segmentos consecutivos del mismo tipo
[ ] La pantalla de detalle de ruta muestra el grafico correctamente
[ ] Las estadisticas de desnivel positivo y negativo son correctas
```

---

Siguiente documento: 08_modo_grabacion.md
