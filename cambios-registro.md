# 📊 Registro de Cambios con Estadísticas
**Iniciado:** 27/4/2026, 3:47:02 p. m.
**Proyecto:** C:\Users\Usuario\Documents\estraviado
**Último commit:** d0a22b2 - security: move Mapbox token to environment variables and exclude cambios-registro.md (1 second ago)
**Estado:** Monitoreando nuevos cambios


## 🕐 27/04/2026, 15:47:35

### 📊 Resumen
- **Total archivos:** 2
- **📝 Nuevos:** 0
- **✏️ Modificados:** 1
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +0
- **Líneas eliminadas:** -9
- **Balance neto:** -9 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| ✏️ | `.env.example` | +0 | -9 | -9 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (2)</summary>

**✏️ Modificados:**
```
.env.example
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

---

## 🕐 27/04/2026, 16:41:17

### 📊 Resumen
- **Total archivos:** 4
- **📝 Nuevos:** 2
- **✏️ Modificados:** 1
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +0
- **Líneas eliminadas:** -9
- **Balance neto:** -9 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `src/store/plannerStore.ts` | nuevo | -0 | 0 |
| 🆕 | `src/types/planner.ts` | nuevo | -0 | 0 |
| ✏️ | `.env.example` | +0 | -9 | -9 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (4)</summary>

**🆕 Nuevos:**
```
src/store/plannerStore.ts
src/types/planner.ts
```

**✏️ Modificados:**
```
.env.example
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

---

## 🕐 27/04/2026, 16:41:19

### 📊 Resumen
- **Total archivos:** 7
- **📝 Nuevos:** 5
- **✏️ Modificados:** 1
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +0
- **Líneas eliminadas:** -9
- **Balance neto:** -9 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `src/components/map/PlannerMap.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationInput.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/SwapLocationsButton.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/store/plannerStore.ts` | nuevo | -0 | 0 |
| 🆕 | `src/types/planner.ts` | nuevo | -0 | 0 |
| ✏️ | `.env.example` | +0 | -9 | -9 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (7)</summary>

**🆕 Nuevos:**
```
src/components/map/PlannerMap.tsx
src/components/planner/LocationInput.tsx
src/components/planner/SwapLocationsButton.tsx
src/store/plannerStore.ts
src/types/planner.ts
```

**✏️ Modificados:**
```
.env.example
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

---

## 🕐 27/04/2026, 16:41:35

### 📊 Resumen
- **Total archivos:** 8
- **📝 Nuevos:** 5
- **✏️ Modificados:** 2
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +270
- **Líneas eliminadas:** -13
- **Balance neto:** +257 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `src/components/map/PlannerMap.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationInput.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/SwapLocationsButton.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/store/plannerStore.ts` | nuevo | -0 | 0 |
| 🆕 | `src/types/planner.ts` | nuevo | -0 | 0 |
| ✏️ | `src/screens/map/PlannerScreen.tsx` | +270 | -4 | +266 |
| ✏️ | `.env.example` | +0 | -9 | -9 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (8)</summary>

**🆕 Nuevos:**
```
src/components/map/PlannerMap.tsx
src/components/planner/LocationInput.tsx
src/components/planner/SwapLocationsButton.tsx
src/store/plannerStore.ts
src/types/planner.ts
```

**✏️ Modificados:**
```
src/screens/map/PlannerScreen.tsx
.env.example
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

### 💻 Código Añadido

**src/screens/map/PlannerScreen.tsx** (+270 líneas)**

```
import { useCallback, useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { PlannerMap } from '@/components/map/PlannerMap'
import { LocationInput } from '@/components/planner/LocationInput'
import { SwapLocationsButton } from '@/components/planner/SwapLocationsButton'
  const insets = useSafeAreaInsets()
  const {
    origin,
    destination,
    selectingMode,
    setOrigin,
    setDestination,
    setSelectingMode,
    swapLocations,
    clearLocations,
  } = usePlannerStore()

  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null)

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

        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          address: 'Mi ubicación',
        })
      }
    } catch (error) {
      console.error('Error obteniendo ubicación:', error)
    }
  }

  const handleLocationSelect = useCallback(
    (location: LocationPoint, type: 'origin' | 'destination') => {
      if (type === 'origin') {
        setOrigin(location)
      } else {
        setDestination(location)
      }
      setSelectingMode(null)
    },
    [setOrigin, setDestination, setSelectingMode]
  )

  const handleUseMyLocation = useCallback(() => {
    if (userLocation) {
      if (selectingMode === 'origin') {
        setOrigin(userLocation)
        setSelectingMode(null)
      } else if (selectingMode === 'destination') {
        setDestination(userLocation)
        setSelectingMode(null)
      }
    }
  }, [userLocation, selectingMode, setOrigin, setDestination, setSelectingMode])

  const handleStartPlanning = useCallback(() => {
    if (origin && destination) {
      // Aquí iremos a calcular la ruta
      console.log('Iniciando planificación de ruta:', { origin, destination })
    }
  }, [origin, destination])

      {/* Mapa */}
      <PlannerMap
        origin={origin}
        destination={destination}
        selectingMode={selectingMode}
        onLocationSelect={handleLocationSelect}
      />

      {/* Panel de controles inferior */}
      <View
        style={[
          styles.controlPanel,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}
      >
        {selectingMode ? (
          // Modo de selección activo
          <View style={styles.selectingMode}>
            <Text style={styles.selectingTitle}>
              {selectingMode === 'origin'
                ? '📍 Selecciona tu punto de SALIDA'
                : '🎯 Selecciona tu punto de LLEGADA'}
            </Text>
            <Text style={styles.selectingSubtitle}>
              Toca cualquier punto en el mapa o usa tu ubicación actual
            </Text>

            {userLocation && (
              <TouchableOpacity
                style={styles.useLocationButton}
                onPress={handleUseMyLocation}
                activeOpacity={0.8}
              >
                <Text style={styles.useLocationButtonText}>
                  📌 Usar mi ubicación
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setSelectingMode(null)}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Modo normal - mostrar inputs
          <ScrollView
            style={styles.scrollContent}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          >
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
                style={styles.planButton}
                onPress={handleStartPlanning}
                activeOpacity={0.8}
              >
                <Text style={styles.planButtonText}>Calcular Ruta 🚴</Text>
              </TouchableOpacity>
            )}

            {(origin || destination) && (
              <TouchableOpacity
                style={styles.clearAllButton}
                onPress={clearLocations}
                activeOpacity={0.8}
              >
                <Text style={styles.clearAllButtonText}>Limpiar todo</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        )}
      </View>
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
  selectingMode: {
    paddingVertical: 20,
  },
  selectingTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  selectingSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary || '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  useLocationButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    marginBottom: 12,
    alignItems: 'center',
  },
  useLocationButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  cancelButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.border || '#E0E0E0',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontWeight: '600',
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
```

---

## 🕐 27/04/2026, 16:41:52

### 📊 Resumen
- **Total archivos:** 9
- **📝 Nuevos:** 5
- **✏️ Modificados:** 3
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +273
- **Líneas eliminadas:** -13
- **Balance neto:** +260 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `src/components/map/PlannerMap.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationInput.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/SwapLocationsButton.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/store/plannerStore.ts` | nuevo | -0 | 0 |
| 🆕 | `src/types/planner.ts` | nuevo | -0 | 0 |
| ✏️ | `src/screens/map/PlannerScreen.tsx` | +270 | -4 | +266 |
| ✏️ | `.env.example` | +0 | -9 | -9 |
| ✏️ | `src/constants/colors.ts` | +3 | -0 | +3 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (9)</summary>

**🆕 Nuevos:**
```
src/components/map/PlannerMap.tsx
src/components/planner/LocationInput.tsx
src/components/planner/SwapLocationsButton.tsx
src/store/plannerStore.ts
src/types/planner.ts
```

**✏️ Modificados:**
```
src/screens/map/PlannerScreen.tsx
.env.example
src/constants/colors.ts
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

### 💻 Código Añadido

**src/constants/colors.ts** (+3 líneas)**

```
  // Secundario
  secondary: '#f5f5f5',

```

**src/screens/map/PlannerScreen.tsx** (+270 líneas)**

```
import { useCallback, useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { PlannerMap } from '@/components/map/PlannerMap'
import { LocationInput } from '@/components/planner/LocationInput'
import { SwapLocationsButton } from '@/components/planner/SwapLocationsButton'
  const insets = useSafeAreaInsets()
  const {
    origin,
    destination,
    selectingMode,
    setOrigin,
    setDestination,
    setSelectingMode,
    swapLocations,
    clearLocations,
  } = usePlannerStore()

  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null)

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

        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          address: 'Mi ubicación',
        })
      }
    } catch (error) {
      console.error('Error obteniendo ubicación:', error)
    }
  }

  const handleLocationSelect = useCallback(
    (location: LocationPoint, type: 'origin' | 'destination') => {
      if (type === 'origin') {
        setOrigin(location)
      } else {
        setDestination(location)
      }
      setSelectingMode(null)
    },
    [setOrigin, setDestination, setSelectingMode]
  )

  const handleUseMyLocation = useCallback(() => {
    if (userLocation) {
      if (selectingMode === 'origin') {
        setOrigin(userLocation)
        setSelectingMode(null)
      } else if (selectingMode === 'destination') {
        setDestination(userLocation)
        setSelectingMode(null)
      }
    }
  }, [userLocation, selectingMode, setOrigin, setDestination, setSelectingMode])

  const handleStartPlanning = useCallback(() => {
    if (origin && destination) {
      // Aquí iremos a calcular la ruta
      console.log('Iniciando planificación de ruta:', { origin, destination })
    }
  }, [origin, destination])

      {/* Mapa */}
      <PlannerMap
        origin={origin}
        destination={destination}
        selectingMode={selectingMode}
        onLocationSelect={handleLocationSelect}
      />

      {/* Panel de controles inferior */}
      <View
        style={[
          styles.controlPanel,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}
      >
        {selectingMode ? (
          // Modo de selección activo
          <View style={styles.selectingMode}>
            <Text style={styles.selectingTitle}>
              {selectingMode === 'origin'
                ? '📍 Selecciona tu punto de SALIDA'
                : '🎯 Selecciona tu punto de LLEGADA'}
            </Text>
            <Text style={styles.selectingSubtitle}>
              Toca cualquier punto en el mapa o usa tu ubicación actual
            </Text>

            {userLocation && (
              <TouchableOpacity
                style={styles.useLocationButton}
                onPress={handleUseMyLocation}
                activeOpacity={0.8}
              >
                <Text style={styles.useLocationButtonText}>
                  📌 Usar mi ubicación
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setSelectingMode(null)}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Modo normal - mostrar inputs
          <ScrollView
            style={styles.scrollContent}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          >
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
                style={styles.planButton}
                onPress={handleStartPlanning}
                activeOpacity={0.8}
              >
                <Text style={styles.planButtonText}>Calcular Ruta 🚴</Text>
              </TouchableOpacity>
            )}

            {(origin || destination) && (
              <TouchableOpacity
                style={styles.clearAllButton}
                onPress={clearLocations}
                activeOpacity={0.8}
              >
                <Text style={styles.clearAllButtonText}>Limpiar todo</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        )}
      </View>
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
  selectingMode: {
    paddingVertical: 20,
  },
  selectingTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  selectingSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary || '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  useLocationButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    marginBottom: 12,
    alignItems: 'center',
  },
  useLocationButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  cancelButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.border || '#E0E0E0',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontWeight: '600',
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
```

---

## 🕐 27/04/2026, 16:45:50

### 📊 Resumen
- **Total archivos:** 10
- **📝 Nuevos:** 6
- **✏️ Modificados:** 3
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +273
- **Líneas eliminadas:** -13
- **Balance neto:** +260 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `src/api/geocoding.ts` | nuevo | -0 | 0 |
| 🆕 | `src/components/map/PlannerMap.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationInput.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/SwapLocationsButton.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/store/plannerStore.ts` | nuevo | -0 | 0 |
| 🆕 | `src/types/planner.ts` | nuevo | -0 | 0 |
| ✏️ | `src/screens/map/PlannerScreen.tsx` | +270 | -4 | +266 |
| ✏️ | `.env.example` | +0 | -9 | -9 |
| ✏️ | `src/constants/colors.ts` | +3 | -0 | +3 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (10)</summary>

**🆕 Nuevos:**
```
src/api/geocoding.ts
src/components/map/PlannerMap.tsx
src/components/planner/LocationInput.tsx
src/components/planner/SwapLocationsButton.tsx
src/store/plannerStore.ts
src/types/planner.ts
```

**✏️ Modificados:**
```
src/screens/map/PlannerScreen.tsx
.env.example
src/constants/colors.ts
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

### 💻 Código Añadido

**src/constants/colors.ts** (+3 líneas)**

```
  // Secundario
  secondary: '#f5f5f5',

```

**src/screens/map/PlannerScreen.tsx** (+270 líneas)**

```
import { useCallback, useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { PlannerMap } from '@/components/map/PlannerMap'
import { LocationInput } from '@/components/planner/LocationInput'
import { SwapLocationsButton } from '@/components/planner/SwapLocationsButton'
  const insets = useSafeAreaInsets()
  const {
    origin,
    destination,
    selectingMode,
    setOrigin,
    setDestination,
    setSelectingMode,
    swapLocations,
    clearLocations,
  } = usePlannerStore()

  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null)

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

        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          address: 'Mi ubicación',
        })
      }
    } catch (error) {
      console.error('Error obteniendo ubicación:', error)
    }
  }

  const handleLocationSelect = useCallback(
    (location: LocationPoint, type: 'origin' | 'destination') => {
      if (type === 'origin') {
        setOrigin(location)
      } else {
        setDestination(location)
      }
      setSelectingMode(null)
    },
    [setOrigin, setDestination, setSelectingMode]
  )

  const handleUseMyLocation = useCallback(() => {
    if (userLocation) {
      if (selectingMode === 'origin') {
        setOrigin(userLocation)
        setSelectingMode(null)
      } else if (selectingMode === 'destination') {
        setDestination(userLocation)
        setSelectingMode(null)
      }
    }
  }, [userLocation, selectingMode, setOrigin, setDestination, setSelectingMode])

  const handleStartPlanning = useCallback(() => {
    if (origin && destination) {
      // Aquí iremos a calcular la ruta
      console.log('Iniciando planificación de ruta:', { origin, destination })
    }
  }, [origin, destination])

      {/* Mapa */}
      <PlannerMap
        origin={origin}
        destination={destination}
        selectingMode={selectingMode}
        onLocationSelect={handleLocationSelect}
      />

      {/* Panel de controles inferior */}
      <View
        style={[
          styles.controlPanel,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}
      >
        {selectingMode ? (
          // Modo de selección activo
          <View style={styles.selectingMode}>
            <Text style={styles.selectingTitle}>
              {selectingMode === 'origin'
                ? '📍 Selecciona tu punto de SALIDA'
                : '🎯 Selecciona tu punto de LLEGADA'}
            </Text>
            <Text style={styles.selectingSubtitle}>
              Toca cualquier punto en el mapa o usa tu ubicación actual
            </Text>

            {userLocation && (
              <TouchableOpacity
                style={styles.useLocationButton}
                onPress={handleUseMyLocation}
                activeOpacity={0.8}
              >
                <Text style={styles.useLocationButtonText}>
                  📌 Usar mi ubicación
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setSelectingMode(null)}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Modo normal - mostrar inputs
          <ScrollView
            style={styles.scrollContent}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          >
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
                style={styles.planButton}
                onPress={handleStartPlanning}
                activeOpacity={0.8}
              >
                <Text style={styles.planButtonText}>Calcular Ruta 🚴</Text>
              </TouchableOpacity>
            )}

            {(origin || destination) && (
              <TouchableOpacity
                style={styles.clearAllButton}
                onPress={clearLocations}
                activeOpacity={0.8}
              >
                <Text style={styles.clearAllButtonText}>Limpiar todo</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        )}
      </View>
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
  selectingMode: {
    paddingVertical: 20,
  },
  selectingTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  selectingSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary || '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  useLocationButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    marginBottom: 12,
    alignItems: 'center',
  },
  useLocationButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  cancelButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.border || '#E0E0E0',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontWeight: '600',
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
```

---

## 🕐 27/04/2026, 16:46:01

### 📊 Resumen
- **Total archivos:** 11
- **📝 Nuevos:** 7
- **✏️ Modificados:** 3
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +273
- **Líneas eliminadas:** -13
- **Balance neto:** +260 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `src/api/geocoding.ts` | nuevo | -0 | 0 |
| 🆕 | `src/components/map/PlannerMap.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationInput.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationSearch.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/SwapLocationsButton.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/store/plannerStore.ts` | nuevo | -0 | 0 |
| 🆕 | `src/types/planner.ts` | nuevo | -0 | 0 |
| ✏️ | `src/screens/map/PlannerScreen.tsx` | +270 | -4 | +266 |
| ✏️ | `.env.example` | +0 | -9 | -9 |
| ✏️ | `src/constants/colors.ts` | +3 | -0 | +3 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (11)</summary>

**🆕 Nuevos:**
```
src/api/geocoding.ts
src/components/map/PlannerMap.tsx
src/components/planner/LocationInput.tsx
src/components/planner/LocationSearch.tsx
src/components/planner/SwapLocationsButton.tsx
src/store/plannerStore.ts
src/types/planner.ts
```

**✏️ Modificados:**
```
src/screens/map/PlannerScreen.tsx
.env.example
src/constants/colors.ts
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

### 💻 Código Añadido

**src/constants/colors.ts** (+3 líneas)**

```
  // Secundario
  secondary: '#f5f5f5',

```

**src/screens/map/PlannerScreen.tsx** (+270 líneas)**

```
import { useCallback, useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { PlannerMap } from '@/components/map/PlannerMap'
import { LocationInput } from '@/components/planner/LocationInput'
import { SwapLocationsButton } from '@/components/planner/SwapLocationsButton'
  const insets = useSafeAreaInsets()
  const {
    origin,
    destination,
    selectingMode,
    setOrigin,
    setDestination,
    setSelectingMode,
    swapLocations,
    clearLocations,
  } = usePlannerStore()

  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null)

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

        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          address: 'Mi ubicación',
        })
      }
    } catch (error) {
      console.error('Error obteniendo ubicación:', error)
    }
  }

  const handleLocationSelect = useCallback(
    (location: LocationPoint, type: 'origin' | 'destination') => {
      if (type === 'origin') {
        setOrigin(location)
      } else {
        setDestination(location)
      }
      setSelectingMode(null)
    },
    [setOrigin, setDestination, setSelectingMode]
  )

  const handleUseMyLocation = useCallback(() => {
    if (userLocation) {
      if (selectingMode === 'origin') {
        setOrigin(userLocation)
        setSelectingMode(null)
      } else if (selectingMode === 'destination') {
        setDestination(userLocation)
        setSelectingMode(null)
      }
    }
  }, [userLocation, selectingMode, setOrigin, setDestination, setSelectingMode])

  const handleStartPlanning = useCallback(() => {
    if (origin && destination) {
      // Aquí iremos a calcular la ruta
      console.log('Iniciando planificación de ruta:', { origin, destination })
    }
  }, [origin, destination])

      {/* Mapa */}
      <PlannerMap
        origin={origin}
        destination={destination}
        selectingMode={selectingMode}
        onLocationSelect={handleLocationSelect}
      />

      {/* Panel de controles inferior */}
      <View
        style={[
          styles.controlPanel,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}
      >
        {selectingMode ? (
          // Modo de selección activo
          <View style={styles.selectingMode}>
            <Text style={styles.selectingTitle}>
              {selectingMode === 'origin'
                ? '📍 Selecciona tu punto de SALIDA'
                : '🎯 Selecciona tu punto de LLEGADA'}
            </Text>
            <Text style={styles.selectingSubtitle}>
              Toca cualquier punto en el mapa o usa tu ubicación actual
            </Text>

            {userLocation && (
              <TouchableOpacity
                style={styles.useLocationButton}
                onPress={handleUseMyLocation}
                activeOpacity={0.8}
              >
                <Text style={styles.useLocationButtonText}>
                  📌 Usar mi ubicación
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setSelectingMode(null)}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Modo normal - mostrar inputs
          <ScrollView
            style={styles.scrollContent}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          >
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
                style={styles.planButton}
                onPress={handleStartPlanning}
                activeOpacity={0.8}
              >
                <Text style={styles.planButtonText}>Calcular Ruta 🚴</Text>
              </TouchableOpacity>
            )}

            {(origin || destination) && (
              <TouchableOpacity
                style={styles.clearAllButton}
                onPress={clearLocations}
                activeOpacity={0.8}
              >
                <Text style={styles.clearAllButtonText}>Limpiar todo</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        )}
      </View>
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
  selectingMode: {
    paddingVertical: 20,
  },
  selectingTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  selectingSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary || '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  useLocationButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    marginBottom: 12,
    alignItems: 'center',
  },
  useLocationButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  cancelButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.border || '#E0E0E0',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontWeight: '600',
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
```

---

## 🕐 27/04/2026, 16:46:52

### 📊 Resumen
- **Total archivos:** 11
- **📝 Nuevos:** 7
- **✏️ Modificados:** 3
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +364
- **Líneas eliminadas:** -14
- **Balance neto:** +350 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `src/api/geocoding.ts` | nuevo | -0 | 0 |
| 🆕 | `src/components/map/PlannerMap.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationInput.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationSearch.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/SwapLocationsButton.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/store/plannerStore.ts` | nuevo | -0 | 0 |
| 🆕 | `src/types/planner.ts` | nuevo | -0 | 0 |
| ✏️ | `src/screens/map/PlannerScreen.tsx` | +361 | -5 | +356 |
| ✏️ | `.env.example` | +0 | -9 | -9 |
| ✏️ | `src/constants/colors.ts` | +3 | -0 | +3 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (11)</summary>

**🆕 Nuevos:**
```
src/api/geocoding.ts
src/components/map/PlannerMap.tsx
src/components/planner/LocationInput.tsx
src/components/planner/LocationSearch.tsx
src/components/planner/SwapLocationsButton.tsx
src/store/plannerStore.ts
src/types/planner.ts
```

**✏️ Modificados:**
```
src/screens/map/PlannerScreen.tsx
.env.example
src/constants/colors.ts
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

### 💻 Código Añadido

**src/constants/colors.ts** (+3 líneas)**

```
  // Secundario
  secondary: '#f5f5f5',

```

**src/screens/map/PlannerScreen.tsx** (+361 líneas)**

```
import { useCallback, useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { PlannerMap } from '@/components/map/PlannerMap'
import { LocationInput } from '@/components/planner/LocationInput'
import { LocationSearch } from '@/components/planner/LocationSearch'
import { SwapLocationsButton } from '@/components/planner/SwapLocationsButton'
import { reverseGeocode } from '@/api/geocoding'
  const insets = useSafeAreaInsets()
  const {
    origin,
    destination,
    selectingMode,
    error,
    setOrigin,
    setDestination,
    setSelectingMode,
    setError,
    swapLocations,
    clearLocations,
  } = usePlannerStore()

  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null)
  const [loadingGeocoding, setLoadingGeocoding] = useState(false)

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

  const handleStartPlanning = useCallback(() => {
    if (origin && destination) {
      console.log('Iniciando planificación de ruta:', { origin, destination })
    }
  }, [origin, destination])

      {/* Mapa */}
      <PlannerMap
        origin={origin}
        destination={destination}
        selectingMode={selectingMode}
        onLocationSelect={handleLocationSelect}
      />

      {/* Panel de controles inferior */}
      <View
        style={[
          styles.controlPanel,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}
      >
        {selectingMode ? (
          // Modo de selección activo
          <View style={styles.selectingMode}>
            <Text style={styles.selectingTitle}>
              {selectingMode === 'origin'
                ? '📍 Selecciona tu punto de SALIDA'
                : '🎯 Selecciona tu punto de LLEGADA'}
            </Text>
            <Text style={styles.selectingSubtitle}>
              Busca una dirección o toca en el mapa
            </Text>

            {/* Buscador */}
            <View style={styles.searchContainer}>
              <LocationSearch
                onSelect={handleLocationSelect}
                type={selectingMode}
                excludeLocation={selectingMode === 'origin' ? destination : origin}
                placeholder={
                  selectingMode === 'origin'
                    ? 'Ej: Calle 72 Bogotá'
                    : 'Ej: Parque Simón Bolívar'
                }
              />
            </View>

            {/* Botón de ubicación actual */}
            {userLocation && (
              <TouchableOpacity
                style={styles.useLocationButton}
                onPress={handleUseMyLocation}
                activeOpacity={0.8}
              >
                <Text style={styles.useLocationButtonText}>
                  {loadingGeocoding ? '⏳' : '📌'} Usar mi ubicación
                </Text>
              </TouchableOpacity>
            )}

            {/* Error message */}
            {error && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>⚠️ {error}</Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setSelectingMode(null)
                setError(null)
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Modo normal - mostrar inputs
          <ScrollView
            style={styles.scrollContent}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          >
            {/* Error global */}
            {error && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>⚠️ {error}</Text>
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
                style={styles.planButton}
                onPress={handleStartPlanning}
                activeOpacity={0.8}
              >
                <Text style={styles.planButtonText}>Calcular Ruta 🚴</Text>
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
        )}
      </View>
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
  selectingMode: {
    justifyContent: 'flex-start',
    paddingVertical: 12,
  selectingTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
  },
  selectingSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary || '#666',
    marginBottom: 12,
    textAlign: 'center',
  },
  searchContainer: {
    width: '100%',
    marginBottom: 12,
  },
  useLocationButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    marginBottom: 8,
    alignItems: 'center',
  },
  useLocationButtonText: {
    color: '#FFF',
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
  errorText: {
    color: COLORS.error,
    fontSize: 13,
    fontWeight: '500',
  },
  cancelButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.border || '#E0E0E0',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
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
```

---

## 🕐 27/04/2026, 16:51:41

### 📊 Resumen
- **Total archivos:** 12
- **📝 Nuevos:** 8
- **✏️ Modificados:** 3
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +364
- **Líneas eliminadas:** -14
- **Balance neto:** +350 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `src/api/geocoding.ts` | nuevo | -0 | 0 |
| 🆕 | `src/components/map/PlannerMap.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationInput.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationSearch.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/SwapLocationsButton.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/screens/map/LocationSearchScreen.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/store/plannerStore.ts` | nuevo | -0 | 0 |
| 🆕 | `src/types/planner.ts` | nuevo | -0 | 0 |
| ✏️ | `src/screens/map/PlannerScreen.tsx` | +361 | -5 | +356 |
| ✏️ | `.env.example` | +0 | -9 | -9 |
| ✏️ | `src/constants/colors.ts` | +3 | -0 | +3 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (12)</summary>

**🆕 Nuevos:**
```
src/api/geocoding.ts
src/components/map/PlannerMap.tsx
src/components/planner/LocationInput.tsx
src/components/planner/LocationSearch.tsx
src/components/planner/SwapLocationsButton.tsx
src/screens/map/LocationSearchScreen.tsx
src/store/plannerStore.ts
src/types/planner.ts
```

**✏️ Modificados:**
```
src/screens/map/PlannerScreen.tsx
.env.example
src/constants/colors.ts
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

### 💻 Código Añadido

**src/constants/colors.ts** (+3 líneas)**

```
  // Secundario
  secondary: '#f5f5f5',

```

**src/screens/map/PlannerScreen.tsx** (+361 líneas)**

```
import { useCallback, useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { PlannerMap } from '@/components/map/PlannerMap'
import { LocationInput } from '@/components/planner/LocationInput'
import { LocationSearch } from '@/components/planner/LocationSearch'
import { SwapLocationsButton } from '@/components/planner/SwapLocationsButton'
import { reverseGeocode } from '@/api/geocoding'
  const insets = useSafeAreaInsets()
  const {
    origin,
    destination,
    selectingMode,
    error,
    setOrigin,
    setDestination,
    setSelectingMode,
    setError,
    swapLocations,
    clearLocations,
  } = usePlannerStore()

  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null)
  const [loadingGeocoding, setLoadingGeocoding] = useState(false)

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

  const handleStartPlanning = useCallback(() => {
    if (origin && destination) {
      console.log('Iniciando planificación de ruta:', { origin, destination })
    }
  }, [origin, destination])

      {/* Mapa */}
      <PlannerMap
        origin={origin}
        destination={destination}
        selectingMode={selectingMode}
        onLocationSelect={handleLocationSelect}
      />

      {/* Panel de controles inferior */}
      <View
        style={[
          styles.controlPanel,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}
      >
        {selectingMode ? (
          // Modo de selección activo
          <View style={styles.selectingMode}>
            <Text style={styles.selectingTitle}>
              {selectingMode === 'origin'
                ? '📍 Selecciona tu punto de SALIDA'
                : '🎯 Selecciona tu punto de LLEGADA'}
            </Text>
            <Text style={styles.selectingSubtitle}>
              Busca una dirección o toca en el mapa
            </Text>

            {/* Buscador */}
            <View style={styles.searchContainer}>
              <LocationSearch
                onSelect={handleLocationSelect}
                type={selectingMode}
                excludeLocation={selectingMode === 'origin' ? destination : origin}
                placeholder={
                  selectingMode === 'origin'
                    ? 'Ej: Calle 72 Bogotá'
                    : 'Ej: Parque Simón Bolívar'
                }
              />
            </View>

            {/* Botón de ubicación actual */}
            {userLocation && (
              <TouchableOpacity
                style={styles.useLocationButton}
                onPress={handleUseMyLocation}
                activeOpacity={0.8}
              >
                <Text style={styles.useLocationButtonText}>
                  {loadingGeocoding ? '⏳' : '📌'} Usar mi ubicación
                </Text>
              </TouchableOpacity>
            )}

            {/* Error message */}
            {error && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>⚠️ {error}</Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setSelectingMode(null)
                setError(null)
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Modo normal - mostrar inputs
          <ScrollView
            style={styles.scrollContent}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          >
            {/* Error global */}
            {error && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>⚠️ {error}</Text>
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
                style={styles.planButton}
                onPress={handleStartPlanning}
                activeOpacity={0.8}
              >
                <Text style={styles.planButtonText}>Calcular Ruta 🚴</Text>
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
        )}
      </View>
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
  selectingMode: {
    justifyContent: 'flex-start',
    paddingVertical: 12,
  selectingTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
  },
  selectingSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary || '#666',
    marginBottom: 12,
    textAlign: 'center',
  },
  searchContainer: {
    width: '100%',
    marginBottom: 12,
  },
  useLocationButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    marginBottom: 8,
    alignItems: 'center',
  },
  useLocationButtonText: {
    color: '#FFF',
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
  errorText: {
    color: COLORS.error,
    fontSize: 13,
    fontWeight: '500',
  },
  cancelButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.border || '#E0E0E0',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
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
```

---

## 🕐 27/04/2026, 16:52:15

### 📊 Resumen
- **Total archivos:** 12
- **📝 Nuevos:** 8
- **✏️ Modificados:** 3
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +274
- **Líneas eliminadas:** -15
- **Balance neto:** +259 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `src/api/geocoding.ts` | nuevo | -0 | 0 |
| 🆕 | `src/components/map/PlannerMap.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationInput.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationSearch.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/SwapLocationsButton.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/screens/map/LocationSearchScreen.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/store/plannerStore.ts` | nuevo | -0 | 0 |
| 🆕 | `src/types/planner.ts` | nuevo | -0 | 0 |
| ✏️ | `src/screens/map/PlannerScreen.tsx` | +271 | -6 | +265 |
| ✏️ | `.env.example` | +0 | -9 | -9 |
| ✏️ | `src/constants/colors.ts` | +3 | -0 | +3 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (12)</summary>

**🆕 Nuevos:**
```
src/api/geocoding.ts
src/components/map/PlannerMap.tsx
src/components/planner/LocationInput.tsx
src/components/planner/LocationSearch.tsx
src/components/planner/SwapLocationsButton.tsx
src/screens/map/LocationSearchScreen.tsx
src/store/plannerStore.ts
src/types/planner.ts
```

**✏️ Modificados:**
```
src/screens/map/PlannerScreen.tsx
.env.example
src/constants/colors.ts
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

### 💻 Código Añadido

**src/constants/colors.ts** (+3 líneas)**

```
  // Secundario
  secondary: '#f5f5f5',

```

**src/screens/map/PlannerScreen.tsx** (+271 líneas)**

```
import { useCallback, useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { PlannerMap } from '@/components/map/PlannerMap'
import { LocationInput } from '@/components/planner/LocationInput'
import { LocationSearchScreen } from './LocationSearchScreen'
import { SwapLocationsButton } from '@/components/planner/SwapLocationsButton'
import { reverseGeocode } from '@/api/geocoding'
  const insets = useSafeAreaInsets()
  const {
    origin,
    destination,
    selectingMode,
    error,
    setOrigin,
    setDestination,
    setSelectingMode,
    setError,
    swapLocations,
    clearLocations,
  } = usePlannerStore()

  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null)
  const [loadingGeocoding, setLoadingGeocoding] = useState(false)

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

  const handleStartPlanning = useCallback(() => {
    if (origin && destination) {
      console.log('Iniciando planificación de ruta:', { origin, destination })
    }
  }, [origin, destination])

  // Si está en modo de selección, mostrar pantalla fullscreen de búsqueda
  if (selectingMode) {
    return (
      <LocationSearchScreen
        type={selectingMode}
        onSelect={(location) => handleLocationSelect(location, selectingMode)}
        onCancel={() => {
          setSelectingMode(null)
          setError(null)
        }}
        excludeLocation={selectingMode === 'origin' ? destination : origin}
        userLocation={userLocation}
        onUseMyLocation={handleUseMyLocation}
      />
    )
  }

      {/* Mapa */}
      <PlannerMap
        origin={origin}
        destination={destination}
        selectingMode={selectingMode}
        onLocationSelect={handleLocationSelect}
      />

      {/* Panel de controles inferior */}
      <View
        style={[
          styles.controlPanel,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}
      >
        <ScrollView
          style={styles.scrollContent}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Error global */}
          {error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️ {error}</Text>
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
              style={styles.planButton}
              onPress={handleStartPlanning}
              activeOpacity={0.8}
            >
              <Text style={styles.planButtonText}>Calcular Ruta 🚴</Text>
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
      </View>
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
  planButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    marginTop: 8,
  planButtonText: {
    color: '#FFF',
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
```

---

## 🕐 27/04/2026, 17:02:06

### 📊 Resumen
- **Total archivos:** 14
- **📝 Nuevos:** 10
- **✏️ Modificados:** 3
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +274
- **Líneas eliminadas:** -15
- **Balance neto:** +259 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `src/api/geocoding.ts` | nuevo | -0 | 0 |
| 🆕 | `src/components/map/PlannerMap.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationInput.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationSearch.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/SwapLocationsButton.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/config/backendUrl.ts` | nuevo | -0 | 0 |
| 🆕 | `src/config/mapbox.ts` | nuevo | -0 | 0 |
| 🆕 | `src/screens/map/LocationSearchScreen.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/store/plannerStore.ts` | nuevo | -0 | 0 |
| 🆕 | `src/types/planner.ts` | nuevo | -0 | 0 |
| ✏️ | `src/screens/map/PlannerScreen.tsx` | +271 | -6 | +265 |
| ✏️ | `.env.example` | +0 | -9 | -9 |
| ✏️ | `src/constants/colors.ts` | +3 | -0 | +3 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (14)</summary>

**🆕 Nuevos:**
```
src/api/geocoding.ts
src/components/map/PlannerMap.tsx
src/components/planner/LocationInput.tsx
src/components/planner/LocationSearch.tsx
src/components/planner/SwapLocationsButton.tsx
src/config/backendUrl.ts
src/config/mapbox.ts
src/screens/map/LocationSearchScreen.tsx
src/store/plannerStore.ts
src/types/planner.ts
```

**✏️ Modificados:**
```
src/screens/map/PlannerScreen.tsx
.env.example
src/constants/colors.ts
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

### 💻 Código Añadido

**src/constants/colors.ts** (+3 líneas)**

```
  // Secundario
  secondary: '#f5f5f5',

```

**src/screens/map/PlannerScreen.tsx** (+271 líneas)**

```
import { useCallback, useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { PlannerMap } from '@/components/map/PlannerMap'
import { LocationInput } from '@/components/planner/LocationInput'
import { LocationSearchScreen } from './LocationSearchScreen'
import { SwapLocationsButton } from '@/components/planner/SwapLocationsButton'
import { reverseGeocode } from '@/api/geocoding'
  const insets = useSafeAreaInsets()
  const {
    origin,
    destination,
    selectingMode,
    error,
    setOrigin,
    setDestination,
    setSelectingMode,
    setError,
    swapLocations,
    clearLocations,
  } = usePlannerStore()

  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null)
  const [loadingGeocoding, setLoadingGeocoding] = useState(false)

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

  const handleStartPlanning = useCallback(() => {
    if (origin && destination) {
      console.log('Iniciando planificación de ruta:', { origin, destination })
    }
  }, [origin, destination])

  // Si está en modo de selección, mostrar pantalla fullscreen de búsqueda
  if (selectingMode) {
    return (
      <LocationSearchScreen
        type={selectingMode}
        onSelect={(location) => handleLocationSelect(location, selectingMode)}
        onCancel={() => {
          setSelectingMode(null)
          setError(null)
        }}
        excludeLocation={selectingMode === 'origin' ? destination : origin}
        userLocation={userLocation}
        onUseMyLocation={handleUseMyLocation}
      />
    )
  }

      {/* Mapa */}
      <PlannerMap
        origin={origin}
        destination={destination}
        selectingMode={selectingMode}
        onLocationSelect={handleLocationSelect}
      />

      {/* Panel de controles inferior */}
      <View
        style={[
          styles.controlPanel,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}
      >
        <ScrollView
          style={styles.scrollContent}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Error global */}
          {error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️ {error}</Text>
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
              style={styles.planButton}
              onPress={handleStartPlanning}
              activeOpacity={0.8}
            >
              <Text style={styles.planButtonText}>Calcular Ruta 🚴</Text>
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
      </View>
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
  planButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    marginTop: 8,
  planButtonText: {
    color: '#FFF',
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
```

---

## 🕐 27/04/2026, 17:02:39

### 📊 Resumen
- **Total archivos:** 16
- **📝 Nuevos:** 12
- **✏️ Modificados:** 3
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +274
- **Líneas eliminadas:** -15
- **Balance neto:** +259 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `src/api/auth/formatColombianPhone.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/selfRegister.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding.ts` | nuevo | -0 | 0 |
| 🆕 | `src/components/map/PlannerMap.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationInput.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationSearch.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/SwapLocationsButton.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/config/backendUrl.ts` | nuevo | -0 | 0 |
| 🆕 | `src/config/mapbox.ts` | nuevo | -0 | 0 |
| 🆕 | `src/screens/map/LocationSearchScreen.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/store/plannerStore.ts` | nuevo | -0 | 0 |
| 🆕 | `src/types/planner.ts` | nuevo | -0 | 0 |
| ✏️ | `src/screens/map/PlannerScreen.tsx` | +271 | -6 | +265 |
| ✏️ | `.env.example` | +0 | -9 | -9 |
| ✏️ | `src/constants/colors.ts` | +3 | -0 | +3 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (16)</summary>

**🆕 Nuevos:**
```
src/api/auth/formatColombianPhone.ts
src/api/auth/selfRegister.ts
src/api/geocoding.ts
src/components/map/PlannerMap.tsx
src/components/planner/LocationInput.tsx
src/components/planner/LocationSearch.tsx
src/components/planner/SwapLocationsButton.tsx
src/config/backendUrl.ts
src/config/mapbox.ts
src/screens/map/LocationSearchScreen.tsx
src/store/plannerStore.ts
src/types/planner.ts
```

**✏️ Modificados:**
```
src/screens/map/PlannerScreen.tsx
.env.example
src/constants/colors.ts
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

### 💻 Código Añadido

**src/constants/colors.ts** (+3 líneas)**

```
  // Secundario
  secondary: '#f5f5f5',

```

**src/screens/map/PlannerScreen.tsx** (+271 líneas)**

```
import { useCallback, useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { PlannerMap } from '@/components/map/PlannerMap'
import { LocationInput } from '@/components/planner/LocationInput'
import { LocationSearchScreen } from './LocationSearchScreen'
import { SwapLocationsButton } from '@/components/planner/SwapLocationsButton'
import { reverseGeocode } from '@/api/geocoding'
  const insets = useSafeAreaInsets()
  const {
    origin,
    destination,
    selectingMode,
    error,
    setOrigin,
    setDestination,
    setSelectingMode,
    setError,
    swapLocations,
    clearLocations,
  } = usePlannerStore()

  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null)
  const [loadingGeocoding, setLoadingGeocoding] = useState(false)

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

  const handleStartPlanning = useCallback(() => {
    if (origin && destination) {
      console.log('Iniciando planificación de ruta:', { origin, destination })
    }
  }, [origin, destination])

  // Si está en modo de selección, mostrar pantalla fullscreen de búsqueda
  if (selectingMode) {
    return (
      <LocationSearchScreen
        type={selectingMode}
        onSelect={(location) => handleLocationSelect(location, selectingMode)}
        onCancel={() => {
          setSelectingMode(null)
          setError(null)
        }}
        excludeLocation={selectingMode === 'origin' ? destination : origin}
        userLocation={userLocation}
        onUseMyLocation={handleUseMyLocation}
      />
    )
  }

      {/* Mapa */}
      <PlannerMap
        origin={origin}
        destination={destination}
        selectingMode={selectingMode}
        onLocationSelect={handleLocationSelect}
      />

      {/* Panel de controles inferior */}
      <View
        style={[
          styles.controlPanel,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}
      >
        <ScrollView
          style={styles.scrollContent}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Error global */}
          {error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️ {error}</Text>
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
              style={styles.planButton}
              onPress={handleStartPlanning}
              activeOpacity={0.8}
            >
              <Text style={styles.planButtonText}>Calcular Ruta 🚴</Text>
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
      </View>
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
  planButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    marginTop: 8,
  planButtonText: {
    color: '#FFF',
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
```

---

## 🕐 27/04/2026, 17:02:41

### 📊 Resumen
- **Total archivos:** 22
- **📝 Nuevos:** 18
- **✏️ Modificados:** 3
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +274
- **Líneas eliminadas:** -15
- **Balance neto:** +259 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `src/api/auth/formatColombianPhone.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/selfRegister.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/sendPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signIn.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signOut.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signUp.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/verifyPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding.ts` | nuevo | -0 | 0 |
| 🆕 | `src/components/map/PlannerMap.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationInput.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationSearch.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/SwapLocationsButton.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/config/backendUrl.ts` | nuevo | -0 | 0 |
| 🆕 | `src/config/mapbox.ts` | nuevo | -0 | 0 |
| 🆕 | `src/screens/map/LocationSearchScreen.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/store/plannerStore.ts` | nuevo | -0 | 0 |
| 🆕 | `src/types/planner.ts` | nuevo | -0 | 0 |
| ✏️ | `src/screens/map/PlannerScreen.tsx` | +271 | -6 | +265 |
| ✏️ | `.env.example` | +0 | -9 | -9 |
| ✏️ | `src/constants/colors.ts` | +3 | -0 | +3 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (22)</summary>

**🆕 Nuevos:**
```
src/api/auth/formatColombianPhone.ts
src/api/auth/index.ts
src/api/auth/selfRegister.ts
src/api/auth/sendPhoneOTP.ts
src/api/auth/signIn.ts
src/api/auth/signOut.ts
src/api/auth/signUp.ts
src/api/auth/verifyPhoneOTP.ts
src/api/geocoding.ts
src/components/map/PlannerMap.tsx
src/components/planner/LocationInput.tsx
src/components/planner/LocationSearch.tsx
src/components/planner/SwapLocationsButton.tsx
src/config/backendUrl.ts
src/config/mapbox.ts
src/screens/map/LocationSearchScreen.tsx
src/store/plannerStore.ts
src/types/planner.ts
```

**✏️ Modificados:**
```
src/screens/map/PlannerScreen.tsx
.env.example
src/constants/colors.ts
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

### 💻 Código Añadido

**src/constants/colors.ts** (+3 líneas)**

```
  // Secundario
  secondary: '#f5f5f5',

```

**src/screens/map/PlannerScreen.tsx** (+271 líneas)**

```
import { useCallback, useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { PlannerMap } from '@/components/map/PlannerMap'
import { LocationInput } from '@/components/planner/LocationInput'
import { LocationSearchScreen } from './LocationSearchScreen'
import { SwapLocationsButton } from '@/components/planner/SwapLocationsButton'
import { reverseGeocode } from '@/api/geocoding'
  const insets = useSafeAreaInsets()
  const {
    origin,
    destination,
    selectingMode,
    error,
    setOrigin,
    setDestination,
    setSelectingMode,
    setError,
    swapLocations,
    clearLocations,
  } = usePlannerStore()

  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null)
  const [loadingGeocoding, setLoadingGeocoding] = useState(false)

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

  const handleStartPlanning = useCallback(() => {
    if (origin && destination) {
      console.log('Iniciando planificación de ruta:', { origin, destination })
    }
  }, [origin, destination])

  // Si está en modo de selección, mostrar pantalla fullscreen de búsqueda
  if (selectingMode) {
    return (
      <LocationSearchScreen
        type={selectingMode}
        onSelect={(location) => handleLocationSelect(location, selectingMode)}
        onCancel={() => {
          setSelectingMode(null)
          setError(null)
        }}
        excludeLocation={selectingMode === 'origin' ? destination : origin}
        userLocation={userLocation}
        onUseMyLocation={handleUseMyLocation}
      />
    )
  }

      {/* Mapa */}
      <PlannerMap
        origin={origin}
        destination={destination}
        selectingMode={selectingMode}
        onLocationSelect={handleLocationSelect}
      />

      {/* Panel de controles inferior */}
      <View
        style={[
          styles.controlPanel,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}
      >
        <ScrollView
          style={styles.scrollContent}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Error global */}
          {error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️ {error}</Text>
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
              style={styles.planButton}
              onPress={handleStartPlanning}
              activeOpacity={0.8}
            >
              <Text style={styles.planButtonText}>Calcular Ruta 🚴</Text>
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
      </View>
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
  planButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    marginTop: 8,
  planButtonText: {
    color: '#FFF',
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
```

---

## 🕐 27/04/2026, 17:03:01

### 📊 Resumen
- **Total archivos:** 24
- **📝 Nuevos:** 20
- **✏️ Modificados:** 3
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +274
- **Líneas eliminadas:** -15
- **Balance neto:** +259 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `src/api/auth/formatColombianPhone.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/selfRegister.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/sendPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signIn.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signOut.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signUp.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/verifyPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/reverseGeocode.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/searchPlaces.ts` | nuevo | -0 | 0 |
| 🆕 | `src/components/map/PlannerMap.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationInput.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationSearch.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/SwapLocationsButton.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/config/backendUrl.ts` | nuevo | -0 | 0 |
| 🆕 | `src/config/mapbox.ts` | nuevo | -0 | 0 |
| 🆕 | `src/screens/map/LocationSearchScreen.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/store/plannerStore.ts` | nuevo | -0 | 0 |
| 🆕 | `src/types/planner.ts` | nuevo | -0 | 0 |
| ✏️ | `src/screens/map/PlannerScreen.tsx` | +271 | -6 | +265 |
| ✏️ | `.env.example` | +0 | -9 | -9 |
| ✏️ | `src/constants/colors.ts` | +3 | -0 | +3 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (24)</summary>

**🆕 Nuevos:**
```
src/api/auth/formatColombianPhone.ts
src/api/auth/index.ts
src/api/auth/selfRegister.ts
src/api/auth/sendPhoneOTP.ts
src/api/auth/signIn.ts
src/api/auth/signOut.ts
src/api/auth/signUp.ts
src/api/auth/verifyPhoneOTP.ts
src/api/geocoding.ts
src/api/geocoding/reverseGeocode.ts
src/api/geocoding/searchPlaces.ts
src/components/map/PlannerMap.tsx
src/components/planner/LocationInput.tsx
src/components/planner/LocationSearch.tsx
src/components/planner/SwapLocationsButton.tsx
src/config/backendUrl.ts
src/config/mapbox.ts
src/screens/map/LocationSearchScreen.tsx
src/store/plannerStore.ts
src/types/planner.ts
```

**✏️ Modificados:**
```
src/screens/map/PlannerScreen.tsx
.env.example
src/constants/colors.ts
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

### 💻 Código Añadido

**src/constants/colors.ts** (+3 líneas)**

```
  // Secundario
  secondary: '#f5f5f5',

```

**src/screens/map/PlannerScreen.tsx** (+271 líneas)**

```
import { useCallback, useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { PlannerMap } from '@/components/map/PlannerMap'
import { LocationInput } from '@/components/planner/LocationInput'
import { LocationSearchScreen } from './LocationSearchScreen'
import { SwapLocationsButton } from '@/components/planner/SwapLocationsButton'
import { reverseGeocode } from '@/api/geocoding'
  const insets = useSafeAreaInsets()
  const {
    origin,
    destination,
    selectingMode,
    error,
    setOrigin,
    setDestination,
    setSelectingMode,
    setError,
    swapLocations,
    clearLocations,
  } = usePlannerStore()

  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null)
  const [loadingGeocoding, setLoadingGeocoding] = useState(false)

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

  const handleStartPlanning = useCallback(() => {
    if (origin && destination) {
      console.log('Iniciando planificación de ruta:', { origin, destination })
    }
  }, [origin, destination])

  // Si está en modo de selección, mostrar pantalla fullscreen de búsqueda
  if (selectingMode) {
    return (
      <LocationSearchScreen
        type={selectingMode}
        onSelect={(location) => handleLocationSelect(location, selectingMode)}
        onCancel={() => {
          setSelectingMode(null)
          setError(null)
        }}
        excludeLocation={selectingMode === 'origin' ? destination : origin}
        userLocation={userLocation}
        onUseMyLocation={handleUseMyLocation}
      />
    )
  }

      {/* Mapa */}
      <PlannerMap
        origin={origin}
        destination={destination}
        selectingMode={selectingMode}
        onLocationSelect={handleLocationSelect}
      />

      {/* Panel de controles inferior */}
      <View
        style={[
          styles.controlPanel,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}
      >
        <ScrollView
          style={styles.scrollContent}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Error global */}
          {error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️ {error}</Text>
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
              style={styles.planButton}
              onPress={handleStartPlanning}
              activeOpacity={0.8}
            >
              <Text style={styles.planButtonText}>Calcular Ruta 🚴</Text>
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
      </View>
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
  planButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    marginTop: 8,
  planButtonText: {
    color: '#FFF',
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
```

---

## 🕐 27/04/2026, 17:03:03

### 📊 Resumen
- **Total archivos:** 27
- **📝 Nuevos:** 23
- **✏️ Modificados:** 3
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +274
- **Líneas eliminadas:** -15
- **Balance neto:** +259 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `src/api/auth/formatColombianPhone.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/selfRegister.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/sendPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signIn.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signOut.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signUp.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/verifyPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/calculateDistance.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/isSameLocation.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/reverseGeocode.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/searchPlaces.ts` | nuevo | -0 | 0 |
| 🆕 | `src/components/map/PlannerMap.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationInput.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationSearch.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/SwapLocationsButton.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/config/backendUrl.ts` | nuevo | -0 | 0 |
| 🆕 | `src/config/mapbox.ts` | nuevo | -0 | 0 |
| 🆕 | `src/screens/map/LocationSearchScreen.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/store/plannerStore.ts` | nuevo | -0 | 0 |
| 🆕 | `src/types/planner.ts` | nuevo | -0 | 0 |
| ✏️ | `src/screens/map/PlannerScreen.tsx` | +271 | -6 | +265 |
| ✏️ | `.env.example` | +0 | -9 | -9 |
| ✏️ | `src/constants/colors.ts` | +3 | -0 | +3 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (27)</summary>

**🆕 Nuevos:**
```
src/api/auth/formatColombianPhone.ts
src/api/auth/index.ts
src/api/auth/selfRegister.ts
src/api/auth/sendPhoneOTP.ts
src/api/auth/signIn.ts
src/api/auth/signOut.ts
src/api/auth/signUp.ts
src/api/auth/verifyPhoneOTP.ts
src/api/geocoding.ts
src/api/geocoding/calculateDistance.ts
src/api/geocoding/index.ts
src/api/geocoding/isSameLocation.ts
src/api/geocoding/reverseGeocode.ts
src/api/geocoding/searchPlaces.ts
src/components/map/PlannerMap.tsx
src/components/planner/LocationInput.tsx
src/components/planner/LocationSearch.tsx
src/components/planner/SwapLocationsButton.tsx
src/config/backendUrl.ts
src/config/mapbox.ts
src/screens/map/LocationSearchScreen.tsx
src/store/plannerStore.ts
src/types/planner.ts
```

**✏️ Modificados:**
```
src/screens/map/PlannerScreen.tsx
.env.example
src/constants/colors.ts
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

### 💻 Código Añadido

**src/constants/colors.ts** (+3 líneas)**

```
  // Secundario
  secondary: '#f5f5f5',

```

**src/screens/map/PlannerScreen.tsx** (+271 líneas)**

```
import { useCallback, useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { PlannerMap } from '@/components/map/PlannerMap'
import { LocationInput } from '@/components/planner/LocationInput'
import { LocationSearchScreen } from './LocationSearchScreen'
import { SwapLocationsButton } from '@/components/planner/SwapLocationsButton'
import { reverseGeocode } from '@/api/geocoding'
  const insets = useSafeAreaInsets()
  const {
    origin,
    destination,
    selectingMode,
    error,
    setOrigin,
    setDestination,
    setSelectingMode,
    setError,
    swapLocations,
    clearLocations,
  } = usePlannerStore()

  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null)
  const [loadingGeocoding, setLoadingGeocoding] = useState(false)

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

  const handleStartPlanning = useCallback(() => {
    if (origin && destination) {
      console.log('Iniciando planificación de ruta:', { origin, destination })
    }
  }, [origin, destination])

  // Si está en modo de selección, mostrar pantalla fullscreen de búsqueda
  if (selectingMode) {
    return (
      <LocationSearchScreen
        type={selectingMode}
        onSelect={(location) => handleLocationSelect(location, selectingMode)}
        onCancel={() => {
          setSelectingMode(null)
          setError(null)
        }}
        excludeLocation={selectingMode === 'origin' ? destination : origin}
        userLocation={userLocation}
        onUseMyLocation={handleUseMyLocation}
      />
    )
  }

      {/* Mapa */}
      <PlannerMap
        origin={origin}
        destination={destination}
        selectingMode={selectingMode}
        onLocationSelect={handleLocationSelect}
      />

      {/* Panel de controles inferior */}
      <View
        style={[
          styles.controlPanel,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}
      >
        <ScrollView
          style={styles.scrollContent}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Error global */}
          {error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️ {error}</Text>
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
              style={styles.planButton}
              onPress={handleStartPlanning}
              activeOpacity={0.8}
            >
              <Text style={styles.planButtonText}>Calcular Ruta 🚴</Text>
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
      </View>
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
  planButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    marginTop: 8,
  planButtonText: {
    color: '#FFF',
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
```

---

## 🕐 27/04/2026, 17:03:17

### 📊 Resumen
- **Total archivos:** 29
- **📝 Nuevos:** 25
- **✏️ Modificados:** 3
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +274
- **Líneas eliminadas:** -15
- **Balance neto:** +259 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `src/api/auth/formatColombianPhone.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/selfRegister.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/sendPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signIn.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signOut.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signUp.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/verifyPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/calculateDistance.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/isSameLocation.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/reverseGeocode.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/searchPlaces.ts` | nuevo | -0 | 0 |
| 🆕 | `src/components/map/PlannerMap.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationInput.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationSearch.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/SwapLocationsButton.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/config/backendUrl.ts` | nuevo | -0 | 0 |
| 🆕 | `src/config/mapbox.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/quickConnectionTest.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/testEndpoint.ts` | nuevo | -0 | 0 |
| 🆕 | `src/screens/map/LocationSearchScreen.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/store/plannerStore.ts` | nuevo | -0 | 0 |
| 🆕 | `src/types/planner.ts` | nuevo | -0 | 0 |
| ✏️ | `src/screens/map/PlannerScreen.tsx` | +271 | -6 | +265 |
| ✏️ | `.env.example` | +0 | -9 | -9 |
| ✏️ | `src/constants/colors.ts` | +3 | -0 | +3 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (29)</summary>

**🆕 Nuevos:**
```
src/api/auth/formatColombianPhone.ts
src/api/auth/index.ts
src/api/auth/selfRegister.ts
src/api/auth/sendPhoneOTP.ts
src/api/auth/signIn.ts
src/api/auth/signOut.ts
src/api/auth/signUp.ts
src/api/auth/verifyPhoneOTP.ts
src/api/geocoding.ts
src/api/geocoding/calculateDistance.ts
src/api/geocoding/index.ts
src/api/geocoding/isSameLocation.ts
src/api/geocoding/reverseGeocode.ts
src/api/geocoding/searchPlaces.ts
src/components/map/PlannerMap.tsx
src/components/planner/LocationInput.tsx
src/components/planner/LocationSearch.tsx
src/components/planner/SwapLocationsButton.tsx
src/config/backendUrl.ts
src/config/mapbox.ts
src/debug/quickConnectionTest.ts
src/debug/testEndpoint.ts
src/screens/map/LocationSearchScreen.tsx
src/store/plannerStore.ts
src/types/planner.ts
```

**✏️ Modificados:**
```
src/screens/map/PlannerScreen.tsx
.env.example
src/constants/colors.ts
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

### 💻 Código Añadido

**src/constants/colors.ts** (+3 líneas)**

```
  // Secundario
  secondary: '#f5f5f5',

```

**src/screens/map/PlannerScreen.tsx** (+271 líneas)**

```
import { useCallback, useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { PlannerMap } from '@/components/map/PlannerMap'
import { LocationInput } from '@/components/planner/LocationInput'
import { LocationSearchScreen } from './LocationSearchScreen'
import { SwapLocationsButton } from '@/components/planner/SwapLocationsButton'
import { reverseGeocode } from '@/api/geocoding'
  const insets = useSafeAreaInsets()
  const {
    origin,
    destination,
    selectingMode,
    error,
    setOrigin,
    setDestination,
    setSelectingMode,
    setError,
    swapLocations,
    clearLocations,
  } = usePlannerStore()

  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null)
  const [loadingGeocoding, setLoadingGeocoding] = useState(false)

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

  const handleStartPlanning = useCallback(() => {
    if (origin && destination) {
      console.log('Iniciando planificación de ruta:', { origin, destination })
    }
  }, [origin, destination])

  // Si está en modo de selección, mostrar pantalla fullscreen de búsqueda
  if (selectingMode) {
    return (
      <LocationSearchScreen
        type={selectingMode}
        onSelect={(location) => handleLocationSelect(location, selectingMode)}
        onCancel={() => {
          setSelectingMode(null)
          setError(null)
        }}
        excludeLocation={selectingMode === 'origin' ? destination : origin}
        userLocation={userLocation}
        onUseMyLocation={handleUseMyLocation}
      />
    )
  }

      {/* Mapa */}
      <PlannerMap
        origin={origin}
        destination={destination}
        selectingMode={selectingMode}
        onLocationSelect={handleLocationSelect}
      />

      {/* Panel de controles inferior */}
      <View
        style={[
          styles.controlPanel,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}
      >
        <ScrollView
          style={styles.scrollContent}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Error global */}
          {error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️ {error}</Text>
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
              style={styles.planButton}
              onPress={handleStartPlanning}
              activeOpacity={0.8}
            >
              <Text style={styles.planButtonText}>Calcular Ruta 🚴</Text>
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
      </View>
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
  planButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    marginTop: 8,
  planButtonText: {
    color: '#FFF',
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
```

---

## 🕐 27/04/2026, 17:03:32

### 📊 Resumen
- **Total archivos:** 30
- **📝 Nuevos:** 25
- **✏️ Modificados:** 4
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +295
- **Líneas eliminadas:** -20
- **Balance neto:** +275 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `src/api/auth/formatColombianPhone.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/selfRegister.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/sendPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signIn.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signOut.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signUp.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/verifyPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/calculateDistance.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/isSameLocation.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/reverseGeocode.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/searchPlaces.ts` | nuevo | -0 | 0 |
| 🆕 | `src/components/map/PlannerMap.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationInput.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationSearch.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/SwapLocationsButton.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/config/backendUrl.ts` | nuevo | -0 | 0 |
| 🆕 | `src/config/mapbox.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/quickConnectionTest.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/testEndpoint.ts` | nuevo | -0 | 0 |
| 🆕 | `src/screens/map/LocationSearchScreen.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/store/plannerStore.ts` | nuevo | -0 | 0 |
| 🆕 | `src/types/planner.ts` | nuevo | -0 | 0 |
| ✏️ | `src/screens/map/PlannerScreen.tsx` | +271 | -6 | +265 |
| ✏️ | `src/api/auth.ts` | +21 | -5 | +16 |
| ✏️ | `.env.example` | +0 | -9 | -9 |
| ✏️ | `src/constants/colors.ts` | +3 | -0 | +3 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (30)</summary>

**🆕 Nuevos:**
```
src/api/auth/formatColombianPhone.ts
src/api/auth/index.ts
src/api/auth/selfRegister.ts
src/api/auth/sendPhoneOTP.ts
src/api/auth/signIn.ts
src/api/auth/signOut.ts
src/api/auth/signUp.ts
src/api/auth/verifyPhoneOTP.ts
src/api/geocoding.ts
src/api/geocoding/calculateDistance.ts
src/api/geocoding/index.ts
src/api/geocoding/isSameLocation.ts
src/api/geocoding/reverseGeocode.ts
src/api/geocoding/searchPlaces.ts
src/components/map/PlannerMap.tsx
src/components/planner/LocationInput.tsx
src/components/planner/LocationSearch.tsx
src/components/planner/SwapLocationsButton.tsx
src/config/backendUrl.ts
src/config/mapbox.ts
src/debug/quickConnectionTest.ts
src/debug/testEndpoint.ts
src/screens/map/LocationSearchScreen.tsx
src/store/plannerStore.ts
src/types/planner.ts
```

**✏️ Modificados:**
```
src/screens/map/PlannerScreen.tsx
src/api/auth.ts
.env.example
src/constants/colors.ts
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

### 💻 Código Añadido

**src/api/auth.ts** (+21 líneas)**

```
// Re-exports - cada función vive en su propio archivo dentro de src/api/auth/
export {
  selfRegister,
  signUp,
  signIn,
  signOut,
  sendPhoneOTP,
  verifyPhoneOTP,
  formatColombianPhone,
} from './auth/index'

// --- ARCHIVO LEGADO - NO AGREGAR CÓDIGO AQUÍ ---
// Este archivo solo re-exporta para mantener compatibilidad con importaciones existentes.
// Para agregar funciones de autenticación, crear un nuevo archivo en src/api/auth/

// Dummy export to avoid empty module warning for legacy compilers
export type {} // eslint-disable-line @typescript-eslint/no-empty-object-type

// LEGACY BELOW - DO NOT USE DIRECTLY
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _unused: null = null
```

**src/constants/colors.ts** (+3 líneas)**

```
  // Secundario
  secondary: '#f5f5f5',

```

**src/screens/map/PlannerScreen.tsx** (+271 líneas)**

```
import { useCallback, useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { PlannerMap } from '@/components/map/PlannerMap'
import { LocationInput } from '@/components/planner/LocationInput'
import { LocationSearchScreen } from './LocationSearchScreen'
import { SwapLocationsButton } from '@/components/planner/SwapLocationsButton'
import { reverseGeocode } from '@/api/geocoding'
  const insets = useSafeAreaInsets()
  const {
    origin,
    destination,
    selectingMode,
    error,
    setOrigin,
    setDestination,
    setSelectingMode,
    setError,
    swapLocations,
    clearLocations,
  } = usePlannerStore()

  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null)
  const [loadingGeocoding, setLoadingGeocoding] = useState(false)

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

  const handleStartPlanning = useCallback(() => {
    if (origin && destination) {
      console.log('Iniciando planificación de ruta:', { origin, destination })
    }
  }, [origin, destination])

  // Si está en modo de selección, mostrar pantalla fullscreen de búsqueda
  if (selectingMode) {
    return (
      <LocationSearchScreen
        type={selectingMode}
        onSelect={(location) => handleLocationSelect(location, selectingMode)}
        onCancel={() => {
          setSelectingMode(null)
          setError(null)
        }}
        excludeLocation={selectingMode === 'origin' ? destination : origin}
        userLocation={userLocation}
        onUseMyLocation={handleUseMyLocation}
      />
    )
  }

      {/* Mapa */}
      <PlannerMap
        origin={origin}
        destination={destination}
        selectingMode={selectingMode}
        onLocationSelect={handleLocationSelect}
      />

      {/* Panel de controles inferior */}
      <View
        style={[
          styles.controlPanel,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}
      >
        <ScrollView
          style={styles.scrollContent}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Error global */}
          {error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️ {error}</Text>
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
              style={styles.planButton}
              onPress={handleStartPlanning}
              activeOpacity={0.8}
            >
              <Text style={styles.planButtonText}>Calcular Ruta 🚴</Text>
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
      </View>
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
  planButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    marginTop: 8,
  planButtonText: {
    color: '#FFF',
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
```

---

## 🕐 27/04/2026, 17:04:03

### 📊 Resumen
- **Total archivos:** 30
- **📝 Nuevos:** 25
- **✏️ Modificados:** 4
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +284
- **Líneas eliminadas:** -19
- **Balance neto:** +265 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `src/api/auth/formatColombianPhone.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/selfRegister.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/sendPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signIn.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signOut.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signUp.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/verifyPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/calculateDistance.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/isSameLocation.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/reverseGeocode.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/searchPlaces.ts` | nuevo | -0 | 0 |
| 🆕 | `src/components/map/PlannerMap.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationInput.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationSearch.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/SwapLocationsButton.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/config/backendUrl.ts` | nuevo | -0 | 0 |
| 🆕 | `src/config/mapbox.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/quickConnectionTest.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/testEndpoint.ts` | nuevo | -0 | 0 |
| 🆕 | `src/screens/map/LocationSearchScreen.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/store/plannerStore.ts` | nuevo | -0 | 0 |
| 🆕 | `src/types/planner.ts` | nuevo | -0 | 0 |
| ✏️ | `src/screens/map/PlannerScreen.tsx` | +271 | -6 | +265 |
| ✏️ | `src/api/auth.ts` | +10 | -4 | +6 |
| ✏️ | `.env.example` | +0 | -9 | -9 |
| ✏️ | `src/constants/colors.ts` | +3 | -0 | +3 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (30)</summary>

**🆕 Nuevos:**
```
src/api/auth/formatColombianPhone.ts
src/api/auth/index.ts
src/api/auth/selfRegister.ts
src/api/auth/sendPhoneOTP.ts
src/api/auth/signIn.ts
src/api/auth/signOut.ts
src/api/auth/signUp.ts
src/api/auth/verifyPhoneOTP.ts
src/api/geocoding.ts
src/api/geocoding/calculateDistance.ts
src/api/geocoding/index.ts
src/api/geocoding/isSameLocation.ts
src/api/geocoding/reverseGeocode.ts
src/api/geocoding/searchPlaces.ts
src/components/map/PlannerMap.tsx
src/components/planner/LocationInput.tsx
src/components/planner/LocationSearch.tsx
src/components/planner/SwapLocationsButton.tsx
src/config/backendUrl.ts
src/config/mapbox.ts
src/debug/quickConnectionTest.ts
src/debug/testEndpoint.ts
src/screens/map/LocationSearchScreen.tsx
src/store/plannerStore.ts
src/types/planner.ts
```

**✏️ Modificados:**
```
src/screens/map/PlannerScreen.tsx
src/api/auth.ts
.env.example
src/constants/colors.ts
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

### 💻 Código Añadido

**src/api/auth.ts** (+10 líneas)**

```
// Re-exports - cada función vive en su propio archivo dentro de src/api/auth/
export {
  selfRegister,
  signUp,
  signIn,
  signOut,
  sendPhoneOTP,
  verifyPhoneOTP,
  formatColombianPhone,
} from './auth/index'
```

**src/constants/colors.ts** (+3 líneas)**

```
  // Secundario
  secondary: '#f5f5f5',

```

**src/screens/map/PlannerScreen.tsx** (+271 líneas)**

```
import { useCallback, useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { PlannerMap } from '@/components/map/PlannerMap'
import { LocationInput } from '@/components/planner/LocationInput'
import { LocationSearchScreen } from './LocationSearchScreen'
import { SwapLocationsButton } from '@/components/planner/SwapLocationsButton'
import { reverseGeocode } from '@/api/geocoding'
  const insets = useSafeAreaInsets()
  const {
    origin,
    destination,
    selectingMode,
    error,
    setOrigin,
    setDestination,
    setSelectingMode,
    setError,
    swapLocations,
    clearLocations,
  } = usePlannerStore()

  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null)
  const [loadingGeocoding, setLoadingGeocoding] = useState(false)

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

  const handleStartPlanning = useCallback(() => {
    if (origin && destination) {
      console.log('Iniciando planificación de ruta:', { origin, destination })
    }
  }, [origin, destination])

  // Si está en modo de selección, mostrar pantalla fullscreen de búsqueda
  if (selectingMode) {
    return (
      <LocationSearchScreen
        type={selectingMode}
        onSelect={(location) => handleLocationSelect(location, selectingMode)}
        onCancel={() => {
          setSelectingMode(null)
          setError(null)
        }}
        excludeLocation={selectingMode === 'origin' ? destination : origin}
        userLocation={userLocation}
        onUseMyLocation={handleUseMyLocation}
      />
    )
  }

      {/* Mapa */}
      <PlannerMap
        origin={origin}
        destination={destination}
        selectingMode={selectingMode}
        onLocationSelect={handleLocationSelect}
      />

      {/* Panel de controles inferior */}
      <View
        style={[
          styles.controlPanel,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}
      >
        <ScrollView
          style={styles.scrollContent}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Error global */}
          {error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️ {error}</Text>
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
              style={styles.planButton}
              onPress={handleStartPlanning}
              activeOpacity={0.8}
            >
              <Text style={styles.planButtonText}>Calcular Ruta 🚴</Text>
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
      </View>
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
  planButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    marginTop: 8,
  planButtonText: {
    color: '#FFF',
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
```

---

## 🕐 27/04/2026, 17:06:05

### 📊 Resumen
- **Total archivos:** 30
- **📝 Nuevos:** 25
- **✏️ Modificados:** 4
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +284
- **Líneas eliminadas:** -21
- **Balance neto:** +263 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `src/api/auth/formatColombianPhone.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/selfRegister.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/sendPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signIn.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signOut.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signUp.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/verifyPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/calculateDistance.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/isSameLocation.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/reverseGeocode.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/searchPlaces.ts` | nuevo | -0 | 0 |
| 🆕 | `src/components/map/PlannerMap.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationInput.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationSearch.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/SwapLocationsButton.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/config/backendUrl.ts` | nuevo | -0 | 0 |
| 🆕 | `src/config/mapbox.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/quickConnectionTest.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/testEndpoint.ts` | nuevo | -0 | 0 |
| 🆕 | `src/screens/map/LocationSearchScreen.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/store/plannerStore.ts` | nuevo | -0 | 0 |
| 🆕 | `src/types/planner.ts` | nuevo | -0 | 0 |
| ✏️ | `src/screens/map/PlannerScreen.tsx` | +271 | -6 | +265 |
| ✏️ | `src/api/auth.ts` | +10 | -6 | +4 |
| ✏️ | `.env.example` | +0 | -9 | -9 |
| ✏️ | `src/constants/colors.ts` | +3 | -0 | +3 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (30)</summary>

**🆕 Nuevos:**
```
src/api/auth/formatColombianPhone.ts
src/api/auth/index.ts
src/api/auth/selfRegister.ts
src/api/auth/sendPhoneOTP.ts
src/api/auth/signIn.ts
src/api/auth/signOut.ts
src/api/auth/signUp.ts
src/api/auth/verifyPhoneOTP.ts
src/api/geocoding.ts
src/api/geocoding/calculateDistance.ts
src/api/geocoding/index.ts
src/api/geocoding/isSameLocation.ts
src/api/geocoding/reverseGeocode.ts
src/api/geocoding/searchPlaces.ts
src/components/map/PlannerMap.tsx
src/components/planner/LocationInput.tsx
src/components/planner/LocationSearch.tsx
src/components/planner/SwapLocationsButton.tsx
src/config/backendUrl.ts
src/config/mapbox.ts
src/debug/quickConnectionTest.ts
src/debug/testEndpoint.ts
src/screens/map/LocationSearchScreen.tsx
src/store/plannerStore.ts
src/types/planner.ts
```

**✏️ Modificados:**
```
src/screens/map/PlannerScreen.tsx
src/api/auth.ts
.env.example
src/constants/colors.ts
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

### 💻 Código Añadido

**src/api/auth.ts** (+10 líneas)**

```
// Re-exports - cada función vive en su propio archivo en src/api/auth/
export {
  selfRegister,
  signUp,
  signIn,
  signOut,
  sendPhoneOTP,
  verifyPhoneOTP,
  formatColombianPhone,
} from './auth/index'
```

**src/constants/colors.ts** (+3 líneas)**

```
  // Secundario
  secondary: '#f5f5f5',

```

**src/screens/map/PlannerScreen.tsx** (+271 líneas)**

```
import { useCallback, useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { PlannerMap } from '@/components/map/PlannerMap'
import { LocationInput } from '@/components/planner/LocationInput'
import { LocationSearchScreen } from './LocationSearchScreen'
import { SwapLocationsButton } from '@/components/planner/SwapLocationsButton'
import { reverseGeocode } from '@/api/geocoding'
  const insets = useSafeAreaInsets()
  const {
    origin,
    destination,
    selectingMode,
    error,
    setOrigin,
    setDestination,
    setSelectingMode,
    setError,
    swapLocations,
    clearLocations,
  } = usePlannerStore()

  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null)
  const [loadingGeocoding, setLoadingGeocoding] = useState(false)

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

  const handleStartPlanning = useCallback(() => {
    if (origin && destination) {
      console.log('Iniciando planificación de ruta:', { origin, destination })
    }
  }, [origin, destination])

  // Si está en modo de selección, mostrar pantalla fullscreen de búsqueda
  if (selectingMode) {
    return (
      <LocationSearchScreen
        type={selectingMode}
        onSelect={(location) => handleLocationSelect(location, selectingMode)}
        onCancel={() => {
          setSelectingMode(null)
          setError(null)
        }}
        excludeLocation={selectingMode === 'origin' ? destination : origin}
        userLocation={userLocation}
        onUseMyLocation={handleUseMyLocation}
      />
    )
  }

      {/* Mapa */}
      <PlannerMap
        origin={origin}
        destination={destination}
        selectingMode={selectingMode}
        onLocationSelect={handleLocationSelect}
      />

      {/* Panel de controles inferior */}
      <View
        style={[
          styles.controlPanel,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}
      >
        <ScrollView
          style={styles.scrollContent}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Error global */}
          {error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️ {error}</Text>
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
              style={styles.planButton}
              onPress={handleStartPlanning}
              activeOpacity={0.8}
            >
              <Text style={styles.planButtonText}>Calcular Ruta 🚴</Text>
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
      </View>
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
  planButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    marginTop: 8,
  planButtonText: {
    color: '#FFF',
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
```

---

## 🕐 27/04/2026, 17:06:46

### 📊 Resumen
- **Total archivos:** 30
- **📝 Nuevos:** 25
- **✏️ Modificados:** 4
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +285
- **Líneas eliminadas:** -21
- **Balance neto:** +264 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `src/api/auth/formatColombianPhone.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/selfRegister.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/sendPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signIn.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signOut.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signUp.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/verifyPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/calculateDistance.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/isSameLocation.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/reverseGeocode.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/searchPlaces.ts` | nuevo | -0 | 0 |
| 🆕 | `src/components/map/PlannerMap.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationInput.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationSearch.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/SwapLocationsButton.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/config/backendUrl.ts` | nuevo | -0 | 0 |
| 🆕 | `src/config/mapbox.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/quickConnectionTest.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/testEndpoint.ts` | nuevo | -0 | 0 |
| 🆕 | `src/screens/map/LocationSearchScreen.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/store/plannerStore.ts` | nuevo | -0 | 0 |
| 🆕 | `src/types/planner.ts` | nuevo | -0 | 0 |
| ✏️ | `src/screens/map/PlannerScreen.tsx` | +272 | -6 | +266 |
| ✏️ | `src/api/auth.ts` | +10 | -6 | +4 |
| ✏️ | `.env.example` | +0 | -9 | -9 |
| ✏️ | `src/constants/colors.ts` | +3 | -0 | +3 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (30)</summary>

**🆕 Nuevos:**
```
src/api/auth/formatColombianPhone.ts
src/api/auth/index.ts
src/api/auth/selfRegister.ts
src/api/auth/sendPhoneOTP.ts
src/api/auth/signIn.ts
src/api/auth/signOut.ts
src/api/auth/signUp.ts
src/api/auth/verifyPhoneOTP.ts
src/api/geocoding.ts
src/api/geocoding/calculateDistance.ts
src/api/geocoding/index.ts
src/api/geocoding/isSameLocation.ts
src/api/geocoding/reverseGeocode.ts
src/api/geocoding/searchPlaces.ts
src/components/map/PlannerMap.tsx
src/components/planner/LocationInput.tsx
src/components/planner/LocationSearch.tsx
src/components/planner/SwapLocationsButton.tsx
src/config/backendUrl.ts
src/config/mapbox.ts
src/debug/quickConnectionTest.ts
src/debug/testEndpoint.ts
src/screens/map/LocationSearchScreen.tsx
src/store/plannerStore.ts
src/types/planner.ts
```

**✏️ Modificados:**
```
src/screens/map/PlannerScreen.tsx
src/api/auth.ts
.env.example
src/constants/colors.ts
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

### 💻 Código Añadido

**src/api/auth.ts** (+10 líneas)**

```
// Re-exports - cada función vive en su propio archivo en src/api/auth/
export {
  selfRegister,
  signUp,
  signIn,
  signOut,
  sendPhoneOTP,
  verifyPhoneOTP,
  formatColombianPhone,
} from './auth/index'
```

**src/constants/colors.ts** (+3 líneas)**

```
  // Secundario
  secondary: '#f5f5f5',

```

**src/screens/map/PlannerScreen.tsx** (+272 líneas)**

```
import { useCallback, useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { PlannerMap } from '@/components/map/PlannerMap'
import { LocationInput } from '@/components/planner/LocationInput'
import { LocationSearchScreen } from './LocationSearchScreen'
import { SwapLocationsButton } from '@/components/planner/SwapLocationsButton'
import { reverseGeocode } from '@/api/geocoding'
  const insets = useSafeAreaInsets()
  const {
    origin,
    destination,
    selectingMode,
    error,
    setOrigin,
    setDestination,
    setSelectingMode,
    setError,
    swapLocations,
    clearLocations,
  } = usePlannerStore()

  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null)
  const [loadingGeocoding, setLoadingGeocoding] = useState(false)

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

  const handleStartPlanning = useCallback(() => {
    if (origin && destination) {
      console.log('Iniciando planificación de ruta:', { origin, destination })
    }
  }, [origin, destination])

  // Si está en modo de selección, mostrar pantalla fullscreen de búsqueda
  if (selectingMode) {
    return (
      <LocationSearchScreen
        type={selectingMode}
        onSelect={(location) => handleLocationSelect(location, selectingMode)}
        onCancel={() => {
          setSelectingMode(null)
          setError(null)
        }}
        excludeLocation={selectingMode === 'origin' ? destination : origin}
        userLocation={userLocation}
        onUseMyLocation={handleUseMyLocation}
      />
    )
  }

      {/* Mapa */}
      <PlannerMap
        origin={origin}
        destination={destination}
        selectingMode={selectingMode}
        onLocationSelect={handleLocationSelect}
      />

      {/* Panel de controles inferior */}
      <View
        style={[
          styles.controlPanel,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}
      >
        <ScrollView
          style={styles.scrollContent}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Error global */}
          {error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️ {error}</Text>
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
              style={styles.planButton}
              onPress={handleStartPlanning}
              activeOpacity={0.8}
            >
              <Text style={styles.planButtonText}>Calcular Ruta 🚴</Text>
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
      </View>
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
    maxWidth: '80%'
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
  planButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    marginTop: 8,
  planButtonText: {
    color: '#FFF',
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
```

---

## 🕐 27/04/2026, 17:07:15

### 📊 Resumen
- **Total archivos:** 30
- **📝 Nuevos:** 25
- **✏️ Modificados:** 4
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +285
- **Líneas eliminadas:** -236
- **Balance neto:** +49 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `src/api/auth/formatColombianPhone.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/selfRegister.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/sendPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signIn.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signOut.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signUp.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/verifyPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/calculateDistance.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/isSameLocation.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/reverseGeocode.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/searchPlaces.ts` | nuevo | -0 | 0 |
| 🆕 | `src/components/map/PlannerMap.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationInput.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationSearch.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/SwapLocationsButton.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/config/backendUrl.ts` | nuevo | -0 | 0 |
| 🆕 | `src/config/mapbox.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/quickConnectionTest.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/testEndpoint.ts` | nuevo | -0 | 0 |
| 🆕 | `src/screens/map/LocationSearchScreen.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/store/plannerStore.ts` | nuevo | -0 | 0 |
| 🆕 | `src/types/planner.ts` | nuevo | -0 | 0 |
| ✏️ | `src/screens/map/PlannerScreen.tsx` | +272 | -6 | +266 |
| ✏️ | `src/api/auth.ts` | +10 | -221 | -211 |
| ✏️ | `.env.example` | +0 | -9 | -9 |
| ✏️ | `src/constants/colors.ts` | +3 | -0 | +3 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (30)</summary>

**🆕 Nuevos:**
```
src/api/auth/formatColombianPhone.ts
src/api/auth/index.ts
src/api/auth/selfRegister.ts
src/api/auth/sendPhoneOTP.ts
src/api/auth/signIn.ts
src/api/auth/signOut.ts
src/api/auth/signUp.ts
src/api/auth/verifyPhoneOTP.ts
src/api/geocoding.ts
src/api/geocoding/calculateDistance.ts
src/api/geocoding/index.ts
src/api/geocoding/isSameLocation.ts
src/api/geocoding/reverseGeocode.ts
src/api/geocoding/searchPlaces.ts
src/components/map/PlannerMap.tsx
src/components/planner/LocationInput.tsx
src/components/planner/LocationSearch.tsx
src/components/planner/SwapLocationsButton.tsx
src/config/backendUrl.ts
src/config/mapbox.ts
src/debug/quickConnectionTest.ts
src/debug/testEndpoint.ts
src/screens/map/LocationSearchScreen.tsx
src/store/plannerStore.ts
src/types/planner.ts
```

**✏️ Modificados:**
```
src/screens/map/PlannerScreen.tsx
src/api/auth.ts
.env.example
src/constants/colors.ts
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

### 💻 Código Añadido

**src/api/auth.ts** (+10 líneas)**

```
// Re-exports - cada función vive en su propio archivo en src/api/auth/
export {
  selfRegister,
  signUp,
  signIn,
  signOut,
  sendPhoneOTP,
  verifyPhoneOTP,
  formatColombianPhone,
} from './auth/index'
```

**src/constants/colors.ts** (+3 líneas)**

```
  // Secundario
  secondary: '#f5f5f5',

```

**src/screens/map/PlannerScreen.tsx** (+272 líneas)**

```
import { useCallback, useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { PlannerMap } from '@/components/map/PlannerMap'
import { LocationInput } from '@/components/planner/LocationInput'
import { LocationSearchScreen } from './LocationSearchScreen'
import { SwapLocationsButton } from '@/components/planner/SwapLocationsButton'
import { reverseGeocode } from '@/api/geocoding'
  const insets = useSafeAreaInsets()
  const {
    origin,
    destination,
    selectingMode,
    error,
    setOrigin,
    setDestination,
    setSelectingMode,
    setError,
    swapLocations,
    clearLocations,
  } = usePlannerStore()

  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null)
  const [loadingGeocoding, setLoadingGeocoding] = useState(false)

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

  const handleStartPlanning = useCallback(() => {
    if (origin && destination) {
      console.log('Iniciando planificación de ruta:', { origin, destination })
    }
  }, [origin, destination])

  // Si está en modo de selección, mostrar pantalla fullscreen de búsqueda
  if (selectingMode) {
    return (
      <LocationSearchScreen
        type={selectingMode}
        onSelect={(location) => handleLocationSelect(location, selectingMode)}
        onCancel={() => {
          setSelectingMode(null)
          setError(null)
        }}
        excludeLocation={selectingMode === 'origin' ? destination : origin}
        userLocation={userLocation}
        onUseMyLocation={handleUseMyLocation}
      />
    )
  }

      {/* Mapa */}
      <PlannerMap
        origin={origin}
        destination={destination}
        selectingMode={selectingMode}
        onLocationSelect={handleLocationSelect}
      />

      {/* Panel de controles inferior */}
      <View
        style={[
          styles.controlPanel,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}
      >
        <ScrollView
          style={styles.scrollContent}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Error global */}
          {error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️ {error}</Text>
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
              style={styles.planButton}
              onPress={handleStartPlanning}
              activeOpacity={0.8}
            >
              <Text style={styles.planButtonText}>Calcular Ruta 🚴</Text>
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
      </View>
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
    maxWidth: '80%'
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
  planButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    marginTop: 8,
  planButtonText: {
    color: '#FFF',
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
```

---

## 🕐 27/04/2026, 17:07:32

### 📊 Resumen
- **Total archivos:** 30
- **📝 Nuevos:** 25
- **✏️ Modificados:** 4
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +284
- **Líneas eliminadas:** -236
- **Balance neto:** +48 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `src/api/auth/formatColombianPhone.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/selfRegister.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/sendPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signIn.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signOut.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signUp.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/verifyPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/calculateDistance.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/isSameLocation.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/reverseGeocode.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/searchPlaces.ts` | nuevo | -0 | 0 |
| 🆕 | `src/components/map/PlannerMap.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationInput.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationSearch.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/SwapLocationsButton.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/config/backendUrl.ts` | nuevo | -0 | 0 |
| 🆕 | `src/config/mapbox.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/quickConnectionTest.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/testEndpoint.ts` | nuevo | -0 | 0 |
| 🆕 | `src/screens/map/LocationSearchScreen.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/store/plannerStore.ts` | nuevo | -0 | 0 |
| 🆕 | `src/types/planner.ts` | nuevo | -0 | 0 |
| ✏️ | `src/screens/map/PlannerScreen.tsx` | +271 | -6 | +265 |
| ✏️ | `src/api/auth.ts` | +10 | -221 | -211 |
| ✏️ | `.env.example` | +0 | -9 | -9 |
| ✏️ | `src/constants/colors.ts` | +3 | -0 | +3 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (30)</summary>

**🆕 Nuevos:**
```
src/api/auth/formatColombianPhone.ts
src/api/auth/index.ts
src/api/auth/selfRegister.ts
src/api/auth/sendPhoneOTP.ts
src/api/auth/signIn.ts
src/api/auth/signOut.ts
src/api/auth/signUp.ts
src/api/auth/verifyPhoneOTP.ts
src/api/geocoding.ts
src/api/geocoding/calculateDistance.ts
src/api/geocoding/index.ts
src/api/geocoding/isSameLocation.ts
src/api/geocoding/reverseGeocode.ts
src/api/geocoding/searchPlaces.ts
src/components/map/PlannerMap.tsx
src/components/planner/LocationInput.tsx
src/components/planner/LocationSearch.tsx
src/components/planner/SwapLocationsButton.tsx
src/config/backendUrl.ts
src/config/mapbox.ts
src/debug/quickConnectionTest.ts
src/debug/testEndpoint.ts
src/screens/map/LocationSearchScreen.tsx
src/store/plannerStore.ts
src/types/planner.ts
```

**✏️ Modificados:**
```
src/screens/map/PlannerScreen.tsx
src/api/auth.ts
.env.example
src/constants/colors.ts
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

### 💻 Código Añadido

**src/api/auth.ts** (+10 líneas)**

```
// Re-exports - cada función vive en su propio archivo en src/api/auth/
export {
  selfRegister,
  signUp,
  signIn,
  signOut,
  sendPhoneOTP,
  verifyPhoneOTP,
  formatColombianPhone,
} from './auth/index'
```

**src/constants/colors.ts** (+3 líneas)**

```
  // Secundario
  secondary: '#f5f5f5',

```

**src/screens/map/PlannerScreen.tsx** (+271 líneas)**

```
import { useCallback, useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { PlannerMap } from '@/components/map/PlannerMap'
import { LocationInput } from '@/components/planner/LocationInput'
import { LocationSearchScreen } from './LocationSearchScreen'
import { SwapLocationsButton } from '@/components/planner/SwapLocationsButton'
import { reverseGeocode } from '@/api/geocoding'
  const insets = useSafeAreaInsets()
  const {
    origin,
    destination,
    selectingMode,
    error,
    setOrigin,
    setDestination,
    setSelectingMode,
    setError,
    swapLocations,
    clearLocations,
  } = usePlannerStore()

  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null)
  const [loadingGeocoding, setLoadingGeocoding] = useState(false)

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

  const handleStartPlanning = useCallback(() => {
    if (origin && destination) {
      console.log('Iniciando planificación de ruta:', { origin, destination })
    }
  }, [origin, destination])

  // Si está en modo de selección, mostrar pantalla fullscreen de búsqueda
  if (selectingMode) {
    return (
      <LocationSearchScreen
        type={selectingMode}
        onSelect={(location) => handleLocationSelect(location, selectingMode)}
        onCancel={() => {
          setSelectingMode(null)
          setError(null)
        }}
        excludeLocation={selectingMode === 'origin' ? destination : origin}
        userLocation={userLocation}
        onUseMyLocation={handleUseMyLocation}
      />
    )
  }

      {/* Mapa */}
      <PlannerMap
        origin={origin}
        destination={destination}
        selectingMode={selectingMode}
        onLocationSelect={handleLocationSelect}
      />

      {/* Panel de controles inferior */}
      <View
        style={[
          styles.controlPanel,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}
      >
        <ScrollView
          style={styles.scrollContent}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Error global */}
          {error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️ {error}</Text>
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
              style={styles.planButton}
              onPress={handleStartPlanning}
              activeOpacity={0.8}
            >
              <Text style={styles.planButtonText}>Calcular Ruta 🚴</Text>
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
      </View>
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
  planButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    marginTop: 8,
  planButtonText: {
    color: '#FFF',
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
```

---

## 🕐 27/04/2026, 17:07:57

### 📊 Resumen
- **Total archivos:** 31
- **📝 Nuevos:** 25
- **✏️ Modificados:** 5
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +332
- **Líneas eliminadas:** -243
- **Balance neto:** +89 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `src/api/auth/formatColombianPhone.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/selfRegister.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/sendPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signIn.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signOut.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signUp.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/verifyPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/calculateDistance.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/isSameLocation.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/reverseGeocode.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/searchPlaces.ts` | nuevo | -0 | 0 |
| 🆕 | `src/components/map/PlannerMap.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationInput.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationSearch.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/SwapLocationsButton.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/config/backendUrl.ts` | nuevo | -0 | 0 |
| 🆕 | `src/config/mapbox.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/quickConnectionTest.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/testEndpoint.ts` | nuevo | -0 | 0 |
| 🆕 | `src/screens/map/LocationSearchScreen.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/store/plannerStore.ts` | nuevo | -0 | 0 |
| 🆕 | `src/types/planner.ts` | nuevo | -0 | 0 |
| ✏️ | `src/screens/map/PlannerScreen.tsx` | +271 | -6 | +265 |
| ✏️ | `src/api/auth.ts` | +10 | -221 | -211 |
| ✏️ | `src/debug/checkBackendConnection.ts` | +48 | -7 | +41 |
| ✏️ | `.env.example` | +0 | -9 | -9 |
| ✏️ | `src/constants/colors.ts` | +3 | -0 | +3 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (31)</summary>

**🆕 Nuevos:**
```
src/api/auth/formatColombianPhone.ts
src/api/auth/index.ts
src/api/auth/selfRegister.ts
src/api/auth/sendPhoneOTP.ts
src/api/auth/signIn.ts
src/api/auth/signOut.ts
src/api/auth/signUp.ts
src/api/auth/verifyPhoneOTP.ts
src/api/geocoding.ts
src/api/geocoding/calculateDistance.ts
src/api/geocoding/index.ts
src/api/geocoding/isSameLocation.ts
src/api/geocoding/reverseGeocode.ts
src/api/geocoding/searchPlaces.ts
src/components/map/PlannerMap.tsx
src/components/planner/LocationInput.tsx
src/components/planner/LocationSearch.tsx
src/components/planner/SwapLocationsButton.tsx
src/config/backendUrl.ts
src/config/mapbox.ts
src/debug/quickConnectionTest.ts
src/debug/testEndpoint.ts
src/screens/map/LocationSearchScreen.tsx
src/store/plannerStore.ts
src/types/planner.ts
```

**✏️ Modificados:**
```
src/screens/map/PlannerScreen.tsx
src/api/auth.ts
src/debug/checkBackendConnection.ts
.env.example
src/constants/colors.ts
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

### 💻 Código Añadido

**src/api/auth.ts** (+10 líneas)**

```
// Re-exports - cada función vive en su propio archivo en src/api/auth/
export {
  selfRegister,
  signUp,
  signIn,
  signOut,
  sendPhoneOTP,
  verifyPhoneOTP,
  formatColombianPhone,
} from './auth/index'
```

**src/constants/colors.ts** (+3 líneas)**

```
  // Secundario
  secondary: '#f5f5f5',

```

**src/debug/checkBackendConnection.ts** (+48 líneas)**

```
import { BACKEND_URL } from '@/config/backendUrl'
  try {
    console.log('\n🚀 Intentando /health ...')
    const healthStart = Date.now()

    const healthRes = await fetch(`${BACKEND_URL}/health`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    const healthTime = Date.now() - healthStart
    console.log(`✅ Health OK - Tiempo: ${healthTime}ms`)
    console.log(`📊 Status: ${healthRes.status}`)

    const healthData = await healthRes.json()
    console.log('📨 Response:', JSON.stringify(healthData, null, 2))
  } catch (error) {
    console.error('❌ Health check FALLÓ')
    console.error('Error:', error instanceof Error ? error.message : String(error))
  }

  try {
    console.log('\n🚀 Intentando /auth/self-register (test) ...')
    const registerStart = Date.now()

    const registerRes = await fetch(`${BACKEND_URL}/auth/self-register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@test.com',
        password: 'Test12345',
        full_name: 'Test User',
      }),
    })

    const registerTime = Date.now() - registerStart
    console.log(`⏱️ Tiempo: ${registerTime}ms`)
    console.log(`📊 Status: ${registerRes.status}`)

    const registerData = await registerRes.json()
    console.log('📨 Response:', JSON.stringify(registerData, null, 2))
  } catch (error) {
    console.error('❌ Endpoint /auth/self-register NO RESPONDE')
    console.error('Error:', error instanceof Error ? error.message : String(error))
  }
}


```

**src/screens/map/PlannerScreen.tsx** (+271 líneas)**

```
import { useCallback, useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { PlannerMap } from '@/components/map/PlannerMap'
import { LocationInput } from '@/components/planner/LocationInput'
import { LocationSearchScreen } from './LocationSearchScreen'
import { SwapLocationsButton } from '@/components/planner/SwapLocationsButton'
import { reverseGeocode } from '@/api/geocoding'
  const insets = useSafeAreaInsets()
  const {
    origin,
    destination,
    selectingMode,
    error,
    setOrigin,
    setDestination,
    setSelectingMode,
    setError,
    swapLocations,
    clearLocations,
  } = usePlannerStore()

  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null)
  const [loadingGeocoding, setLoadingGeocoding] = useState(false)

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

  const handleStartPlanning = useCallback(() => {
    if (origin && destination) {
      console.log('Iniciando planificación de ruta:', { origin, destination })
    }
  }, [origin, destination])

  // Si está en modo de selección, mostrar pantalla fullscreen de búsqueda
  if (selectingMode) {
    return (
      <LocationSearchScreen
        type={selectingMode}
        onSelect={(location) => handleLocationSelect(location, selectingMode)}
        onCancel={() => {
          setSelectingMode(null)
          setError(null)
        }}
        excludeLocation={selectingMode === 'origin' ? destination : origin}
        userLocation={userLocation}
        onUseMyLocation={handleUseMyLocation}
      />
    )
  }

      {/* Mapa */}
      <PlannerMap
        origin={origin}
        destination={destination}
        selectingMode={selectingMode}
        onLocationSelect={handleLocationSelect}
      />

      {/* Panel de controles inferior */}
      <View
        style={[
          styles.controlPanel,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}
      >
        <ScrollView
          style={styles.scrollContent}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Error global */}
          {error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️ {error}</Text>
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
              style={styles.planButton}
              onPress={handleStartPlanning}
              activeOpacity={0.8}
            >
              <Text style={styles.planButtonText}>Calcular Ruta 🚴</Text>
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
      </View>
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
  planButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    marginTop: 8,
  planButtonText: {
    color: '#FFF',
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
```

---

## 🕐 27/04/2026, 17:08:25

### 📊 Resumen
- **Total archivos:** 31
- **📝 Nuevos:** 25
- **✏️ Modificados:** 5
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +290
- **Líneas eliminadas:** -323
- **Balance neto:** -33 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `src/api/auth/formatColombianPhone.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/selfRegister.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/sendPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signIn.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signOut.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signUp.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/verifyPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/calculateDistance.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/isSameLocation.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/reverseGeocode.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/searchPlaces.ts` | nuevo | -0 | 0 |
| 🆕 | `src/components/map/PlannerMap.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationInput.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationSearch.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/SwapLocationsButton.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/config/backendUrl.ts` | nuevo | -0 | 0 |
| 🆕 | `src/config/mapbox.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/quickConnectionTest.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/testEndpoint.ts` | nuevo | -0 | 0 |
| 🆕 | `src/screens/map/LocationSearchScreen.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/store/plannerStore.ts` | nuevo | -0 | 0 |
| 🆕 | `src/types/planner.ts` | nuevo | -0 | 0 |
| ✏️ | `src/screens/map/PlannerScreen.tsx` | +271 | -6 | +265 |
| ✏️ | `src/api/auth.ts` | +9 | -221 | -212 |
| ✏️ | `src/debug/checkBackendConnection.ts` | +7 | -87 | -80 |
| ✏️ | `.env.example` | +0 | -9 | -9 |
| ✏️ | `src/constants/colors.ts` | +3 | -0 | +3 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (31)</summary>

**🆕 Nuevos:**
```
src/api/auth/formatColombianPhone.ts
src/api/auth/index.ts
src/api/auth/selfRegister.ts
src/api/auth/sendPhoneOTP.ts
src/api/auth/signIn.ts
src/api/auth/signOut.ts
src/api/auth/signUp.ts
src/api/auth/verifyPhoneOTP.ts
src/api/geocoding.ts
src/api/geocoding/calculateDistance.ts
src/api/geocoding/index.ts
src/api/geocoding/isSameLocation.ts
src/api/geocoding/reverseGeocode.ts
src/api/geocoding/searchPlaces.ts
src/components/map/PlannerMap.tsx
src/components/planner/LocationInput.tsx
src/components/planner/LocationSearch.tsx
src/components/planner/SwapLocationsButton.tsx
src/config/backendUrl.ts
src/config/mapbox.ts
src/debug/quickConnectionTest.ts
src/debug/testEndpoint.ts
src/screens/map/LocationSearchScreen.tsx
src/store/plannerStore.ts
src/types/planner.ts
```

**✏️ Modificados:**
```
src/screens/map/PlannerScreen.tsx
src/api/auth.ts
src/debug/checkBackendConnection.ts
.env.example
src/constants/colors.ts
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

### 💻 Código Añadido

**src/api/auth.ts** (+9 líneas)**

```
export {
  selfRegister,
  signUp,
  signIn,
  signOut,
  sendPhoneOTP,
  verifyPhoneOTP,
  formatColombianPhone,
} from './auth/index'
```

**src/constants/colors.ts** (+3 líneas)**

```
  // Secundario
  secondary: '#f5f5f5',

```

**src/debug/checkBackendConnection.ts** (+7 líneas)**

```
import { BACKEND_URL } from '@/config/backendUrl'






```

**src/screens/map/PlannerScreen.tsx** (+271 líneas)**

```
import { useCallback, useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { PlannerMap } from '@/components/map/PlannerMap'
import { LocationInput } from '@/components/planner/LocationInput'
import { LocationSearchScreen } from './LocationSearchScreen'
import { SwapLocationsButton } from '@/components/planner/SwapLocationsButton'
import { reverseGeocode } from '@/api/geocoding'
  const insets = useSafeAreaInsets()
  const {
    origin,
    destination,
    selectingMode,
    error,
    setOrigin,
    setDestination,
    setSelectingMode,
    setError,
    swapLocations,
    clearLocations,
  } = usePlannerStore()

  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null)
  const [loadingGeocoding, setLoadingGeocoding] = useState(false)

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

  const handleStartPlanning = useCallback(() => {
    if (origin && destination) {
      console.log('Iniciando planificación de ruta:', { origin, destination })
    }
  }, [origin, destination])

  // Si está en modo de selección, mostrar pantalla fullscreen de búsqueda
  if (selectingMode) {
    return (
      <LocationSearchScreen
        type={selectingMode}
        onSelect={(location) => handleLocationSelect(location, selectingMode)}
        onCancel={() => {
          setSelectingMode(null)
          setError(null)
        }}
        excludeLocation={selectingMode === 'origin' ? destination : origin}
        userLocation={userLocation}
        onUseMyLocation={handleUseMyLocation}
      />
    )
  }

      {/* Mapa */}
      <PlannerMap
        origin={origin}
        destination={destination}
        selectingMode={selectingMode}
        onLocationSelect={handleLocationSelect}
      />

      {/* Panel de controles inferior */}
      <View
        style={[
          styles.controlPanel,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}
      >
        <ScrollView
          style={styles.scrollContent}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Error global */}
          {error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️ {error}</Text>
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
              style={styles.planButton}
              onPress={handleStartPlanning}
              activeOpacity={0.8}
            >
              <Text style={styles.planButtonText}>Calcular Ruta 🚴</Text>
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
      </View>
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
  planButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    marginTop: 8,
  planButtonText: {
    color: '#FFF',
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
```

---

## 🕐 27/04/2026, 17:16:58

### 📊 Resumen
- **Total archivos:** 32
- **📝 Nuevos:** 26
- **✏️ Modificados:** 5
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +290
- **Líneas eliminadas:** -323
- **Balance neto:** -33 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `DICCIONARIO.md` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/formatColombianPhone.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/selfRegister.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/sendPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signIn.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signOut.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signUp.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/verifyPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/calculateDistance.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/isSameLocation.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/reverseGeocode.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/searchPlaces.ts` | nuevo | -0 | 0 |
| 🆕 | `src/components/map/PlannerMap.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationInput.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationSearch.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/SwapLocationsButton.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/config/backendUrl.ts` | nuevo | -0 | 0 |
| 🆕 | `src/config/mapbox.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/quickConnectionTest.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/testEndpoint.ts` | nuevo | -0 | 0 |
| 🆕 | `src/screens/map/LocationSearchScreen.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/store/plannerStore.ts` | nuevo | -0 | 0 |
| 🆕 | `src/types/planner.ts` | nuevo | -0 | 0 |
| ✏️ | `src/screens/map/PlannerScreen.tsx` | +271 | -6 | +265 |
| ✏️ | `src/api/auth.ts` | +9 | -221 | -212 |
| ✏️ | `src/debug/checkBackendConnection.ts` | +7 | -87 | -80 |
| ✏️ | `.env.example` | +0 | -9 | -9 |
| ✏️ | `src/constants/colors.ts` | +3 | -0 | +3 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (32)</summary>

**🆕 Nuevos:**
```
DICCIONARIO.md
src/api/auth/formatColombianPhone.ts
src/api/auth/index.ts
src/api/auth/selfRegister.ts
src/api/auth/sendPhoneOTP.ts
src/api/auth/signIn.ts
src/api/auth/signOut.ts
src/api/auth/signUp.ts
src/api/auth/verifyPhoneOTP.ts
src/api/geocoding.ts
src/api/geocoding/calculateDistance.ts
src/api/geocoding/index.ts
src/api/geocoding/isSameLocation.ts
src/api/geocoding/reverseGeocode.ts
src/api/geocoding/searchPlaces.ts
src/components/map/PlannerMap.tsx
src/components/planner/LocationInput.tsx
src/components/planner/LocationSearch.tsx
src/components/planner/SwapLocationsButton.tsx
src/config/backendUrl.ts
src/config/mapbox.ts
src/debug/quickConnectionTest.ts
src/debug/testEndpoint.ts
src/screens/map/LocationSearchScreen.tsx
src/store/plannerStore.ts
src/types/planner.ts
```

**✏️ Modificados:**
```
src/screens/map/PlannerScreen.tsx
src/api/auth.ts
src/debug/checkBackendConnection.ts
.env.example
src/constants/colors.ts
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

### 💻 Código Añadido

**src/api/auth.ts** (+9 líneas)**

```
export {
  selfRegister,
  signUp,
  signIn,
  signOut,
  sendPhoneOTP,
  verifyPhoneOTP,
  formatColombianPhone,
} from './auth/index'
```

**src/constants/colors.ts** (+3 líneas)**

```
  // Secundario
  secondary: '#f5f5f5',

```

**src/debug/checkBackendConnection.ts** (+7 líneas)**

```
import { BACKEND_URL } from '@/config/backendUrl'






```

**src/screens/map/PlannerScreen.tsx** (+271 líneas)**

```
import { useCallback, useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { PlannerMap } from '@/components/map/PlannerMap'
import { LocationInput } from '@/components/planner/LocationInput'
import { LocationSearchScreen } from './LocationSearchScreen'
import { SwapLocationsButton } from '@/components/planner/SwapLocationsButton'
import { reverseGeocode } from '@/api/geocoding'
  const insets = useSafeAreaInsets()
  const {
    origin,
    destination,
    selectingMode,
    error,
    setOrigin,
    setDestination,
    setSelectingMode,
    setError,
    swapLocations,
    clearLocations,
  } = usePlannerStore()

  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null)
  const [loadingGeocoding, setLoadingGeocoding] = useState(false)

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

  const handleStartPlanning = useCallback(() => {
    if (origin && destination) {
      console.log('Iniciando planificación de ruta:', { origin, destination })
    }
  }, [origin, destination])

  // Si está en modo de selección, mostrar pantalla fullscreen de búsqueda
  if (selectingMode) {
    return (
      <LocationSearchScreen
        type={selectingMode}
        onSelect={(location) => handleLocationSelect(location, selectingMode)}
        onCancel={() => {
          setSelectingMode(null)
          setError(null)
        }}
        excludeLocation={selectingMode === 'origin' ? destination : origin}
        userLocation={userLocation}
        onUseMyLocation={handleUseMyLocation}
      />
    )
  }

      {/* Mapa */}
      <PlannerMap
        origin={origin}
        destination={destination}
        selectingMode={selectingMode}
        onLocationSelect={handleLocationSelect}
      />

      {/* Panel de controles inferior */}
      <View
        style={[
          styles.controlPanel,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}
      >
        <ScrollView
          style={styles.scrollContent}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Error global */}
          {error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️ {error}</Text>
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
              style={styles.planButton}
              onPress={handleStartPlanning}
              activeOpacity={0.8}
            >
              <Text style={styles.planButtonText}>Calcular Ruta 🚴</Text>
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
      </View>
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
  planButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    marginTop: 8,
  planButtonText: {
    color: '#FFF',
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
```

---

## 🕐 27/04/2026, 17:31:11

### 📊 Resumen
- **Total archivos:** 31
- **📝 Nuevos:** 25
- **✏️ Modificados:** 5
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +290
- **Líneas eliminadas:** -323
- **Balance neto:** -33 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `DICCIONARIO.md` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/formatColombianPhone.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/selfRegister.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/sendPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signIn.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signOut.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signUp.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/verifyPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/calculateDistance.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/isSameLocation.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/reverseGeocode.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/searchPlaces.ts` | nuevo | -0 | 0 |
| 🆕 | `src/components/map/PlannerMap.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationSearch.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/SwapLocationsButton.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/config/backendUrl.ts` | nuevo | -0 | 0 |
| 🆕 | `src/config/mapbox.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/quickConnectionTest.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/testEndpoint.ts` | nuevo | -0 | 0 |
| 🆕 | `src/screens/map/LocationSearchScreen.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/store/plannerStore.ts` | nuevo | -0 | 0 |
| 🆕 | `src/types/planner.ts` | nuevo | -0 | 0 |
| ✏️ | `src/screens/map/PlannerScreen.tsx` | +271 | -6 | +265 |
| ✏️ | `src/api/auth.ts` | +9 | -221 | -212 |
| ✏️ | `src/debug/checkBackendConnection.ts` | +7 | -87 | -80 |
| ✏️ | `.env.example` | +0 | -9 | -9 |
| ✏️ | `src/constants/colors.ts` | +3 | -0 | +3 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (31)</summary>

**🆕 Nuevos:**
```
DICCIONARIO.md
src/api/auth/formatColombianPhone.ts
src/api/auth/index.ts
src/api/auth/selfRegister.ts
src/api/auth/sendPhoneOTP.ts
src/api/auth/signIn.ts
src/api/auth/signOut.ts
src/api/auth/signUp.ts
src/api/auth/verifyPhoneOTP.ts
src/api/geocoding.ts
src/api/geocoding/calculateDistance.ts
src/api/geocoding/index.ts
src/api/geocoding/isSameLocation.ts
src/api/geocoding/reverseGeocode.ts
src/api/geocoding/searchPlaces.ts
src/components/map/PlannerMap.tsx
src/components/planner/LocationSearch.tsx
src/components/planner/SwapLocationsButton.tsx
src/config/backendUrl.ts
src/config/mapbox.ts
src/debug/quickConnectionTest.ts
src/debug/testEndpoint.ts
src/screens/map/LocationSearchScreen.tsx
src/store/plannerStore.ts
src/types/planner.ts
```

**✏️ Modificados:**
```
src/screens/map/PlannerScreen.tsx
src/api/auth.ts
src/debug/checkBackendConnection.ts
.env.example
src/constants/colors.ts
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

### 💻 Código Añadido

**src/api/auth.ts** (+9 líneas)**

```
export {
  selfRegister,
  signUp,
  signIn,
  signOut,
  sendPhoneOTP,
  verifyPhoneOTP,
  formatColombianPhone,
} from './auth/index'
```

**src/constants/colors.ts** (+3 líneas)**

```
  // Secundario
  secondary: '#f5f5f5',

```

**src/debug/checkBackendConnection.ts** (+7 líneas)**

```
import { BACKEND_URL } from '@/config/backendUrl'






```

**src/screens/map/PlannerScreen.tsx** (+271 líneas)**

```
import { useCallback, useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { PlannerMap } from '@/components/map/PlannerMap'
import { LocationInput } from '@/components/planner/LocationInput'
import { LocationSearchScreen } from './LocationSearchScreen'
import { SwapLocationsButton } from '@/components/planner/SwapLocationsButton'
import { reverseGeocode } from '@/api/geocoding'
  const insets = useSafeAreaInsets()
  const {
    origin,
    destination,
    selectingMode,
    error,
    setOrigin,
    setDestination,
    setSelectingMode,
    setError,
    swapLocations,
    clearLocations,
  } = usePlannerStore()

  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null)
  const [loadingGeocoding, setLoadingGeocoding] = useState(false)

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

  const handleStartPlanning = useCallback(() => {
    if (origin && destination) {
      console.log('Iniciando planificación de ruta:', { origin, destination })
    }
  }, [origin, destination])

  // Si está en modo de selección, mostrar pantalla fullscreen de búsqueda
  if (selectingMode) {
    return (
      <LocationSearchScreen
        type={selectingMode}
        onSelect={(location) => handleLocationSelect(location, selectingMode)}
        onCancel={() => {
          setSelectingMode(null)
          setError(null)
        }}
        excludeLocation={selectingMode === 'origin' ? destination : origin}
        userLocation={userLocation}
        onUseMyLocation={handleUseMyLocation}
      />
    )
  }

      {/* Mapa */}
      <PlannerMap
        origin={origin}
        destination={destination}
        selectingMode={selectingMode}
        onLocationSelect={handleLocationSelect}
      />

      {/* Panel de controles inferior */}
      <View
        style={[
          styles.controlPanel,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}
      >
        <ScrollView
          style={styles.scrollContent}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Error global */}
          {error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️ {error}</Text>
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
              style={styles.planButton}
              onPress={handleStartPlanning}
              activeOpacity={0.8}
            >
              <Text style={styles.planButtonText}>Calcular Ruta 🚴</Text>
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
      </View>
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
  planButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    marginTop: 8,
  planButtonText: {
    color: '#FFF',
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
```

---

## 🕐 27/04/2026, 17:31:57

### 📊 Resumen
- **Total archivos:** 32
- **📝 Nuevos:** 26
- **✏️ Modificados:** 5
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +290
- **Líneas eliminadas:** -323
- **Balance neto:** -33 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `DICCIONARIO.md` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/formatColombianPhone.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/selfRegister.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/sendPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signIn.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signOut.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signUp.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/verifyPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/calculateDistance.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/isSameLocation.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/reverseGeocode.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/searchPlaces.ts` | nuevo | -0 | 0 |
| 🆕 | `src/components/map/PlannerMap.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationInput.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationSearch.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/SwapLocationsButton.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/config/backendUrl.ts` | nuevo | -0 | 0 |
| 🆕 | `src/config/mapbox.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/quickConnectionTest.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/testEndpoint.ts` | nuevo | -0 | 0 |
| 🆕 | `src/screens/map/LocationSearchScreen.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/store/plannerStore.ts` | nuevo | -0 | 0 |
| 🆕 | `src/types/planner.ts` | nuevo | -0 | 0 |
| ✏️ | `src/screens/map/PlannerScreen.tsx` | +271 | -6 | +265 |
| ✏️ | `src/api/auth.ts` | +9 | -221 | -212 |
| ✏️ | `src/debug/checkBackendConnection.ts` | +7 | -87 | -80 |
| ✏️ | `.env.example` | +0 | -9 | -9 |
| ✏️ | `src/constants/colors.ts` | +3 | -0 | +3 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (32)</summary>

**🆕 Nuevos:**
```
DICCIONARIO.md
src/api/auth/formatColombianPhone.ts
src/api/auth/index.ts
src/api/auth/selfRegister.ts
src/api/auth/sendPhoneOTP.ts
src/api/auth/signIn.ts
src/api/auth/signOut.ts
src/api/auth/signUp.ts
src/api/auth/verifyPhoneOTP.ts
src/api/geocoding.ts
src/api/geocoding/calculateDistance.ts
src/api/geocoding/index.ts
src/api/geocoding/isSameLocation.ts
src/api/geocoding/reverseGeocode.ts
src/api/geocoding/searchPlaces.ts
src/components/map/PlannerMap.tsx
src/components/planner/LocationInput.tsx
src/components/planner/LocationSearch.tsx
src/components/planner/SwapLocationsButton.tsx
src/config/backendUrl.ts
src/config/mapbox.ts
src/debug/quickConnectionTest.ts
src/debug/testEndpoint.ts
src/screens/map/LocationSearchScreen.tsx
src/store/plannerStore.ts
src/types/planner.ts
```

**✏️ Modificados:**
```
src/screens/map/PlannerScreen.tsx
src/api/auth.ts
src/debug/checkBackendConnection.ts
.env.example
src/constants/colors.ts
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

### 💻 Código Añadido

**src/api/auth.ts** (+9 líneas)**

```
export {
  selfRegister,
  signUp,
  signIn,
  signOut,
  sendPhoneOTP,
  verifyPhoneOTP,
  formatColombianPhone,
} from './auth/index'
```

**src/constants/colors.ts** (+3 líneas)**

```
  // Secundario
  secondary: '#f5f5f5',

```

**src/debug/checkBackendConnection.ts** (+7 líneas)**

```
import { BACKEND_URL } from '@/config/backendUrl'






```

**src/screens/map/PlannerScreen.tsx** (+271 líneas)**

```
import { useCallback, useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { PlannerMap } from '@/components/map/PlannerMap'
import { LocationInput } from '@/components/planner/LocationInput'
import { LocationSearchScreen } from './LocationSearchScreen'
import { SwapLocationsButton } from '@/components/planner/SwapLocationsButton'
import { reverseGeocode } from '@/api/geocoding'
  const insets = useSafeAreaInsets()
  const {
    origin,
    destination,
    selectingMode,
    error,
    setOrigin,
    setDestination,
    setSelectingMode,
    setError,
    swapLocations,
    clearLocations,
  } = usePlannerStore()

  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null)
  const [loadingGeocoding, setLoadingGeocoding] = useState(false)

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

  const handleStartPlanning = useCallback(() => {
    if (origin && destination) {
      console.log('Iniciando planificación de ruta:', { origin, destination })
    }
  }, [origin, destination])

  // Si está en modo de selección, mostrar pantalla fullscreen de búsqueda
  if (selectingMode) {
    return (
      <LocationSearchScreen
        type={selectingMode}
        onSelect={(location) => handleLocationSelect(location, selectingMode)}
        onCancel={() => {
          setSelectingMode(null)
          setError(null)
        }}
        excludeLocation={selectingMode === 'origin' ? destination : origin}
        userLocation={userLocation}
        onUseMyLocation={handleUseMyLocation}
      />
    )
  }

      {/* Mapa */}
      <PlannerMap
        origin={origin}
        destination={destination}
        selectingMode={selectingMode}
        onLocationSelect={handleLocationSelect}
      />

      {/* Panel de controles inferior */}
      <View
        style={[
          styles.controlPanel,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}
      >
        <ScrollView
          style={styles.scrollContent}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Error global */}
          {error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️ {error}</Text>
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
              style={styles.planButton}
              onPress={handleStartPlanning}
              activeOpacity={0.8}
            >
              <Text style={styles.planButtonText}>Calcular Ruta 🚴</Text>
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
      </View>
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
  planButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    marginTop: 8,
  planButtonText: {
    color: '#FFF',
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
```

---

## 🕐 27/04/2026, 18:13:51

### 📊 Resumen
- **Total archivos:** 33
- **📝 Nuevos:** 26
- **✏️ Modificados:** 6
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +342
- **Líneas eliminadas:** -338
- **Balance neto:** +4 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `DICCIONARIO.md` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/formatColombianPhone.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/selfRegister.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/sendPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signIn.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signOut.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signUp.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/verifyPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/calculateDistance.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/isSameLocation.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/reverseGeocode.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/searchPlaces.ts` | nuevo | -0 | 0 |
| 🆕 | `src/components/map/PlannerMap.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationInput.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationSearch.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/SwapLocationsButton.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/config/backendUrl.ts` | nuevo | -0 | 0 |
| 🆕 | `src/config/mapbox.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/quickConnectionTest.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/testEndpoint.ts` | nuevo | -0 | 0 |
| 🆕 | `src/screens/map/LocationSearchScreen.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/store/plannerStore.ts` | nuevo | -0 | 0 |
| 🆕 | `src/types/planner.ts` | nuevo | -0 | 0 |
| ✏️ | `src/screens/map/PlannerScreen.tsx` | +271 | -6 | +265 |
| ✏️ | `src/api/auth.ts` | +9 | -221 | -212 |
| ✏️ | `src/debug/checkBackendConnection.ts` | +7 | -87 | -80 |
| ✏️ | `src/screens/map/MapScreen.tsx` | +52 | -15 | +37 |
| ✏️ | `.env.example` | +0 | -9 | -9 |
| ✏️ | `src/constants/colors.ts` | +3 | -0 | +3 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (33)</summary>

**🆕 Nuevos:**
```
DICCIONARIO.md
src/api/auth/formatColombianPhone.ts
src/api/auth/index.ts
src/api/auth/selfRegister.ts
src/api/auth/sendPhoneOTP.ts
src/api/auth/signIn.ts
src/api/auth/signOut.ts
src/api/auth/signUp.ts
src/api/auth/verifyPhoneOTP.ts
src/api/geocoding.ts
src/api/geocoding/calculateDistance.ts
src/api/geocoding/index.ts
src/api/geocoding/isSameLocation.ts
src/api/geocoding/reverseGeocode.ts
src/api/geocoding/searchPlaces.ts
src/components/map/PlannerMap.tsx
src/components/planner/LocationInput.tsx
src/components/planner/LocationSearch.tsx
src/components/planner/SwapLocationsButton.tsx
src/config/backendUrl.ts
src/config/mapbox.ts
src/debug/quickConnectionTest.ts
src/debug/testEndpoint.ts
src/screens/map/LocationSearchScreen.tsx
src/store/plannerStore.ts
src/types/planner.ts
```

**✏️ Modificados:**
```
src/screens/map/PlannerScreen.tsx
src/api/auth.ts
src/debug/checkBackendConnection.ts
src/screens/map/MapScreen.tsx
.env.example
src/constants/colors.ts
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

### 💻 Código Añadido

**src/api/auth.ts** (+9 líneas)**

```
export {
  selfRegister,
  signUp,
  signIn,
  signOut,
  sendPhoneOTP,
  verifyPhoneOTP,
  formatColombianPhone,
} from './auth/index'
```

**src/constants/colors.ts** (+3 líneas)**

```
  // Secundario
  secondary: '#f5f5f5',

```

**src/debug/checkBackendConnection.ts** (+7 líneas)**

```
import { BACKEND_URL } from '@/config/backendUrl'






```

**src/screens/map/MapScreen.tsx** (+52 líneas)**

```
        
        // 1. Usar última ubicación conocida PRIMERO (instantáneo)
        const lastLocation = await Location.getLastKnownPositionAsync()
        if (lastLocation) {
          console.log('Última ubicación conocida:', lastLocation.coords)
          const userCoords = {
            latitude: lastLocation.coords.latitude,
            longitude: lastLocation.coords.longitude,
          }
          setUserLocation(userCoords)
          setCameraCoords({
            longitude: userCoords.longitude,
            latitude: userCoords.latitude,
            zoom: 16,
          })
        } else {
          // Fallback: centrar en Bogotá mientras espera
          setCameraCoords({
            longitude: -74.0721,
            latitude: 4.711,
            zoom: 13,
          })
        // 2. Obtener ubicación más precisa en background (sin bloquear UI)
        Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
          .then((location) => {
            console.log('Ubicación actualizada:', location.coords)
            const userCoords = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }
            setUserLocation(userCoords)
            // Actualizar con ubicación más precisa
            setCameraCoords({
              longitude: userCoords.longitude,
              latitude: userCoords.latitude,
              zoom: 16,
            })
          })
          .catch((error) => console.error('Error obteniendo ubicación precisa:', error))
        // Fallback: centrar en Bogotá
        setCameraCoords({
          longitude: -74.0721,
          latitude: 4.711,
          zoom: 13,
        })
      // Fallback: centrar en Bogotá
      setCameraCoords({
        longitude: -74.0721,
        latitude: 4.711,
        zoom: 13,
      })
```

**src/screens/map/PlannerScreen.tsx** (+271 líneas)**

```
import { useCallback, useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { PlannerMap } from '@/components/map/PlannerMap'
import { LocationInput } from '@/components/planner/LocationInput'
import { LocationSearchScreen } from './LocationSearchScreen'
import { SwapLocationsButton } from '@/components/planner/SwapLocationsButton'
import { reverseGeocode } from '@/api/geocoding'
  const insets = useSafeAreaInsets()
  const {
    origin,
    destination,
    selectingMode,
    error,
    setOrigin,
    setDestination,
    setSelectingMode,
    setError,
    swapLocations,
    clearLocations,
  } = usePlannerStore()

  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null)
  const [loadingGeocoding, setLoadingGeocoding] = useState(false)

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

  const handleStartPlanning = useCallback(() => {
    if (origin && destination) {
      console.log('Iniciando planificación de ruta:', { origin, destination })
    }
  }, [origin, destination])

  // Si está en modo de selección, mostrar pantalla fullscreen de búsqueda
  if (selectingMode) {
    return (
      <LocationSearchScreen
        type={selectingMode}
        onSelect={(location) => handleLocationSelect(location, selectingMode)}
        onCancel={() => {
          setSelectingMode(null)
          setError(null)
        }}
        excludeLocation={selectingMode === 'origin' ? destination : origin}
        userLocation={userLocation}
        onUseMyLocation={handleUseMyLocation}
      />
    )
  }

      {/* Mapa */}
      <PlannerMap
        origin={origin}
        destination={destination}
        selectingMode={selectingMode}
        onLocationSelect={handleLocationSelect}
      />

      {/* Panel de controles inferior */}
      <View
        style={[
          styles.controlPanel,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}
      >
        <ScrollView
          style={styles.scrollContent}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Error global */}
          {error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️ {error}</Text>
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
              style={styles.planButton}
              onPress={handleStartPlanning}
              activeOpacity={0.8}
            >
              <Text style={styles.planButtonText}>Calcular Ruta 🚴</Text>
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
      </View>
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
  planButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    marginTop: 8,
  planButtonText: {
    color: '#FFF',
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
```

---

## 🕐 27/04/2026, 18:23:34

### 📊 Resumen
- **Total archivos:** 33
- **📝 Nuevos:** 26
- **✏️ Modificados:** 6
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +343
- **Líneas eliminadas:** -338
- **Balance neto:** +5 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `DICCIONARIO.md` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/formatColombianPhone.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/selfRegister.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/sendPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signIn.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signOut.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signUp.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/verifyPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/calculateDistance.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/isSameLocation.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/reverseGeocode.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/searchPlaces.ts` | nuevo | -0 | 0 |
| 🆕 | `src/components/map/PlannerMap.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationInput.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationSearch.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/SwapLocationsButton.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/config/backendUrl.ts` | nuevo | -0 | 0 |
| 🆕 | `src/config/mapbox.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/quickConnectionTest.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/testEndpoint.ts` | nuevo | -0 | 0 |
| 🆕 | `src/screens/map/LocationSearchScreen.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/store/plannerStore.ts` | nuevo | -0 | 0 |
| 🆕 | `src/types/planner.ts` | nuevo | -0 | 0 |
| ✏️ | `src/screens/map/PlannerScreen.tsx` | +272 | -6 | +266 |
| ✏️ | `src/api/auth.ts` | +9 | -221 | -212 |
| ✏️ | `src/debug/checkBackendConnection.ts` | +7 | -87 | -80 |
| ✏️ | `src/screens/map/MapScreen.tsx` | +52 | -15 | +37 |
| ✏️ | `.env.example` | +0 | -9 | -9 |
| ✏️ | `src/constants/colors.ts` | +3 | -0 | +3 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (33)</summary>

**🆕 Nuevos:**
```
DICCIONARIO.md
src/api/auth/formatColombianPhone.ts
src/api/auth/index.ts
src/api/auth/selfRegister.ts
src/api/auth/sendPhoneOTP.ts
src/api/auth/signIn.ts
src/api/auth/signOut.ts
src/api/auth/signUp.ts
src/api/auth/verifyPhoneOTP.ts
src/api/geocoding.ts
src/api/geocoding/calculateDistance.ts
src/api/geocoding/index.ts
src/api/geocoding/isSameLocation.ts
src/api/geocoding/reverseGeocode.ts
src/api/geocoding/searchPlaces.ts
src/components/map/PlannerMap.tsx
src/components/planner/LocationInput.tsx
src/components/planner/LocationSearch.tsx
src/components/planner/SwapLocationsButton.tsx
src/config/backendUrl.ts
src/config/mapbox.ts
src/debug/quickConnectionTest.ts
src/debug/testEndpoint.ts
src/screens/map/LocationSearchScreen.tsx
src/store/plannerStore.ts
src/types/planner.ts
```

**✏️ Modificados:**
```
src/screens/map/PlannerScreen.tsx
src/api/auth.ts
src/debug/checkBackendConnection.ts
src/screens/map/MapScreen.tsx
.env.example
src/constants/colors.ts
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

### 💻 Código Añadido

**src/api/auth.ts** (+9 líneas)**

```
export {
  selfRegister,
  signUp,
  signIn,
  signOut,
  sendPhoneOTP,
  verifyPhoneOTP,
  formatColombianPhone,
} from './auth/index'
```

**src/constants/colors.ts** (+3 líneas)**

```
  // Secundario
  secondary: '#f5f5f5',

```

**src/debug/checkBackendConnection.ts** (+7 líneas)**

```
import { BACKEND_URL } from '@/config/backendUrl'






```

**src/screens/map/MapScreen.tsx** (+52 líneas)**

```
        
        // 1. Usar última ubicación conocida PRIMERO (instantáneo)
        const lastLocation = await Location.getLastKnownPositionAsync()
        if (lastLocation) {
          console.log('Última ubicación conocida:', lastLocation.coords)
          const userCoords = {
            latitude: lastLocation.coords.latitude,
            longitude: lastLocation.coords.longitude,
          }
          setUserLocation(userCoords)
          setCameraCoords({
            longitude: userCoords.longitude,
            latitude: userCoords.latitude,
            zoom: 16,
          })
        } else {
          // Fallback: centrar en Bogotá mientras espera
          setCameraCoords({
            longitude: -74.0721,
            latitude: 4.711,
            zoom: 13,
          })
        // 2. Obtener ubicación más precisa en background (sin bloquear UI)
        Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
          .then((location) => {
            console.log('Ubicación actualizada:', location.coords)
            const userCoords = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }
            setUserLocation(userCoords)
            // Actualizar con ubicación más precisa
            setCameraCoords({
              longitude: userCoords.longitude,
              latitude: userCoords.latitude,
              zoom: 16,
            })
          })
          .catch((error) => console.error('Error obteniendo ubicación precisa:', error))
        // Fallback: centrar en Bogotá
        setCameraCoords({
          longitude: -74.0721,
          latitude: 4.711,
          zoom: 13,
        })
      // Fallback: centrar en Bogotá
      setCameraCoords({
        longitude: -74.0721,
        latitude: 4.711,
        zoom: 13,
      })
```

**src/screens/map/PlannerScreen.tsx** (+272 líneas)**

```
import { useCallback, useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { PlannerMap } from '@/components/map/PlannerMap'
import { LocationInput } from '@/components/planner/LocationInput'
import { LocationSearchScreen } from './LocationSearchScreen'
import { SwapLocationsButton } from '@/components/planner/SwapLocationsButton'
import { reverseGeocode } from '@/api/geocoding'
  const insets = useSafeAreaInsets()
  const {
    origin,
    destination,
    selectingMode,
    error,
    setOrigin,
    setDestination,
    setSelectingMode,
    setError,
    swapLocations,
    clearLocations,
  } = usePlannerStore()

  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null)
  const [loadingGeocoding, setLoadingGeocoding] = useState(false)
  const [isPanelExpanded, setIsPanelExpanded] = useState(true)

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

  const handleStartPlanning = useCallback(() => {
    if (origin && destination) {
      console.log('Iniciando planificación de ruta:', { origin, destination })
    }
  }, [origin, destination])

  // Si está en modo de selección, mostrar pantalla fullscreen de búsqueda
  if (selectingMode) {
    return (
      <LocationSearchScreen
        type={selectingMode}
        onSelect={(location) => handleLocationSelect(location, selectingMode)}
        onCancel={() => {
          setSelectingMode(null)
          setError(null)
        }}
        excludeLocation={selectingMode === 'origin' ? destination : origin}
        userLocation={userLocation}
        onUseMyLocation={handleUseMyLocation}
      />
    )
  }

      {/* Mapa */}
      <PlannerMap
        origin={origin}
        destination={destination}
        selectingMode={selectingMode}
        onLocationSelect={handleLocationSelect}
      />

      {/* Panel de controles inferior */}
      <View
        style={[
          styles.controlPanel,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}
      >
        <ScrollView
          style={styles.scrollContent}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Error global */}
          {error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️ {error}</Text>
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
              style={styles.planButton}
              onPress={handleStartPlanning}
              activeOpacity={0.8}
            >
              <Text style={styles.planButtonText}>Calcular Ruta 🚴</Text>
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
      </View>
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
  planButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    marginTop: 8,
  planButtonText: {
    color: '#FFF',
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
```

---

## 🕐 27/04/2026, 18:23:46

### 📊 Resumen
- **Total archivos:** 33
- **📝 Nuevos:** 26
- **✏️ Modificados:** 6
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +385
- **Líneas eliminadas:** -338
- **Balance neto:** +47 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `DICCIONARIO.md` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/formatColombianPhone.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/selfRegister.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/sendPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signIn.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signOut.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signUp.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/verifyPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/calculateDistance.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/isSameLocation.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/reverseGeocode.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/searchPlaces.ts` | nuevo | -0 | 0 |
| 🆕 | `src/components/map/PlannerMap.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationInput.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationSearch.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/SwapLocationsButton.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/config/backendUrl.ts` | nuevo | -0 | 0 |
| 🆕 | `src/config/mapbox.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/quickConnectionTest.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/testEndpoint.ts` | nuevo | -0 | 0 |
| 🆕 | `src/screens/map/LocationSearchScreen.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/store/plannerStore.ts` | nuevo | -0 | 0 |
| 🆕 | `src/types/planner.ts` | nuevo | -0 | 0 |
| ✏️ | `src/screens/map/PlannerScreen.tsx` | +314 | -6 | +308 |
| ✏️ | `src/api/auth.ts` | +9 | -221 | -212 |
| ✏️ | `src/debug/checkBackendConnection.ts` | +7 | -87 | -80 |
| ✏️ | `src/screens/map/MapScreen.tsx` | +52 | -15 | +37 |
| ✏️ | `.env.example` | +0 | -9 | -9 |
| ✏️ | `src/constants/colors.ts` | +3 | -0 | +3 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (33)</summary>

**🆕 Nuevos:**
```
DICCIONARIO.md
src/api/auth/formatColombianPhone.ts
src/api/auth/index.ts
src/api/auth/selfRegister.ts
src/api/auth/sendPhoneOTP.ts
src/api/auth/signIn.ts
src/api/auth/signOut.ts
src/api/auth/signUp.ts
src/api/auth/verifyPhoneOTP.ts
src/api/geocoding.ts
src/api/geocoding/calculateDistance.ts
src/api/geocoding/index.ts
src/api/geocoding/isSameLocation.ts
src/api/geocoding/reverseGeocode.ts
src/api/geocoding/searchPlaces.ts
src/components/map/PlannerMap.tsx
src/components/planner/LocationInput.tsx
src/components/planner/LocationSearch.tsx
src/components/planner/SwapLocationsButton.tsx
src/config/backendUrl.ts
src/config/mapbox.ts
src/debug/quickConnectionTest.ts
src/debug/testEndpoint.ts
src/screens/map/LocationSearchScreen.tsx
src/store/plannerStore.ts
src/types/planner.ts
```

**✏️ Modificados:**
```
src/screens/map/PlannerScreen.tsx
src/api/auth.ts
src/debug/checkBackendConnection.ts
src/screens/map/MapScreen.tsx
.env.example
src/constants/colors.ts
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

### 💻 Código Añadido

**src/api/auth.ts** (+9 líneas)**

```
export {
  selfRegister,
  signUp,
  signIn,
  signOut,
  sendPhoneOTP,
  verifyPhoneOTP,
  formatColombianPhone,
} from './auth/index'
```

**src/constants/colors.ts** (+3 líneas)**

```
  // Secundario
  secondary: '#f5f5f5',

```

**src/debug/checkBackendConnection.ts** (+7 líneas)**

```
import { BACKEND_URL } from '@/config/backendUrl'






```

**src/screens/map/MapScreen.tsx** (+52 líneas)**

```
        
        // 1. Usar última ubicación conocida PRIMERO (instantáneo)
        const lastLocation = await Location.getLastKnownPositionAsync()
        if (lastLocation) {
          console.log('Última ubicación conocida:', lastLocation.coords)
          const userCoords = {
            latitude: lastLocation.coords.latitude,
            longitude: lastLocation.coords.longitude,
          }
          setUserLocation(userCoords)
          setCameraCoords({
            longitude: userCoords.longitude,
            latitude: userCoords.latitude,
            zoom: 16,
          })
        } else {
          // Fallback: centrar en Bogotá mientras espera
          setCameraCoords({
            longitude: -74.0721,
            latitude: 4.711,
            zoom: 13,
          })
        // 2. Obtener ubicación más precisa en background (sin bloquear UI)
        Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
          .then((location) => {
            console.log('Ubicación actualizada:', location.coords)
            const userCoords = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }
            setUserLocation(userCoords)
            // Actualizar con ubicación más precisa
            setCameraCoords({
              longitude: userCoords.longitude,
              latitude: userCoords.latitude,
              zoom: 16,
            })
          })
          .catch((error) => console.error('Error obteniendo ubicación precisa:', error))
        // Fallback: centrar en Bogotá
        setCameraCoords({
          longitude: -74.0721,
          latitude: 4.711,
          zoom: 13,
        })
      // Fallback: centrar en Bogotá
      setCameraCoords({
        longitude: -74.0721,
        latitude: 4.711,
        zoom: 13,
      })
```

**src/screens/map/PlannerScreen.tsx** (+314 líneas)**

```
import { useCallback, useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { PlannerMap } from '@/components/map/PlannerMap'
import { LocationInput } from '@/components/planner/LocationInput'
import { LocationSearchScreen } from './LocationSearchScreen'
import { SwapLocationsButton } from '@/components/planner/SwapLocationsButton'
import { reverseGeocode } from '@/api/geocoding'
  const insets = useSafeAreaInsets()
  const {
    origin,
    destination,
    selectingMode,
    error,
    setOrigin,
    setDestination,
    setSelectingMode,
    setError,
    swapLocations,
    clearLocations,
  } = usePlannerStore()

  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null)
  const [loadingGeocoding, setLoadingGeocoding] = useState(false)
  const [isPanelExpanded, setIsPanelExpanded] = useState(true)

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

  const handleStartPlanning = useCallback(() => {
    if (origin && destination) {
      console.log('Iniciando planificación de ruta:', { origin, destination })
    }
  }, [origin, destination])

  // Si está en modo de selección, mostrar pantalla fullscreen de búsqueda
  if (selectingMode) {
    return (
      <LocationSearchScreen
        type={selectingMode}
        onSelect={(location) => handleLocationSelect(location, selectingMode)}
        onCancel={() => {
          setSelectingMode(null)
          setError(null)
        }}
        excludeLocation={selectingMode === 'origin' ? destination : origin}
        userLocation={userLocation}
        onUseMyLocation={handleUseMyLocation}
      />
    )
  }

      {/* Mapa */}
      <PlannerMap
        origin={origin}
        destination={destination}
        selectingMode={selectingMode}
        onLocationSelect={handleLocationSelect}
      />

      {/* Panel de controles inferior */}
      <View
        style={[
          styles.controlPanel,
          !isPanelExpanded && origin && destination && styles.controlPanelCompact,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}
      >
        {/* Botón para minimizar/expandir - visible cuando ambos puntos están seleccionados */}
        {origin && destination && (
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setIsPanelExpanded(!isPanelExpanded)}
          >
            <Text style={styles.toggleIcon}>{isPanelExpanded ? '▼' : '▲'}</Text>
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
            {error && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>⚠️ {error}</Text>
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
                style={styles.planButton}
                onPress={handleStartPlanning}
                activeOpacity={0.8}
              >
                <Text style={styles.planButtonText}>Calcular Ruta 🚴</Text>
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
                style={styles.compactPlanButton}
                onPress={handleStartPlanning}
                activeOpacity={0.8}
              >
                <Text style={styles.compactPlanButtonText}>Calcular Ruta 🚴</Text>
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
      </View>
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
  planButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    marginTop: 8,
  planButtonText: {
    color: '#FFF',
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
```

---

## 🕐 27/04/2026, 18:24:03

### 📊 Resumen
- **Total archivos:** 33
- **📝 Nuevos:** 26
- **✏️ Modificados:** 6
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +441
- **Líneas eliminadas:** -337
- **Balance neto:** +104 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `DICCIONARIO.md` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/formatColombianPhone.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/selfRegister.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/sendPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signIn.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signOut.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signUp.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/verifyPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/calculateDistance.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/isSameLocation.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/reverseGeocode.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/searchPlaces.ts` | nuevo | -0 | 0 |
| 🆕 | `src/components/map/PlannerMap.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationInput.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationSearch.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/SwapLocationsButton.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/config/backendUrl.ts` | nuevo | -0 | 0 |
| 🆕 | `src/config/mapbox.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/quickConnectionTest.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/testEndpoint.ts` | nuevo | -0 | 0 |
| 🆕 | `src/screens/map/LocationSearchScreen.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/store/plannerStore.ts` | nuevo | -0 | 0 |
| 🆕 | `src/types/planner.ts` | nuevo | -0 | 0 |
| ✏️ | `src/screens/map/PlannerScreen.tsx` | +370 | -5 | +365 |
| ✏️ | `src/api/auth.ts` | +9 | -221 | -212 |
| ✏️ | `src/debug/checkBackendConnection.ts` | +7 | -87 | -80 |
| ✏️ | `src/screens/map/MapScreen.tsx` | +52 | -15 | +37 |
| ✏️ | `.env.example` | +0 | -9 | -9 |
| ✏️ | `src/constants/colors.ts` | +3 | -0 | +3 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (33)</summary>

**🆕 Nuevos:**
```
DICCIONARIO.md
src/api/auth/formatColombianPhone.ts
src/api/auth/index.ts
src/api/auth/selfRegister.ts
src/api/auth/sendPhoneOTP.ts
src/api/auth/signIn.ts
src/api/auth/signOut.ts
src/api/auth/signUp.ts
src/api/auth/verifyPhoneOTP.ts
src/api/geocoding.ts
src/api/geocoding/calculateDistance.ts
src/api/geocoding/index.ts
src/api/geocoding/isSameLocation.ts
src/api/geocoding/reverseGeocode.ts
src/api/geocoding/searchPlaces.ts
src/components/map/PlannerMap.tsx
src/components/planner/LocationInput.tsx
src/components/planner/LocationSearch.tsx
src/components/planner/SwapLocationsButton.tsx
src/config/backendUrl.ts
src/config/mapbox.ts
src/debug/quickConnectionTest.ts
src/debug/testEndpoint.ts
src/screens/map/LocationSearchScreen.tsx
src/store/plannerStore.ts
src/types/planner.ts
```

**✏️ Modificados:**
```
src/screens/map/PlannerScreen.tsx
src/api/auth.ts
src/debug/checkBackendConnection.ts
src/screens/map/MapScreen.tsx
.env.example
src/constants/colors.ts
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

### 💻 Código Añadido

**src/api/auth.ts** (+9 líneas)**

```
export {
  selfRegister,
  signUp,
  signIn,
  signOut,
  sendPhoneOTP,
  verifyPhoneOTP,
  formatColombianPhone,
} from './auth/index'
```

**src/constants/colors.ts** (+3 líneas)**

```
  // Secundario
  secondary: '#f5f5f5',

```

**src/debug/checkBackendConnection.ts** (+7 líneas)**

```
import { BACKEND_URL } from '@/config/backendUrl'






```

**src/screens/map/MapScreen.tsx** (+52 líneas)**

```
        
        // 1. Usar última ubicación conocida PRIMERO (instantáneo)
        const lastLocation = await Location.getLastKnownPositionAsync()
        if (lastLocation) {
          console.log('Última ubicación conocida:', lastLocation.coords)
          const userCoords = {
            latitude: lastLocation.coords.latitude,
            longitude: lastLocation.coords.longitude,
          }
          setUserLocation(userCoords)
          setCameraCoords({
            longitude: userCoords.longitude,
            latitude: userCoords.latitude,
            zoom: 16,
          })
        } else {
          // Fallback: centrar en Bogotá mientras espera
          setCameraCoords({
            longitude: -74.0721,
            latitude: 4.711,
            zoom: 13,
          })
        // 2. Obtener ubicación más precisa en background (sin bloquear UI)
        Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
          .then((location) => {
            console.log('Ubicación actualizada:', location.coords)
            const userCoords = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }
            setUserLocation(userCoords)
            // Actualizar con ubicación más precisa
            setCameraCoords({
              longitude: userCoords.longitude,
              latitude: userCoords.latitude,
              zoom: 16,
            })
          })
          .catch((error) => console.error('Error obteniendo ubicación precisa:', error))
        // Fallback: centrar en Bogotá
        setCameraCoords({
          longitude: -74.0721,
          latitude: 4.711,
          zoom: 13,
        })
      // Fallback: centrar en Bogotá
      setCameraCoords({
        longitude: -74.0721,
        latitude: 4.711,
        zoom: 13,
      })
```

**src/screens/map/PlannerScreen.tsx** (+370 líneas)**

```
import { useCallback, useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { PlannerMap } from '@/components/map/PlannerMap'
import { LocationInput } from '@/components/planner/LocationInput'
import { LocationSearchScreen } from './LocationSearchScreen'
import { SwapLocationsButton } from '@/components/planner/SwapLocationsButton'
import { reverseGeocode } from '@/api/geocoding'
  const insets = useSafeAreaInsets()
  const {
    origin,
    destination,
    selectingMode,
    error,
    setOrigin,
    setDestination,
    setSelectingMode,
    setError,
    swapLocations,
    clearLocations,
  } = usePlannerStore()

  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null)
  const [loadingGeocoding, setLoadingGeocoding] = useState(false)
  const [isPanelExpanded, setIsPanelExpanded] = useState(true)

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

  const handleStartPlanning = useCallback(() => {
    if (origin && destination) {
      console.log('Iniciando planificación de ruta:', { origin, destination })
    }
  }, [origin, destination])

  // Si está en modo de selección, mostrar pantalla fullscreen de búsqueda
  if (selectingMode) {
    return (
      <LocationSearchScreen
        type={selectingMode}
        onSelect={(location) => handleLocationSelect(location, selectingMode)}
        onCancel={() => {
          setSelectingMode(null)
          setError(null)
        }}
        excludeLocation={selectingMode === 'origin' ? destination : origin}
        userLocation={userLocation}
        onUseMyLocation={handleUseMyLocation}
      />
    )
  }

      {/* Mapa */}
      <PlannerMap
        origin={origin}
        destination={destination}
        selectingMode={selectingMode}
        onLocationSelect={handleLocationSelect}
      />

      {/* Panel de controles inferior */}
      <View
        style={[
          styles.controlPanel,
          !isPanelExpanded && origin && destination && styles.controlPanelCompact,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}
      >
        {/* Botón para minimizar/expandir - visible cuando ambos puntos están seleccionados */}
        {origin && destination && (
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setIsPanelExpanded(!isPanelExpanded)}
          >
            <Text style={styles.toggleIcon}>{isPanelExpanded ? '▼' : '▲'}</Text>
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
            {error && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>⚠️ {error}</Text>
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
                style={styles.planButton}
                onPress={handleStartPlanning}
                activeOpacity={0.8}
              >
                <Text style={styles.planButtonText}>Calcular Ruta 🚴</Text>
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
                style={styles.compactPlanButton}
                onPress={handleStartPlanning}
                activeOpacity={0.8}
              >
                <Text style={styles.compactPlanButtonText}>Calcular Ruta 🚴</Text>
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
      </View>
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
  planButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    marginTop: 8,
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
    maxHeight: 70,
    paddingTop: 8,
  },
  toggleButton: {
    alignSelf: 'center',
    padding: 4,
    marginBottom: 4,
  },
  toggleIcon: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '700',
  },
  compactView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  compactLocationInfo: {
    flex: 1,
  },
  compactLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  compactActions: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  compactPlanButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  compactPlanButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  compactEditButton: {
    backgroundColor: `${COLORS.primary}20`,
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compactEditButtonText: {
    color: COLORS.primary,
    fontWeight: '700',
```

---

## 🕐 27/04/2026, 18:29:02

### 📊 Resumen
- **Total archivos:** 33
- **📝 Nuevos:** 26
- **✏️ Modificados:** 6
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +442
- **Líneas eliminadas:** -337
- **Balance neto:** +105 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `DICCIONARIO.md` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/formatColombianPhone.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/selfRegister.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/sendPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signIn.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signOut.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signUp.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/verifyPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/calculateDistance.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/isSameLocation.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/reverseGeocode.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/searchPlaces.ts` | nuevo | -0 | 0 |
| 🆕 | `src/components/map/PlannerMap.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationInput.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationSearch.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/SwapLocationsButton.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/config/backendUrl.ts` | nuevo | -0 | 0 |
| 🆕 | `src/config/mapbox.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/quickConnectionTest.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/testEndpoint.ts` | nuevo | -0 | 0 |
| 🆕 | `src/screens/map/LocationSearchScreen.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/store/plannerStore.ts` | nuevo | -0 | 0 |
| 🆕 | `src/types/planner.ts` | nuevo | -0 | 0 |
| ✏️ | `src/screens/map/PlannerScreen.tsx` | +371 | -5 | +366 |
| ✏️ | `src/api/auth.ts` | +9 | -221 | -212 |
| ✏️ | `src/debug/checkBackendConnection.ts` | +7 | -87 | -80 |
| ✏️ | `src/screens/map/MapScreen.tsx` | +52 | -15 | +37 |
| ✏️ | `.env.example` | +0 | -9 | -9 |
| ✏️ | `src/constants/colors.ts` | +3 | -0 | +3 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (33)</summary>

**🆕 Nuevos:**
```
DICCIONARIO.md
src/api/auth/formatColombianPhone.ts
src/api/auth/index.ts
src/api/auth/selfRegister.ts
src/api/auth/sendPhoneOTP.ts
src/api/auth/signIn.ts
src/api/auth/signOut.ts
src/api/auth/signUp.ts
src/api/auth/verifyPhoneOTP.ts
src/api/geocoding.ts
src/api/geocoding/calculateDistance.ts
src/api/geocoding/index.ts
src/api/geocoding/isSameLocation.ts
src/api/geocoding/reverseGeocode.ts
src/api/geocoding/searchPlaces.ts
src/components/map/PlannerMap.tsx
src/components/planner/LocationInput.tsx
src/components/planner/LocationSearch.tsx
src/components/planner/SwapLocationsButton.tsx
src/config/backendUrl.ts
src/config/mapbox.ts
src/debug/quickConnectionTest.ts
src/debug/testEndpoint.ts
src/screens/map/LocationSearchScreen.tsx
src/store/plannerStore.ts
src/types/planner.ts
```

**✏️ Modificados:**
```
src/screens/map/PlannerScreen.tsx
src/api/auth.ts
src/debug/checkBackendConnection.ts
src/screens/map/MapScreen.tsx
.env.example
src/constants/colors.ts
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

### 💻 Código Añadido

**src/api/auth.ts** (+9 líneas)**

```
export {
  selfRegister,
  signUp,
  signIn,
  signOut,
  sendPhoneOTP,
  verifyPhoneOTP,
  formatColombianPhone,
} from './auth/index'
```

**src/constants/colors.ts** (+3 líneas)**

```
  // Secundario
  secondary: '#f5f5f5',

```

**src/debug/checkBackendConnection.ts** (+7 líneas)**

```
import { BACKEND_URL } from '@/config/backendUrl'






```

**src/screens/map/MapScreen.tsx** (+52 líneas)**

```
        
        // 1. Usar última ubicación conocida PRIMERO (instantáneo)
        const lastLocation = await Location.getLastKnownPositionAsync()
        if (lastLocation) {
          console.log('Última ubicación conocida:', lastLocation.coords)
          const userCoords = {
            latitude: lastLocation.coords.latitude,
            longitude: lastLocation.coords.longitude,
          }
          setUserLocation(userCoords)
          setCameraCoords({
            longitude: userCoords.longitude,
            latitude: userCoords.latitude,
            zoom: 16,
          })
        } else {
          // Fallback: centrar en Bogotá mientras espera
          setCameraCoords({
            longitude: -74.0721,
            latitude: 4.711,
            zoom: 13,
          })
        // 2. Obtener ubicación más precisa en background (sin bloquear UI)
        Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
          .then((location) => {
            console.log('Ubicación actualizada:', location.coords)
            const userCoords = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }
            setUserLocation(userCoords)
            // Actualizar con ubicación más precisa
            setCameraCoords({
              longitude: userCoords.longitude,
              latitude: userCoords.latitude,
              zoom: 16,
            })
          })
          .catch((error) => console.error('Error obteniendo ubicación precisa:', error))
        // Fallback: centrar en Bogotá
        setCameraCoords({
          longitude: -74.0721,
          latitude: 4.711,
          zoom: 13,
        })
      // Fallback: centrar en Bogotá
      setCameraCoords({
        longitude: -74.0721,
        latitude: 4.711,
        zoom: 13,
      })
```

**src/screens/map/PlannerScreen.tsx** (+371 líneas)**

```
import { useCallback, useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { PlannerMap } from '@/components/map/PlannerMap'
import { LocationInput } from '@/components/planner/LocationInput'
import { LocationSearchScreen } from './LocationSearchScreen'
import { SwapLocationsButton } from '@/components/planner/SwapLocationsButton'
import { reverseGeocode } from '@/api/geocoding'
  const insets = useSafeAreaInsets()
  const {
    origin,
    destination,
    selectingMode,
    error,
    setOrigin,
    setDestination,
    setSelectingMode,
    setError,
    swapLocations,
    clearLocations,
  } = usePlannerStore()

  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null)
  const [loadingGeocoding, setLoadingGeocoding] = useState(false)
  const [isPanelExpanded, setIsPanelExpanded] = useState(true)

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

  const handleStartPlanning = useCallback(() => {
    if (origin && destination) {
      console.log('Iniciando planificación de ruta:', { origin, destination })
    }
  }, [origin, destination])

  // Si está en modo de selección, mostrar pantalla fullscreen de búsqueda
  if (selectingMode) {
    return (
      <LocationSearchScreen
        type={selectingMode}
        onSelect={(location) => handleLocationSelect(location, selectingMode)}
        onCancel={() => {
          setSelectingMode(null)
          setError(null)
        }}
        excludeLocation={selectingMode === 'origin' ? destination : origin}
        userLocation={userLocation}
        onUseMyLocation={handleUseMyLocation}
      />
    )
  }

      {/* Mapa */}
      <PlannerMap
        origin={origin}
        destination={destination}
        selectingMode={selectingMode}
        onLocationSelect={handleLocationSelect}
      />

      {/* Panel de controles inferior */}
      <View
        style={[
          styles.controlPanel,
          !isPanelExpanded && origin && destination && styles.controlPanelCompact,
          { paddingBottom: !isPanelExpanded && origin && destination ? Math.max(insets.bottom + 16, 70) : Math.max(insets.bottom, 16) },
        ]}
      >
        {/* Botón para minimizar/expandir - visible cuando ambos puntos están seleccionados */}
        {origin && destination && (
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setIsPanelExpanded(!isPanelExpanded)}
          >
            <Text style={styles.toggleIcon}>{isPanelExpanded ? '—' : '—'}</Text>
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
            {error && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>⚠️ {error}</Text>
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
                style={styles.planButton}
                onPress={handleStartPlanning}
                activeOpacity={0.8}
              >
                <Text style={styles.planButtonText}>Calcular Ruta 🚴</Text>
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
                style={styles.compactPlanButton}
                onPress={handleStartPlanning}
                activeOpacity={0.8}
              >
                <Text style={styles.compactPlanButtonText}>Calcular Ruta 🚴</Text>
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
      </View>
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
  planButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    marginTop: 8,
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
    padding: 2,
    marginBottom: 6,
  },
  toggleIcon: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '700',
    backgroundColor: `${COLORS.primary}20`,
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
    fontWeight: '700',
```

---

## 🕐 27/04/2026, 18:31:08

### 📊 Resumen
- **Total archivos:** 33
- **📝 Nuevos:** 26
- **✏️ Modificados:** 6
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +441
- **Líneas eliminadas:** -337
- **Balance neto:** +104 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `DICCIONARIO.md` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/formatColombianPhone.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/selfRegister.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/sendPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signIn.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signOut.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signUp.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/verifyPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/calculateDistance.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/isSameLocation.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/reverseGeocode.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/searchPlaces.ts` | nuevo | -0 | 0 |
| 🆕 | `src/components/map/PlannerMap.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationInput.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationSearch.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/SwapLocationsButton.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/config/backendUrl.ts` | nuevo | -0 | 0 |
| 🆕 | `src/config/mapbox.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/quickConnectionTest.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/testEndpoint.ts` | nuevo | -0 | 0 |
| 🆕 | `src/screens/map/LocationSearchScreen.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/store/plannerStore.ts` | nuevo | -0 | 0 |
| 🆕 | `src/types/planner.ts` | nuevo | -0 | 0 |
| ✏️ | `src/screens/map/PlannerScreen.tsx` | +370 | -5 | +365 |
| ✏️ | `src/api/auth.ts` | +9 | -221 | -212 |
| ✏️ | `src/debug/checkBackendConnection.ts` | +7 | -87 | -80 |
| ✏️ | `src/screens/map/MapScreen.tsx` | +52 | -15 | +37 |
| ✏️ | `.env.example` | +0 | -9 | -9 |
| ✏️ | `src/constants/colors.ts` | +3 | -0 | +3 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (33)</summary>

**🆕 Nuevos:**
```
DICCIONARIO.md
src/api/auth/formatColombianPhone.ts
src/api/auth/index.ts
src/api/auth/selfRegister.ts
src/api/auth/sendPhoneOTP.ts
src/api/auth/signIn.ts
src/api/auth/signOut.ts
src/api/auth/signUp.ts
src/api/auth/verifyPhoneOTP.ts
src/api/geocoding.ts
src/api/geocoding/calculateDistance.ts
src/api/geocoding/index.ts
src/api/geocoding/isSameLocation.ts
src/api/geocoding/reverseGeocode.ts
src/api/geocoding/searchPlaces.ts
src/components/map/PlannerMap.tsx
src/components/planner/LocationInput.tsx
src/components/planner/LocationSearch.tsx
src/components/planner/SwapLocationsButton.tsx
src/config/backendUrl.ts
src/config/mapbox.ts
src/debug/quickConnectionTest.ts
src/debug/testEndpoint.ts
src/screens/map/LocationSearchScreen.tsx
src/store/plannerStore.ts
src/types/planner.ts
```

**✏️ Modificados:**
```
src/screens/map/PlannerScreen.tsx
src/api/auth.ts
src/debug/checkBackendConnection.ts
src/screens/map/MapScreen.tsx
.env.example
src/constants/colors.ts
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

### 💻 Código Añadido

**src/api/auth.ts** (+9 líneas)**

```
export {
  selfRegister,
  signUp,
  signIn,
  signOut,
  sendPhoneOTP,
  verifyPhoneOTP,
  formatColombianPhone,
} from './auth/index'
```

**src/constants/colors.ts** (+3 líneas)**

```
  // Secundario
  secondary: '#f5f5f5',

```

**src/debug/checkBackendConnection.ts** (+7 líneas)**

```
import { BACKEND_URL } from '@/config/backendUrl'






```

**src/screens/map/MapScreen.tsx** (+52 líneas)**

```
        
        // 1. Usar última ubicación conocida PRIMERO (instantáneo)
        const lastLocation = await Location.getLastKnownPositionAsync()
        if (lastLocation) {
          console.log('Última ubicación conocida:', lastLocation.coords)
          const userCoords = {
            latitude: lastLocation.coords.latitude,
            longitude: lastLocation.coords.longitude,
          }
          setUserLocation(userCoords)
          setCameraCoords({
            longitude: userCoords.longitude,
            latitude: userCoords.latitude,
            zoom: 16,
          })
        } else {
          // Fallback: centrar en Bogotá mientras espera
          setCameraCoords({
            longitude: -74.0721,
            latitude: 4.711,
            zoom: 13,
          })
        // 2. Obtener ubicación más precisa en background (sin bloquear UI)
        Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
          .then((location) => {
            console.log('Ubicación actualizada:', location.coords)
            const userCoords = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }
            setUserLocation(userCoords)
            // Actualizar con ubicación más precisa
            setCameraCoords({
              longitude: userCoords.longitude,
              latitude: userCoords.latitude,
              zoom: 16,
            })
          })
          .catch((error) => console.error('Error obteniendo ubicación precisa:', error))
        // Fallback: centrar en Bogotá
        setCameraCoords({
          longitude: -74.0721,
          latitude: 4.711,
          zoom: 13,
        })
      // Fallback: centrar en Bogotá
      setCameraCoords({
        longitude: -74.0721,
        latitude: 4.711,
        zoom: 13,
      })
```

**src/screens/map/PlannerScreen.tsx** (+370 líneas)**

```
import { useCallback, useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { PlannerMap } from '@/components/map/PlannerMap'
import { LocationInput } from '@/components/planner/LocationInput'
import { LocationSearchScreen } from './LocationSearchScreen'
import { SwapLocationsButton } from '@/components/planner/SwapLocationsButton'
import { reverseGeocode } from '@/api/geocoding'
  const insets = useSafeAreaInsets()
  const {
    origin,
    destination,
    selectingMode,
    error,
    setOrigin,
    setDestination,
    setSelectingMode,
    setError,
    swapLocations,
    clearLocations,
  } = usePlannerStore()

  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null)
  const [loadingGeocoding, setLoadingGeocoding] = useState(false)
  const [isPanelExpanded, setIsPanelExpanded] = useState(true)

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

  const handleStartPlanning = useCallback(() => {
    if (origin && destination) {
      console.log('Iniciando planificación de ruta:', { origin, destination })
    }
  }, [origin, destination])

  // Si está en modo de selección, mostrar pantalla fullscreen de búsqueda
  if (selectingMode) {
    return (
      <LocationSearchScreen
        type={selectingMode}
        onSelect={(location) => handleLocationSelect(location, selectingMode)}
        onCancel={() => {
          setSelectingMode(null)
          setError(null)
        }}
        excludeLocation={selectingMode === 'origin' ? destination : origin}
        userLocation={userLocation}
        onUseMyLocation={handleUseMyLocation}
      />
    )
  }

      {/* Mapa */}
      <PlannerMap
        origin={origin}
        destination={destination}
        selectingMode={selectingMode}
        onLocationSelect={handleLocationSelect}
      />

      {/* Panel de controles inferior */}
      <View
        style={[
          styles.controlPanel,
          !isPanelExpanded && origin && destination && styles.controlPanelCompact,
          { paddingBottom: !isPanelExpanded && origin && destination ? Math.max(insets.bottom + 16, 70) : Math.max(insets.bottom, 16) },
        ]}
      >
        {/* Botón para minimizar/expandir - visible cuando ambos puntos están seleccionados */}
        {origin && destination && (
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setIsPanelExpanded(!isPanelExpanded)}
          >
            <Text style={styles.toggleIcon}>{isPanelExpanded ? '—' : '—'}</Text>
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
            {error && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>⚠️ {error}</Text>
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
                style={styles.planButton}
                onPress={handleStartPlanning}
                activeOpacity={0.8}
              >
                <Text style={styles.planButtonText}>Calcular Ruta 🚴</Text>
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
                style={styles.compactPlanButton}
                onPress={handleStartPlanning}
                activeOpacity={0.8}
              >
                <Text style={styles.compactPlanButtonText}>Calcular Ruta 🚴</Text>
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
      </View>
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
  planButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    marginTop: 8,
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
  },
  toggleIcon: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '900',
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
    fontWeight: '700',
```

---

## 🕐 27/04/2026, 18:33:02

### 📊 Resumen
- **Total archivos:** 33
- **📝 Nuevos:** 26
- **✏️ Modificados:** 6
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +442
- **Líneas eliminadas:** -337
- **Balance neto:** +105 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `DICCIONARIO.md` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/formatColombianPhone.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/selfRegister.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/sendPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signIn.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signOut.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signUp.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/verifyPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/calculateDistance.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/isSameLocation.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/reverseGeocode.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/searchPlaces.ts` | nuevo | -0 | 0 |
| 🆕 | `src/components/map/PlannerMap.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationInput.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationSearch.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/SwapLocationsButton.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/config/backendUrl.ts` | nuevo | -0 | 0 |
| 🆕 | `src/config/mapbox.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/quickConnectionTest.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/testEndpoint.ts` | nuevo | -0 | 0 |
| 🆕 | `src/screens/map/LocationSearchScreen.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/store/plannerStore.ts` | nuevo | -0 | 0 |
| 🆕 | `src/types/planner.ts` | nuevo | -0 | 0 |
| ✏️ | `src/screens/map/PlannerScreen.tsx` | +371 | -5 | +366 |
| ✏️ | `src/api/auth.ts` | +9 | -221 | -212 |
| ✏️ | `src/debug/checkBackendConnection.ts` | +7 | -87 | -80 |
| ✏️ | `src/screens/map/MapScreen.tsx` | +52 | -15 | +37 |
| ✏️ | `.env.example` | +0 | -9 | -9 |
| ✏️ | `src/constants/colors.ts` | +3 | -0 | +3 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (33)</summary>

**🆕 Nuevos:**
```
DICCIONARIO.md
src/api/auth/formatColombianPhone.ts
src/api/auth/index.ts
src/api/auth/selfRegister.ts
src/api/auth/sendPhoneOTP.ts
src/api/auth/signIn.ts
src/api/auth/signOut.ts
src/api/auth/signUp.ts
src/api/auth/verifyPhoneOTP.ts
src/api/geocoding.ts
src/api/geocoding/calculateDistance.ts
src/api/geocoding/index.ts
src/api/geocoding/isSameLocation.ts
src/api/geocoding/reverseGeocode.ts
src/api/geocoding/searchPlaces.ts
src/components/map/PlannerMap.tsx
src/components/planner/LocationInput.tsx
src/components/planner/LocationSearch.tsx
src/components/planner/SwapLocationsButton.tsx
src/config/backendUrl.ts
src/config/mapbox.ts
src/debug/quickConnectionTest.ts
src/debug/testEndpoint.ts
src/screens/map/LocationSearchScreen.tsx
src/store/plannerStore.ts
src/types/planner.ts
```

**✏️ Modificados:**
```
src/screens/map/PlannerScreen.tsx
src/api/auth.ts
src/debug/checkBackendConnection.ts
src/screens/map/MapScreen.tsx
.env.example
src/constants/colors.ts
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

### 💻 Código Añadido

**src/api/auth.ts** (+9 líneas)**

```
export {
  selfRegister,
  signUp,
  signIn,
  signOut,
  sendPhoneOTP,
  verifyPhoneOTP,
  formatColombianPhone,
} from './auth/index'
```

**src/constants/colors.ts** (+3 líneas)**

```
  // Secundario
  secondary: '#f5f5f5',

```

**src/debug/checkBackendConnection.ts** (+7 líneas)**

```
import { BACKEND_URL } from '@/config/backendUrl'






```

**src/screens/map/MapScreen.tsx** (+52 líneas)**

```
        
        // 1. Usar última ubicación conocida PRIMERO (instantáneo)
        const lastLocation = await Location.getLastKnownPositionAsync()
        if (lastLocation) {
          console.log('Última ubicación conocida:', lastLocation.coords)
          const userCoords = {
            latitude: lastLocation.coords.latitude,
            longitude: lastLocation.coords.longitude,
          }
          setUserLocation(userCoords)
          setCameraCoords({
            longitude: userCoords.longitude,
            latitude: userCoords.latitude,
            zoom: 16,
          })
        } else {
          // Fallback: centrar en Bogotá mientras espera
          setCameraCoords({
            longitude: -74.0721,
            latitude: 4.711,
            zoom: 13,
          })
        // 2. Obtener ubicación más precisa en background (sin bloquear UI)
        Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
          .then((location) => {
            console.log('Ubicación actualizada:', location.coords)
            const userCoords = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }
            setUserLocation(userCoords)
            // Actualizar con ubicación más precisa
            setCameraCoords({
              longitude: userCoords.longitude,
              latitude: userCoords.latitude,
              zoom: 16,
            })
          })
          .catch((error) => console.error('Error obteniendo ubicación precisa:', error))
        // Fallback: centrar en Bogotá
        setCameraCoords({
          longitude: -74.0721,
          latitude: 4.711,
          zoom: 13,
        })
      // Fallback: centrar en Bogotá
      setCameraCoords({
        longitude: -74.0721,
        latitude: 4.711,
        zoom: 13,
      })
```

**src/screens/map/PlannerScreen.tsx** (+371 líneas)**

```
import { useCallback, useEffect, useState, useRef } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
  Animated,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { PlannerMap } from '@/components/map/PlannerMap'
import { LocationInput } from '@/components/planner/LocationInput'
import { LocationSearchScreen } from './LocationSearchScreen'
import { SwapLocationsButton } from '@/components/planner/SwapLocationsButton'
import { reverseGeocode } from '@/api/geocoding'
  const insets = useSafeAreaInsets()
  const {
    origin,
    destination,
    selectingMode,
    error,
    setOrigin,
    setDestination,
    setSelectingMode,
    setError,
    swapLocations,
    clearLocations,
  } = usePlannerStore()

  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null)
  const [loadingGeocoding, setLoadingGeocoding] = useState(false)
  const [isPanelExpanded, setIsPanelExpanded] = useState(true)

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

  const handleStartPlanning = useCallback(() => {
    if (origin && destination) {
      console.log('Iniciando planificación de ruta:', { origin, destination })
    }
  }, [origin, destination])

  // Si está en modo de selección, mostrar pantalla fullscreen de búsqueda
  if (selectingMode) {
    return (
      <LocationSearchScreen
        type={selectingMode}
        onSelect={(location) => handleLocationSelect(location, selectingMode)}
        onCancel={() => {
          setSelectingMode(null)
          setError(null)
        }}
        excludeLocation={selectingMode === 'origin' ? destination : origin}
        userLocation={userLocation}
        onUseMyLocation={handleUseMyLocation}
      />
    )
  }

      {/* Mapa */}
      <PlannerMap
        origin={origin}
        destination={destination}
        selectingMode={selectingMode}
        onLocationSelect={handleLocationSelect}
      />

      {/* Panel de controles inferior */}
      <View
        style={[
          styles.controlPanel,
          !isPanelExpanded && origin && destination && styles.controlPanelCompact,
          { paddingBottom: !isPanelExpanded && origin && destination ? Math.max(insets.bottom + 16, 70) : Math.max(insets.bottom, 16) },
        ]}
      >
        {/* Botón para minimizar/expandir - visible cuando ambos puntos están seleccionados */}
        {origin && destination && (
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setIsPanelExpanded(!isPanelExpanded)}
          >
            <Text style={styles.toggleIcon}>{isPanelExpanded ? '—' : '—'}</Text>
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
            {error && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>⚠️ {error}</Text>
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
                style={styles.planButton}
                onPress={handleStartPlanning}
                activeOpacity={0.8}
              >
                <Text style={styles.planButtonText}>Calcular Ruta 🚴</Text>
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
                style={styles.compactPlanButton}
                onPress={handleStartPlanning}
                activeOpacity={0.8}
              >
                <Text style={styles.compactPlanButtonText}>Calcular Ruta 🚴</Text>
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
      </View>
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
  planButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    marginTop: 8,
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
  },
  toggleIcon: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '900',
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
    fontWeight: '700',
```

---

## 🕐 27/04/2026, 18:33:09

### 📊 Resumen
- **Total archivos:** 33
- **📝 Nuevos:** 26
- **✏️ Modificados:** 6
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +452
- **Líneas eliminadas:** -337
- **Balance neto:** +115 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `DICCIONARIO.md` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/formatColombianPhone.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/selfRegister.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/sendPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signIn.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signOut.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signUp.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/verifyPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/calculateDistance.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/isSameLocation.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/reverseGeocode.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/searchPlaces.ts` | nuevo | -0 | 0 |
| 🆕 | `src/components/map/PlannerMap.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationInput.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationSearch.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/SwapLocationsButton.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/config/backendUrl.ts` | nuevo | -0 | 0 |
| 🆕 | `src/config/mapbox.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/quickConnectionTest.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/testEndpoint.ts` | nuevo | -0 | 0 |
| 🆕 | `src/screens/map/LocationSearchScreen.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/store/plannerStore.ts` | nuevo | -0 | 0 |
| 🆕 | `src/types/planner.ts` | nuevo | -0 | 0 |
| ✏️ | `src/screens/map/PlannerScreen.tsx` | +381 | -5 | +376 |
| ✏️ | `src/api/auth.ts` | +9 | -221 | -212 |
| ✏️ | `src/debug/checkBackendConnection.ts` | +7 | -87 | -80 |
| ✏️ | `src/screens/map/MapScreen.tsx` | +52 | -15 | +37 |
| ✏️ | `.env.example` | +0 | -9 | -9 |
| ✏️ | `src/constants/colors.ts` | +3 | -0 | +3 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (33)</summary>

**🆕 Nuevos:**
```
DICCIONARIO.md
src/api/auth/formatColombianPhone.ts
src/api/auth/index.ts
src/api/auth/selfRegister.ts
src/api/auth/sendPhoneOTP.ts
src/api/auth/signIn.ts
src/api/auth/signOut.ts
src/api/auth/signUp.ts
src/api/auth/verifyPhoneOTP.ts
src/api/geocoding.ts
src/api/geocoding/calculateDistance.ts
src/api/geocoding/index.ts
src/api/geocoding/isSameLocation.ts
src/api/geocoding/reverseGeocode.ts
src/api/geocoding/searchPlaces.ts
src/components/map/PlannerMap.tsx
src/components/planner/LocationInput.tsx
src/components/planner/LocationSearch.tsx
src/components/planner/SwapLocationsButton.tsx
src/config/backendUrl.ts
src/config/mapbox.ts
src/debug/quickConnectionTest.ts
src/debug/testEndpoint.ts
src/screens/map/LocationSearchScreen.tsx
src/store/plannerStore.ts
src/types/planner.ts
```

**✏️ Modificados:**
```
src/screens/map/PlannerScreen.tsx
src/api/auth.ts
src/debug/checkBackendConnection.ts
src/screens/map/MapScreen.tsx
.env.example
src/constants/colors.ts
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

### 💻 Código Añadido

**src/api/auth.ts** (+9 líneas)**

```
export {
  selfRegister,
  signUp,
  signIn,
  signOut,
  sendPhoneOTP,
  verifyPhoneOTP,
  formatColombianPhone,
} from './auth/index'
```

**src/constants/colors.ts** (+3 líneas)**

```
  // Secundario
  secondary: '#f5f5f5',

```

**src/debug/checkBackendConnection.ts** (+7 líneas)**

```
import { BACKEND_URL } from '@/config/backendUrl'






```

**src/screens/map/MapScreen.tsx** (+52 líneas)**

```
        
        // 1. Usar última ubicación conocida PRIMERO (instantáneo)
        const lastLocation = await Location.getLastKnownPositionAsync()
        if (lastLocation) {
          console.log('Última ubicación conocida:', lastLocation.coords)
          const userCoords = {
            latitude: lastLocation.coords.latitude,
            longitude: lastLocation.coords.longitude,
          }
          setUserLocation(userCoords)
          setCameraCoords({
            longitude: userCoords.longitude,
            latitude: userCoords.latitude,
            zoom: 16,
          })
        } else {
          // Fallback: centrar en Bogotá mientras espera
          setCameraCoords({
            longitude: -74.0721,
            latitude: 4.711,
            zoom: 13,
          })
        // 2. Obtener ubicación más precisa en background (sin bloquear UI)
        Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
          .then((location) => {
            console.log('Ubicación actualizada:', location.coords)
            const userCoords = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }
            setUserLocation(userCoords)
            // Actualizar con ubicación más precisa
            setCameraCoords({
              longitude: userCoords.longitude,
              latitude: userCoords.latitude,
              zoom: 16,
            })
          })
          .catch((error) => console.error('Error obteniendo ubicación precisa:', error))
        // Fallback: centrar en Bogotá
        setCameraCoords({
          longitude: -74.0721,
          latitude: 4.711,
          zoom: 13,
        })
      // Fallback: centrar en Bogotá
      setCameraCoords({
        longitude: -74.0721,
        latitude: 4.711,
        zoom: 13,
      })
```

**src/screens/map/PlannerScreen.tsx** (+381 líneas)**

```
import { useCallback, useEffect, useState, useRef } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
  Animated,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { PlannerMap } from '@/components/map/PlannerMap'
import { LocationInput } from '@/components/planner/LocationInput'
import { LocationSearchScreen } from './LocationSearchScreen'
import { SwapLocationsButton } from '@/components/planner/SwapLocationsButton'
import { reverseGeocode } from '@/api/geocoding'
  const insets = useSafeAreaInsets()
  const {
    origin,
    destination,
    selectingMode,
    error,
    setOrigin,
    setDestination,
    setSelectingMode,
    setError,
    swapLocations,
    clearLocations,
  } = usePlannerStore()

  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null)
  const [loadingGeocoding, setLoadingGeocoding] = useState(false)
  const [isPanelExpanded, setIsPanelExpanded] = useState(true)
  const slideAnim = useRef(new Animated.Value(1)).current

  // Animar el panel cuando cambia el estado de expansión
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isPanelExpanded ? 1 : 0.3,
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

  const handleStartPlanning = useCallback(() => {
    if (origin && destination) {
      console.log('Iniciando planificación de ruta:', { origin, destination })
    }
  }, [origin, destination])

  // Si está en modo de selección, mostrar pantalla fullscreen de búsqueda
  if (selectingMode) {
    return (
      <LocationSearchScreen
        type={selectingMode}
        onSelect={(location) => handleLocationSelect(location, selectingMode)}
        onCancel={() => {
          setSelectingMode(null)
          setError(null)
        }}
        excludeLocation={selectingMode === 'origin' ? destination : origin}
        userLocation={userLocation}
        onUseMyLocation={handleUseMyLocation}
      />
    )
  }

      {/* Mapa */}
      <PlannerMap
        origin={origin}
        destination={destination}
        selectingMode={selectingMode}
        onLocationSelect={handleLocationSelect}
      />

      {/* Panel de controles inferior */}
      <View
        style={[
          styles.controlPanel,
          !isPanelExpanded && origin && destination && styles.controlPanelCompact,
          { paddingBottom: !isPanelExpanded && origin && destination ? Math.max(insets.bottom + 16, 70) : Math.max(insets.bottom, 16) },
        ]}
      >
        {/* Botón para minimizar/expandir - visible cuando ambos puntos están seleccionados */}
        {origin && destination && (
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setIsPanelExpanded(!isPanelExpanded)}
          >
            <Text style={styles.toggleIcon}>{isPanelExpanded ? '—' : '—'}</Text>
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
            {error && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>⚠️ {error}</Text>
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
                style={styles.planButton}
                onPress={handleStartPlanning}
                activeOpacity={0.8}
              >
                <Text style={styles.planButtonText}>Calcular Ruta 🚴</Text>
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
                style={styles.compactPlanButton}
                onPress={handleStartPlanning}
                activeOpacity={0.8}
              >
                <Text style={styles.compactPlanButtonText}>Calcular Ruta 🚴</Text>
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
      </View>
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
  planButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    marginTop: 8,
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
  toggleIcon: {
    fontSize: 14,
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
    fontWeight: '700',
```

---

## 🕐 27/04/2026, 18:33:15

### 📊 Resumen
- **Total archivos:** 33
- **📝 Nuevos:** 26
- **✏️ Modificados:** 6
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +455
- **Líneas eliminadas:** -337
- **Balance neto:** +118 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `DICCIONARIO.md` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/formatColombianPhone.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/selfRegister.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/sendPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signIn.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signOut.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signUp.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/verifyPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/calculateDistance.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/isSameLocation.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/reverseGeocode.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/searchPlaces.ts` | nuevo | -0 | 0 |
| 🆕 | `src/components/map/PlannerMap.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationInput.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationSearch.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/SwapLocationsButton.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/config/backendUrl.ts` | nuevo | -0 | 0 |
| 🆕 | `src/config/mapbox.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/quickConnectionTest.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/testEndpoint.ts` | nuevo | -0 | 0 |
| 🆕 | `src/screens/map/LocationSearchScreen.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/store/plannerStore.ts` | nuevo | -0 | 0 |
| 🆕 | `src/types/planner.ts` | nuevo | -0 | 0 |
| ✏️ | `src/screens/map/PlannerScreen.tsx` | +384 | -5 | +379 |
| ✏️ | `src/api/auth.ts` | +9 | -221 | -212 |
| ✏️ | `src/debug/checkBackendConnection.ts` | +7 | -87 | -80 |
| ✏️ | `src/screens/map/MapScreen.tsx` | +52 | -15 | +37 |
| ✏️ | `.env.example` | +0 | -9 | -9 |
| ✏️ | `src/constants/colors.ts` | +3 | -0 | +3 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (33)</summary>

**🆕 Nuevos:**
```
DICCIONARIO.md
src/api/auth/formatColombianPhone.ts
src/api/auth/index.ts
src/api/auth/selfRegister.ts
src/api/auth/sendPhoneOTP.ts
src/api/auth/signIn.ts
src/api/auth/signOut.ts
src/api/auth/signUp.ts
src/api/auth/verifyPhoneOTP.ts
src/api/geocoding.ts
src/api/geocoding/calculateDistance.ts
src/api/geocoding/index.ts
src/api/geocoding/isSameLocation.ts
src/api/geocoding/reverseGeocode.ts
src/api/geocoding/searchPlaces.ts
src/components/map/PlannerMap.tsx
src/components/planner/LocationInput.tsx
src/components/planner/LocationSearch.tsx
src/components/planner/SwapLocationsButton.tsx
src/config/backendUrl.ts
src/config/mapbox.ts
src/debug/quickConnectionTest.ts
src/debug/testEndpoint.ts
src/screens/map/LocationSearchScreen.tsx
src/store/plannerStore.ts
src/types/planner.ts
```

**✏️ Modificados:**
```
src/screens/map/PlannerScreen.tsx
src/api/auth.ts
src/debug/checkBackendConnection.ts
src/screens/map/MapScreen.tsx
.env.example
src/constants/colors.ts
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

### 💻 Código Añadido

**src/api/auth.ts** (+9 líneas)**

```
export {
  selfRegister,
  signUp,
  signIn,
  signOut,
  sendPhoneOTP,
  verifyPhoneOTP,
  formatColombianPhone,
} from './auth/index'
```

**src/constants/colors.ts** (+3 líneas)**

```
  // Secundario
  secondary: '#f5f5f5',

```

**src/debug/checkBackendConnection.ts** (+7 líneas)**

```
import { BACKEND_URL } from '@/config/backendUrl'






```

**src/screens/map/MapScreen.tsx** (+52 líneas)**

```
        
        // 1. Usar última ubicación conocida PRIMERO (instantáneo)
        const lastLocation = await Location.getLastKnownPositionAsync()
        if (lastLocation) {
          console.log('Última ubicación conocida:', lastLocation.coords)
          const userCoords = {
            latitude: lastLocation.coords.latitude,
            longitude: lastLocation.coords.longitude,
          }
          setUserLocation(userCoords)
          setCameraCoords({
            longitude: userCoords.longitude,
            latitude: userCoords.latitude,
            zoom: 16,
          })
        } else {
          // Fallback: centrar en Bogotá mientras espera
          setCameraCoords({
            longitude: -74.0721,
            latitude: 4.711,
            zoom: 13,
          })
        // 2. Obtener ubicación más precisa en background (sin bloquear UI)
        Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
          .then((location) => {
            console.log('Ubicación actualizada:', location.coords)
            const userCoords = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }
            setUserLocation(userCoords)
            // Actualizar con ubicación más precisa
            setCameraCoords({
              longitude: userCoords.longitude,
              latitude: userCoords.latitude,
              zoom: 16,
            })
          })
          .catch((error) => console.error('Error obteniendo ubicación precisa:', error))
        // Fallback: centrar en Bogotá
        setCameraCoords({
          longitude: -74.0721,
          latitude: 4.711,
          zoom: 13,
        })
      // Fallback: centrar en Bogotá
      setCameraCoords({
        longitude: -74.0721,
        latitude: 4.711,
        zoom: 13,
      })
```

**src/screens/map/PlannerScreen.tsx** (+384 líneas)**

```
import { useCallback, useEffect, useState, useRef } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
  Animated,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { PlannerMap } from '@/components/map/PlannerMap'
import { LocationInput } from '@/components/planner/LocationInput'
import { LocationSearchScreen } from './LocationSearchScreen'
import { SwapLocationsButton } from '@/components/planner/SwapLocationsButton'
import { reverseGeocode } from '@/api/geocoding'
  const insets = useSafeAreaInsets()
  const {
    origin,
    destination,
    selectingMode,
    error,
    setOrigin,
    setDestination,
    setSelectingMode,
    setError,
    swapLocations,
    clearLocations,
  } = usePlannerStore()

  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null)
  const [loadingGeocoding, setLoadingGeocoding] = useState(false)
  const [isPanelExpanded, setIsPanelExpanded] = useState(true)
  const slideAnim = useRef(new Animated.Value(1)).current

  // Animar el panel cuando cambia el estado de expansión
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isPanelExpanded ? 1 : 0.3,
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

  const handleStartPlanning = useCallback(() => {
    if (origin && destination) {
      console.log('Iniciando planificación de ruta:', { origin, destination })
    }
  }, [origin, destination])

  // Si está en modo de selección, mostrar pantalla fullscreen de búsqueda
  if (selectingMode) {
    return (
      <LocationSearchScreen
        type={selectingMode}
        onSelect={(location) => handleLocationSelect(location, selectingMode)}
        onCancel={() => {
          setSelectingMode(null)
          setError(null)
        }}
        excludeLocation={selectingMode === 'origin' ? destination : origin}
        userLocation={userLocation}
        onUseMyLocation={handleUseMyLocation}
      />
    )
  }

      {/* Mapa */}
      <PlannerMap
        origin={origin}
        destination={destination}
        selectingMode={selectingMode}
        onLocationSelect={handleLocationSelect}
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
            <Text style={styles.toggleIcon}>{isPanelExpanded ? '—' : '—'}</Text>
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
            {error && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>⚠️ {error}</Text>
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
                style={styles.planButton}
                onPress={handleStartPlanning}
                activeOpacity={0.8}
              >
                <Text style={styles.planButtonText}>Calcular Ruta 🚴</Text>
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
                style={styles.compactPlanButton}
                onPress={handleStartPlanning}
                activeOpacity={0.8}
              >
                <Text style={styles.compactPlanButtonText}>Calcular Ruta 🚴</Text>
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
      </View>
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
  planButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    marginTop: 8,
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
  toggleIcon: {
    fontSize: 14,
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
    fontWeight: '700',
```

---

## 🕐 27/04/2026, 18:33:32

### 📊 Resumen
- **Total archivos:** 33
- **📝 Nuevos:** 26
- **✏️ Modificados:** 6
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +466
- **Líneas eliminadas:** -337
- **Balance neto:** +129 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `DICCIONARIO.md` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/formatColombianPhone.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/selfRegister.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/sendPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signIn.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signOut.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signUp.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/verifyPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/calculateDistance.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/isSameLocation.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/reverseGeocode.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/searchPlaces.ts` | nuevo | -0 | 0 |
| 🆕 | `src/components/map/PlannerMap.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationInput.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationSearch.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/SwapLocationsButton.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/config/backendUrl.ts` | nuevo | -0 | 0 |
| 🆕 | `src/config/mapbox.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/quickConnectionTest.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/testEndpoint.ts` | nuevo | -0 | 0 |
| 🆕 | `src/screens/map/LocationSearchScreen.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/store/plannerStore.ts` | nuevo | -0 | 0 |
| 🆕 | `src/types/planner.ts` | nuevo | -0 | 0 |
| ✏️ | `src/screens/map/PlannerScreen.tsx` | +395 | -5 | +390 |
| ✏️ | `src/api/auth.ts` | +9 | -221 | -212 |
| ✏️ | `src/debug/checkBackendConnection.ts` | +7 | -87 | -80 |
| ✏️ | `src/screens/map/MapScreen.tsx` | +52 | -15 | +37 |
| ✏️ | `.env.example` | +0 | -9 | -9 |
| ✏️ | `src/constants/colors.ts` | +3 | -0 | +3 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (33)</summary>

**🆕 Nuevos:**
```
DICCIONARIO.md
src/api/auth/formatColombianPhone.ts
src/api/auth/index.ts
src/api/auth/selfRegister.ts
src/api/auth/sendPhoneOTP.ts
src/api/auth/signIn.ts
src/api/auth/signOut.ts
src/api/auth/signUp.ts
src/api/auth/verifyPhoneOTP.ts
src/api/geocoding.ts
src/api/geocoding/calculateDistance.ts
src/api/geocoding/index.ts
src/api/geocoding/isSameLocation.ts
src/api/geocoding/reverseGeocode.ts
src/api/geocoding/searchPlaces.ts
src/components/map/PlannerMap.tsx
src/components/planner/LocationInput.tsx
src/components/planner/LocationSearch.tsx
src/components/planner/SwapLocationsButton.tsx
src/config/backendUrl.ts
src/config/mapbox.ts
src/debug/quickConnectionTest.ts
src/debug/testEndpoint.ts
src/screens/map/LocationSearchScreen.tsx
src/store/plannerStore.ts
src/types/planner.ts
```

**✏️ Modificados:**
```
src/screens/map/PlannerScreen.tsx
src/api/auth.ts
src/debug/checkBackendConnection.ts
src/screens/map/MapScreen.tsx
.env.example
src/constants/colors.ts
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

### 💻 Código Añadido

**src/api/auth.ts** (+9 líneas)**

```
export {
  selfRegister,
  signUp,
  signIn,
  signOut,
  sendPhoneOTP,
  verifyPhoneOTP,
  formatColombianPhone,
} from './auth/index'
```

**src/constants/colors.ts** (+3 líneas)**

```
  // Secundario
  secondary: '#f5f5f5',

```

**src/debug/checkBackendConnection.ts** (+7 líneas)**

```
import { BACKEND_URL } from '@/config/backendUrl'






```

**src/screens/map/MapScreen.tsx** (+52 líneas)**

```
        
        // 1. Usar última ubicación conocida PRIMERO (instantáneo)
        const lastLocation = await Location.getLastKnownPositionAsync()
        if (lastLocation) {
          console.log('Última ubicación conocida:', lastLocation.coords)
          const userCoords = {
            latitude: lastLocation.coords.latitude,
            longitude: lastLocation.coords.longitude,
          }
          setUserLocation(userCoords)
          setCameraCoords({
            longitude: userCoords.longitude,
            latitude: userCoords.latitude,
            zoom: 16,
          })
        } else {
          // Fallback: centrar en Bogotá mientras espera
          setCameraCoords({
            longitude: -74.0721,
            latitude: 4.711,
            zoom: 13,
          })
        // 2. Obtener ubicación más precisa en background (sin bloquear UI)
        Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
          .then((location) => {
            console.log('Ubicación actualizada:', location.coords)
            const userCoords = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }
            setUserLocation(userCoords)
            // Actualizar con ubicación más precisa
            setCameraCoords({
              longitude: userCoords.longitude,
              latitude: userCoords.latitude,
              zoom: 16,
            })
          })
          .catch((error) => console.error('Error obteniendo ubicación precisa:', error))
        // Fallback: centrar en Bogotá
        setCameraCoords({
          longitude: -74.0721,
          latitude: 4.711,
          zoom: 13,
        })
      // Fallback: centrar en Bogotá
      setCameraCoords({
        longitude: -74.0721,
        latitude: 4.711,
        zoom: 13,
      })
```

**src/screens/map/PlannerScreen.tsx** (+395 líneas)**

```
import { useCallback, useEffect, useState, useRef } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
  Animated,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { PlannerMap } from '@/components/map/PlannerMap'
import { LocationInput } from '@/components/planner/LocationInput'
import { LocationSearchScreen } from './LocationSearchScreen'
import { SwapLocationsButton } from '@/components/planner/SwapLocationsButton'
import { reverseGeocode } from '@/api/geocoding'
  const insets = useSafeAreaInsets()
  const {
    origin,
    destination,
    selectingMode,
    error,
    setOrigin,
    setDestination,
    setSelectingMode,
    setError,
    swapLocations,
    clearLocations,
  } = usePlannerStore()

  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null)
  const [loadingGeocoding, setLoadingGeocoding] = useState(false)
  const [isPanelExpanded, setIsPanelExpanded] = useState(true)
  const slideAnim = useRef(new Animated.Value(1)).current

  // Animar el panel cuando cambia el estado de expansión
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isPanelExpanded ? 1 : 0.3,
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

  const handleStartPlanning = useCallback(() => {
    if (origin && destination) {
      console.log('Iniciando planificación de ruta:', { origin, destination })
    }
  }, [origin, destination])

  // Si está en modo de selección, mostrar pantalla fullscreen de búsqueda
  if (selectingMode) {
    return (
      <LocationSearchScreen
        type={selectingMode}
        onSelect={(location) => handleLocationSelect(location, selectingMode)}
        onCancel={() => {
          setSelectingMode(null)
          setError(null)
        }}
        excludeLocation={selectingMode === 'origin' ? destination : origin}
        userLocation={userLocation}
        onUseMyLocation={handleUseMyLocation}
      />
    )
  }

      {/* Mapa */}
      <PlannerMap
        origin={origin}
        destination={destination}
        selectingMode={selectingMode}
        onLocationSelect={handleLocationSelect}
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
            <Text style={styles.toggleIcon}>{isPanelExpanded ? '⌄' : '⌃'}</Text>
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
            {error && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>⚠️ {error}</Text>
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
                style={styles.planButton}
                onPress={handleStartPlanning}
                activeOpacity={0.8}
              >
                <Text style={styles.planButtonText}>Calcular Ruta 🚴</Text>
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
                style={styles.compactPlanButton}
                onPress={handleStartPlanning}
                activeOpacity={0.8}
              >
                <Text style={styles.compactPlanButtonText}>Calcular Ruta 🚴</Text>
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
  planButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    marginTop: 8,
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
  toggleIcon: {
    fontSize: 14,
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
    fontWeight: '700',
```

---

## 🕐 27/04/2026, 18:33:39

### 📊 Resumen
- **Total archivos:** 33
- **📝 Nuevos:** 26
- **✏️ Modificados:** 6
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +477
- **Líneas eliminadas:** -337
- **Balance neto:** +140 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `DICCIONARIO.md` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/formatColombianPhone.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/selfRegister.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/sendPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signIn.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signOut.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signUp.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/verifyPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/calculateDistance.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/isSameLocation.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/reverseGeocode.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/searchPlaces.ts` | nuevo | -0 | 0 |
| 🆕 | `src/components/map/PlannerMap.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationInput.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationSearch.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/SwapLocationsButton.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/config/backendUrl.ts` | nuevo | -0 | 0 |
| 🆕 | `src/config/mapbox.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/quickConnectionTest.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/testEndpoint.ts` | nuevo | -0 | 0 |
| 🆕 | `src/screens/map/LocationSearchScreen.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/store/plannerStore.ts` | nuevo | -0 | 0 |
| 🆕 | `src/types/planner.ts` | nuevo | -0 | 0 |
| ✏️ | `src/screens/map/PlannerScreen.tsx` | +406 | -5 | +401 |
| ✏️ | `src/api/auth.ts` | +9 | -221 | -212 |
| ✏️ | `src/debug/checkBackendConnection.ts` | +7 | -87 | -80 |
| ✏️ | `src/screens/map/MapScreen.tsx` | +52 | -15 | +37 |
| ✏️ | `.env.example` | +0 | -9 | -9 |
| ✏️ | `src/constants/colors.ts` | +3 | -0 | +3 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (33)</summary>

**🆕 Nuevos:**
```
DICCIONARIO.md
src/api/auth/formatColombianPhone.ts
src/api/auth/index.ts
src/api/auth/selfRegister.ts
src/api/auth/sendPhoneOTP.ts
src/api/auth/signIn.ts
src/api/auth/signOut.ts
src/api/auth/signUp.ts
src/api/auth/verifyPhoneOTP.ts
src/api/geocoding.ts
src/api/geocoding/calculateDistance.ts
src/api/geocoding/index.ts
src/api/geocoding/isSameLocation.ts
src/api/geocoding/reverseGeocode.ts
src/api/geocoding/searchPlaces.ts
src/components/map/PlannerMap.tsx
src/components/planner/LocationInput.tsx
src/components/planner/LocationSearch.tsx
src/components/planner/SwapLocationsButton.tsx
src/config/backendUrl.ts
src/config/mapbox.ts
src/debug/quickConnectionTest.ts
src/debug/testEndpoint.ts
src/screens/map/LocationSearchScreen.tsx
src/store/plannerStore.ts
src/types/planner.ts
```

**✏️ Modificados:**
```
src/screens/map/PlannerScreen.tsx
src/api/auth.ts
src/debug/checkBackendConnection.ts
src/screens/map/MapScreen.tsx
.env.example
src/constants/colors.ts
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

### 💻 Código Añadido

**src/api/auth.ts** (+9 líneas)**

```
export {
  selfRegister,
  signUp,
  signIn,
  signOut,
  sendPhoneOTP,
  verifyPhoneOTP,
  formatColombianPhone,
} from './auth/index'
```

**src/constants/colors.ts** (+3 líneas)**

```
  // Secundario
  secondary: '#f5f5f5',

```

**src/debug/checkBackendConnection.ts** (+7 líneas)**

```
import { BACKEND_URL } from '@/config/backendUrl'






```

**src/screens/map/MapScreen.tsx** (+52 líneas)**

```
        
        // 1. Usar última ubicación conocida PRIMERO (instantáneo)
        const lastLocation = await Location.getLastKnownPositionAsync()
        if (lastLocation) {
          console.log('Última ubicación conocida:', lastLocation.coords)
          const userCoords = {
            latitude: lastLocation.coords.latitude,
            longitude: lastLocation.coords.longitude,
          }
          setUserLocation(userCoords)
          setCameraCoords({
            longitude: userCoords.longitude,
            latitude: userCoords.latitude,
            zoom: 16,
          })
        } else {
          // Fallback: centrar en Bogotá mientras espera
          setCameraCoords({
            longitude: -74.0721,
            latitude: 4.711,
            zoom: 13,
          })
        // 2. Obtener ubicación más precisa en background (sin bloquear UI)
        Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
          .then((location) => {
            console.log('Ubicación actualizada:', location.coords)
            const userCoords = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }
            setUserLocation(userCoords)
            // Actualizar con ubicación más precisa
            setCameraCoords({
              longitude: userCoords.longitude,
              latitude: userCoords.latitude,
              zoom: 16,
            })
          })
          .catch((error) => console.error('Error obteniendo ubicación precisa:', error))
        // Fallback: centrar en Bogotá
        setCameraCoords({
          longitude: -74.0721,
          latitude: 4.711,
          zoom: 13,
        })
      // Fallback: centrar en Bogotá
      setCameraCoords({
        longitude: -74.0721,
        latitude: 4.711,
        zoom: 13,
      })
```

**src/screens/map/PlannerScreen.tsx** (+406 líneas)**

```
import { useCallback, useEffect, useState, useRef } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
  Animated,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { PlannerMap } from '@/components/map/PlannerMap'
import { LocationInput } from '@/components/planner/LocationInput'
import { LocationSearchScreen } from './LocationSearchScreen'
import { SwapLocationsButton } from '@/components/planner/SwapLocationsButton'
import { reverseGeocode } from '@/api/geocoding'
  const insets = useSafeAreaInsets()
  const {
    origin,
    destination,
    selectingMode,
    error,
    setOrigin,
    setDestination,
    setSelectingMode,
    setError,
    swapLocations,
    clearLocations,
  } = usePlannerStore()

  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null)
  const [loadingGeocoding, setLoadingGeocoding] = useState(false)
  const [isPanelExpanded, setIsPanelExpanded] = useState(true)
  const slideAnim = useRef(new Animated.Value(1)).current

  // Animar el panel cuando cambia el estado de expansión
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isPanelExpanded ? 1 : 0.3,
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

  const handleStartPlanning = useCallback(() => {
    if (origin && destination) {
      console.log('Iniciando planificación de ruta:', { origin, destination })
    }
  }, [origin, destination])

  // Si está en modo de selección, mostrar pantalla fullscreen de búsqueda
  if (selectingMode) {
    return (
      <LocationSearchScreen
        type={selectingMode}
        onSelect={(location) => handleLocationSelect(location, selectingMode)}
        onCancel={() => {
          setSelectingMode(null)
          setError(null)
        }}
        excludeLocation={selectingMode === 'origin' ? destination : origin}
        userLocation={userLocation}
        onUseMyLocation={handleUseMyLocation}
      />
    )
  }

      {/* Mapa */}
      <PlannerMap
        origin={origin}
        destination={destination}
        selectingMode={selectingMode}
        onLocationSelect={handleLocationSelect}
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
            <Text style={styles.toggleIcon}>{isPanelExpanded ? '⌄' : '⌃'}</Text>
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
            {error && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>⚠️ {error}</Text>
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
                style={styles.planButton}
                onPress={handleStartPlanning}
                activeOpacity={0.8}
              >
                <Text style={styles.planButtonText}>Calcular Ruta 🚴</Text>
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
                style={styles.compactPlanButton}
                onPress={handleStartPlanning}
                activeOpacity={0.8}
              >
                <Text style={styles.compactPlanButtonText}>Calcular Ruta 🚴</Text>
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
  planButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    marginTop: 8,
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
  },
  toggleIcon: {
    fontSize: 14,
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
    fontWeight: '700',
```

---

## 🕐 27/04/2026, 18:37:24

### 📊 Resumen
- **Total archivos:** 33
- **📝 Nuevos:** 26
- **✏️ Modificados:** 6
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +480
- **Líneas eliminadas:** -336
- **Balance neto:** +144 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `DICCIONARIO.md` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/formatColombianPhone.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/selfRegister.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/sendPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signIn.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signOut.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signUp.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/verifyPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/calculateDistance.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/isSameLocation.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/reverseGeocode.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/searchPlaces.ts` | nuevo | -0 | 0 |
| 🆕 | `src/components/map/PlannerMap.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationInput.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationSearch.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/SwapLocationsButton.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/config/backendUrl.ts` | nuevo | -0 | 0 |
| 🆕 | `src/config/mapbox.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/quickConnectionTest.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/testEndpoint.ts` | nuevo | -0 | 0 |
| 🆕 | `src/screens/map/LocationSearchScreen.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/store/plannerStore.ts` | nuevo | -0 | 0 |
| 🆕 | `src/types/planner.ts` | nuevo | -0 | 0 |
| ✏️ | `src/screens/map/PlannerScreen.tsx` | +409 | -4 | +405 |
| ✏️ | `src/api/auth.ts` | +9 | -221 | -212 |
| ✏️ | `src/debug/checkBackendConnection.ts` | +7 | -87 | -80 |
| ✏️ | `src/screens/map/MapScreen.tsx` | +52 | -15 | +37 |
| ✏️ | `.env.example` | +0 | -9 | -9 |
| ✏️ | `src/constants/colors.ts` | +3 | -0 | +3 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (33)</summary>

**🆕 Nuevos:**
```
DICCIONARIO.md
src/api/auth/formatColombianPhone.ts
src/api/auth/index.ts
src/api/auth/selfRegister.ts
src/api/auth/sendPhoneOTP.ts
src/api/auth/signIn.ts
src/api/auth/signOut.ts
src/api/auth/signUp.ts
src/api/auth/verifyPhoneOTP.ts
src/api/geocoding.ts
src/api/geocoding/calculateDistance.ts
src/api/geocoding/index.ts
src/api/geocoding/isSameLocation.ts
src/api/geocoding/reverseGeocode.ts
src/api/geocoding/searchPlaces.ts
src/components/map/PlannerMap.tsx
src/components/planner/LocationInput.tsx
src/components/planner/LocationSearch.tsx
src/components/planner/SwapLocationsButton.tsx
src/config/backendUrl.ts
src/config/mapbox.ts
src/debug/quickConnectionTest.ts
src/debug/testEndpoint.ts
src/screens/map/LocationSearchScreen.tsx
src/store/plannerStore.ts
src/types/planner.ts
```

**✏️ Modificados:**
```
src/screens/map/PlannerScreen.tsx
src/api/auth.ts
src/debug/checkBackendConnection.ts
src/screens/map/MapScreen.tsx
.env.example
src/constants/colors.ts
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

### 💻 Código Añadido

**src/api/auth.ts** (+9 líneas)**

```
export {
  selfRegister,
  signUp,
  signIn,
  signOut,
  sendPhoneOTP,
  verifyPhoneOTP,
  formatColombianPhone,
} from './auth/index'
```

**src/constants/colors.ts** (+3 líneas)**

```
  // Secundario
  secondary: '#f5f5f5',

```

**src/debug/checkBackendConnection.ts** (+7 líneas)**

```
import { BACKEND_URL } from '@/config/backendUrl'






```

**src/screens/map/MapScreen.tsx** (+52 líneas)**

```
        
        // 1. Usar última ubicación conocida PRIMERO (instantáneo)
        const lastLocation = await Location.getLastKnownPositionAsync()
        if (lastLocation) {
          console.log('Última ubicación conocida:', lastLocation.coords)
          const userCoords = {
            latitude: lastLocation.coords.latitude,
            longitude: lastLocation.coords.longitude,
          }
          setUserLocation(userCoords)
          setCameraCoords({
            longitude: userCoords.longitude,
            latitude: userCoords.latitude,
            zoom: 16,
          })
        } else {
          // Fallback: centrar en Bogotá mientras espera
          setCameraCoords({
            longitude: -74.0721,
            latitude: 4.711,
            zoom: 13,
          })
        // 2. Obtener ubicación más precisa en background (sin bloquear UI)
        Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
          .then((location) => {
            console.log('Ubicación actualizada:', location.coords)
            const userCoords = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }
            setUserLocation(userCoords)
            // Actualizar con ubicación más precisa
            setCameraCoords({
              longitude: userCoords.longitude,
              latitude: userCoords.latitude,
              zoom: 16,
            })
          })
          .catch((error) => console.error('Error obteniendo ubicación precisa:', error))
        // Fallback: centrar en Bogotá
        setCameraCoords({
          longitude: -74.0721,
          latitude: 4.711,
          zoom: 13,
        })
      // Fallback: centrar en Bogotá
      setCameraCoords({
        longitude: -74.0721,
        latitude: 4.711,
        zoom: 13,
      })
```

**src/screens/map/PlannerScreen.tsx** (+409 líneas)**

```
import { useCallback, useEffect, useState, useRef } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
  Animated,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { PlannerMap } from '@/components/map/PlannerMap'
import { LocationInput } from '@/components/planner/LocationInput'
import { LocationSearchScreen } from './LocationSearchScreen'
import { SwapLocationsButton } from '@/components/planner/SwapLocationsButton'
import { reverseGeocode } from '@/api/geocoding'
  const insets = useSafeAreaInsets()
  const {
    origin,
    destination,
    selectingMode,
    error,
    setOrigin,
    setDestination,
    setSelectingMode,
    setError,
    swapLocations,
    clearLocations,
  } = usePlannerStore()

  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null)
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

  const handleStartPlanning = useCallback(() => {
    if (origin && destination) {
      console.log('Iniciando planificación de ruta:', { origin, destination })
    }
  }, [origin, destination])

  // Si está en modo de selección, mostrar pantalla fullscreen de búsqueda
  if (selectingMode) {
    return (
      <LocationSearchScreen
        type={selectingMode}
        onSelect={(location) => handleLocationSelect(location, selectingMode)}
        onCancel={() => {
          setSelectingMode(null)
          setError(null)
        }}
        excludeLocation={selectingMode === 'origin' ? destination : origin}
        userLocation={userLocation}
        onUseMyLocation={handleUseMyLocation}
      />
    )
  }

      {/* Mapa */}
      <PlannerMap
        origin={origin}
        destination={destination}
        selectingMode={selectingMode}
        onLocationSelect={handleLocationSelect}
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
            <Text style={styles.toggleIcon}>{isPanelExpanded ? '🔽' : '🔼'}</Text>
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
            {error && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>⚠️ {error}</Text>
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
                style={styles.planButton}
                onPress={handleStartPlanning}
                activeOpacity={0.8}
              >
                <Text style={styles.planButtonText}>Calcular Ruta 🚴</Text>
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
                style={styles.compactPlanButton}
                onPress={handleStartPlanning}
                activeOpacity={0.8}
              >
                <Text style={styles.compactPlanButtonText}>Calcular Ruta 🚴</Text>
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
  clearAllButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 12,
    backgroundColor: `${COLORS.primary}15`,
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
    padding: 8,
    marginBottom: 8,
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
  },
  toggleIcon: {
    fontSize: 20,
    color: COLORS.primary,
    fontWeight: '900',
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
    fontWeight: '700',
```

---

## 🕐 27/04/2026, 18:41:21

### 📊 Resumen
- **Total archivos:** 33
- **📝 Nuevos:** 26
- **✏️ Modificados:** 6
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +477
- **Líneas eliminadas:** -337
- **Balance neto:** +140 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `DICCIONARIO.md` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/formatColombianPhone.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/selfRegister.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/sendPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signIn.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signOut.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signUp.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/verifyPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/calculateDistance.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/isSameLocation.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/reverseGeocode.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/searchPlaces.ts` | nuevo | -0 | 0 |
| 🆕 | `src/components/map/PlannerMap.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationInput.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationSearch.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/SwapLocationsButton.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/config/backendUrl.ts` | nuevo | -0 | 0 |
| 🆕 | `src/config/mapbox.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/quickConnectionTest.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/testEndpoint.ts` | nuevo | -0 | 0 |
| 🆕 | `src/screens/map/LocationSearchScreen.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/store/plannerStore.ts` | nuevo | -0 | 0 |
| 🆕 | `src/types/planner.ts` | nuevo | -0 | 0 |
| ✏️ | `src/screens/map/PlannerScreen.tsx` | +406 | -5 | +401 |
| ✏️ | `src/api/auth.ts` | +9 | -221 | -212 |
| ✏️ | `src/debug/checkBackendConnection.ts` | +7 | -87 | -80 |
| ✏️ | `src/screens/map/MapScreen.tsx` | +52 | -15 | +37 |
| ✏️ | `.env.example` | +0 | -9 | -9 |
| ✏️ | `src/constants/colors.ts` | +3 | -0 | +3 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (33)</summary>

**🆕 Nuevos:**
```
DICCIONARIO.md
src/api/auth/formatColombianPhone.ts
src/api/auth/index.ts
src/api/auth/selfRegister.ts
src/api/auth/sendPhoneOTP.ts
src/api/auth/signIn.ts
src/api/auth/signOut.ts
src/api/auth/signUp.ts
src/api/auth/verifyPhoneOTP.ts
src/api/geocoding.ts
src/api/geocoding/calculateDistance.ts
src/api/geocoding/index.ts
src/api/geocoding/isSameLocation.ts
src/api/geocoding/reverseGeocode.ts
src/api/geocoding/searchPlaces.ts
src/components/map/PlannerMap.tsx
src/components/planner/LocationInput.tsx
src/components/planner/LocationSearch.tsx
src/components/planner/SwapLocationsButton.tsx
src/config/backendUrl.ts
src/config/mapbox.ts
src/debug/quickConnectionTest.ts
src/debug/testEndpoint.ts
src/screens/map/LocationSearchScreen.tsx
src/store/plannerStore.ts
src/types/planner.ts
```

**✏️ Modificados:**
```
src/screens/map/PlannerScreen.tsx
src/api/auth.ts
src/debug/checkBackendConnection.ts
src/screens/map/MapScreen.tsx
.env.example
src/constants/colors.ts
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

### 💻 Código Añadido

**src/api/auth.ts** (+9 líneas)**

```
export {
  selfRegister,
  signUp,
  signIn,
  signOut,
  sendPhoneOTP,
  verifyPhoneOTP,
  formatColombianPhone,
} from './auth/index'
```

**src/constants/colors.ts** (+3 líneas)**

```
  // Secundario
  secondary: '#f5f5f5',

```

**src/debug/checkBackendConnection.ts** (+7 líneas)**

```
import { BACKEND_URL } from '@/config/backendUrl'






```

**src/screens/map/MapScreen.tsx** (+52 líneas)**

```
        
        // 1. Usar última ubicación conocida PRIMERO (instantáneo)
        const lastLocation = await Location.getLastKnownPositionAsync()
        if (lastLocation) {
          console.log('Última ubicación conocida:', lastLocation.coords)
          const userCoords = {
            latitude: lastLocation.coords.latitude,
            longitude: lastLocation.coords.longitude,
          }
          setUserLocation(userCoords)
          setCameraCoords({
            longitude: userCoords.longitude,
            latitude: userCoords.latitude,
            zoom: 16,
          })
        } else {
          // Fallback: centrar en Bogotá mientras espera
          setCameraCoords({
            longitude: -74.0721,
            latitude: 4.711,
            zoom: 13,
          })
        // 2. Obtener ubicación más precisa en background (sin bloquear UI)
        Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
          .then((location) => {
            console.log('Ubicación actualizada:', location.coords)
            const userCoords = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }
            setUserLocation(userCoords)
            // Actualizar con ubicación más precisa
            setCameraCoords({
              longitude: userCoords.longitude,
              latitude: userCoords.latitude,
              zoom: 16,
            })
          })
          .catch((error) => console.error('Error obteniendo ubicación precisa:', error))
        // Fallback: centrar en Bogotá
        setCameraCoords({
          longitude: -74.0721,
          latitude: 4.711,
          zoom: 13,
        })
      // Fallback: centrar en Bogotá
      setCameraCoords({
        longitude: -74.0721,
        latitude: 4.711,
        zoom: 13,
      })
```

**src/screens/map/PlannerScreen.tsx** (+406 líneas)**

```
import { useCallback, useEffect, useState, useRef } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
  Animated,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { PlannerMap } from '@/components/map/PlannerMap'
import { LocationInput } from '@/components/planner/LocationInput'
import { LocationSearchScreen } from './LocationSearchScreen'
import { SwapLocationsButton } from '@/components/planner/SwapLocationsButton'
import { reverseGeocode } from '@/api/geocoding'
  const insets = useSafeAreaInsets()
  const {
    origin,
    destination,
    selectingMode,
    error,
    setOrigin,
    setDestination,
    setSelectingMode,
    setError,
    swapLocations,
    clearLocations,
  } = usePlannerStore()

  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null)
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

  const handleStartPlanning = useCallback(() => {
    if (origin && destination) {
      console.log('Iniciando planificación de ruta:', { origin, destination })
    }
  }, [origin, destination])

  // Si está en modo de selección, mostrar pantalla fullscreen de búsqueda
  if (selectingMode) {
    return (
      <LocationSearchScreen
        type={selectingMode}
        onSelect={(location) => handleLocationSelect(location, selectingMode)}
        onCancel={() => {
          setSelectingMode(null)
          setError(null)
        }}
        excludeLocation={selectingMode === 'origin' ? destination : origin}
        userLocation={userLocation}
        onUseMyLocation={handleUseMyLocation}
      />
    )
  }

      {/* Mapa */}
      <PlannerMap
        origin={origin}
        destination={destination}
        selectingMode={selectingMode}
        onLocationSelect={handleLocationSelect}
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
            <Text style={styles.toggleIcon}>{isPanelExpanded ? '⌄' : '⌃'}</Text>
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
            {error && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>⚠️ {error}</Text>
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
                style={styles.planButton}
                onPress={handleStartPlanning}
                activeOpacity={0.8}
              >
                <Text style={styles.planButtonText}>Calcular Ruta 🚴</Text>
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
                style={styles.compactPlanButton}
                onPress={handleStartPlanning}
                activeOpacity={0.8}
              >
                <Text style={styles.compactPlanButtonText}>Calcular Ruta 🚴</Text>
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
  planButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    marginTop: 8,
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
    fontWeight: '700',
```

---

## 🕐 27/04/2026, 18:41:55

### 📊 Resumen
- **Total archivos:** 33
- **📝 Nuevos:** 26
- **✏️ Modificados:** 6
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +480
- **Líneas eliminadas:** -336
- **Balance neto:** +144 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `DICCIONARIO.md` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/formatColombianPhone.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/selfRegister.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/sendPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signIn.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signOut.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signUp.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/verifyPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/calculateDistance.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/isSameLocation.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/reverseGeocode.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/searchPlaces.ts` | nuevo | -0 | 0 |
| 🆕 | `src/components/map/PlannerMap.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationInput.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationSearch.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/SwapLocationsButton.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/config/backendUrl.ts` | nuevo | -0 | 0 |
| 🆕 | `src/config/mapbox.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/quickConnectionTest.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/testEndpoint.ts` | nuevo | -0 | 0 |
| 🆕 | `src/screens/map/LocationSearchScreen.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/store/plannerStore.ts` | nuevo | -0 | 0 |
| 🆕 | `src/types/planner.ts` | nuevo | -0 | 0 |
| ✏️ | `src/screens/map/PlannerScreen.tsx` | +409 | -4 | +405 |
| ✏️ | `src/api/auth.ts` | +9 | -221 | -212 |
| ✏️ | `src/debug/checkBackendConnection.ts` | +7 | -87 | -80 |
| ✏️ | `src/screens/map/MapScreen.tsx` | +52 | -15 | +37 |
| ✏️ | `.env.example` | +0 | -9 | -9 |
| ✏️ | `src/constants/colors.ts` | +3 | -0 | +3 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (33)</summary>

**🆕 Nuevos:**
```
DICCIONARIO.md
src/api/auth/formatColombianPhone.ts
src/api/auth/index.ts
src/api/auth/selfRegister.ts
src/api/auth/sendPhoneOTP.ts
src/api/auth/signIn.ts
src/api/auth/signOut.ts
src/api/auth/signUp.ts
src/api/auth/verifyPhoneOTP.ts
src/api/geocoding.ts
src/api/geocoding/calculateDistance.ts
src/api/geocoding/index.ts
src/api/geocoding/isSameLocation.ts
src/api/geocoding/reverseGeocode.ts
src/api/geocoding/searchPlaces.ts
src/components/map/PlannerMap.tsx
src/components/planner/LocationInput.tsx
src/components/planner/LocationSearch.tsx
src/components/planner/SwapLocationsButton.tsx
src/config/backendUrl.ts
src/config/mapbox.ts
src/debug/quickConnectionTest.ts
src/debug/testEndpoint.ts
src/screens/map/LocationSearchScreen.tsx
src/store/plannerStore.ts
src/types/planner.ts
```

**✏️ Modificados:**
```
src/screens/map/PlannerScreen.tsx
src/api/auth.ts
src/debug/checkBackendConnection.ts
src/screens/map/MapScreen.tsx
.env.example
src/constants/colors.ts
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

### 💻 Código Añadido

**src/api/auth.ts** (+9 líneas)**

```
export {
  selfRegister,
  signUp,
  signIn,
  signOut,
  sendPhoneOTP,
  verifyPhoneOTP,
  formatColombianPhone,
} from './auth/index'
```

**src/constants/colors.ts** (+3 líneas)**

```
  // Secundario
  secondary: '#f5f5f5',

```

**src/debug/checkBackendConnection.ts** (+7 líneas)**

```
import { BACKEND_URL } from '@/config/backendUrl'






```

**src/screens/map/MapScreen.tsx** (+52 líneas)**

```
        
        // 1. Usar última ubicación conocida PRIMERO (instantáneo)
        const lastLocation = await Location.getLastKnownPositionAsync()
        if (lastLocation) {
          console.log('Última ubicación conocida:', lastLocation.coords)
          const userCoords = {
            latitude: lastLocation.coords.latitude,
            longitude: lastLocation.coords.longitude,
          }
          setUserLocation(userCoords)
          setCameraCoords({
            longitude: userCoords.longitude,
            latitude: userCoords.latitude,
            zoom: 16,
          })
        } else {
          // Fallback: centrar en Bogotá mientras espera
          setCameraCoords({
            longitude: -74.0721,
            latitude: 4.711,
            zoom: 13,
          })
        // 2. Obtener ubicación más precisa en background (sin bloquear UI)
        Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
          .then((location) => {
            console.log('Ubicación actualizada:', location.coords)
            const userCoords = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }
            setUserLocation(userCoords)
            // Actualizar con ubicación más precisa
            setCameraCoords({
              longitude: userCoords.longitude,
              latitude: userCoords.latitude,
              zoom: 16,
            })
          })
          .catch((error) => console.error('Error obteniendo ubicación precisa:', error))
        // Fallback: centrar en Bogotá
        setCameraCoords({
          longitude: -74.0721,
          latitude: 4.711,
          zoom: 13,
        })
      // Fallback: centrar en Bogotá
      setCameraCoords({
        longitude: -74.0721,
        latitude: 4.711,
        zoom: 13,
      })
```

**src/screens/map/PlannerScreen.tsx** (+409 líneas)**

```
import { useCallback, useEffect, useState, useRef } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
  Animated,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { PlannerMap } from '@/components/map/PlannerMap'
import { LocationInput } from '@/components/planner/LocationInput'
import { LocationSearchScreen } from './LocationSearchScreen'
import { SwapLocationsButton } from '@/components/planner/SwapLocationsButton'
import { reverseGeocode } from '@/api/geocoding'
  const insets = useSafeAreaInsets()
  const {
    origin,
    destination,
    selectingMode,
    error,
    setOrigin,
    setDestination,
    setSelectingMode,
    setError,
    swapLocations,
    clearLocations,
  } = usePlannerStore()

  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null)
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

  const handleStartPlanning = useCallback(() => {
    if (origin && destination) {
      console.log('Iniciando planificación de ruta:', { origin, destination })
    }
  }, [origin, destination])

  // Si está en modo de selección, mostrar pantalla fullscreen de búsqueda
  if (selectingMode) {
    return (
      <LocationSearchScreen
        type={selectingMode}
        onSelect={(location) => handleLocationSelect(location, selectingMode)}
        onCancel={() => {
          setSelectingMode(null)
          setError(null)
        }}
        excludeLocation={selectingMode === 'origin' ? destination : origin}
        userLocation={userLocation}
        onUseMyLocation={handleUseMyLocation}
      />
    )
  }

      {/* Mapa */}
      <PlannerMap
        origin={origin}
        destination={destination}
        selectingMode={selectingMode}
        onLocationSelect={handleLocationSelect}
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
            <Text style={styles.toggleIcon}>{isPanelExpanded ? '⌄' : '⌃'}</Text>
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
            {error && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>⚠️ {error}</Text>
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
                style={styles.planButton}
                onPress={handleStartPlanning}
                activeOpacity={0.8}
              >
                <Text style={styles.planButtonText}>Calcular Ruta 🚴</Text>
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
                style={styles.compactPlanButton}
                onPress={handleStartPlanning}
                activeOpacity={0.8}
              >
                <Text style={styles.compactPlanButtonText}>Calcular Ruta 🚴</Text>
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
  clearAllButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 12,
    backgroundColor: `${COLORS.primary}15`,
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
    padding: 8,
    marginBottom: 8,
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
  },
  toggleIcon: {
    fontSize: 20,
    color: COLORS.primary,
    fontWeight: '900',
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
    fontWeight: '700',
```

---

## 🕐 27/04/2026, 18:44:00

### 📊 Resumen
- **Total archivos:** 33
- **📝 Nuevos:** 26
- **✏️ Modificados:** 6
- **🗑️ Eliminados:** 1
- **Líneas añadidas:** +481
- **Líneas eliminadas:** -336
- **Balance neto:** +145 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `DICCIONARIO.md` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/formatColombianPhone.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/selfRegister.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/sendPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signIn.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signOut.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/signUp.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/auth/verifyPhoneOTP.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/calculateDistance.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/index.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/isSameLocation.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/reverseGeocode.ts` | nuevo | -0 | 0 |
| 🆕 | `src/api/geocoding/searchPlaces.ts` | nuevo | -0 | 0 |
| 🆕 | `src/components/map/PlannerMap.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationInput.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/LocationSearch.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/components/planner/SwapLocationsButton.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/config/backendUrl.ts` | nuevo | -0 | 0 |
| 🆕 | `src/config/mapbox.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/quickConnectionTest.ts` | nuevo | -0 | 0 |
| 🆕 | `src/debug/testEndpoint.ts` | nuevo | -0 | 0 |
| 🆕 | `src/screens/map/LocationSearchScreen.tsx` | nuevo | -0 | 0 |
| 🆕 | `src/store/plannerStore.ts` | nuevo | -0 | 0 |
| 🆕 | `src/types/planner.ts` | nuevo | -0 | 0 |
| ✏️ | `src/screens/map/PlannerScreen.tsx` | +410 | -4 | +406 |
| ✏️ | `src/api/auth.ts` | +9 | -221 | -212 |
| ✏️ | `src/debug/checkBackendConnection.ts` | +7 | -87 | -80 |
| ✏️ | `src/screens/map/MapScreen.tsx` | +52 | -15 | +37 |
| ✏️ | `.env.example` | +0 | -9 | -9 |
| ✏️ | `src/constants/colors.ts` | +3 | -0 | +3 |
| 🗑️ | `.env.example` | +0 | eliminado | 0 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (33)</summary>

**🆕 Nuevos:**
```
DICCIONARIO.md
src/api/auth/formatColombianPhone.ts
src/api/auth/index.ts
src/api/auth/selfRegister.ts
src/api/auth/sendPhoneOTP.ts
src/api/auth/signIn.ts
src/api/auth/signOut.ts
src/api/auth/signUp.ts
src/api/auth/verifyPhoneOTP.ts
src/api/geocoding.ts
src/api/geocoding/calculateDistance.ts
src/api/geocoding/index.ts
src/api/geocoding/isSameLocation.ts
src/api/geocoding/reverseGeocode.ts
src/api/geocoding/searchPlaces.ts
src/components/map/PlannerMap.tsx
src/components/planner/LocationInput.tsx
src/components/planner/LocationSearch.tsx
src/components/planner/SwapLocationsButton.tsx
src/config/backendUrl.ts
src/config/mapbox.ts
src/debug/quickConnectionTest.ts
src/debug/testEndpoint.ts
src/screens/map/LocationSearchScreen.tsx
src/store/plannerStore.ts
src/types/planner.ts
```

**✏️ Modificados:**
```
src/screens/map/PlannerScreen.tsx
src/api/auth.ts
src/debug/checkBackendConnection.ts
src/screens/map/MapScreen.tsx
.env.example
src/constants/colors.ts
```

**🗑️ Eliminados:**
```
.env.example
```

</details>

### 💻 Código Añadido

**src/api/auth.ts** (+9 líneas)**

```
export {
  selfRegister,
  signUp,
  signIn,
  signOut,
  sendPhoneOTP,
  verifyPhoneOTP,
  formatColombianPhone,
} from './auth/index'
```

**src/constants/colors.ts** (+3 líneas)**

```
  // Secundario
  secondary: '#f5f5f5',

```

**src/debug/checkBackendConnection.ts** (+7 líneas)**

```
import { BACKEND_URL } from '@/config/backendUrl'






```

**src/screens/map/MapScreen.tsx** (+52 líneas)**

```
        
        // 1. Usar última ubicación conocida PRIMERO (instantáneo)
        const lastLocation = await Location.getLastKnownPositionAsync()
        if (lastLocation) {
          console.log('Última ubicación conocida:', lastLocation.coords)
          const userCoords = {
            latitude: lastLocation.coords.latitude,
            longitude: lastLocation.coords.longitude,
          }
          setUserLocation(userCoords)
          setCameraCoords({
            longitude: userCoords.longitude,
            latitude: userCoords.latitude,
            zoom: 16,
          })
        } else {
          // Fallback: centrar en Bogotá mientras espera
          setCameraCoords({
            longitude: -74.0721,
            latitude: 4.711,
            zoom: 13,
          })
        // 2. Obtener ubicación más precisa en background (sin bloquear UI)
        Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
          .then((location) => {
            console.log('Ubicación actualizada:', location.coords)
            const userCoords = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }
            setUserLocation(userCoords)
            // Actualizar con ubicación más precisa
            setCameraCoords({
              longitude: userCoords.longitude,
              latitude: userCoords.latitude,
              zoom: 16,
            })
          })
          .catch((error) => console.error('Error obteniendo ubicación precisa:', error))
        // Fallback: centrar en Bogotá
        setCameraCoords({
          longitude: -74.0721,
          latitude: 4.711,
          zoom: 13,
        })
      // Fallback: centrar en Bogotá
      setCameraCoords({
        longitude: -74.0721,
        latitude: 4.711,
        zoom: 13,
      })
```

**src/screens/map/PlannerScreen.tsx** (+410 líneas)**

```
import { useCallback, useEffect, useState, useRef } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
  Animated,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { PlannerMap } from '@/components/map/PlannerMap'
import { LocationInput } from '@/components/planner/LocationInput'
import { LocationSearchScreen } from './LocationSearchScreen'
import { SwapLocationsButton } from '@/components/planner/SwapLocationsButton'
import { reverseGeocode } from '@/api/geocoding'
  const insets = useSafeAreaInsets()
  const {
    origin,
    destination,
    selectingMode,
    error,
    setOrigin,
    setDestination,
    setSelectingMode,
    setError,
    swapLocations,
    clearLocations,
  } = usePlannerStore()

  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null)
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

  const handleStartPlanning = useCallback(() => {
    if (origin && destination) {
      console.log('Iniciando planificación de ruta:', { origin, destination })
    }
  }, [origin, destination])

  // Si está en modo de selección, mostrar pantalla fullscreen de búsqueda
  if (selectingMode) {
    return (
      <LocationSearchScreen
        type={selectingMode}
        onSelect={(location) => handleLocationSelect(location, selectingMode)}
        onCancel={() => {
          setSelectingMode(null)
          setError(null)
        }}
        excludeLocation={selectingMode === 'origin' ? destination : origin}
        userLocation={userLocation}
        onUseMyLocation={handleUseMyLocation}
      />
    )
  }

      {/* Mapa */}
      <PlannerMap
        origin={origin}
        destination={destination}
        selectingMode={selectingMode}
        onLocationSelect={handleLocationSelect}
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
            <Text style={styles.toggleIcon}>{isPanelExpanded ? '⌄' : '⌃'}</Text>
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
            {error && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>⚠️ {error}</Text>
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
                style={styles.planButton}
                onPress={handleStartPlanning}
                activeOpacity={0.8}
              >
                <Text style={styles.planButtonText}>Calcular Ruta 🚴</Text>
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
                style={styles.compactPlanButton}
                onPress={handleStartPlanning}
                activeOpacity={0.8}
              >
                <Text style={styles.compactPlanButtonText}>Calcular Ruta 🚴</Text>
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
  clearAllButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 12,
    backgroundColor: `${COLORS.primary}15`,
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
    alignItems: 'center',
  },
  toggleIcon: {
    fontSize: 20,
    color: COLORS.primary,
    fontWeight: '900',
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
    fontWeight: '700',
```

---
