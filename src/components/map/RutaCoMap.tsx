import { useRef, forwardRef } from 'react'
import MapboxGL from '@rnmapbox/maps'
import { StyleSheet } from 'react-native'

// Inicializar Mapbox con el token una sola vez cuando se importa el modulo
MapboxGL.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_TOKEN!)

interface CameraCoords {
  longitude: number
  latitude: number
  zoom?: number
}

interface RutaCoMapProps {
  children?: React.ReactNode
  onMapReady?: () => void
  onPress?: (coordinates: [number, number]) => void
  followUser?: boolean // si true, la camara sigue la posicion del usuario
  cameraRef?: React.Ref<MapboxGL.Camera>
  cameraCoords?: CameraCoords | null
}

export const RutaCoMap = forwardRef<MapboxGL.MapView, RutaCoMapProps>(
  (
    {
      children,
      onMapReady,
      onPress,
      followUser = false,
      cameraRef,
      cameraCoords,
    },
    ref
  ) => {
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
          ref={cameraRef}
          zoomLevel={cameraCoords?.zoom ?? 13}
          centerCoordinate={[
            cameraCoords?.longitude ?? -74.0721,
            cameraCoords?.latitude ?? 4.711,
          ]}
          animationMode="flyTo"
          animationDuration={1000}
          followUserLocation={followUser}
          followUserMode={
            followUser ? MapboxGL.UserTrackingMode.Follow : undefined
          }
        />

        {/* Punto azul de ubicacion del usuario */}
        <MapboxGL.LocationPuck
          puckBearingEnabled
          puckAnimationType="compassAndFollowRotation"
          scale={1}
        />

        {/* Aqui van las capas de rutas, pins, etc. */}
        {children}
      </MapboxGL.MapView>
    )
  }
)

RutaCoMap.displayName = 'RutaCoMap'

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
})
