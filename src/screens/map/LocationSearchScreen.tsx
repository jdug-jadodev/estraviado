import { useCallback } from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  FlatList,
} from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { COLORS } from '@/constants/colors'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { useLocationSearch } from '@/hooks/useLocationSearch'
import { useLocationValidation } from '@/hooks/useLocationValidation'

/**
 * Pantalla de búsqueda de ubicaciones
 * No recibe props - obtiene estado directamente del store
 * Esto elimina prop drilling de múltiples niveles
 */
export function LocationSearchScreen() {
  const insets = useSafeAreaInsets()
  
  // Obtenemos estado del store directamente
  const {
    selectingMode,
    origin,
    destination,
    userLocation,
    setSelectingMode,
    setPinDropMode,
  } = usePlannerStore()

  // Usamos custom hook para búsqueda
  const { query, results, isLoading, setQuery, clearSearch } = useLocationSearch()

  // Usamos custom hook para validación
  const { validateExcludedLocation } = useLocationValidation()

  // Determinamos la ubicación a excluir (la del otro punto)
  const excludeLocation = selectingMode === 'origin' ? destination : origin

  const handleSelect = useCallback(
    (location: LocationPoint) => {
      // Validar que no sea la misma ubicación
      const validation = validateExcludedLocation(location, excludeLocation)
      if (!validation.isValid) {
        alert(validation.message)
        return
      }

      // Guardar la ubicación seleccionada en el store
      if (selectingMode === 'origin') {
        const success = usePlannerStore.getState().setOrigin(location)
        if (success) {
          setSelectingMode(null)
          clearSearch()
        }
      } else if (selectingMode === 'destination') {
        const success = usePlannerStore.getState().setDestination(location)
        if (success) {
          setSelectingMode(null)
          clearSearch()
        }
      }
    },
    [excludeLocation, selectingMode, setSelectingMode, clearSearch, validateExcludedLocation]
  )

  const handleCancel = useCallback(() => {
    setSelectingMode(null)
    clearSearch()
  }, [setSelectingMode, clearSearch])

  const handleUseMyLocation = useCallback(() => {
    if (!userLocation) return

    if (selectingMode === 'origin') {
      const success = usePlannerStore.getState().setOrigin(userLocation)
      if (success) {
        setSelectingMode(null)
        clearSearch()
      }
    } else if (selectingMode === 'destination') {
      const success = usePlannerStore.getState().setDestination(userLocation)
      if (success) {
        setSelectingMode(null)
        clearSearch()
      }
    }
  }, [userLocation, selectingMode, setSelectingMode, clearSearch])

  const handleMarkOriginOnMap = useCallback(() => {
    clearSearch()
    setSelectingMode(null)
    setPinDropMode('origin')
  }, [clearSearch, setSelectingMode, setPinDropMode])

  const handleMarkDestinationOnMap = useCallback(() => {
    clearSearch()
    setSelectingMode(null)
    setPinDropMode('destination')
  }, [clearSearch, setSelectingMode, setPinDropMode])

  const renderResultItem = ({ item }: { item: LocationPoint }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => handleSelect(item)}
      activeOpacity={0.7}
    >
      <Text style={styles.resultIcon}>📍</Text>
      <View style={styles.resultContent}>
        <Text style={styles.resultAddress} numberOfLines={2}>
          {item.address}
        </Text>
      </View>
      <Text style={styles.arrowIcon}>→</Text>
    </TouchableOpacity>
  )

  const screenTitle =
    selectingMode === 'origin' ? '📍 PUNTO DE SALIDA' : '🎯 PUNTO DE LLEGADA'
  const placeholders = {
    origin: 'Ej: Calle 72, Parque Arvi...',
    destination: 'Ej: Centro, Estadio El Campín...',
  }
  const emptyTitle =
    selectingMode === 'origin'
      ? 'Dónde empezamos tu viaje?'
      : 'Hacia dónde vamos?'
  const emptySubtitle =
    selectingMode === 'origin'
      ? 'Escribe una dirección o lugar'
      : 'Busca tu destino'

  return (
    <SafeAreaView
      style={[styles.container, { paddingTop: insets.top }]}
      edges={['top', 'left', 'right']}
    >
      {/* Header con búsqueda */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel} style={styles.backButton}>
          <Text style={styles.backIcon}>← Atrás</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{screenTitle}</Text>
      </View>

      {/* Buscador */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.input}
            placeholder={
              selectingMode === 'origin'
                ? placeholders.origin
                : placeholders.destination
            }
            placeholderTextColor={COLORS.textSecondary}
            value={query}
            onChangeText={setQuery}
            autoFocus
            editable={true}
          />
          {query.length > 0 && (
            <TouchableOpacity
              onPress={() => setQuery('')}
              style={styles.clearIcon}
            >
              <Text>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Contenido */}
      <View style={styles.content}>
        {query.length === 0 ? (
          // Pantalla inicial sin búsqueda
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>🗺️</Text>
            <Text style={styles.emptyStateTitle}>{emptyTitle}</Text>
            <Text style={styles.emptyStateSubtitle}>{emptySubtitle}</Text>

            {/* Botón de ubicación actual */}
            {userLocation && (
              <TouchableOpacity
                style={styles.myLocationButton}
                onPress={handleUseMyLocation}
                activeOpacity={0.8}
              >
                <Text style={styles.myLocationIcon}>📌</Text>
                <View>
                  <Text style={styles.myLocationTitle}>Usar mi ubicación</Text>
                  {userLocation.address && (
                    <Text style={styles.myLocationSubtitle}>
                      {userLocation.address}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            )}

            {/* Botón de marcar punto en el mapa — solo el del modo activo */}
            {selectingMode === 'origin' && (
              <TouchableOpacity
                style={[styles.pinButton, styles.pinButtonOrigin]}
                onPress={handleMarkOriginOnMap}
                activeOpacity={0.8}
              >
                <Text style={styles.pinButtonIcon}>📍</Text>
                <View style={styles.pinButtonContent}>
                  <Text style={styles.pinButtonTitle}>Marcar punto de salida en el mapa</Text>
                  <Text style={styles.pinButtonSubtitle}>
                    {origin ? `✓ ${origin.address}` : 'Toca el mapa para marcar'}
                  </Text>
                </View>
              </TouchableOpacity>
            )}

            {selectingMode === 'destination' && (
              <TouchableOpacity
                style={[styles.pinButton, styles.pinButtonDestination]}
                onPress={handleMarkDestinationOnMap}
                activeOpacity={0.8}
              >
                <Text style={styles.pinButtonIcon}>🎯</Text>
                <View style={styles.pinButtonContent}>
                  <Text style={styles.pinButtonTitle}>Marcar punto de llegada en el mapa</Text>
                  <Text style={styles.pinButtonSubtitle}>
                    {destination ? `✓ ${destination.address}` : 'Toca el mapa para marcar'}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        ) : isLoading ? (
          // Loading
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>Buscando resultados...</Text>
          </View>
        ) : results.length > 0 ? (
          // Resultados
          <FlatList
            data={results}
            keyExtractor={(item) => item.id || `${item.latitude}-${item.longitude}`}
            renderItem={renderResultItem}
            contentContainerStyle={styles.resultsList}
            showsVerticalScrollIndicator={true}
            scrollIndicatorInsets={{ right: -10 }}
          />
        ) : (
          // Sin resultados
          <View style={styles.noResults}>
            <Text style={styles.noResultsIcon}>🔍</Text>
            <Text style={styles.noResultsTitle}>Sin resultados</Text>
            <Text style={styles.noResultsSubtitle}>
              Intenta con otra búsqueda
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  backIcon: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  title: {
    flex: 1,
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '700',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: `${COLORS.primary}15`,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: COLORS.text,
    fontSize: 16,
    paddingVertical: 0,
  },
  clearIcon: {
    padding: 6,
    paddingLeft: 8,
  },
  content: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 32,
    textAlign: 'center',
  },
  myLocationButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 12,
  },
  myLocationIcon: {
    fontSize: 24,
  },
  myLocationTitle: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  myLocationSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginTop: 12,
  },
  resultsList: {
    paddingVertical: 8,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  resultIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  resultContent: {
    flex: 1,
  },
  resultAddress: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
  },
  arrowIcon: {
    color: COLORS.textSecondary,
    fontSize: 16,
    marginLeft: 8,
  },
  noResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  noResultsTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  noResultsSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  pinButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginTop: 12,
    borderWidth: 1.5,
    gap: 12,
  },
  pinButtonOrigin: {
    backgroundColor: `#10b98115`,
    borderColor: '#10b981',
  },
  pinButtonDestination: {
    backgroundColor: `#ef444415`,
    borderColor: '#ef4444',
  },
  pinButtonIcon: {
    fontSize: 24,
  },
  pinButtonContent: {
    flex: 1,
  },
  pinButtonTitle: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  pinButtonSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
})
