/**
 * Hook personalizado para gestionar permisos y ubicación actual del usuario
 * Centraliza la lógica de Location Expo
 */

import { useEffect, useState, useCallback } from 'react'
import * as Location from 'expo-location'
import { LocationPoint } from '@/types/planner'
import { usePlannerStore } from '@/store/plannerStore'
import { reverseGeocode } from '@/api/geocoding'

interface UseLocationManagerOptions {
  autoStart?: boolean
  highAccuracy?: boolean
}

interface UseLocationManagerReturn {
  userLocation: LocationPoint | null
  isLoading: boolean
  error: string | null
  requestPermissions: () => Promise<boolean>
  startWatchingLocation: () => Promise<void>
  stopWatchingLocation: () => void
  getCurrentLocation: () => Promise<LocationPoint | null>
}

/**
 * Hook para gestionar la ubicación del usuario
 * Integrado con usePlannerStore
 */
export function useLocationManager({
  autoStart = true,
  highAccuracy = true,
}: UseLocationManagerOptions = {}): UseLocationManagerReturn {
  const { setUserLocation, setLocationError } = usePlannerStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userLocation, setLocalUserLocation] = useState<LocationPoint | null>(null)
  const [watchSubscription, setWatchSubscription] = useState<Location.LocationSubscription | null>(null)

  /**
   * Solicita permisos de ubicación
   */
  const requestPermissions = useCallback(async (): Promise<boolean> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        const errorMsg = 'Permiso de ubicación denegado'
        setError(errorMsg)
        setLocationError(errorMsg)
        return false
      }
      return true
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error solicitando permisos'
      setError(errorMsg)
      setLocationError(errorMsg)
      return false
    }
  }, [setLocationError])

  /**
   * Obtiene la ubicación actual y realiza geocoding inverso
   */
  const getCurrentLocation = useCallback(async (): Promise<LocationPoint | null> => {
    try {
      setIsLoading(true)
      const location = await Location.getCurrentPositionAsync({
        accuracy: highAccuracy ? Location.Accuracy.High : Location.Accuracy.Balanced,
      })

      const address = await reverseGeocode(
        location.coords.latitude,
        location.coords.longitude
      )

      const locationPoint: LocationPoint = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: address ?? undefined,
        timestamp: Date.now(),
      }

      setLocalUserLocation(locationPoint)
      setUserLocation(locationPoint)
      setError(null)
      setLocationError(null)
      return locationPoint
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error obteniendo ubicación'
      setError(errorMsg)
      setLocationError(errorMsg)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [highAccuracy, setUserLocation, setLocationError])

  /**
   * Inicia monitoreo continuo de ubicación
   */
  const startWatchingLocation = useCallback(async (): Promise<void> => {
    try {
      // Solicitar permisos si es necesario
      const hasPermission = await requestPermissions()
      if (!hasPermission) return

      // Obtener ubicación inicial
      await getCurrentLocation()

      // Iniciar monitoreo
      const subscription = await Location.watchPositionAsync(
        {
          accuracy: highAccuracy ? Location.Accuracy.High : Location.Accuracy.Balanced,
          timeInterval: 5000, // Actualizar cada 5 segundos
          distanceInterval: 10, // O cada 10 metros
        },
        async (location) => {
          const address = await reverseGeocode(
            location.coords.latitude,
            location.coords.longitude
          )

          const locationPoint: LocationPoint = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            address: address ?? undefined,
            timestamp: Date.now(),
          }

          setLocalUserLocation(locationPoint)
          setUserLocation(locationPoint)
        }
      )

      setWatchSubscription(subscription)
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error iniciando monitoreo'
      setError(errorMsg)
      setLocationError(errorMsg)
    }
  }, [requestPermissions, getCurrentLocation, highAccuracy, setUserLocation, setLocationError])

  /**
   * Detiene el monitoreo de ubicación
   */
  const stopWatchingLocation = useCallback(() => {
    if (watchSubscription !== null) {
      watchSubscription.remove()
      setWatchSubscription(null)
    }
  }, [watchSubscription])

  // Auto-iniciar si está configurado
  useEffect(() => {
    if (autoStart) {
      startWatchingLocation()
    }

    return () => {
      stopWatchingLocation()
    }
  }, [autoStart, startWatchingLocation, stopWatchingLocation])

  return {
    userLocation,
    isLoading,
    error,
    requestPermissions,
    startWatchingLocation,
    stopWatchingLocation,
    getCurrentLocation,
  }
}
