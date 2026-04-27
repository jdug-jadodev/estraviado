import { GeoJSONLineString } from "./geo-json-line-string"
import { Pause } from "./pause"
import { SpeedSegment } from "./speed-segment"

export interface Activity {
  id: string
  user_id: string
  route_id: string | null
  title: string | null
  geojson: GeoJSONLineString
  distance_km: number
  duration_seconds: number
  moving_seconds: number
  elevation_gain_m: number
  elevation_loss_m: number
  avg_speed_kmh: number | null
  max_speed_kmh: number | null
  pauses: Pause[]
  speed_segments: SpeedSegment[]
  started_at: string
  ended_at: string
  created_at: string
}
