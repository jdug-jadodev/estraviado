export interface ElevationSegment {
  startKm: number
  endKm: number
  startElevation: number
  endElevation: number
  gradientPercent: number
  type: 'flat' | 'mild' | 'moderate' | 'steep' | 'very_steep'
  description: string
}