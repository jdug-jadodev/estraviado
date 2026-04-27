export interface GeoJSONLineString {
  type: 'LineString'
  coordinates: [number, number][] | [number, number, number][]
}