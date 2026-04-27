export interface GroupRide {
  id: string
  organizer_id: string
  title: string
  description: string | null
  route_id: string | null
  scheduled_at: string
  meeting_zone: string
  meeting_point_lat: number | null  
  meeting_point_lng: number | null
  meeting_point_address: string | null
  difficulty: string | null
  max_participants: number | null
  min_routes_required: number
  visibility: 'private' | 'community'
  status: 'open' | 'full' | 'cancelled' | 'completed'
  created_at: string
}