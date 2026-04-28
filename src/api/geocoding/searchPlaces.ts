import { LocationPoint } from '@/types/planner'

const COLOMBIA_BBOX = '-81.7283,-4.2271,-66.8693,13.3843'

export async function searchPlaces(
  query: string,
  userLocation?: { latitude: number; longitude: number }
): Promise<LocationPoint[]> {
  if (!query.trim()) {
    return []
  }

  try {
    const params = new URLSearchParams({
      q: query,
      format: 'jsonv2',
      countrycodes: 'co',
      limit: '10',
      addressdetails: '1',
      'accept-language': 'es',
    })

    if (userLocation) {
      params.append(
        'viewbox',
        `${userLocation.longitude - 2},${userLocation.latitude - 2},${userLocation.longitude + 2},${userLocation.latitude + 2}`
      )
      params.append('bounded', '0') 
    } else {
      params.append('viewbox', COLOMBIA_BBOX)
      params.append('bounded', '0')
    }

    const url = `https://nominatim.openstreetmap.org/search?${params}`

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'RutaCo/1.0 (app de rutas ciclistas en Colombia)',
        'Accept-Language': 'es',
      },
    })

    if (!response.ok) {
      console.error('Search places error:', response.status)
      return []
    }

    const data = await response.json()

    if (!data || data.length === 0) {
      return []
    }

    return data.map((item: any) => ({
      id: String(item.place_id),
      latitude: parseFloat(item.lat),
      longitude: parseFloat(item.lon),
      address: item.display_name,
    }))
  } catch (error) {
    console.error('Search places error:', error)
    return []
  }
}

export async function retrievePlace(_mapboxId: string): Promise<LocationPoint | null> {
  return null
}
