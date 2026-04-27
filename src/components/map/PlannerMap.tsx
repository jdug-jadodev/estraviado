import { useRef, useCallback, useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import MapboxGL from '@rnmapbox/maps'
import { RutaCoMap } from './RutaCoMap'
import { LocationPoint } from '@/types/planner'
import { COLORS } from '@/constants/colors'

interface PlannerMapProps {
  onLocationSelect?: (location: LocationPoint, type: 'origin' | 'destination') => void
  origin: LocationPoint | null
  destination: LocationPoint | null
  selectingMode: 'origin' | 'destination' | null
}

export function PlannerMap({
  onLocationSelect,
  origin,
  destination,
  selectingMode,
}: PlannerMapProps) {
  const mapRef = useRef<MapboxGL.MapView>(null)
  const cameraRef = useRef<MapboxGL.Camera>(null)
  const [cameraCoords, setCameraCoords] = useState<{
    longitude: number
    latitude: number
    zoom?: number
  } | null>(null)

  // Inicializar mapa en ubicación central de Bogotá
  useEffect(() => {
    setCameraCoords({
      longitude: -74.0721,
      latitude: 4.711,
      zoom: 13,
    })
  }, [])

  // Recentrar mapa cuando se seleccionan puntos
  useEffect(() => {
    if (origin && destination) {
      // Ambos puntos: mostrar ruta completa
      const minLng = Math.min(origin.longitude, destination.longitude)
      const maxLng = Math.max(origin.longitude, destination.longitude)
      const minLat = Math.min(origin.latitude, destination.latitude)
      const maxLat = Math.max(origin.latitude, destination.latitude)

      // Centro entre ambos puntos
      const centerLng = (minLng + maxLng) / 2
      const centerLat = (minLat + maxLat) / 2

      // Calcular zoom para que ambos puntos sean visibles con espacio
      const lngDiff = maxLng - minLng
      const latDiff = maxLat - minLat
      const maxDiff = Math.max(lngDiff, latDiff)
      
      // Fórmula mejorada: zoom = log2(360 / (diff * padding * 2))
      // Factor 3 proporciona padding adecuado para ambos lados
      // Math.max(1, ...) permite zoom muy bajo para puntos muy lejanos
      const zoom = Math.max(1, Math.log2(360 / (maxDiff * 3)))

      setCameraCoords({
        longitude: centerLng,
        latitude: centerLat,
        zoom: zoom,
      })
    } else if (origin || destination) {
      // Un solo punto: centrar con zoom 13
      const point = origin || destination
      if (point) {
        setCameraCoords({
          longitude: point.longitude,
          latitude: point.latitude,
          zoom: 13,
        })
      }
    }
  }, [origin, destination])

  const handleMapPress = useCallback(
    (coordinates: [number, number]) => {
      if (!selectingMode) return

      const newLocation: LocationPoint = {
        latitude: coordinates[1],
        longitude: coordinates[0],
        placeType: selectingMode,
        timestamp: Date.now(),
      }

      onLocationSelect?.(newLocation, selectingMode)
    },
    [selectingMode, onLocationSelect]
  )

  return (
    <View style={styles.container}>
      <RutaCoMap
        ref={mapRef}
        cameraRef={cameraRef}
        cameraCoords={cameraCoords}
        onPress={handleMapPress}
      >
        {/* Pin de origen */}
        {origin && (
          <MapboxGL.ShapeSource
            id="origin-source"
            shape={{
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [origin.longitude, origin.latitude],
              },
              properties: { type: 'origin' },
            }}
          >
            <MapboxGL.CircleLayer
              id="origin-layer"
              style={{
                circleRadius: 10,
                circleColor: '#10b981',
                circleOpacity: 0.9,
                circlePitchAlignment: 'map',
              }}
            />
            <MapboxGL.CircleLayer
              id="origin-layer-border"
              style={{
                circleRadius: 12,
                circleColor: 'transparent',
                circleStrokeWidth: 2.5,
                circleStrokeColor: '#10b981',
                circlePitchAlignment: 'map',
              }}
            />
          </MapboxGL.ShapeSource>
        )}

        {/* Pin de destino */}
        {destination && (
          <MapboxGL.ShapeSource
            id="destination-source"
            shape={{
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [destination.longitude, destination.latitude],
              },
              properties: { type: 'destination' },
            }}
          >
            <MapboxGL.CircleLayer
              id="destination-layer"
              style={{
                circleRadius: 10,
                circleColor: '#ef4444',
                circleOpacity: 0.9,
                circlePitchAlignment: 'map',
              }}
            />
            <MapboxGL.CircleLayer
              id="destination-layer-border"
              style={{
                circleRadius: 12,
                circleColor: 'transparent',
                circleStrokeWidth: 2.5,
                circleStrokeColor: '#ef4444',
                circlePitchAlignment: 'map',
              }}
            />
          </MapboxGL.ShapeSource>
        )}

        {/* Línea de ruta potencial entre los dos puntos */}
        {origin && destination && (
          <MapboxGL.ShapeSource
            id="route-source"
            shape={{
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: [
                  [origin.longitude, origin.latitude],
                  [destination.longitude, destination.latitude],
                ],
              },
              properties: {},
            }}
          >
            <MapboxGL.LineLayer
              id="route-layer"
              style={{
                lineColor: COLORS.primary,
                lineWidth: 3,
                lineOpacity: 0.6,
                lineDasharray: [2, 2],
              }}
            />
          </MapboxGL.ShapeSource>
        )}
      </RutaCoMap>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
