export interface LocationPoint {
  id?: string
  latitude: number
  longitude: number
  address?: string
  placeType?: 'origin' | 'destination'
  timestamp?: number
}

export interface RouteCoordinates {
  origin: LocationPoint | null
  destination: LocationPoint | null
}
