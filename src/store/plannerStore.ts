import { create } from 'zustand'
import { LocationPoint, RouteCoordinates } from '@/types/planner'
import { SearchState } from '@/types/search'
import { CalculatedRoute } from '@/types/route'
import { isSameLocation } from '@/api/geocoding'

interface PlannerStore {
  // Ubicaciones
  origin: LocationPoint | null
  destination: LocationPoint | null
  selectingMode: 'origin' | 'destination' | null
  error: string | null
  
  // Ubicación del usuario
  userLocation: LocationPoint | null
  locationError: string | null
  
  // Estado de búsqueda
  searchState: SearchState
  
  // Estado de ruta calculada
  route: CalculatedRoute | null
  isCalculatingRoute: boolean
  routeError: string | null
  
  // Acciones - Ubicaciones
  setOrigin: (location: LocationPoint | null) => boolean
  setDestination: (location: LocationPoint | null) => boolean
  setSelectingMode: (mode: 'origin' | 'destination' | null) => void
  setError: (error: string | null) => void
  swapLocations: () => void
  clearLocations: () => void
  
  // Acciones - Ubicación del usuario
  setUserLocation: (location: LocationPoint | null) => void
  setLocationError: (error: string | null) => void
  
  // Acciones - Búsqueda
  setSearchQuery: (query: string) => void
  setSearchResults: (results: LocationPoint[]) => void
  setSearchLoading: (isLoading: boolean) => void
  setSearchError: (error: string | null) => void
  clearSearch: () => void
  
  // Acciones - Ruta
  setRoute: (route: CalculatedRoute | null) => void
  setIsCalculatingRoute: (isCalculating: boolean) => void
  setRouteError: (error: string | null) => void
  clearRoute: () => void
  
  // Getters
  getCoordinates: () => RouteCoordinates
  isValid: () => boolean
}

export const usePlannerStore = create<PlannerStore>((set, get) => ({
  origin: null,
  destination: null,
  selectingMode: null,
  error: null,
  userLocation: null,
  locationError: null,
  searchState: {
    query: '',
    results: [],
    isLoading: false,
    error: null,
  },
  route: null,
  isCalculatingRoute: false,
  routeError: null,
  
  // Acciones - Ubicaciones
  setOrigin: (location) => {
    const state = get()
    
    // Validar que no sea igual al destino
    if (location && state.destination && isSameLocation(location, state.destination, 0.05)) {
      set({ error: 'El punto de salida no puede ser igual al de llegada' })
      return false
    }
    
    set({ origin: location, error: null })
    return true
  },
  
  setDestination: (location) => {
    const state = get()
    
    // Validar que no sea igual al origen
    if (location && state.origin && isSameLocation(location, state.origin, 0.05)) {
      set({ error: 'El punto de llegada no puede ser igual al de salida' })
      return false
    }
    
    set({ destination: location, error: null })
    return true
  },
  
  setSelectingMode: (mode) => set({ selectingMode: mode }),
  setError: (error) => set({ error }),
  
  swapLocations: () => {
    const state = get()
    set({
      origin: state.destination,
      destination: state.origin,
    })
  },
  
  clearLocations: () => set({ 
    origin: null, 
    destination: null, 
    selectingMode: null, 
    error: null 
  }),
  
  // Acciones - Ubicación del usuario
  setUserLocation: (location) => set({ userLocation: location, locationError: null }),
  setLocationError: (error) => set({ locationError: error }),
  
  // Acciones - Búsqueda
  setSearchQuery: (query) => set((state) => ({
    searchState: { ...state.searchState, query }
  })),
  
  setSearchResults: (results) => set((state) => ({
    searchState: { ...state.searchState, results }
  })),
  
  setSearchLoading: (isLoading) => set((state) => ({
    searchState: { ...state.searchState, isLoading }
  })),
  
  setSearchError: (error) => set((state) => ({
    searchState: { ...state.searchState, error }
  })),
  
  clearSearch: () => set((state) => ({
    searchState: { ...state.searchState, query: '', results: [], error: null }
  })),
  
  // Acciones - Ruta
  setRoute: (route) => set({ route, routeError: null }),
  setIsCalculatingRoute: (isCalculating) => set({ isCalculatingRoute: isCalculating }),
  setRouteError: (error) => set({ routeError: error }),
  clearRoute: () => set({ route: null, routeError: null }),
  
  // Getters
  getCoordinates: () => {
    const state = get()
    return {
      origin: state.origin,
      destination: state.destination,
    }
  },
  
  isValid: () => {
    const state = get()
    return state.origin !== null && state.destination !== null
  },
}))
