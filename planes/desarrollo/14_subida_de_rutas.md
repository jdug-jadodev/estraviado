# 14 - Subida de Rutas
## Fase 2 - Navegacion y Social

**Proposito de este documento:**
Implementar la funcionalidad que permite a los usuarios de la comunidad subir
sus propias rutas a RutaCo. Esto es clave para que el contenido de la app crezca
organicamente: en el MVP las rutas las carga el equipo manualmente, pero desde
la Fase 2 cualquier ciclista puede contribuir.

**Dos origenes de rutas:**
- **Grabadas en vivo**: se suben automaticamente al terminar el modo grabacion
- **Importadas**: el usuario sube un archivo GPX exportado de Strava, Komoot, etc.

---

## 1. Flujo completo de subida de ruta grabada

Cuando el usuario termina una grabacion (documento `08_modo_grabacion.md`), la app
ya tiene el trazo GPS, la distancia y el desnivel. El flujo continua asi:

1. Pantalla de resumen de grabacion con estadisticas
2. El usuario escribe un titulo y elige visibilidad
3. La app calcula los segmentos de elevacion y los guarda
4. Se sube el GeoJSON y los metadatos a Supabase
5. La actividad aparece en el feed de sus seguidores

---

## 2. Flujo de importacion de GPX

GPX (GPS Exchange Format) es el formato estandar que exportan Strava, Komoot,
Garmin y casi cualquier dispositivo GPS. Es un archivo XML con puntos de latitud,
longitud y elevacion.

```typescript
// src/utils/gpxParser.ts

export interface ParsedGPX {
  coordinates: [number, number, number][]  // [lng, lat, elevation]
  name?: string
  totalDistanceKm: number
  elevationGainM: number
  elevationLossM: number
}

// Parsear un archivo GPX y extraer las coordenadas y metadatos
export function parseGPX(gpxString: string): ParsedGPX {
  // En React Native no hay DOMParser. Usar una libreria ligera o parsear manualmente.
  // La libreria 'fast-xml-parser' es la mejor opcion:
  // npm install fast-xml-parser

  const { XMLParser } = require('fast-xml-parser')
  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' })
  const parsed = parser.parse(gpxString)

  const gpx = parsed.gpx
  const name = gpx?.trk?.name as string | undefined

  // Extraer los puntos del track
  const trkpts = gpx?.trk?.trkseg?.trkpt

  if (!trkpts) {
    throw new Error('El archivo GPX no contiene puntos de ruta')
  }

  // trkpts puede ser un objeto (si hay un solo punto) o un array
  const points = Array.isArray(trkpts) ? trkpts : [trkpts]

  const coordinates: [number, number, number][] = points.map((pt: any) => [
    parseFloat(pt['@_lon']),
    parseFloat(pt['@_lat']),
    parseFloat(pt.ele ?? '0'),
  ])

  // Calcular distancia total
  let totalDistanceKm = 0
  let elevationGainM = 0
  let elevationLossM = 0

  for (let i = 1; i < coordinates.length; i++) {
    const dist = haversineDistance(
      coordinates[i - 1][1], coordinates[i - 1][0],
      coordinates[i][1], coordinates[i][0]
    )
    totalDistanceKm += dist

    const elevDiff = coordinates[i][2] - coordinates[i - 1][2]
    if (elevDiff > 0) elevationGainM += elevDiff
    else elevationLossM += Math.abs(elevDiff)
  }

  return {
    coordinates,
    name,
    totalDistanceKm: Math.round(totalDistanceKm * 100) / 100,
    elevationGainM: Math.round(elevationGainM),
    elevationLossM: Math.round(elevationLossM),
  }
}

// Distancia entre dos coordenadas en km (formula de Haversine)
export function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}
```

---

## 3. Simplificacion del trazo antes de guardar

Las rutas grabadas o importadas pueden tener miles de puntos GPS que pesan mucho
y ralentizan el mapa. El algoritmo Ramer-Douglas-Peucker simplifica el trazo
eliminando puntos redundantes sin perder la forma de la ruta.

```typescript
// src/utils/routeSimplification.ts

// Implementacion del algoritmo Ramer-Douglas-Peucker
// Epsilon es la tolerancia en km: 0.01 km = 10 metros es un buen balance
export function simplifyRoute(
  coordinates: [number, number, number][],
  epsilon: number = 0.01
): [number, number, number][] {
  if (coordinates.length <= 2) return coordinates

  // Encontrar el punto mas alejado de la linea recta entre el primero y el ultimo
  let maxDistance = 0
  let maxIndex = 0

  const start = coordinates[0]
  const end = coordinates[coordinates.length - 1]

  for (let i = 1; i < coordinates.length - 1; i++) {
    const distance = perpendicularDistance(coordinates[i], start, end)
    if (distance > maxDistance) {
      maxDistance = distance
      maxIndex = i
    }
  }

  // Si el punto mas alejado esta dentro de la tolerancia, eliminar todos los intermedios
  if (maxDistance <= epsilon) {
    return [start, end]
  }

  // Si no, dividir en dos segmentos y simplificar cada uno recursivamente
  const left = simplifyRoute(coordinates.slice(0, maxIndex + 1), epsilon)
  const right = simplifyRoute(coordinates.slice(maxIndex), epsilon)

  // Unir sin duplicar el punto del medio
  return [...left.slice(0, -1), ...right]
}

function perpendicularDistance(
  point: [number, number, number],
  lineStart: [number, number, number],
  lineEnd: [number, number, number]
): number {
  const dx = lineEnd[0] - lineStart[0]
  const dy = lineEnd[1] - lineStart[1]

  if (dx === 0 && dy === 0) {
    return haversineDistance(point[1], point[0], lineStart[1], lineStart[0])
  }

  const t = ((point[0] - lineStart[0]) * dx + (point[1] - lineStart[1]) * dy) /
    (dx * dx + dy * dy)

  const tClamped = Math.max(0, Math.min(1, t))
  const closestLng = lineStart[0] + tClamped * dx
  const closestLat = lineStart[1] + tClamped * dy

  return haversineDistance(point[1], point[0], closestLat, closestLng)
}
```

---

## 4. API de guardado de rutas

```typescript
// src/api/routes.ts (nuevas funciones para la Fase 2)

import { supabase } from './supabase'
import { calculateElevationSegments } from '@/utils/elevation'
import { simplifyRoute } from '@/utils/routeSimplification'
import { classifyDifficulty } from '@/utils/routeClassification'

interface SaveRouteInput {
  title: string
  description?: string
  visibility: 'public' | 'connections' | 'private'
  geojson: {
    type: 'LineString'
    coordinates: [number, number, number][] | [number, number][]
  }
  waypoints?: any[]
  distance_km: number
  elevation_gain_m: number
  elevation_loss_m?: number
  has_return: boolean
  is_recorded: boolean
  cover_image_url?: string
}

export async function saveRoute(input: SaveRouteInput) {
  const { data: currentUser } = await supabase.auth.getUser()
  if (!currentUser.user) throw new Error('No autenticado')

  // Simplificar el trazo para no guardar puntos redundantes
  const coordinates = input.geojson.coordinates as [number, number, number][]
  const simplified = simplifyRoute(coordinates)

  // Calcular los segmentos de elevacion para el grafico interactivo
  const elevationSegments = calculateElevationSegments(simplified)

  // Determinar la dificultad automaticamente segun el desnivel y la distancia
  const difficulty = classifyDifficulty(input.distance_km, input.elevation_gain_m)

  // Punto de inicio y fin
  const startCoord = simplified[0]
  const endCoord = simplified[simplified.length - 1]

  const { data: route, error } = await supabase
    .from('routes')
    .insert({
      user_id: currentUser.user.id,
      title: input.title,
      description: input.description,
      visibility: input.visibility,
      geojson: {
        type: 'LineString',
        coordinates: simplified,
      },
      elevation_segments: elevationSegments,
      distance_km: input.distance_km,
      elevation_gain_m: input.elevation_gain_m,
      elevation_loss_m: input.elevation_loss_m ?? 0,
      difficulty,
      has_return: input.has_return,
      is_recorded: input.is_recorded,
      start_lat: startCoord[1],
      start_lng: startCoord[0],
      end_lat: endCoord[1],
      end_lng: endCoord[0],
      cover_image_url: input.cover_image_url,
    })
    .select()
    .single()

  if (error) throw error

  // Guardar los waypoints si los hay
  if (input.waypoints && input.waypoints.length > 0) {
    await supabase.from('route_waypoints').insert(
      input.waypoints.map((wp, index) => ({
        route_id: route.id,
        order_index: index,
        lat: wp.lat,
        lng: wp.lng,
        label: wp.label,
        waypoint_type: wp.waypoint_type,
        stay_minutes: wp.stay_minutes ?? 0,
      }))
    )
  }

  // Actualizar estadisticas totales del perfil del usuario
  await updateUserStats(currentUser.user.id, input.distance_km, input.elevation_gain_m)

  return route
}

// Importar una ruta desde un archivo GPX
export async function importGPXRoute(
  gpxContent: string,
  title: string,
  visibility: 'public' | 'connections' | 'private'
) {
  const { parseGPX } = await import('@/utils/gpxParser')
  const parsed = parseGPX(gpxContent)

  return saveRoute({
    title: title || parsed.name || 'Ruta importada',
    visibility,
    geojson: {
      type: 'LineString',
      coordinates: parsed.coordinates,
    },
    distance_km: parsed.totalDistanceKm,
    elevation_gain_m: parsed.elevationGainM,
    elevation_loss_m: parsed.elevationLossM,
    has_return: false,
    is_recorded: false,
  })
}

async function updateUserStats(userId: string, distanceKm: number, elevationGainM: number) {
  // Sumar al acumulado del usuario de forma atomica
  // Supabase no tiene update atomico con suma directa, pero se puede hacer con RPC
  await supabase.rpc('increment_user_stats', {
    p_user_id: userId,
    p_distance_km: distanceKm,
    p_elevation_m: elevationGainM,
  })
}
```

Crear la funcion RPC en Supabase:

```sql
-- supabase/migrations/add_increment_user_stats.sql

create or replace function increment_user_stats(
  p_user_id uuid,
  p_distance_km float,
  p_elevation_m float
) returns void as $$
  update profiles
  set
    total_distance_km = total_distance_km + p_distance_km,
    total_elevation_m = total_elevation_m + p_elevation_m,
    total_rides = total_rides + 1
  where id = p_user_id;
$$ language sql security definer;
```

---

## 5. Clasificacion automatica de dificultad

```typescript
// src/utils/routeClassification.ts

// Clasificar la dificultad de una ruta segun distancia y desnivel positivo
// Basado en criterios pensados para ciclistas colombianos
export function classifyDifficulty(distanceKm: number, elevationGainM: number): string {
  // Desnivel por kilometro como indicador principal
  const elevPerKm = elevationGainM / distanceKm

  if (elevPerKm < 5) return 'plano'
  if (elevPerKm < 15) return 'moderado'
  if (elevPerKm < 25) return 'dificil'
  return 'muy_dificil'
}

// Labels en espanol para mostrar en la UI
export const DIFFICULTY_LABELS: Record<string, string> = {
  plano: 'Plano',
  moderado: 'Moderado',
  dificil: 'Dificil',
  muy_dificil: 'Muy dificil',
}

// Colores de dificultad consistentes en toda la app
export const DIFFICULTY_COLORS: Record<string, string> = {
  plano: '#22c55e',
  moderado: '#eab308',
  dificil: '#f97316',
  muy_dificil: '#ef4444',
}
```

---

## 6. Pantalla de importacion de GPX

```typescript
// src/screens/route/ImportGPXScreen.tsx

import { useState } from 'react'
import {
  View, Text, TouchableOpacity, StyleSheet,
  TextInput, ActivityIndicator, ScrollView
} from 'react-native'
import * as DocumentPicker from 'expo-document-picker'
import * as FileSystem from 'expo-file-system'
import { useNavigation } from '@react-navigation/native'
import { importGPXRoute } from '@/api/routes'
import { parseGPX } from '@/utils/gpxParser'
import { COLORS } from '@/constants/colors'

export function ImportGPXScreen() {
  const navigation = useNavigation<any>()
  const [gpxContent, setGpxContent] = useState<string | null>(null)
  const [preview, setPreview] = useState<ReturnType<typeof parseGPX> | null>(null)
  const [title, setTitle] = useState('')
  const [visibility, setVisibility] = useState<'public' | 'connections' | 'private'>('public')
  const [isImporting, setIsImporting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const pickGPXFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/gpx+xml', 'text/xml', '*/*'],
        copyToCacheDirectory: true,
      })

      if (result.canceled) return

      const file = result.assets[0]

      // Validar que sea un GPX por la extension
      if (!file.name.toLowerCase().endsWith('.gpx')) {
        setError('El archivo debe ser un .gpx exportado de Strava, Komoot u otro dispositivo GPS')
        return
      }

      // Leer el contenido del archivo
      const content = await FileSystem.readAsStringAsync(file.uri)
      const parsed = parseGPX(content)

      setGpxContent(content)
      setPreview(parsed)
      setTitle(parsed.name ?? '')
      setError(null)
    } catch (e) {
      setError('No se pudo leer el archivo. Asegurate de que sea un GPX valido.')
    }
  }

  const handleImport = async () => {
    if (!gpxContent || !title.trim()) return

    setIsImporting(true)
    try {
      const route = await importGPXRoute(gpxContent, title.trim(), visibility)
      navigation.navigate('RouteDetail', { routeId: route.id })
    } catch (e) {
      setError('No se pudo importar la ruta. Intentalo de nuevo.')
    } finally {
      setIsImporting(false)
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Importar ruta GPX</Text>
      <Text style={styles.subtitle}>
        Exporta tus rutas de Strava, Komoot o tu ciclocomputador y subelas a RutaCo.
      </Text>

      {/* Selector de archivo */}
      <TouchableOpacity style={styles.uploadArea} onPress={pickGPXFile}>
        {preview ? (
          <>
            <Text style={styles.uploadSuccess}>✓ Archivo cargado</Text>
            <Text style={styles.uploadFileName}>{preview.totalDistanceKm.toFixed(1)} km · +{preview.elevationGainM}m</Text>
          </>
        ) : (
          <>
            <Text style={styles.uploadIcon}>📁</Text>
            <Text style={styles.uploadText}>Tocar para seleccionar un archivo .gpx</Text>
          </>
        )}
      </TouchableOpacity>

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      {preview && (
        <>
          {/* Vista previa de los datos */}
          <View style={styles.previewCard}>
            <Text style={styles.previewTitle}>Vista previa</Text>
            <View style={styles.previewStats}>
              <PreviewStat label="Distancia" value={`${preview.totalDistanceKm.toFixed(1)} km`} />
              <PreviewStat label="Desnivel +" value={`${preview.elevationGainM} m`} />
              <PreviewStat label="Desnivel -" value={`${preview.elevationLossM} m`} />
              <PreviewStat label="Puntos GPS" value={preview.coordinates.length.toLocaleString()} />
            </View>
          </View>

          {/* Nombre de la ruta */}
          <Text style={styles.label}>Nombre de la ruta</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Ej: Vuelta a La Calera"
            placeholderTextColor={COLORS.textSecondary}
            maxLength={80}
          />

          {/* Visibilidad */}
          <Text style={styles.label}>Visibilidad</Text>
          <View style={styles.visibilityRow}>
            {[
              { value: 'public', label: 'Publica' },
              { value: 'connections', label: 'Conexiones' },
              { value: 'private', label: 'Privada' },
            ].map(opt => (
              <TouchableOpacity
                key={opt.value}
                style={[styles.visibilityChip, visibility === opt.value && styles.visibilityChipActive]}
                onPress={() => setVisibility(opt.value as any)}
              >
                <Text style={[
                  styles.visibilityChipText,
                  visibility === opt.value && styles.visibilityChipTextActive,
                ]}>
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.importButton, (!title.trim() || isImporting) && styles.importButtonDisabled]}
            onPress={handleImport}
            disabled={!title.trim() || isImporting}
          >
            {isImporting ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Text style={styles.importButtonText}>Subir a RutaCo</Text>
            )}
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  )
}

function PreviewStat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.previewStat}>
      <Text style={styles.previewStatValue}>{value}</Text>
      <Text style={styles.previewStatLabel}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20, paddingBottom: 40 },
  title: { color: COLORS.text, fontSize: 24, fontWeight: '700', marginBottom: 8 },
  subtitle: { color: COLORS.textSecondary, fontSize: 14, lineHeight: 20, marginBottom: 24 },
  uploadArea: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    padding: 32,
    alignItems: 'center',
    gap: 8,
  },
  uploadIcon: { fontSize: 32 },
  uploadText: { color: COLORS.textSecondary, fontSize: 14, textAlign: 'center' },
  uploadSuccess: { color: COLORS.primary, fontSize: 16, fontWeight: '600' },
  uploadFileName: { color: COLORS.textSecondary, fontSize: 13 },
  errorText: { color: '#ef4444', fontSize: 13, marginTop: 8 },
  previewCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
  previewTitle: { color: COLORS.textSecondary, fontSize: 12, marginBottom: 12 },
  previewStats: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  previewStat: {},
  previewStatValue: { color: COLORS.text, fontSize: 16, fontWeight: '700' },
  previewStatLabel: { color: COLORS.textSecondary, fontSize: 11, marginTop: 2 },
  label: { color: COLORS.textSecondary, fontSize: 13, marginTop: 16, marginBottom: 8 },
  input: {
    backgroundColor: COLORS.surface,
    color: COLORS.text,
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
  },
  visibilityRow: { flexDirection: 'row', gap: 8 },
  visibilityChip: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  visibilityChipActive: { borderColor: COLORS.primary },
  visibilityChipText: { color: COLORS.textSecondary, fontSize: 13 },
  visibilityChipTextActive: { color: COLORS.primary, fontWeight: '600' },
  importButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginTop: 32,
  },
  importButtonDisabled: { opacity: 0.5 },
  importButtonText: { color: '#000', fontWeight: '700', fontSize: 16 },
})
```

---

## 7. Moderacion basica de rutas subidas por usuarios

Las rutas de usuarios se marcan como no verificadas hasta que alguien del equipo
las revisa. En la UI, las rutas no verificadas se muestran con un badge visible.

```sql
-- Agregar columna de verificacion a la tabla routes (si no existe)
alter table routes add column if not exists is_verified boolean default false;
alter table routes add column if not exists verified_by uuid references profiles(id);
alter table routes add column if not exists verified_at timestamptz;

-- Las rutas cargadas por el equipo se marcan como verificadas directamente:
-- update routes set is_verified = true where user_id = 'ID_DEL_EQUIPO';
```

En el mapa, las rutas verificadas tienen un icono de escudo verde. Las no verificadas
tienen un badge de "Sin verificar" en el detalle.

---

## Checklist de esta sub-fase

```
[ ] Las rutas grabadas en vivo se pueden subir con titulo y visibilidad
[ ] La importacion de archivos GPX funciona en iOS y Android
[ ] El parser de GPX lee correctamente los archivos de Strava y Komoot
[ ] El trazo se simplifica antes de guardar (probar con rutas de 5000+ puntos)
[ ] La dificultad se calcula automaticamente y es coherente con la ruta
[ ] Los segmentos de elevacion se calculan y guardan correctamente
[ ] Las estadisticas del perfil se actualizan al subir una ruta
[ ] Las rutas con visibilidad 'connections' no las ven usuarios que no siguen al autor
[ ] Las rutas no verificadas muestran badge en el detalle
[ ] Manejar correctamente archivos GPX con formato invalido (mostrar error claro)
[ ] npm install fast-xml-parser y expo-document-picker estan en el package.json
```

---

Siguiente documento: 15_verificacion_de_telefono.md
