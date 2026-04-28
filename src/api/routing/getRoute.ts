/**
 * Función para obtener rutas desde OSRM (Open Source Routing Machine)
 * API gratuita y pública sin necesidad de API key
 */

import { LocationPoint } from '@/types/planner'
import { CalculatedRoute, OSRMRouteResponse, RouteCalculationOptions } from '@/types/route'

const OSRM_BASE_URL = 'https://router.project-osrm.org/route/v1'

/**
 * Calcula la ruta más rápida entre dos puntos usando OSRM
 * Optimizada para ciclismo en Colombia (usa perfil 'bike')
 * 
 * @param origin Punto de salida
 * @param destination Punto de llegada
 * @param options Opciones de configuración
 * @returns Ruta calculada con geometría GeoJSON
 */
export async function getRoute(
  origin: LocationPoint,
  destination: LocationPoint,
  options: RouteCalculationOptions = {}
): Promise<CalculatedRoute> {
  const {
    profile = 'bike', // Perfil de bicicleta
    overview = 'full', // Geometría completa
    geometries = 'geojson', // Formato GeoJSON
  } = options

  try {
    // Validar coordenadas
    if (!isValidCoordinate(origin.latitude, origin.longitude)) {
      throw new Error('Coordenadas de origen inválidas')
    }
    if (!isValidCoordinate(destination.latitude, destination.longitude)) {
      throw new Error('Coordenadas de destino inválidas')
    }

    // Construir URL de OSRM
    // Formato: /route/v1/{profile}/{lon},{lat};{lon},{lat}
    const coordinates = `${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}`
    const url = `${OSRM_BASE_URL}/${profile}/${coordinates}`

    // Parámetros de consulta
    const params = new URLSearchParams({
      overview,
      geometries,
      steps: 'false', // No necesitamos instrucciones detalladas por ahora
      continue_straight: 'default', // Permite giros en U si necesario
    })

    const fullUrl = `${url}?${params.toString()}`
    
    console.log('[OSRM] Calculando ruta:', { origin, destination, fullUrl })

    // Realizar petición
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`OSRM error: ${response.status} ${response.statusText}`)
    }

    const data: OSRMRouteResponse = await response.json()
    
    console.log('[OSRM] Respuesta:', data)

    // Verificar respuesta de OSRM
    if (data.code !== 'Ok') {
      if (data.code === 'NoRoute') {
        throw new Error('No se encontró ruta entre estos puntos')
      }
      throw new Error(`Error de OSRM: ${data.code}`)
    }

    if (!data.routes || data.routes.length === 0) {
      throw new Error('No se encontraron rutas')
    }

    // Tomar la primera ruta (la más rápida/corta)
    const route = data.routes[0]

    // Convertir metros a kilómetros y segundos a minutos
    const distance_km = route.distance / 1000
    const duration_minutes = route.duration / 60

    // Determinar dificultad basada en distancia
    // (En el futuro se puede integrar con datos de elevación)
    let difficulty: 'plano' | 'moderado' | 'dificil' = 'plano'
    if (distance_km > 30) {
      difficulty = 'dificil'
    } else if (distance_km > 15) {
      difficulty = 'moderado'
    }

    const result: CalculatedRoute = {
      geometry: {
        type: 'LineString',
        coordinates: route.geometry.coordinates,
      },
      distance_km: Math.round(distance_km * 10) / 10, // 1 decimal
      duration_minutes: Math.round(duration_minutes),
      difficulty,
      calculatedAt: Date.now(),
    }
    
    console.log('[OSRM] Ruta calculada:', result)

    return result
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Error desconocido al calcular ruta'
    console.error('[Routing Error]', errorMsg)
    throw new Error(errorMsg)
  }
}

/**
 * Valida que las coordenadas sean válidas
 * Latitud: -90 a 90
 * Longitud: -180 a 180
 */
function isValidCoordinate(latitude: number, longitude: number): boolean {
  return (
    typeof latitude === 'number' &&
    typeof longitude === 'number' &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  )
}

/**
 * Calcula la distancia en línea recta (haversine) entre dos puntos
 * Útil para validar que OSRM devolvió una ruta razonable
 */
export function calculateGreatCircleDistance(
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
