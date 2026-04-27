# 06 - Mapa Principal
## Fase 1 - MVP Base

**Proposito de este documento:**
Implementar el mapa principal de RutaCo con Mapbox: mostrar rutas cargadas,
pins de servicios y zonas de seguridad. El mapa es la pantalla central de la app
y debe sentirse fluido y rapido.

**Por que Mapbox Outdoors:**
El estilo "Outdoors" de Mapbox muestra curvas de nivel, relieve del terreno,
senderos y caminos de montania. Es el estilo ideal para ciclismo porque el
ciclista puede ver la topografia del terreno de un vistazo, algo que Google Maps
o el estilo estandar de Mapbox no muestran.

---

## 1. Como funciona Mapbox en React Native

Mapbox renderiza el mapa usando OpenGL directamente en el dispositivo, lo que
lo hace muy rapido. A diferencia de un WebView (que mostraria el mapa en un
navegador incrustado y seria lento), Mapbox dibuja el mapa nativamente.

La libreria `@rnmapbox/maps` es el puente entre React Native y el SDK nativo de
Mapbox para iOS y Android.

---

## 2. Configuracion inicial de Mapbox

### En app.json agregar la configuracion nativa:

```json
{
  "expo": {
    "plugins": [
      [
        "@rnmapbox/maps",
        {
          "RNMapboxMapsImpl": "mapbox",
          "RNMapboxMapsDownloadToken": "tu_token_de_mapbox"
        }
      ]
    ]
  }
}
```

**Por que necesitamos esto en app.json:**
Mapbox requiere configuracion en el codigo nativo de iOS (Info.plist) y Android
(AndroidManifest.xml). Expo lo maneja automaticamente si lo declaramos en app.json
como plugin. Sin esto, la app crashea al intentar mostrar el mapa.

---

## 3. Componente del mapa base

```typescript
// src/components/map/RutaCoMap.tsx

import { useRef, forwardRef } from 'react'
import MapboxGL from '@rnmapbox/maps'
import { StyleSheet } from 'react-native'

// Inicializar Mapbox con el token una sola vez cuando se importa el modulo
MapboxGL.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_TOKEN!)

interface RutaCoMapProps {
  children?: React.ReactNode
  onMapReady?: () => void
  onPress?: (coordinates: [number, number]) => void
  followUser?: boolean  // si true, la camara sigue la posicion del usuario
}

export const RutaCoMap = forwardRef<MapboxGL.MapView, RutaCoMapProps>(
  ({ children, onMapReady, onPress, followUser = false }, ref) => {
    return (
      <MapboxGL.MapView
        ref={ref}
        style={styles.map}

        // Outdoors muestra curvas de nivel y relieve - ideal para ciclismo
        styleURL={MapboxGL.StyleURL.Outdoors}

        // Deshabilitar logo de Mapbox (se puede, siempre que se cite en creditos)
        logoEnabled={false}
        attributionEnabled={false}

        // La brujula aparece cuando el mapa esta rotado
        compassEnabled
        compassViewPosition={0} // esquina superior derecha

        onDidFinishLoadingMap={onMapReady}
        onPress={(feature) => {
          const coords = feature.geometry.coordinates as [number, number]
          onPress?.(coords)
        }}
      >
        {/* Camara: controla hacia donde mira el mapa */}
        <MapboxGL.Camera
          ref={undefined}
          zoomLevel={13}
          centerCoordinate={[-74.0721, 4.7110]} // centro de Bogota
          animationMode="flyTo"
          animationDuration={1000}
          followUserLocation={followUser}
          followUserMode={followUser ? 'normal' : undefined}
        />

        {/* Punto azul de ubicacion del usuario */}
        <MapboxGL.UserLocation
          visible
          animated
          renderMode="native" // mas eficiente que el modo custom
        />

        {/* Aqui van las capas de rutas, pins, etc. */}
        {children}
      </MapboxGL.MapView>
    )
  }
)

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
})
```

---

## 4. Pantalla principal del mapa

```typescript
// src/screens/map/MapScreen.tsx

import { useRef, useState, useCallback } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import MapboxGL from '@rnmapbox/maps'
import { RutaCoMap } from '@/components/map/RutaCoMap'
import { RouteLayer } from '@/components/map/RouteLayer'
import { ServicePinsLayer } from '@/components/map/ServicePinsLayer'
import { SecurityZonesLayer } from '@/components/map/SecurityZonesLayer'
import { MapFilters } from '@/components/map/MapFilters'
import { fetchRoutesForMap } from '@/api/routes'
import { fetchServicePoints } from '@/api/services'
import { fetchSecurityReports } from '@/api/security'
import { COLORS } from '@/constants/colors'

export function MapScreen() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<any>()
  const mapRef = useRef<MapboxGL.MapView>(null)

  // Estado de filtros activos
  const [filters, setFilters] = useState({
    difficulty: null as string | null,
    maxDistance: null as number | null,
    showServices: true,
    showSecurity: true,
  })

  // Cargar rutas con React Query
  // queryKey incluye los filtros para que se recargue cuando cambian
  const { data: routes = [] } = useQuery({
    queryKey: ['map-routes', filters],
    queryFn: () => fetchRoutesForMap(filters),
  })

  // Cargar puntos de servicio
  const { data: servicePoints = [] } = useQuery({
    queryKey: ['service-points'],
    queryFn: fetchServicePoints,
    staleTime: 1000 * 60 * 30, // los talleres no cambian seguido, cache 30 min
  })

  // Cargar reportes de seguridad
  const { data: securityReports = [] } = useQuery({
    queryKey: ['security-reports'],
    queryFn: fetchSecurityReports,
    staleTime: 1000 * 60 * 5,  // actualizar cada 5 minutos
    refetchInterval: 1000 * 60 * 5,
  })

  // Ir a la ubicacion del usuario
  const goToMyLocation = useCallback(async () => {
    const location = await MapboxGL.locationManager.getLastKnownLocation()
    if (location && mapRef.current) {
      // flyTo anima la camara suavemente hasta la nueva posicion
      mapRef.current.flyTo(
        [location.coords.longitude, location.coords.latitude],
        1000 // duracion de la animacion en ms
      )
    }
  }, [])

  const handleRoutePress = useCallback((routeId: string) => {
    navigation.navigate('RouteDetail', { routeId })
  }, [navigation])

  return (
    <View style={styles.container}>
      <RutaCoMap ref={mapRef}>

        {/* Capa de rutas */}
        {routes.map((route) => (
          <RouteLayer
            key={route.id}
            route={route}
            onPress={() => handleRoutePress(route.id)}
          />
        ))}

        {/* Pins de servicios */}
        {filters.showServices && (
          <ServicePinsLayer servicePoints={servicePoints} />
        )}

        {/* Zonas de seguridad */}
        {filters.showSecurity && (
          <SecurityZonesLayer reports={securityReports} />
        )}

      </RutaCoMap>

      {/* Botones flotantes sobre el mapa */}
      <View style={[styles.topControls, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity
          style={styles.plannerButton}
          onPress={() => navigation.navigate('Planner')}
        >
          <Text style={styles.plannerButtonText}>+ Planificar ruta</Text>
        </TouchableOpacity>
      </View>

      {/* Boton de mi ubicacion */}
      <TouchableOpacity
        style={[styles.locationButton, { bottom: 100 + insets.bottom }]}
        onPress={goToMyLocation}
      >
        <Text style={styles.locationIcon}>⊙</Text>
      </TouchableOpacity>

      {/* Panel de filtros en la parte inferior */}
      <View style={[styles.filtersContainer, { paddingBottom: insets.bottom + 8 }]}>
        <MapFilters filters={filters} onChange={setFilters} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topControls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
  },
  plannerButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  plannerButtonText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 15,
  },
  locationButton: {
    position: 'absolute',
    right: 16,
    backgroundColor: COLORS.surface,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 4,
  },
  locationIcon: {
    fontSize: 22,
    color: COLORS.primary,
  },
  filtersContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
  },
})
```

---

## 5. Capa de rutas en el mapa

```typescript
// src/components/map/RouteLayer.tsx

import MapboxGL from '@rnmapbox/maps'
import type { Route } from '@/types/database'
import { COLORS } from '@/constants/colors'

// Colores por dificultad de la ruta
const DIFFICULTY_COLORS: Record<string, string> = {
  plano: COLORS.gradientFlat,
  moderado: COLORS.gradientMild,
  dificil: COLORS.gradientSteep,
  muy_dificil: COLORS.gradientVerySteep,
}

interface RouteLayerProps {
  route: Route
  isSelected?: boolean
  onPress?: () => void
}

export function RouteLayer({ route, isSelected = false, onPress }: RouteLayerProps) {
  const color = DIFFICULTY_COLORS[route.difficulty ?? 'plano']

  // Un ShapeSource agrupa datos geograficos (en formato GeoJSON)
  // que luego pueden ser visualizados por diferentes tipos de capas (LineLayer, CircleLayer, etc.)
  return (
    <MapboxGL.ShapeSource
      id={`route-source-${route.id}`}
      shape={{
        type: 'Feature',
        geometry: route.geojson,
        properties: { id: route.id },
      }}
      onPress={onPress}
    >
      {/* Sombra de la linea (se ve detras para dar profundidad) */}
      <MapboxGL.LineLayer
        id={`route-shadow-${route.id}`}
        style={{
          lineColor: '#000',
          lineWidth: isSelected ? 10 : 7,
          lineOpacity: 0.2,
          lineCap: 'round',
          lineJoin: 'round',
        }}
        belowLayerID="road-label"
      />

      {/* La linea de la ruta */}
      <MapboxGL.LineLayer
        id={`route-line-${route.id}`}
        style={{
          lineColor: color,
          lineWidth: isSelected ? 6 : 4,
          lineOpacity: isSelected ? 1 : 0.8,
          lineCap: 'round',
          lineJoin: 'round',
        }}
      />

      {/* Punto de inicio de la ruta */}
      {route.start_lat && route.start_lng && (
        <MapboxGL.SymbolLayer
          id={`route-start-${route.id}`}
          style={{
            iconImage: 'marker',
            iconSize: 0.8,
            iconColor: color,
          }}
        />
      )}
    </MapboxGL.ShapeSource>
  )
}
```

**Que es un ShapeSource y un LineLayer:**
- `ShapeSource`: le dice a Mapbox "aqui hay datos geograficos en formato GeoJSON"
- `LineLayer`: le dice a Mapbox "dibuja esos datos como una linea con estos estilos"
- `SymbolLayer`: dibuja iconos o texto en posiciones geograficas
- `CircleLayer`: dibuja circulos en posiciones geograficas

Separarlos permite usar los mismos datos con multiples estilos visuales.

---

## 6. Pins de servicios

```typescript
// src/components/map/ServicePinsLayer.tsx

import MapboxGL from '@rnmapbox/maps'
import type { ServicePoint } from '@/types/database'

interface Props {
  servicePoints: ServicePoint[]
  onPinPress?: (point: ServicePoint) => void
}

// Icono por tipo de servicio
const SERVICE_ICONS: Record<string, string> = {
  formal_shop: '🔧',
  informal_stand: '⚙️',
  water: '💧',
  food: '🍌',
}

export function ServicePinsLayer({ servicePoints, onPinPress }: Props) {
  // Convertir array de puntos a un GeoJSON FeatureCollection
  // Mapbox puede renderizar miles de puntos de golpe con una sola fuente
  const geojson: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: servicePoints.map((point) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [point.lng, point.lat],
      },
      properties: {
        id: point.id,
        name: point.name,
        type: point.service_type,
        is_verified: point.is_verified,
      },
    })),
  }

  return (
    <MapboxGL.ShapeSource
      id="service-points-source"
      shape={geojson}
      cluster           // agrupa pins cercanos automaticamente
      clusterRadius={50}
      onPress={(e) => {
        const feature = e.features[0]
        if (feature?.properties?.id) {
          const point = servicePoints.find(p => p.id === feature.properties.id)
          if (point) onPinPress?.(point)
        }
      }}
    >
      {/* Circulos de clusters */}
      <MapboxGL.CircleLayer
        id="service-clusters"
        filter={['has', 'point_count']} // solo aplica a clusters
        style={{
          circleRadius: 20,
          circleColor: '#1a1d27',
          circleBorderWidth: 2,
          circleBorderColor: '#22c55e',
        }}
      />

      {/* Numero dentro del cluster */}
      <MapboxGL.SymbolLayer
        id="service-cluster-count"
        filter={['has', 'point_count']}
        style={{
          textField: ['get', 'point_count'],
          textSize: 13,
          textColor: '#fff',
        }}
      />

      {/* Pins individuales */}
      <MapboxGL.CircleLayer
        id="service-points"
        filter={['!', ['has', 'point_count']]} // solo aplica a puntos individuales
        style={{
          circleRadius: 12,
          circleColor: [
            'match', ['get', 'service_type'],
            'formal_shop', '#3b82f6',
            'informal_stand', '#f59e0b',
            'water', '#06b6d4',
            'food', '#10b981',
            '#6b7280', // color por defecto
          ],
          circleBorderWidth: 2,
          circleBorderColor: '#fff',
        }}
      />
    </MapboxGL.ShapeSource>
  )
}
```

**Que es el clustering:**
Cuando hay muchos pins cercanos, Mapbox los agrupa automaticamente en un solo
pin con un numero que indica cuantos hay. Al hacer zoom, los clusters se separan
en pins individuales. Esto hace el mapa legible cuando hay muchos puntos.

---

## 7. Zonas de seguridad

```typescript
// src/components/map/SecurityZonesLayer.tsx

import MapboxGL from '@rnmapbox/maps'
import type { SecurityReport } from '@/types/database'

interface Props {
  reports: SecurityReport[]
}

export function SecurityZonesLayer({ reports }: Props) {
  const geojson: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: reports.map((report) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [report.lng, report.lat],
      },
      properties: {
        type: report.report_type,
      },
    })),
  }

  return (
    <MapboxGL.ShapeSource id="security-source" shape={geojson}>
      {/* Circulo exterior semitransparente (radio de influencia visual) */}
      <MapboxGL.CircleLayer
        id="security-radius"
        style={{
          circleRadius: 40,
          circleColor: '#ef4444',
          circleOpacity: 0.1,
          circlePitchAlignment: 'map',
        }}
      />

      {/* Punto central */}
      <MapboxGL.CircleLayer
        id="security-center"
        style={{
          circleRadius: 8,
          circleColor: '#ef4444',
          circleOpacity: 0.7,
          circleBorderWidth: 2,
          circleBorderColor: '#fff',
        }}
      />
    </MapboxGL.ShapeSource>
  )
}
```

---

## 8. Consultas a Supabase para el mapa

```typescript
// src/api/routes.ts

import { supabase } from './supabase'

interface MapFilters {
  difficulty: string | null
  maxDistance: number | null
}

export async function fetchRoutesForMap(filters: MapFilters) {
  // Construir la consulta base
  // Nota: NO traemos el geojson completo aqui (puede ser muy pesado)
  // Solo traemos los datos necesarios para mostrar en el mapa
  let query = supabase
    .from('routes')
    .select(`
      id,
      title,
      distance_km,
      elevation_gain_m,
      difficulty,
      visibility,
      start_lat,
      start_lng,
      geojson,
      likes_count,
      profiles (username, avatar_url)
    `)
    .eq('visibility', 'public')
    .limit(50) // no traer mas de 50 rutas a la vez para no sobrecargar el mapa

  // Aplicar filtros opcionales
  if (filters.difficulty) {
    query = query.eq('difficulty', filters.difficulty)
  }
  if (filters.maxDistance) {
    query = query.lte('distance_km', filters.maxDistance)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error cargando rutas:', error)
    return []
  }

  return data ?? []
}

export async function fetchServicePoints() {
  const { data, error } = await supabase
    .from('service_points')
    .select('*')
    .eq('is_active', true)

  if (error) {
    console.error('Error cargando servicios:', error)
    return []
  }

  return data ?? []
}

export async function fetchSecurityReports() {
  const { data, error } = await supabase
    .from('security_reports')
    .select('*')
    .eq('is_active', true)
    .gt('expires_at', new Date().toISOString()) // solo reportes no expirados

  if (error) return []
  return data ?? []
}
```

---

## 9. Cargar rutas de prueba (seed data)

Para el MVP necesitamos cargar manualmente algunas rutas de Bogota.
Crear un script SQL para insertar datos iniciales:

```sql
-- supabase/seed/bogota_routes.sql
-- Ejecutar en el SQL Editor de Supabase

-- Primero necesitas el UUID de tu usuario (aparece en Authentication > Users)
-- Reemplaza 'TU_USER_ID' con ese UUID

INSERT INTO routes (
  user_id, title, description, geojson,
  distance_km, elevation_gain_m, elevation_loss_m,
  difficulty, visibility, start_lat, start_lng,
  start_location_name, is_recorded
) VALUES (
  'TU_USER_ID',
  'Subida a La Calera',
  'Clasica ruta de ascenso desde Bogota hasta el municipio de La Calera. Subida sostenida con vistas panoramicas de la sabana.',
  '{"type":"LineString","coordinates":[[-74.0312,4.6097],[-74.0290,4.6150],[-74.0268,4.6203]]}',
  -- (el geojson real tendria muchos mas puntos)
  45.2, 1200, 1200,
  'dificil', 'public', 4.6097, -74.0312,
  'Chapinero, Bogota',
  false
);

-- Agregar mas rutas siguiendo el mismo patron...
```

**Donde conseguir coordenadas reales:**
Usar Strava o Komoot para exportar rutas conocidas de Bogota como archivo GPX,
luego convertir el GPX a GeoJSON con la herramienta online `gpx.studio`.

---

## Checklist de esta sub-fase

```
[ ] Mapa se muestra con estilo Outdoors en el celular
[ ] Ubicacion del usuario (punto azul) aparece correctamente
[ ] Boton de "ir a mi ubicacion" funciona
[ ] Al menos 5 rutas de prueba visibles en el mapa
[ ] Las rutas tienen colores segun dificultad
[ ] Al tocar una ruta navega a RouteDetail
[ ] Pins de servicios aparecen en el mapa
[ ] Clustering de pins funciona al alejar el zoom
[ ] Zonas de seguridad aparecen en rojo semitransparente
[ ] Filtros de dificultad y distancia funcionan
[ ] El mapa no se congela al cargar multiples rutas
```

---

Siguiente documento: 07_grafico_de_elevacion.md
