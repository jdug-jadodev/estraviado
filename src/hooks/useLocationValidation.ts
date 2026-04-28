/**
 * Hook personalizado para validación de ubicaciones
 * Centraliza reglas de negocio para validación
 */

import { useCallback } from 'react'
import { LocationPoint } from '@/types/planner'
import { isSameLocation } from '@/api/geocoding'

interface ValidationResult {
  isValid: boolean
  message?: string
  code?: string
}

interface UseLocationValidationReturn {
  validateExcludedLocation: (
    location: LocationPoint,
    excludedLocation: LocationPoint | null
  ) => ValidationResult
  validateOriginDestination: (
    location: LocationPoint,
    otherLocation: LocationPoint | null,
    locationType: 'origin' | 'destination'
  ) => ValidationResult
  validateLocationPoint: (location: LocationPoint) => ValidationResult
  validateCoordinates: (latitude: number, longitude: number) => ValidationResult
}

/**
 * Hook para validación de ubicaciones
 * Previene errores comunes como seleccionar la misma ubicación twice
 */
export function useLocationValidation(): UseLocationValidationReturn {
  /**
   * Valida que una ubicación no sea la excluida
   */
  const validateExcludedLocation = useCallback(
    (location: LocationPoint, excludedLocation: LocationPoint | null): ValidationResult => {
      if (!excludedLocation) {
        return { isValid: true }
      }

      const isSame = isSameLocation(location, excludedLocation, 0.0001)
      if (isSame) {
        return {
          isValid: false,
          message: 'Esta ubicación ya fue seleccionada',
          code: 'LOCATION_ALREADY_SELECTED',
        }
      }

      return { isValid: true }
    },
    []
  )

  /**
   * Valida que origin y destination no sean iguales
   */
  const validateOriginDestination = useCallback(
    (
      location: LocationPoint,
      otherLocation: LocationPoint | null,
      locationType: 'origin' | 'destination'
    ): ValidationResult => {
      if (!otherLocation) {
        return { isValid: true }
      }

      const isSame = isSameLocation(location, otherLocation, 0.05)
      if (isSame) {
        const otherType = locationType === 'origin' ? 'llegada' : 'salida'
        return {
          isValid: false,
          message: `El punto de ${locationType === 'origin' ? 'salida' : 'llegada'} no puede ser igual al de ${otherType}`,
          code: 'SAME_ORIGIN_DESTINATION',
        }
      }

      return { isValid: true }
    },
    []
  )

  /**
   * Valida que un LocationPoint sea válido
   */
  const validateLocationPoint = useCallback((location: LocationPoint): ValidationResult => {
    if (!location) {
      return {
        isValid: false,
        message: 'Ubicación inválida',
        code: 'INVALID_LOCATION_POINT',
      }
    }

    if (
      typeof location.latitude !== 'number' ||
      typeof location.longitude !== 'number'
    ) {
      return {
        isValid: false,
        message: 'Coordenadas inválidas',
        code: 'INVALID_COORDINATES',
      }
    }

    return { isValid: true }
  }, [])

  /**
   * Valida coordenadas válidas
   */
  const validateCoordinates = useCallback(
    (latitude: number, longitude: number): ValidationResult => {
      if (
        typeof latitude !== 'number' ||
        typeof longitude !== 'number'
      ) {
        return {
          isValid: false,
          message: 'Coordenadas deben ser números',
          code: 'INVALID_COORDINATE_TYPE',
        }
      }

      if (latitude < -90 || latitude > 90) {
        return {
          isValid: false,
          message: 'Latitud debe estar entre -90 y 90',
          code: 'INVALID_LATITUDE',
        }
      }

      if (longitude < -180 || longitude > 180) {
        return {
          isValid: false,
          message: 'Longitud debe estar entre -180 y 180',
          code: 'INVALID_LONGITUDE',
        }
      }

      return { isValid: true }
    },
    []
  )

  return {
    validateExcludedLocation,
    validateOriginDestination,
    validateLocationPoint,
    validateCoordinates,
  }
}
