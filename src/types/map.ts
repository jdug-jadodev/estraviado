/**
 * Tipos específicos para el módulo de mapas
 */

/**
 * Coordenadas de la cámara de Mapbox
 */
export interface CameraCoords {
  longitude: number
  latitude: number
  zoom?: number
  heading?: number
  pitch?: number
}

/**
 * Estado de la cámara con animación
 */
export interface CameraState {
  current: CameraCoords | null
  previous: CameraCoords | null
  isAnimating: boolean
}

/**
 * Configuración del mapa
 */
export interface MapConfig {
  centerLatitude: number
  centerLongitude: number
  zoomLevel: number
  maxZoom?: number
  minZoom?: number
}

/**
 * Estado del marcador
 */
export interface MarkerState {
  isVisible: boolean
  position: CameraCoords | null
  isDragging: boolean
}
