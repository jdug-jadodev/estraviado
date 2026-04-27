import { useState, useCallback, useEffect } from 'react'
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
import { searchPlaces } from '@/api/geocoding'

interface LocationSearchScreenProps {
  onSelect: (location: LocationPoint) => void
  onCancel: () => void
  type: 'origin' | 'destination'
  excludeLocation?: LocationPoint | null
  userLocation?: LocationPoint | null
  onUseMyLocation?: () => void
}

export function LocationSearchScreen({
  onSelect,
  onCancel,
  type,
  excludeLocation = null,
  userLocation = null,
  onUseMyLocation,
}: LocationSearchScreenProps) {
  const insets = useSafeAreaInsets()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<LocationPoint[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Debounced search
  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      return
    }

    const timer = setTimeout(async () => {
      setIsLoading(true)
      try {
        const places = await searchPlaces(query)
        setResults(places)
      } catch (error) {
        console.error('Search error:', error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [query])

  const handleSelect = useCallback(
    (location: LocationPoint) => {
      if (
        excludeLocation &&
        Math.abs(location.latitude - excludeLocation.latitude) < 0.0001 &&
        Math.abs(location.longitude - excludeLocation.longitude) < 0.0001
      ) {
        alert(
          'Este lugar ya fue seleccionado como ' +
            (type === 'origin' ? 'punto de llegada' : 'punto de salida')
        )
        return
      }

      onSelect(location)
    },
    [onSelect, excludeLocation, type]
  )

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
        <Text style={styles.resultCoords}>
          {item.latitude.toFixed(4)}, {item.longitude.toFixed(4)}
        </Text>
      </View>
      <Text style={styles.arrowIcon}>→</Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView
      style={[styles.container, { paddingTop: insets.top }]}
      edges={['top', 'left', 'right']}
    >
      {/* Header con búsqueda */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onCancel} style={styles.backButton}>
          <Text style={styles.backIcon}>← Atrás</Text>
        </TouchableOpacity>
        <Text style={styles.title}>
          {type === 'origin' ? '📍 PUNTO DE SALIDA' : '🎯 PUNTO DE LLEGADA'}
        </Text>
      </View>

      {/* Buscador */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.input}
            placeholder={
              type === 'origin'
                ? 'Ej: Calle 72, Parque Arvi...'
                : 'Ej: Centro, Estadio El Campín...'
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
            <Text style={styles.emptyStateTitle}>
              {type === 'origin'
                ? 'Dónde empezamos tu viaje?'
                : 'Hacia dónde vamos?'}
            </Text>
            <Text style={styles.emptyStateSubtitle}>
              {type === 'origin'
                ? 'Escribe una dirección o lugar'
                : 'Busca tu destino'}
            </Text>

            {/* Botón de ubicación actual */}
            {userLocation && onUseMyLocation && (
              <TouchableOpacity
                style={styles.myLocationButton}
                onPress={onUseMyLocation}
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
    justifyContent: 'center',
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
  resultCoords: {
    color: COLORS.textSecondary,
    fontSize: 12,
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
})
