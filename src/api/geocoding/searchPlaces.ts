import { LocationPoint } from '@/types/planner'
import { MAPBOX_TOKEN, SEARCH_COUNTRY } from '@/config/mapbox'

export async function searchPlaces(query: string): Promise<LocationPoint[]> {
  if (!MAPBOX_TOKEN || !query.trim()) {
    return []
  }

  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${MAPBOX_TOKEN}&language=es&limit=10&country=${SEARCH_COUNTRY}`
    )

    if (!response.ok) {
      console.error('Search places error:', response.status)
      return []
    }

    const data = await response.json()

    if (!data.features || data.features.length === 0) {
      return []
    }

    return data.features.map((feature: any) => ({
      latitude: feature.center[1],
      longitude: feature.center[0],
      address: feature.place_name,
      id: feature.id,
    }))
  } catch (error) {
    console.error('Search places error:', error)
    return []
  }
}
