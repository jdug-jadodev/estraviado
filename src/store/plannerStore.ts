import { create } from 'zustand'
import { LocationPoint, RouteCoordinates } from '@/types/planner'
import { isSameLocation } from '@/api/geocoding'

interface PlannerStore {
  origin: LocationPoint | null
  destination: LocationPoint | null
  selectingMode: 'origin' | 'destination' | null
  error: string | null
  
  // Acciones
  setOrigin: (location: LocationPoint | null) => boolean
  setDestination: (location: LocationPoint | null) => boolean
  setSelectingMode: (mode: 'origin' | 'destination' | null) => void
  setError: (error: string | null) => void
  swapLocations: () => void
  clearLocations: () => void
  
  // Getters
  getCoordinates: () => RouteCoordinates
  isValid: () => boolean
}

export const usePlannerStore = create<PlannerStore>((set, get) => ({
  origin: null,
  destination: null,
  selectingMode: null,
  error: null,
  
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
  
  clearLocations: () => set({ origin: null, destination: null, selectingMode: null, error: null }),
  
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
