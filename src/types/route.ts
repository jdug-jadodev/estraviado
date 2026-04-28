/**
 * Tipos para manejo de rutas calculadas
 */

import { GeoJSONLineString } from './database/geo-json-line-string'

/**
 * Ruta calculada entre dos puntos
 * Contiene la geometría GeoJSON y metadata de la ruta
 */
export interface CalculatedRoute {
  /** Identificador único de la ruta */
  id?: string
  
  /** Coordenadas de la ruta en formato GeoJSON [lon, lat] */
  geometry: GeoJSONLineString
  
  /** Distancia total en kilómetros */
  distance_km: number
  
  /** Tiempo estimado en minutos */
  duration_minutes: number
  
  /** Lista de pasos/instrucciones (en el futuro) */
  steps?: RouteStep[]
  
  /** Elevación acumulada en metros */
  elevation_gain_m?: number
  
  /** Dificultad estimada basada en elevación */
  difficulty?: 'plano' | 'moderado' | 'dificil'
  
  /** Timestamp de cuando se calculó la ruta */
  calculatedAt?: number
}

/**
 * Paso individual dentro de una ruta
 * (Para futura implementación de instrucciones giro a giro)
 */
export interface RouteStep {
  instruction: string
  distance_m: number
  duration_seconds: number
  coordinates: [number, number][]
  maneuver?: 'turn-left' | 'turn-right' | 'straight' | 'u-turn'
}

/**
 * Opciones de configuración para cálculo de rutas
 */
export interface RouteCalculationOptions {
  /** Perfil de ruteo: 'bike' para ciclismo, 'foot' para caminata */
  profile?: 'bike' | 'foot'
  
  /** Si se devuelve la geometría completa o simplificada */
  overview?: 'full' | 'simplified' | 'false'
  
  /** Formato de geometría: 'geojson' o 'polyline' */
  geometries?: 'geojson' | 'polyline' | 'polyline6'
  
  /** Si se incluye información de elevación */
  includeElevation?: boolean
}

/**
 * Respuesta de OSRM (Open Source Routing Machine)
 * Estructura interna para parsing
 */
export interface OSRMRouteResponse {
  code: 'Ok' | 'NoRoute' | 'InvalidInput' | 'InvalidOptions' | 'ServerError'
  routes: Array<{
    geometry: {
      type: 'LineString'
      coordinates: [number, number][]
    }
    legs: Array<{
      distance: number // metros
      duration: number // segundos
    }>
    distance: number // metros totales
    duration: number // segundos totales
  }>
  waypoints?: Array<{
    hint: string
    distance: number
    name: string
    location: [number, number]
  }>
}
