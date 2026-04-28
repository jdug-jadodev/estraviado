import { useRef, forwardRef } from 'react'
import MapboxGL from '@rnmapbox/maps'
import { StyleSheet } from 'react-native'
import { CameraCoords } from '@/types/map'

MapboxGL.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_TOKEN!)

interface RutaCoMapProps {
  children?: React.ReactNode
  onMapReady?: () => void
  onPress?: (coordinates: [number, number]) => void
  followUser?: boolean
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
        styleURL={MapboxGL.StyleURL.Outdoors}
        logoEnabled={false}
        attributionEnabled={false}
        compassEnabled
        compassViewPosition={3}
        compassViewMargins={{ x: 10, y: 170 }}
        onPress={(feature) => {
          const coords = feature.geometry.coordinates as [number, number]
          onPress?.(coords)
        }}
      >
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

        <MapboxGL.LocationPuck
          puckBearingEnabled
          scale={1}
        />

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
