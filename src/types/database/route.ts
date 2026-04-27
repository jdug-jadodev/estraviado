import { ElevationSegment } from "./Elevation-segment"
import { GeoJSONLineString } from "./geo-json-line-string"

export interface Route {
  id: string
  user_id: string
  title: string
  description: string | null
  geojson: GeoJSONLineString
  distance_km: number
  elevation_gain_m: number
  elevation_loss_m: number
  max_elevation_m: number | null
  min_elevation_m: number | null
  elevation_segments: ElevationSegment[] | null
  has_return: boolean
  difficulty: 'plano' | 'moderado' | 'dificil' | 'muy_dificil' | null
  visibility: 'public' | 'connections' | 'private'
  start_lat: number | null
  start_lng: number | null
  end_lat: number | null
  end_lng: number | null
  start_location_name: string | null
  cover_image_url: string | null
  likes_count: number
  saves_count: number
  comments_count: number
  is_recorded: boolean
  recorded_at: string | null
  created_at: string
}
