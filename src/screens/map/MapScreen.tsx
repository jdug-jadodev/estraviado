import { useRef, useCallback, useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import * as Location from 'expo-location'
import MapboxGL from '@rnmapbox/maps'
import { RutaCoMap } from '@/components/map/RutaCoMap'
import { COLORS } from '@/constants/colors'

interface CameraCoords {
  longitude: number
  latitude: number
  zoom?: number
}

export function MapScreen() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<any>()
  const mapRef = useRef<MapboxGL.MapView>(null)
  const cameraRef = useRef<MapboxGL.Camera>(null)
  const [cameraCoords, setCameraCoords] = useState<CameraCoords | null>(null)
  const [userLocation, setUserLocation] = useState<{
    latitude: number
    longitude: number
  } | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)

  // Solicitar permisos de ubicación al montar el componente
  useEffect(() => {
    requestLocationPermission()
  }, [])

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status === 'granted') {
        console.log('Permiso de ubicación otorgado')
        // Obtener ubicación inicial
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        })

        const userCoords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }

        setUserLocation(userCoords)

        // Centrar la cámara en la ubicación del usuario
        setCameraCoords({
          longitude: userCoords.longitude,
          latitude: userCoords.latitude,
          zoom: 16,
        })
      } else {
        const errorMsg = 'Permisos de ubicación denegados'
        setLocationError(errorMsg)
        console.warn(errorMsg)
      }
    } catch (error) {
      const errorMsg = `Error solicitando ubicación: ${error}`
      setLocationError(errorMsg)
      console.error(errorMsg)
    }
  }

  // Ir a la ubicacion del usuario
  const goToMyLocation = useCallback(async () => {
    try {
      console.log('Obteniendo ubicación actual...')
      
      // Usar última ubicación conocida primero (instantáneo)
      const lastLocation = await Location.getLastKnownPositionAsync()
      
      if (lastLocation) {
        console.log('Ubicación obtenida:', lastLocation.coords)

        const newCoords = {
          longitude: lastLocation.coords.longitude,
          latitude: lastLocation.coords.latitude,
          zoom: 16,
        }

        // Actualizar estado
        setCameraCoords(newCoords)
        setUserLocation({
          latitude: lastLocation.coords.latitude,
          longitude: lastLocation.coords.longitude,
        })

        // Mover la cámara directamente si es posible
        if (cameraRef.current) {
          console.log('Moviendo cámara a:', newCoords)
          cameraRef.current.setCamera({
            centerCoordinate: [newCoords.longitude, newCoords.latitude],
            zoomLevel: newCoords.zoom,
            animationDuration: 500,
            animationMode: 'flyTo',
          })
        }
      } else {
        Alert.alert('Error', 'No hay ubicación disponible')
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo obtener la ubicación')
      console.error('Error obteniendo ubicacion:', error)
    }
  }, [cameraRef])

  const handleMapReady = useCallback(() => {
    console.log('Mapa cargado')
  }, [])

  return (
    <View style={styles.container}>
      <RutaCoMap 
        ref={mapRef}
        cameraRef={cameraRef}
        cameraCoords={cameraCoords}
        onMapReady={handleMapReady}
      />

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

      {/* Mostrar error si hay */}
      {locationError && (
        <View style={[styles.errorBanner, { bottom: insets.bottom }]}>
          <Text style={styles.errorText}>{locationError}</Text>
        </View>
      )}
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
  errorBanner: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: COLORS.error,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  errorText: {
    color: '#fff',
    fontSize: 14,
  },
})
