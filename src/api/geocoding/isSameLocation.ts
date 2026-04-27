import { LocationPoint } from '@/types/planner'
import { calculateDistance } from './calculateDistance'

export function isSameLocation(
  location1: LocationPoint | null,
  location2: LocationPoint | null,
  toleranceKm: number = 0.1
): boolean {
  if (!location1 || !location2) return false

  const distance = calculateDistance(
    location1.latitude,
    location1.longitude,
    location2.latitude,
    location2.longitude
  )

  return distance < toleranceKm
}
