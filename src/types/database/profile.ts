export interface Profile {
  id: string
  username: string | null
  full_name: string | null
  avatar_url: string | null
  phone: string | null
  phone_verified: boolean
  bio: string | null
  total_distance_km: number
  total_elevation_m: number
  total_rides: number
  total_group_rides: number
  current_streak_days: number
  last_activity_date: string | null
  plan: 'free' | 'premium'
  plan_expires_at: string | null
  push_token: string | null
  created_at: string
  updated_at: string
}