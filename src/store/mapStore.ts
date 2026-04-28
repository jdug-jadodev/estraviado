/**
 * Store global para estado del mapa con Zustand
 * Centraliza:
 * - Estado de la cámara
 * - Configuración del mapa
 * - Modo de navegación/planner
 * - Estado de marcadores
 */

import { create } from 'zustand'
import { CameraCoords, CameraState, MarkerState } from '@/types/map'

interface MapStore {
  // Camera State
  cameraCoords: CameraCoords | null
  cameraState: CameraState
  
  // Planner UI State
  plannerActive: boolean
  isPanelExpanded: boolean
  panelHeight: number
  
  // Marker State
  markerState: MarkerState
  
  // Errores
  mapError: string | null
  
  // Acciones - Cámara
  setCameraCoords: (coords: CameraCoords) => void
  updateCameraCoords: (coords: Partial<CameraCoords>) => void
  saveCameraState: (coords: CameraCoords) => void
  setIsAnimating: (isAnimating: boolean) => void
  
  // Acciones - UI del Planner
  setPlannerActive: (active: boolean) => void
  setIsPanelExpanded: (expanded: boolean) => void
  setPanelHeight: (height: number) => void
  
  // Acciones - Marcadores
  setMarkerState: (state: Partial<MarkerState>) => void
  setMarkerPosition: (position: CameraCoords | null) => void
  
  // Acciones - Errores
  setMapError: (error: string | null) => void
  
  // Reset
  resetMapState: () => void
}

const initialMarkerState: MarkerState = {
  isVisible: false,
  position: null,
  isDragging: false,
}

const initialCameraState: CameraState = {
  current: null,
  previous: null,
  isAnimating: false,
}

export const useMapStore = create<MapStore>((set, get) => ({
  cameraCoords: null,
  cameraState: initialCameraState,
  plannerActive: false,
  isPanelExpanded: true,
  panelHeight: 0,
  markerState: initialMarkerState,
  mapError: null,
  
  // Acciones - Cámara
  setCameraCoords: (coords) => {
    set((state) => ({
      cameraCoords: coords,
      cameraState: {
        ...state.cameraState,
        previous: state.cameraState.current,
        current: coords,
      },
    }))
  },
  
  updateCameraCoords: (coords) => {
    set((state) => ({
      cameraCoords: {
        ...state.cameraCoords!,
        ...coords,
      },
    }))
  },
  
  saveCameraState: (coords) => {
    set((state) => ({
      cameraCoords: coords,
      cameraState: {
        ...state.cameraState,
        previous: state.cameraState.current,
        current: coords,
      },
    }))
  },
  
  setIsAnimating: (isAnimating) => {
    set((state) => ({
      cameraState: {
        ...state.cameraState,
        isAnimating,
      },
    }))
  },
  
  // Acciones - UI del Planner
  setPlannerActive: (active) => set({ plannerActive: active }),
  setIsPanelExpanded: (expanded) => set({ isPanelExpanded: expanded }),
  setPanelHeight: (height) => set({ panelHeight: height }),
  
  // Acciones - Marcadores
  setMarkerState: (state) => {
    set((prevState) => ({
      markerState: {
        ...prevState.markerState,
        ...state,
      },
    }))
  },
  
  setMarkerPosition: (position) => {
    set((state) => ({
      markerState: {
        ...state.markerState,
        position,
      },
    }))
  },
  
  // Acciones - Errores
  setMapError: (error) => set({ mapError: error }),
  
  // Reset
  resetMapState: () => {
    set({
      cameraCoords: null,
      cameraState: initialCameraState,
      plannerActive: false,
      isPanelExpanded: true,
      panelHeight: 0,
      markerState: initialMarkerState,
      mapError: null,
    })
  },
}))
