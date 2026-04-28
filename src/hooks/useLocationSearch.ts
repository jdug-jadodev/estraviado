/**
 * Hook personalizado para búsqueda de lugares con debounce
 * Centraliza la lógica de búsqueda y gestión de estado
 */

import { useEffect, useRef, useCallback } from 'react'
import { LocationPoint } from '@/types/planner'
import { searchPlaces } from '@/api/geocoding'
import { usePlannerStore } from '@/store/plannerStore'

interface UseLocationSearchOptions {
  debounceMs?: number
  minQueryLength?: number
}

interface UseLocationSearchReturn {
  query: string
  results: LocationPoint[]
  isLoading: boolean
  error: string | null
  setQuery: (query: string) => void
  clearSearch: () => void
  search: (query: string) => Promise<LocationPoint[]>
}

/**
 * Hook para búsqueda de ubicaciones con debounce
 * Integrado con usePlannerStore para almacenamiento de estado
 */
export function useLocationSearch({
  debounceMs = 300,
  minQueryLength = 2,
}: UseLocationSearchOptions = {}): UseLocationSearchReturn {
  const {
    searchState,
    userLocation,
    setSearchQuery,
    setSearchResults,
    setSearchLoading,
    setSearchError,
    clearSearch,
  } = usePlannerStore()

  const debounceTimerRef = useRef<NodeJS.Timeout | undefined>(undefined)

  /**
   * Realiza la búsqueda de lugares
   */
  const performSearch = useCallback(
    async (query: string) => {
      if (query.length < minQueryLength) {
        setSearchResults([])
        return []
      }

      setSearchLoading(true)
      setSearchError(null)

      try {
        const results = await searchPlaces(query, userLocation || undefined)
        setSearchResults(results)
        return results
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Error en búsqueda'
        setSearchError(errorMsg)
        return []
      } finally {
        setSearchLoading(false)
      }
    },
    [minQueryLength, userLocation, setSearchResults, setSearchLoading, setSearchError]
  )

  /**
   * Establece el query con debounce
   */
  const setQuery = useCallback(
    (query: string) => {
      setSearchQuery(query)

      // Limpiar timer anterior
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }

      // Si el query es vacío, limpiar resultados
      if (query.length === 0) {
        setSearchResults([])
        return
      }

      // Establecer nuevo timer
      debounceTimerRef.current = setTimeout(() => {
        performSearch(query)
      }, debounceMs)
    },
    [debounceMs, performSearch, setSearchQuery, setSearchResults]
  )

  /**
   * Función de búsqueda directa (sin debounce)
   */
  const search = useCallback(
    async (query: string) => {
      return performSearch(query)
    },
    [performSearch]
  )

  // Cleanup del timer al desmontar
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  return {
    query: searchState.query,
    results: searchState.results,
    isLoading: searchState.isLoading,
    error: searchState.error,
    setQuery,
    clearSearch,
    search,
  }
}
