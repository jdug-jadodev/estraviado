/**
 * Función para obtener rutas desde OSRM (Open Source Routing Machine)
 * API gratuita y pública sin necesidad de API key
 */

import { LocationPoint } from '@/types/planner'
import { CalculatedRoute, OSRMRouteResponse, RouteCalculationOptions } from '@/types/route'
import { formatDuration } from '@/utils/formatDuration'

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
    bikeSpeed = 15, // Velocidad promedio de bicicleta en km/h (default: 15 km/h)
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
    
    console.log('\n')
    console.log('┌─────────────────────────────────────────────────────┐')
    console.log('[OSRM] 🗺️ Calculando ruta...')
    console.log('└─────────────────────────────────────────────────────┘')
    console.log(`  • Perfil: ${profile}`)
    console.log(`  • URL: ${fullUrl}`)

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

    // Convertir metros a kilómetros
    const distance_km = route.distance / 1000
    
    // Calcular tiempo realista para bicicleta
    // OSRM devuelve tiempo para carro, nosotros lo recalculamos para bici
    // Fórmula: tiempo = (distancia / velocidad) * 60
    const duration_minutes = (distance_km / bikeSpeed) * 60

    console.log(`  • Velocidad promedio bici: ${bikeSpeed} km/h`)
    console.log(`  • Tiempo calculado (bici): ${formatDuration(duration_minutes)}`)

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
    
    console.log('[OSRM] ✅ Ruta calculada exitosamente')
    console.log(`  • Distancia: ${result.distance_km} km`)
    console.log(`  • Duración: ${formatDuration(result.duration_minutes)}`)
    console.log(`  • Dificultad: ${result.difficulty}`)
    console.log('┌─────────────────────────────────────────────────────┐')
    console.log('[OSRM] ✅ LISTO - Devolviendo resultado')
    console.log('└─────────────────────────────────────────────────────┘')
    console.log('\n')

    return result
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Error desconocido al calcular ruta'
    console.error('└─────────────────────────────────────────────────────┘')
    console.error('\n')
    throw new Error(errorMsg)
  }
}

interface OSRMMatchResponse {
  code: string
  matchings: Array<{
    distance: number
    duration: number
    geometry: { type: 'LineString'; coordinates: number[][] }
  }>
}

/**
 * Ajusta un trazo dibujado a mano a las calles del mapa (map-matching).
 * Equivalente a cómo funciona Strava cuando trazas una ruta.
 *
 * Usa el endpoint /match de OSRM: trata el trazo como una traza GPS y
 * lo adhiere al grafo de calles preservando la dirección general del dibujo.
 *
 * @param points  Puntos equiespaciados del trazo (20-25 recomendado)
 * @param options Opciones de configuración
 */
export async function matchDrawnRoute(
  points: LocationPoint[],
  options: RouteCalculationOptions = {}
): Promise<CalculatedRoute> {
  if (points.length < 2) {
    throw new Error('Se requieren al menos 2 puntos para el map-matching')
  }

  const { profile = 'bike', bikeSpeed = 15 } = options

  // Validar coordenadas
  for (const p of points) {
    if (!isValidCoordinate(p.latitude, p.longitude)) {
      throw new Error('Coordenadas inválidas en el trazo')
    }
  }

  // OSRM limita a 100 coordenadas por petición
  const capped = points.slice(0, 100)

  const coordinates = capped.map(p => `${p.longitude},${p.latitude}`).join(';')
  // Radio de búsqueda: 35m por punto — suficiente para calles urbanas
  const radiuses = capped.map(() => '35').join(';')

  const url = `${OSRM_BASE_URL.replace('/route/v1', '/match/v1')}/${profile}/${coordinates}`
  const params = new URLSearchParams({
    overview: 'full',
    geometries: 'geojson',
    tidy: 'true',      // Elimina puntos duplicados o muy cercanos
    gaps: 'ignore',    // Continúa aunque algún punto no encaje en una calle
    radiuses,
  })

  const fullUrl = `${url}?${params.toString()}`

  console.log('[OSRM] 🗺️ Map-matching trazo dibujado...')
  console.log(`  • Puntos: ${capped.length}`)

  const response = await fetch(fullUrl, { method: 'GET' })

  if (!response.ok) {
    throw new Error(`OSRM match error: ${response.status} ${response.statusText}`)
  }

  const data: OSRMMatchResponse = await response.json()

  if (data.code !== 'Ok' || !data.matchings || data.matchings.length === 0) {
    throw new Error('No se pudo ajustar el trazo a las calles')
  }

  // Fusionar todos los segmentos (puede haber varios cuando hay gaps)
  const allCoords: [number, number][] = []
  let totalDistance = 0
  for (const matching of data.matchings) {
    allCoords.push(...(matching.geometry.coordinates as [number, number][]))
    totalDistance += matching.distance
  }

  const distance_km = totalDistance / 1000
  const duration_minutes = (distance_km / bikeSpeed) * 60

  let difficulty: 'plano' | 'moderado' | 'dificil' = 'plano'
  if (distance_km > 30) difficulty = 'dificil'
  else if (distance_km > 15) difficulty = 'moderado'

  console.log(`[OSRM] ✅ Map-matching listo: ${distance_km.toFixed(1)} km`)

  return {
    geometry: { type: 'LineString', coordinates: allCoords },
    distance_km: Math.round(distance_km * 10) / 10,
    duration_minutes: Math.round(duration_minutes),
    difficulty,
    calculatedAt: Date.now(),
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

/**
 * Calcula una ruta que pasa por múltiples waypoints
 * Usada para rutas dibujadas
 * 
 * @param waypoints Array de puntos por los que debe pasar la ruta
 * @param options Opciones de configuración
 * @returns Ruta calculada con geometría GeoJSON
 */
export async function getRouteWithWaypoints(
  waypoints: LocationPoint[],
  options: RouteCalculationOptions = {}
): Promise<CalculatedRoute> {
  if (waypoints.length < 2) {
    throw new Error('Se requieren al menos 2 waypoints')
  }

  const {
    profile = 'bike',
    overview = 'full',
    geometries = 'geojson',
    bikeSpeed = 15,
  } = options

  try {
    // Validar todas las coordenadas
    for (const wp of waypoints) {
      if (!isValidCoordinate(wp.latitude, wp.longitude)) {
        throw new Error('Coordenadas inválidas en los waypoints')
      }
    }

    // Construir URL con todos los waypoints
    // Formato: /route/v1/{profile}/{lon},{lat};{lon},{lat};...;{lon},{lat}
    const coordinates = waypoints
      .map(wp => `${wp.longitude},${wp.latitude}`)
      .join(';')
    
    const url = `${OSRM_BASE_URL}/${profile}/${coordinates}`

    const params = new URLSearchParams({
      overview,
      geometries,
      steps: 'false',
      continue_straight: 'true', // Preferir ruta recta en cada waypoint intermedio
    })

    const fullUrl = `${url}?${params.toString()}`

    console.log('\n')
    console.log('┌─────────────────────────────────────────────────────┐')
    console.log('[OSRM] 🗺️ Calculando ruta con waypoints...')
    console.log('└─────────────────────────────────────────────────────┘')
    console.log(`  • Perfil: ${profile}`)
    console.log(`  • Waypoints: ${waypoints.length}`)
    console.log(`  • URL: ${fullUrl}`)

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

    if (data.code !== 'Ok') {
      if (data.code === 'NoRoute') {
        throw new Error('No se encontró ruta entre estos puntos')
      }
      throw new Error(`Error de OSRM: ${data.code}`)
    }

    if (!data.routes || data.routes.length === 0) {
      throw new Error('No se encontraron rutas')
    }

    const route = data.routes[0]
    const distance_km = route.distance / 1000
    const duration_minutes = (distance_km / bikeSpeed) * 60

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
      distance_km: Math.round(distance_km * 10) / 10,
      duration_minutes: Math.round(duration_minutes),
      difficulty,
      calculatedAt: Date.now(),
    }

    console.log('[OSRM] ✅ Ruta con waypoints calculada exitosamente')
    console.log(`  • Distancia: ${result.distance_km} km`)
    console.log(`  • Duración: ${formatDuration(result.duration_minutes)}`)
    console.log(`  • Dificultad: ${result.difficulty}`)
    console.log('┌─────────────────────────────────────────────────────┐')
    console.log('[OSRM] ✅ LISTO - Devolviendo resultado')
    console.log('└─────────────────────────────────────────────────────┘')
    console.log('\n')

    return result
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Error desconocido al calcular ruta'
    console.error('┌─────────────────────────────────────────────────────┐')
    console.error('[OSRM] ❌ Error:', errorMsg)
    console.error('└─────────────────────────────────────────────────────┘')
    console.error('\n')
    throw new Error(errorMsg)
  }
}
