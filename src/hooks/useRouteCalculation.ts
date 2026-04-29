/**
 * Hook personalizado para calcular rutas entre dos puntos
 * Integrado con usePlannerStore y OSRM
 */

import { useCallback } from 'react'
import { CalculatedRoute } from '@/types/route'
import { LocationPoint } from '@/types/planner'
import { getRoute } from '@/api/routing'
import { usePlannerStore } from '@/store/plannerStore'
import { formatDuration } from '@/utils/formatDuration'

interface UseRouteCalculationReturn {
  /** Calcula la ruta entre origen y destino */
  calculateRoute: () => Promise<CalculatedRoute | null>
  
  /** Ruta actualmente calculada */
  route: CalculatedRoute | null
  
  /** Si está calculando */
  isCalculating: boolean
  
  /** Mensaje de error si ocurrió uno */
  error: string | null
  
  /** Limpia la ruta actual */
  clearRoute: () => void
}

/**
 * Hook para calcular y gestionar rutas
 * Automáticamente sincroniza con el store
 */
export function useRouteCalculation(): UseRouteCalculationReturn {
  const {
    origin,
    destination,
    route,
    isCalculatingRoute,
    routeError,
    setRoute,
    setIsCalculatingRoute,
    setRouteError,
    clearRoute: clearRouteFromStore,
  } = usePlannerStore()

  /**
   * Calcula la ruta entre los puntos actual del store
   */
  const calculateRoute = useCallback(async (): Promise<CalculatedRoute | null> => {

    // Validar que haya ambos puntos
    if (!origin || !destination) {
      const error = 'Debes seleccionar un punto de salida y destino'
      setRouteError(error)
      return null
    }

    // Validar que sean puntos diferentes (al menos 100 metros)
    const distanceKm = calculateDistance(
      origin.latitude,
      origin.longitude,
      destination.latitude,
      destination.longitude
    )

    if (distanceKm < 0.1) {
      const error = 'El punto de salida y destino deben estar separados al menos 100 metros'
      setRouteError(error)
      console.warn('[useRouteCalculation] ⚠️', error, `(distancia: ${distanceKm.toFixed(2)} km)`)
      return null
    }

    try {
      clearRouteFromStore()
      setIsCalculatingRoute(true)
      setRouteError(null)

      // Llamar a OSRM
      const calculatedRoute = await getRoute(origin, destination, {
        profile: 'bike',
        overview: 'full',
        geometries: 'geojson',
      })
      
      // Guardar en store
      setRoute(calculatedRoute)
      setIsCalculatingRoute(false)

      return calculatedRoute
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error desconocido'
      setRouteError(errorMsg)
      setIsCalculatingRoute(false)
      return null
    }
  }, [origin, destination, setRoute, setIsCalculatingRoute, setRouteError])

  const clearRoute = useCallback(() => {
    clearRouteFromStore()
  }, [clearRouteFromStore])

  return {
    calculateRoute,
    route,
    isCalculating: isCalculatingRoute,
    error: routeError,
    clearRoute,
  }
}

/**
 * Calcula la distancia en línea recta (haversine) entre dos puntos
 * Retorna distancia en km
 */
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371 // Radio terrestre en km
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180)
}
 