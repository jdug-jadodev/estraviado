import { MAPBOX_TOKEN } from '@/config/mapbox'

export async function reverseGeocode(
  latitude: number,
  longitude: number
): Promise<string | null> {
  if (!MAPBOX_TOKEN) {
    console.warn('Mapbox token no configurado')
    return null
  }

  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_TOKEN}&language=es`
    )

    if (!response.ok) {
      console.error('Reverse geocoding error:', response.status)
      return null
    }

    const data = await response.json()

    if (data.features && data.features.length > 0) {
      const feature =
        data.features.find(
          (f: any) =>
            f.place_type.includes('address') || f.place_type.includes('place')
        ) || data.features[0]

      return feature.place_name || null
    }

    return null
  } catch (error) {
    console.error('Reverse geocoding error:', error)
    return null
  }
}
