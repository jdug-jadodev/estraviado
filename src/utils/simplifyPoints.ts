import { LocationPoint } from '@/types/planner'

/**
 * Distancia perpendicular de un punto a la línea (lineStart → lineEnd)
 * Trabaja con coordenadas geográficas (grados).
 */
function perpendicularDistance(
  point: LocationPoint,
  lineStart: LocationPoint,
  lineEnd: LocationPoint
): number {
  const dx = lineEnd.longitude - lineStart.longitude
  const dy = lineEnd.latitude - lineStart.latitude
  const mag = Math.sqrt(dx * dx + dy * dy)

  if (mag === 0) {
    return Math.sqrt(
      Math.pow(point.longitude - lineStart.longitude, 2) +
        Math.pow(point.latitude - lineStart.latitude, 2)
    )
  }

  const u =
    ((point.longitude - lineStart.longitude) * dx +
      (point.latitude - lineStart.latitude) * dy) /
    (mag * mag)

  const closestLng = lineStart.longitude + u * dx
  const closestLat = lineStart.latitude + u * dy

  return Math.sqrt(
    Math.pow(point.longitude - closestLng, 2) +
      Math.pow(point.latitude - closestLat, 2)
  )
}

/**
 * Algoritmo Ramer-Douglas-Peucker para simplificar una polilínea.
 * Elimina puntos redundantes preservando la forma general del trazo.
 *
 * @param points   Array de puntos a simplificar
 * @param tolerance Tolerancia en grados (0.0003 ≈ 33 m). Aumentar para más simplificación.
 */
function rdp(points: LocationPoint[], tolerance: number): LocationPoint[] {
  if (points.length <= 2) return points

  let maxDist = 0
  let maxIndex = 0

  for (let i = 1; i < points.length - 1; i++) {
    const dist = perpendicularDistance(points[i], points[0], points[points.length - 1])
    if (dist > maxDist) {
      maxDist = dist
      maxIndex = i
    }
  }

  if (maxDist > tolerance) {
    const left = rdp(points.slice(0, maxIndex + 1), tolerance)
    const right = rdp(points.slice(maxIndex), tolerance)
    return [...left.slice(0, -1), ...right]
  }

  return [points[0], points[points.length - 1]]
}

/**
 * Simplifica un trazo dibujado a mano para usarlo como waypoints de ruta.
 *
 * 1. Aplica RDP con tolerancia adaptativa hasta tener ≤ maxWaypoints puntos.
 * 2. Siempre preserva el primer y último punto (origen / destino).
 *
 * @param points       Puntos crudos del trazo
 * @param maxWaypoints Máximo número de waypoints a devolver (default 8)
 */
export function simplifyDrawnPoints(
  points: LocationPoint[],
  maxWaypoints = 8
): LocationPoint[] {
  if (points.length <= 2) return points

  // Tolerancias progresivas: empieza ajustada y aumenta si hay demasiados puntos
  const tolerances = [0.0002, 0.0005, 0.001, 0.002, 0.005, 0.01]

  for (const tol of tolerances) {
    const simplified = rdp(points, tol)
    if (simplified.length <= maxWaypoints) return simplified
  }

  // Fallback: muestreo uniforme si RDP aún produce demasiados puntos
  const step = Math.ceil(points.length / (maxWaypoints - 1))
  const sampled: LocationPoint[] = []
  for (let i = 0; i < points.length; i += step) {
    sampled.push(points[i])
  }
  if (sampled[sampled.length - 1] !== points[points.length - 1]) {
    sampled.push(points[points.length - 1])
  }
  return sampled
}

/**
 * Muestrea `count` puntos equidistantes a lo largo de la polilínea.
 * A diferencia de RDP (que preserva cambios de dirección), este método
 * produce puntos uniformemente espaciados — ideal para map-matching.
 *
 * @param points Puntos crudos del trazo
 * @param count  Número de puntos a devolver (default 25)
 */
export function sampleEvenlyAlongPath(
  points: LocationPoint[],
  count = 25
): LocationPoint[] {
  if (points.length <= count) return points

  // Calcular longitudes acumuladas del arco (en grados)
  const lengths: number[] = [0]
  for (let i = 1; i < points.length; i++) {
    const dx = points[i].longitude - points[i - 1].longitude
    const dy = points[i].latitude - points[i - 1].latitude
    lengths.push(lengths[i - 1] + Math.sqrt(dx * dx + dy * dy))
  }

  const totalLength = lengths[lengths.length - 1]
  const interval = totalLength / (count - 1)

  const sampled: LocationPoint[] = [points[0]]
  let j = 0

  for (let i = 1; i < count - 1; i++) {
    const target = interval * i
    while (j < lengths.length - 2 && lengths[j + 1] < target) j++

    const segLen = lengths[j + 1] - lengths[j]
    const t = segLen === 0 ? 0 : (target - lengths[j]) / segLen
    sampled.push({
      longitude: points[j].longitude + t * (points[j + 1].longitude - points[j].longitude),
      latitude: points[j].latitude + t * (points[j + 1].latitude - points[j].latitude),
      address: '',
    })
  }

  sampled.push(points[points.length - 1])
  return sampled
}
