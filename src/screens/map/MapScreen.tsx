import { useRef, useCallback, useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  ScrollView,
  Animated,
  PanResponder,
  ActivityIndicator,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import MapboxGL from '@rnmapbox/maps'
import { RutaCoMap } from '@/components/map/RutaCoMap'
import { LocationInput } from '@/components/planner/LocationInput'
import { SwapLocationsButton } from '@/components/planner/SwapLocationsButton'
import { LocationSearchScreen } from './LocationSearchScreen'
import { usePlannerStore } from '@/store/plannerStore'
import { useRouteCalculation } from '@/hooks/useRouteCalculation'
import { reverseGeocode } from '@/api/geocoding'
import { COLORS } from '@/constants/colors'
import { LocationPoint } from '@/types/planner'
import { CameraCoords } from '@/types/map'

export function MapScreen() {
  const insets = useSafeAreaInsets()
  const mapRef = useRef<MapboxGL.MapView>(null)
  const cameraRef = useRef<MapboxGL.Camera>(null)
  const [cameraCoords, setCameraCoords] = useState<CameraCoords | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [plannerActive, setPlannerActive] = useState(false)
  const [isPanelExpanded, setIsPanelExpanded] = useState(true)
  const [panelHeight, setPanelHeight] = useState(0)
  const slideAnim = useRef(new Animated.Value(1)).current
  const expandCollapseAnim = useRef(new Animated.Value(1)).current
  const panelDragY = useRef(new Animated.Value(0)).current
  const [isSaving, setIsSaving] = useState(false)
  const panelRef = useRef<View>(null)
  const panelHiddenY = useRef<number>(0)
  const isPanelExpandedRef = useRef<boolean>(true)
  const isGestureEnabledRef = useRef<boolean>(false)

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
  } = usePlannerStore()

  const { calculateRoute, isCalculating, error: routeError } = useRouteCalculation()

  // Crear PanResponder para capturar gestos de arrastre del panel
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => isGestureEnabledRef.current,
      onMoveShouldSetPanResponder: (evt, { dy }) => {
        if (!isGestureEnabledRef.current) return false
        // Panel expandido: solo capturar arrastre hacia abajo
        // Panel oculto: solo capturar arrastre hacia arriba
        if (isPanelExpandedRef.current) return dy > 5
        return dy < -5
      },
      onPanResponderMove: (evt, { dy }) => {
        if (isPanelExpandedRef.current) {
          // Arrastrar hacia abajo para ocultar
          const newY = Math.max(0, Math.min(dy, panelHiddenY.current))
          panelDragY.setValue(newY)
        } else {
          // Arrastrar hacia arriba para mostrar (dy es negativo)
          const newY = Math.max(0, Math.min(panelHiddenY.current + dy, panelHiddenY.current))
          panelDragY.setValue(newY)
        }
      },
      onPanResponderRelease: (evt, { dy, vy }) => {
        const DRAG_THRESHOLD = 50
        const VELOCITY_THRESHOLD = 0.3

        if (isPanelExpandedRef.current) {
          // Detectar si ocultar
          const shouldHide =
            dy > DRAG_THRESHOLD || vy > VELOCITY_THRESHOLD || dy > panelHiddenY.current / 2
          if (shouldHide) {
            Animated.timing(panelDragY, {
              toValue: panelHiddenY.current,
              duration: 300,
              useNativeDriver: true,
            }).start(() => {
              setIsPanelExpanded(false)
            })
          } else {
            Animated.timing(panelDragY, {
              toValue: 0,
              duration: 250,
              useNativeDriver: true,
            }).start()
          }
        } else {
          // Detectar si mostrar (dy es negativo)
          const dragUp = -dy
          const shouldShow =
            dragUp > DRAG_THRESHOLD || -vy > VELOCITY_THRESHOLD || dragUp > panelHiddenY.current / 2
          if (shouldShow) {
            setIsPanelExpanded(true)
            Animated.timing(panelDragY, {
              toValue: 0,
              duration: 700,
              useNativeDriver: true,
            }).start()
          } else {
            Animated.timing(panelDragY, {
              toValue: panelHiddenY.current,
              duration: 250,
              useNativeDriver: true,
            }).start()
          }
        }
      },
    })
  ).current

  // Sincronizar refs usadas dentro del PanResponder (closure estático)
  useEffect(() => {
    isPanelExpandedRef.current = isPanelExpanded
    if (!isPanelExpanded && panelHiddenY.current > 0) {
      panelDragY.setValue(panelHiddenY.current)
    }
  }, [isPanelExpanded, panelDragY])

  useEffect(() => {
    isGestureEnabledRef.current = !!origin && !!destination
  }, [origin, destination])

  // Solicitar permisos de ubicación al montar el componente
  useEffect(() => {
    requestLocationPermission()
  }, [])

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status === 'granted') {
        const lastLocation = await Location.getLastKnownPositionAsync()
        if (lastLocation) {
          const coords = {
            latitude: lastLocation.coords.latitude,
            longitude: lastLocation.coords.longitude,
          }
          setUserLocation({ ...coords, address: 'Mi ubicación' })
          setCameraCoords({ ...coords, zoom: 16 })
        } else {
          setCameraCoords({ longitude: -74.0721, latitude: 4.711, zoom: 13 })
        }

        Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High })
          .then((loc) => {
            const coords = {
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
            }
            setUserLocation({ ...coords, address: 'Mi ubicación' })
            setCameraCoords({ ...coords, zoom: 16 })
          })
          .catch((e) => console.error('Error obteniendo ubicación precisa:', e))
      } else {
        const errorMsg = 'Permisos de ubicación denegados'
        setLocationError(errorMsg)
        setCameraCoords({ longitude: -74.0721, latitude: 4.711, zoom: 13 })
      }
    } catch (e) {
      setLocationError(`Error solicitando ubicación: ${e}`)
      setCameraCoords({ longitude: -74.0721, latitude: 4.711, zoom: 13 })
    }
  }

  // Animar transición expand/collapse
  useEffect(() => {
    Animated.timing(expandCollapseAnim, {
      toValue: isPanelExpanded ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }, [isPanelExpanded, expandCollapseAnim])

  // Ajustar cámara automáticamente cuando cambian los puntos del planificador
  useEffect(() => {
    if (!plannerActive) return
    if (origin && destination) {
      const minLng = Math.min(origin.longitude, destination.longitude)
      const maxLng = Math.max(origin.longitude, destination.longitude)
      const minLat = Math.min(origin.latitude, destination.latitude)
      const maxLat = Math.max(origin.latitude, destination.latitude)
      const centerLng = (minLng + maxLng) / 2
      const centerLat = (minLat + maxLat) / 2
      const maxDiff = Math.max(maxLng - minLng, maxLat - minLat)
      const zoom = Math.max(1, Math.log2(360 / (maxDiff * 3)))
      cameraRef.current?.setCamera({
        centerCoordinate: [centerLng, centerLat],
        zoomLevel: zoom,
        animationDuration: 800,
        animationMode: 'flyTo',
      })
    } else if (origin ?? destination) {
      const point = origin ?? destination
      if (point) {
        cameraRef.current?.setCamera({
          centerCoordinate: [point.longitude, point.latitude],
          zoomLevel: 13,
          animationDuration: 600,
          animationMode: 'flyTo',
        })
      }
    }
  }, [origin, destination, plannerActive])

  // Ir a la ubicacion del usuario
  const goToMyLocation = useCallback(async () => {
    try {
      const lastLocation = await Location.getLastKnownPositionAsync()
      if (lastLocation) {
        const coords = {
          latitude: lastLocation.coords.latitude,
          longitude: lastLocation.coords.longitude,
        }
        setUserLocation({ ...coords, address: 'Mi ubicación' })
        cameraRef.current?.setCamera({
          centerCoordinate: [coords.longitude, coords.latitude],
          zoomLevel: 16,
          animationDuration: 500,
          animationMode: 'flyTo',
        })
      } else {
        Alert.alert('Error', 'No hay ubicación disponible')
      }
    } catch {
      Alert.alert('Error', 'No se pudo obtener la ubicación')
    }
  }, [])

  const handleLocationSelect = useCallback(
    async (location: LocationPoint, type: 'origin' | 'destination') => {
      try {
        const address = await reverseGeocode(location.latitude, location.longitude)
        location.address = address ?? location.address
      } catch (err) {
        console.error('Error geocodificando:', err)
      }
      if (type === 'origin') {
        const success = setOrigin(location)
        if (!success) Alert.alert('Error', error ?? 'No se pudo seleccionar este punto')
      } else {
        const success = setDestination(location)
        if (!success) Alert.alert('Error', error ?? 'No se pudo seleccionar este punto')
      }
      setSelectingMode(null)
    },
    [error, setOrigin, setDestination, setSelectingMode]
  )

  const handleUseMyLocation = useCallback(() => {
    if (!userLocation) {
      Alert.alert('Error', 'No pudimos obtener tu ubicación')
      return
    }
    if (selectingMode === 'origin') {
      if (!setOrigin(userLocation)) Alert.alert('Error', error ?? 'No se pudo usar tu ubicación')
      else setSelectingMode(null)
    } else if (selectingMode === 'destination') {
      if (!setDestination(userLocation)) Alert.alert('Error', error ?? 'No se pudo usar tu ubicación')
      else setSelectingMode(null)
    }
  }, [userLocation, selectingMode, setOrigin, setDestination, setSelectingMode, error])

  const centerOnRoute = useCallback(() => {
    if (origin && destination) {
      const minLng = Math.min(origin.longitude, destination.longitude)
      const maxLng = Math.max(origin.longitude, destination.longitude)
      const minLat = Math.min(origin.latitude, destination.latitude)
      const maxLat = Math.max(origin.latitude, destination.latitude)
      const maxDiff = Math.max(maxLng - minLng, maxLat - minLat)
      const zoom = Math.max(1, Math.log2(360 / (maxDiff * 3)))
      cameraRef.current?.setCamera({
        centerCoordinate: [(minLng + maxLng) / 2, (minLat + maxLat) / 2],
        zoomLevel: zoom,
        animationDuration: 600,
        animationMode: 'flyTo',
      })
    } else if (origin ?? destination) {
      const point = origin ?? destination
      if (point) {
        cameraRef.current?.setCamera({
          centerCoordinate: [point.longitude, point.latitude],
          zoomLevel: 13,
          animationDuration: 600,
          animationMode: 'flyTo',
        })
      }
    } else {
      goToMyLocation()
    }
  }, [origin, destination, goToMyLocation])

  const enterPlannerMode = useCallback(() => {
    setPlannerActive(true)
    setIsPanelExpanded(true)
    // Animar el panel hacia arriba
    Animated.timing(panelDragY, {
      toValue: 0,
      duration: 700,
      useNativeDriver: true,
    }).start()
  }, [])

  const exitPlannerMode = useCallback(() => {
    // Animar panel hacia abajo suavemente antes de salir
    Animated.timing(panelDragY, {
      toValue: panelHiddenY.current,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setPlannerActive(false)
      clearLocations()
      setError(null)
      setIsPanelExpanded(false)
      if (userLocation) {
        cameraRef.current?.setCamera({
          centerCoordinate: [userLocation.longitude, userLocation.latitude],
          zoomLevel: 16,
          animationDuration: 600,
          animationMode: 'flyTo',
        })
      }
    })
  }, [clearLocations, setError, userLocation])

  const handleMapReady = useCallback(() => {
    console.log('Mapa cargado')
  }, [])

  return (
    <View style={styles.container}>
      {/* El ÚNICO mapa — siempre montado, nunca se destruye */}
      <RutaCoMap
        ref={mapRef}
        cameraRef={cameraRef}
        cameraCoords={cameraCoords}
        onMapReady={handleMapReady}
      >
        {/* Capas del planificador — visibles solo en modo planner */}
        {plannerActive && origin && (
          <MapboxGL.ShapeSource
            id="origin-source"
            shape={{
              type: 'Feature',
              geometry: { type: 'Point', coordinates: [origin.longitude, origin.latitude] },
              properties: {},
            }}
          >
            <MapboxGL.CircleLayer
              id="origin-layer"
              style={{ circleRadius: 10, circleColor: '#10b981', circleOpacity: 0.9 }}
            />
            <MapboxGL.CircleLayer
              id="origin-layer-border"
              style={{
                circleRadius: 12,
                circleColor: 'transparent',
                circleStrokeWidth: 2.5,
                circleStrokeColor: '#10b981',
              }}
            />
          </MapboxGL.ShapeSource>
        )}
        {plannerActive && destination && (
          <MapboxGL.ShapeSource
            id="destination-source"
            shape={{
              type: 'Feature',
              geometry: { type: 'Point', coordinates: [destination.longitude, destination.latitude] },
              properties: {},
            }}
          >
            <MapboxGL.CircleLayer
              id="destination-layer"
              style={{ circleRadius: 10, circleColor: '#ef4444', circleOpacity: 0.9 }}
            />
            <MapboxGL.CircleLayer
              id="destination-layer-border"
              style={{
                circleRadius: 12,
                circleColor: 'transparent',
                circleStrokeWidth: 2.5,
                circleStrokeColor: '#ef4444',
              }}
            />
          </MapboxGL.ShapeSource>
        )}
        {plannerActive && origin && destination && (
          <MapboxGL.ShapeSource
            id="route-source"
            shape={{
              type: 'Feature',
              geometry: route
                ? route.geometry
                : {
                    type: 'LineString',
                    coordinates: [
                      [origin.longitude, origin.latitude],
                      [destination.longitude, destination.latitude],
                    ],
                  },
              properties: {},
            }}
          >
            {route ? (
              <MapboxGL.LineLayer
                id="route-layer-real"
                style={{
                  lineColor: COLORS.primary,
                  lineWidth: 4,
                  lineOpacity: 0.85,
                  lineCap: 'round',
                  lineJoin: 'round',
                }}
              />
            ) : (
              <MapboxGL.LineLayer
                id="route-layer-provisional"
                style={{
                  lineColor: COLORS.primary,
                  lineWidth: 3,
                  lineOpacity: 0.5,
                  lineDasharray: [2, 2],
                  lineCap: 'round',
                  lineJoin: 'round',
                }}
              />
            )}
          </MapboxGL.ShapeSource>
        )}
      </RutaCoMap>

      {/* MODO MAPA — controles normales */}
      {!plannerActive && (
        <>
          <View style={[styles.topControls, { paddingTop: insets.top + 8 }]}>
            <TouchableOpacity style={styles.plannerButton} onPress={enterPlannerMode}>
              <Text style={styles.plannerButtonText}>+ Planificar ruta</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.locationButton, { bottom: 100 + insets.bottom }]}
            onPress={goToMyLocation}
          >
            <Text style={styles.locationIcon}>⊙</Text>
          </TouchableOpacity>

          {locationError && (
            <View style={[styles.errorBanner, { bottom: insets.bottom }]}>
              <Text style={styles.errorText}>{locationError}</Text>
            </View>
          )}
        </>
      )}

      {/* MODO PLANIFICADOR — botón de centrar, siempre encima del panel */}
      {plannerActive && !selectingMode && (
        <Animated.View
          style={[
            {
              position: 'absolute',
              bottom: panelHeight + 55,
              right: 5,
              zIndex: 25,
            },
            {
              transform: [
                {
                  translateY: panelDragY,
                },
              ],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.locationButton}
            onPress={centerOnRoute}
          >
            <Text style={styles.locationIcon}>⊙</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* MODO PLANIFICADOR — panel inferior (sin búsqueda activa) */}
      {plannerActive && !selectingMode && (
        <Animated.View
          ref={panelRef}
          onLayout={(e) => {
            const height = e.nativeEvent.layout.height
            setPanelHeight(height)
            // Guardar solo la parte que se va a ocultar (todo menos la vista compacta)
            panelHiddenY.current = Math.max(0, height - 80)
            isPanelExpandedRef.current = isPanelExpanded
          }}
          {...panResponder.panHandlers}
          style={[
            styles.controlPanel,
            {
              zIndex: 20,
              transform: [
                {
                  translateY: panelDragY,
                },
              ],
            },
          ]}
        >
            {origin && destination && (
              <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => {
                  if (isPanelExpanded) {
                    Animated.timing(panelDragY, {
                      toValue: panelHiddenY.current,
                      duration: 300,
                      useNativeDriver: true,
                    }).start(() => {
                      setIsPanelExpanded(false)
                    })
                  } else {
                    setIsPanelExpanded(true)
                    Animated.timing(panelDragY, {
                      toValue: 0,
                      duration: 400,
                      useNativeDriver: true,
                    }).start()
                  }
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.toggleIcon}>{isPanelExpanded ? '−' : '⌃'}</Text>
              </TouchableOpacity>
            )}

            {isPanelExpanded ? (
              <Animated.View
                style={{
                  opacity: expandCollapseAnim,
                  transform: [
                    {
                      scale: expandCollapseAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.95, 1],
                      }),
                    },
                  ],
                  pointerEvents: isPanelExpanded ? 'auto' : 'none',
                }}
              >
                <ScrollView
                  style={styles.scrollContent}
                  scrollEnabled={true}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                >
                  <TouchableOpacity style={styles.cancelButton} onPress={exitPlannerMode}>
                    <Text style={styles.cancelButtonText}>✕ Cancelar</Text>
                  </TouchableOpacity>

                  {error && (
                    <View style={styles.errorBox}>
                      <Text style={styles.errorTextPlanner}>⚠️ {error}</Text>
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
                    <TouchableOpacity
                      style={[styles.planButton, isCalculating && styles.planButtonDisabled]}
                      onPress={async () => {
                        if (isCalculating) return
                        console.log('Calcular ruta', { origin, destination })
                        const result = await calculateRoute()
                        if (result) {
                          console.log('Ruta calculada:', result)
                        }
                      }}
                      activeOpacity={0.8}
                      disabled={isCalculating}
                    >
                      {isCalculating ? (
                        <>
                          <ActivityIndicator color="#FFF" size="small" />
                          <Text style={styles.planButtonText}> Calculando...</Text>
                        </>
                      ) : (
                        <Text style={styles.planButtonText}>Calcular Ruta 🚴</Text>
                      )}
                    </TouchableOpacity>
                  )}

                  {(origin || destination) && (
                    <TouchableOpacity
                      style={styles.clearAllButton}
                      onPress={() => {
                        clearLocations()
                        setError(null)
                      }}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.clearAllButtonText}>Limpiar todo</Text>
                    </TouchableOpacity>
                  )}
                </ScrollView>
              </Animated.View>
            ) : (
              <Animated.View
                style={{
                  opacity: expandCollapseAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0],
                  }),
                  transform: [
                    {
                      scale: expandCollapseAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0.95],
                      }),
                    },
                  ],
                  pointerEvents: isPanelExpanded ? 'none' : 'auto',
                }}
              >
                <View style={styles.compactView}>
                  <View style={styles.compactLocationInfo}>
                    <Text style={styles.compactLabel} numberOfLines={1}>
                      📍 {origin?.address ?? 'Salida'} → 🎯 {destination?.address ?? 'Llegada'}
                    </Text>
                  </View>
                  <View style={styles.compactActions}>
                    <TouchableOpacity
                      style={[styles.compactPlanButton, isCalculating && styles.compactPlanButtonDisabled]}
                      onPress={async () => {
                        if (isCalculating) return
                        console.log('Calcular ruta (compacto)')
                        const result = await calculateRoute()
                        if (result) {
                          console.log('Ruta calculada (compacto):', result)
                        }
                      }}
                      activeOpacity={0.8}
                      disabled={isCalculating}
                    >
                      {isCalculating ? (
                        <ActivityIndicator color="#FFF" size="small" />
                      ) : (
                        <Text style={styles.compactPlanButtonText}>🚴</Text>
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.compactEditButton}
                      onPress={() => {
                        setIsPanelExpanded(true)
                        Animated.timing(panelDragY, {
                          toValue: 0,
                          duration: 400,
                          useNativeDriver: true,
                        }).start()
                      }}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.compactEditButtonText}>✎</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Animated.View>
            )}
          </Animated.View>
        )}

      {/* MODO PLANIFICADOR — overlay de búsqueda (cubre toda la pantalla) */}
      {plannerActive && selectingMode && (
        <View style={StyleSheet.absoluteFillObject}>
          <LocationSearchScreen />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // --- MODO MAPA ---
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

  // --- MODO PLANIFICADOR — panel inferior ---
  controlPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    maxHeight: '60%',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  controlPanelCompact: {
    maxHeight: 85,
    paddingTop: 12,
  },
  scrollContent: {
    flexGrow: 0,
  },
  cancelButton: {
    alignSelf: 'flex-end',
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  cancelButtonText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '600',
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
  errorTextPlanner: {
    color: COLORS.error,
    fontSize: 13,
    fontWeight: '500',
  },
  planButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    marginTop: 8,
  },
  planButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  planButtonDisabled: {
    opacity: 0.6,
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
  savingCheckmark: {
    fontSize: 20,
    color: '#10b981',
    fontWeight: '700',
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
  compactPlanButtonText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '600',
  },
  compactPlanButtonDisabled: {
    opacity: 0.6,
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
