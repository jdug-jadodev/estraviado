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
  pinDropMode: 'origin' | 'destination' | null
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
  
  // Estado de modo dibujo
  isDrawingMode: boolean
  drawnStrokes: LocationPoint[][]
  
  // Acciones - Ubicaciones
  setOrigin: (location: LocationPoint | null) => boolean
  setDestination: (location: LocationPoint | null) => boolean
  setSelectingMode: (mode: 'origin' | 'destination' | null) => void
  setPinDropMode: (mode: 'origin' | 'destination' | null) => void
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
  
  // Acciones - Modo dibujo
  setIsDrawingMode: (isDrawing: boolean) => void
  beginNewStroke: () => void
  addDrawnPoint: (point: LocationPoint) => void
  undoLastStroke: () => void
  clearDrawnPoints: () => void
  
  // Getters
  getCoordinates: () => RouteCoordinates
  isValid: () => boolean
}

export const usePlannerStore = create<PlannerStore>((set, get) => ({
  origin: null,
  destination: null,
  selectingMode: null,
  pinDropMode: null,
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
  isDrawingMode: false,
  drawnStrokes: [],
  
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
  
  setSelectingMode: (mode) => set(
    mode !== null
      ? { selectingMode: mode, pinDropMode: null, isDrawingMode: false, drawnStrokes: [] }
      : { selectingMode: null }
  ),
  setPinDropMode: (mode) => set(
    mode !== null
      ? { pinDropMode: mode, selectingMode: null, isDrawingMode: false, drawnStrokes: [] }
      : { pinDropMode: null }
  ),
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
    pinDropMode: null,
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
  
  // Acciones - Modo dibujo
  setIsDrawingMode: (isDrawing) => set(
    isDrawing
      ? { isDrawingMode: true, selectingMode: null, pinDropMode: null, route: null, routeError: null }
      : { isDrawingMode: false }
  ),
  beginNewStroke: () => set((state) => ({
    drawnStrokes: [...state.drawnStrokes, []],
  })),
  addDrawnPoint: (point) => set((state) => {
    if (state.drawnStrokes.length === 0) return state
    const strokes = state.drawnStrokes.map((s, i) =>
      i === state.drawnStrokes.length - 1 ? [...s, point] : s
    )
    return { drawnStrokes: strokes
  }}),
  undoLastStroke: () => set((state) => ({
    drawnStrokes: state.drawnStrokes.slice(0, -1),
  })),
  clearDrawnPoints: () => set({ drawnStrokes: [], isDrawingMode: false }),
  
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
