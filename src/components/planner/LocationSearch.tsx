import { useState, useCallback, useEffect } from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
} from 'react-native'
import { COLORS } from '@/constants/colors'
import { LocationPoint } from '@/types/planner'
import { searchPlaces } from '@/api/geocoding'

interface LocationSearchProps {
  onSelect: (location: LocationPoint) => void
  placeholder?: string
  type?: 'origin' | 'destination'
  excludeLocation?: LocationPoint | null
}

export function LocationSearch({
  onSelect,
  placeholder = 'Buscar dirección...',
  type = 'origin',
  excludeLocation = null,
}: LocationSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<LocationPoint[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)

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
        setShowResults(true)
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
      if (excludeLocation && 
          Math.abs(location.latitude - excludeLocation.latitude) < 0.0001 &&
          Math.abs(location.longitude - excludeLocation.longitude) < 0.0001) {
        alert('Este lugar ya fue seleccionado como ' + (type === 'origin' ? 'punto de llegada' : 'punto de salida'))
        return
      }
      
      onSelect(location)
      setQuery('')
      setResults([])
      setShowResults(false)
    },
    [onSelect, excludeLocation, type]
  )

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textSecondary}
          value={query}
          onChangeText={setQuery}
          onFocus={() => query.length >= 2 && setShowResults(true)}
          editable={true}
        />
        {query.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              setQuery('')
              setResults([])
              setShowResults(false)
            }}
            style={styles.clearIcon}
          >
            <Text>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {showResults && (
        <View style={styles.resultsContainer}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={COLORS.primary} />
              <Text style={styles.loadingText}>Buscando...</Text>
            </View>
          ) : results.length > 0 ? (
            <FlatList
              data={results}
              keyExtractor={(item) => item.id || item.address || `${item.latitude}-${item.longitude}`}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.resultItem}
                  onPress={() => handleSelect(item)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.resultIcon}>📍</Text>
                  <View style={styles.resultContent}>
                    <Text style={styles.resultAddress} numberOfLines={1}>
                      {item.address}
                    </Text>
                    <Text style={styles.resultCoords}>
                      {item.latitude.toFixed(4)}, {item.longitude.toFixed(4)}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          ) : (
            query.length >= 2 && (
              <View style={styles.noResults}>
                <Text style={styles.noResultsText}>No se encontraron resultados</Text>
              </View>
            )
          )}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    backgroundColor: `${COLORS.primary}10`,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: COLORS.text,
    fontSize: 14,
    paddingVertical: 8,
  },
  clearIcon: {
    padding: 4,
  },
  resultsContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    maxHeight: 200,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  loadingText: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  resultIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  resultContent: {
    flex: 1,
  },
  resultAddress: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  resultCoords: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  noResults: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  noResultsText: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
})
