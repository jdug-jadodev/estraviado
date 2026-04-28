/**
 * Tipos específicos para búsqueda de ubicaciones
 */

import { LocationPoint } from './planner'

/**
 * Estado de búsqueda de lugares
 */
export interface SearchState {
  query: string
  results: LocationPoint[]
  isLoading: boolean
  error: string | null
  lastSearchTime?: number
}

/**
 * Configuración de búsqueda
 */
export interface SearchConfig {
  debounceMs: number
  minQueryLength: number
  maxResults: number
}

/**
 * Resultado de búsqueda
 */
export interface SearchResult {
  location: LocationPoint
  relevance: number
  distance?: number
}

/**
 * Tipos de búsqueda
 */
export type SearchType = 'origin' | 'destination'
