import { useCallback, useEffect, useState, useRef } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
  Animated,
  ActivityIndicator,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { COLORS } from '@/constants/colors'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { useRouteCalculation } from '@/hooks/useRouteCalculation'
import { PlannerMap } from '@/components/map/PlannerMap'
import { LocationInput } from '@/components/planner/LocationInput'
import { LocationSearchScreen } from './LocationSearchScreen'
import { SwapLocationsButton } from '@/components/planner/SwapLocationsButton'
import { reverseGeocode } from '@/api/geocoding'

export function PlannerScreen() {
  const insets = useSafeAreaInsets()
  const {
    origin,
    destination,
    selectingMode,
    error,
    userLocation,
    route,
    setOrigin,
    setDestination,
    setSelectingMode,
    setError,
    setUserLocation,
    swapLocations,
    clearLocations,
    clearRoute,
  } = usePlannerStore()

  const { calculateRoute, isCalculating, error: routeError } = useRouteCalculation()

  const [loadingGeocoding, setLoadingGeocoding] = useState(false)
  const [isPanelExpanded, setIsPanelExpanded] = useState(true)
  const slideAnim = useRef(new Animated.Value(1)).current

  // Animar el panel cuando cambia el estado de expansión
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start()
  }, [isPanelExpanded, slideAnim])

  // Obtener ubicación del usuario al montar
  useEffect(() => {
    requestLocationPermission()
  }, [])

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        })

        const userCoords: LocationPoint = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          address: 'Mi ubicación',
        }

        setUserLocation(userCoords)
      }
    } catch (error) {
      console.error('Error obteniendo ubicación:', error)
    }
  }

  const handleLocationSelect = useCallback(
    async (location: LocationPoint, type: 'origin' | 'destination') => {
      setLoadingGeocoding(true)

      // Obtener dirección legible
      try {
        const address = await reverseGeocode(location.latitude, location.longitude)
        location.address = address || location.address
      } catch (err) {
        console.error('Error geocodificando:', err)
      }

      if (type === 'origin') {
        const success = setOrigin(location)
        if (!success) {
          Alert.alert('Error', error || 'No se pudo seleccionar este punto')
        }
      } else {
        const success = setDestination(location)
        if (!success) {
          Alert.alert('Error', error || 'No se pudo seleccionar este punto')
        }
      }

      setSelectingMode(null)
      setLoadingGeocoding(false)
    },
    [error, setOrigin, setDestination, setSelectingMode]
  )

  const handleUseMyLocation = useCallback(() => {
    if (!userLocation) {
      alert('No pudimos obtener tu ubicación')
      return
    }

    if (selectingMode === 'origin') {
      const success = setOrigin(userLocation)
      if (!success) {
        Alert.alert('Error', error || 'No se pudo usar tu ubicación')
      } else {
        setSelectingMode(null)
      }
    } else if (selectingMode === 'destination') {
      const success = setDestination(userLocation)
      if (!success) {
        Alert.alert('Error', error || 'No se pudo usar tu ubicación')
      } else {
        setSelectingMode(null)
      }
    }
  }, [userLocation, selectingMode, setOrigin, setDestination, setSelectingMode, error])

  const handleCalculateRoute = useCallback(async () => {
    console.log('[PlannerScreen] Presionado botón calcular ruta', { origin, destination })
    const calculatedRoute = await calculateRoute()
    if (!calculatedRoute) {
      console.error('[PlannerScreen] Error calculando ruta:', routeError)
    } else {
      console.log('[PlannerScreen] Ruta calculada exitosamente:', calculatedRoute)
    }
  }, [calculateRoute, routeError])

  // Si está en modo de selección, mostrar pantalla fullscreen de búsqueda
  if (selectingMode) {
    return <LocationSearchScreen />
  }

  return (
    <View style={styles.container}>
      {/* Mapa */}
      <PlannerMap
        origin={origin}
        destination={destination}
        selectingMode={selectingMode}
        onLocationSelect={handleLocationSelect}
        route={route}
      />

      {/* Panel de controles inferior */}
      <Animated.View
        style={[
          styles.controlPanel,
          !isPanelExpanded && origin && destination && styles.controlPanelCompact,
          { 
            paddingBottom: !isPanelExpanded && origin && destination ? Math.max(insets.bottom + 16, 70) : Math.max(insets.bottom, 16),
            opacity: slideAnim,
          },
        ]}
      >
        {/* Botón para minimizar/expandir - visible cuando ambos puntos están seleccionados */}
        {origin && destination && (
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setIsPanelExpanded(!isPanelExpanded)}
          >
            <Text style={styles.toggleIcon}>{isPanelExpanded ? '-' : '⌃'}</Text>
          </TouchableOpacity>
        )}

        {/* Vista Expandida */}
        {isPanelExpanded ? (
          <ScrollView
            style={styles.scrollContent}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          >
            {/* Error global */}
            {(error || routeError) && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>⚠️ {error || routeError}</Text>
              </View>
            )}

            <LocationInput
              label="📍 Punto de Salida"
              value={origin}
              type="origin"
              onPress={() => setSelectingMode('origin')}
              isSelecting={selectingMode === 'origin'}
              onClear={() => setOrigin(null)}
              placeholder="Toca para seleccionar tu ubicación de salida"
            />

            <LocationInput
              label="🎯 Punto de Llegada"
              value={destination}
              type="destination"
              onPress={() => setSelectingMode('destination')}
              isSelecting={selectingMode === 'destination'}
              onClear={() => setDestination(null)}
              placeholder="Toca para seleccionar tu destino"
            />

            {(origin || destination) && (
              <SwapLocationsButton
                onPress={swapLocations}
                disabled={!origin || !destination}
              />
            )}

            {origin && destination && (
              <>
                {/* Información de la ruta si existe */}
                {route && (
                  <View style={styles.routeInfoBox}>
                    <Text style={styles.routeInfoTitle}>🚴 Ruta Calculada</Text>
                    <Text style={styles.routeInfoText}>
                      📏 Distancia: {route.distance_km} km
                    </Text>
                    <Text style={styles.routeInfoText}>
                      ⏱️ Tiempo estimado: {route.duration_minutes} min
                    </Text>
                    {route.difficulty && (
                      <Text style={styles.routeInfoText}>
                        📈 Dificultad: {route.difficulty}
                      </Text>
                    )}
                  </View>
                )}

                {/* Botón calcular ruta */}
                <TouchableOpacity
                  style={[
                    styles.planButton,
                    isCalculating && styles.planButtonDisabled,
                  ]}
                  onPress={handleCalculateRoute}
                  activeOpacity={0.8}
                  disabled={isCalculating}
                >
                  {isCalculating ? (
                    <>
                      <ActivityIndicator color={COLORS.text} size="small" />
                      <Text style={styles.planButtonText}> Calculando...</Text>
                    </>
                  ) : (
                    <Text style={styles.planButtonText}>
                      {route ? 'Recalcular Ruta' : 'Calcular Ruta'} 🚴
                    </Text>
                  )}
                </TouchableOpacity>
              </>
            )}

            {(origin || destination) && (
              <TouchableOpacity
                style={styles.clearAllButton}
                onPress={() => {
                  clearLocations()
                  clearRoute()
                  setError(null)
                }}
                activeOpacity={0.8}
              >
                <Text style={styles.clearAllButtonText}>Limpiar todo</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        ) : (
          /* Vista Compacta */
          <View style={styles.compactView}>
            <View style={styles.compactLocationInfo}>
              <Text style={styles.compactLabel} numberOfLines={1}>
                📍 {origin?.address || 'Punto de salida'} → 🎯{' '}
                {destination?.address || 'Punto de llegada'}
              </Text>
            </View>

            <View style={styles.compactActions}>
              <TouchableOpacity
                style={[
                  styles.compactPlanButton,
                  isCalculating && styles.compactPlanButtonDisabled,
                ]}
                onPress={handleCalculateRoute}
                activeOpacity={0.8}
                disabled={isCalculating}
              >
                {isCalculating ? (
                  <ActivityIndicator color={COLORS.text} size="small" />
                ) : (
                  <Text style={styles.compactPlanButtonText}>
                    {route ? '🔄' : '🚴'}
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.compactClearButton}
                onPress={() => {
                  clearLocations()
                  setError(null)
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.compactClearButtonText}>🗑️</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.compactEditButton}
                onPress={() => setIsPanelExpanded(true)}
                activeOpacity={0.7}
              >
                <Text style={styles.compactEditButtonText}>✎</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  controlPanel: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
    maxHeight: '45%',
    borderTopWidth: 1,
    borderTopColor: COLORS.border || '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollContent: {
    flexGrow: 0,
  },
  errorBox: {
    width: '100%',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: `${COLORS.error}20`,
    borderWidth: 1,
    borderColor: COLORS.error,
    marginBottom: 8,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 13,
    fontWeight: '500',
  },
  routeInfoBox: {
    width: '100%',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: `${COLORS.primary}15`,
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginBottom: 8,
    marginTop: 8,
  },
  routeInfoTitle: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  routeInfoText: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 4,
  },
  planButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    marginTop: 8,
  },
  planButtonDisabled: {
    opacity: 0.6,
  },
  planButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  clearAllButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 12,
    backgroundColor: `${COLORS.primary}15`,
    alignItems: 'center',
    marginTop: 8,
  },
  clearAllButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  controlPanelCompact: {
    maxHeight: 85,
    paddingTop: 12,
  },
  toggleButton: {
    alignSelf: 'center',
    padding: 0,
    marginBottom: 0,
    minWidth: 44,
    minHeight: 2,
    maxHeight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleIcon: {
    fontSize: 20,
    color: COLORS.primary,
    fontWeight: '900',
  },
  compactView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
  },
  compactLocationInfo: {
    flex: 1,
  },
  compactLabel: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '500',
  },
  compactActions: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  compactPlanButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  compactPlanButtonDisabled: {
    opacity: 0.6,
  },
  compactPlanButtonText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '600',
  },
  compactClearButton: {
    backgroundColor: `${COLORS.error}20`,
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compactClearButtonText: {
    fontSize: 16,
  },
  compactEditButton: {
    backgroundColor: `${COLORS.primary}20`,
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compactEditButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '700',
  },
})
