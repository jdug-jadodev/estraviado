# 08 - Modo Grabacion
## Fase 1 - MVP Base

**Proposito de este documento:**
Implementar el modo de grabacion en vivo: el usuario sale a rodar, la app
graba su recorrido usando el GPS del celular, y al terminar genera el resumen
completo de la actividad.

**Por que es una de las funciones mas importantes:**
Es la funcionalidad con menor friccion para el usuario. No necesita planificar
nada ni conocer rutas de antemano. Simplemente toca "Grabar" y sale a rodar.
Es el gancho inicial que hace que la gente use la app todos los dias.

---

## 1. Como funciona el GPS en un celular

El GPS del celular usa senales de satelites para calcular la posicion.
`expo-location` es la libreria de Expo que accede a esas senales.

**Precision del GPS:**
- En campo abierto: preciso a 3-5 metros
- En ciudad entre edificios: puede variar 10-20 metros
- Dentro de tuneles o edificios: sin senal

**Consumo de bateria:**
El GPS consume bastante bateria cuando esta activo continuamente.
Por eso solo lo activamos durante la grabacion, no todo el tiempo.

**GPS en segundo plano:**
Cuando el usuario bloquea la pantalla durante una rodada, la app debe
seguir grabando. Esto requiere permisos especiales de "background location".

---

## 2. Configurar permisos de ubicacion

### En app.json agregar:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission":
            "RutaCo necesita acceso a tu ubicacion para grabar tus rutas y mostrarte en el mapa.",
          "locationWhenInUsePermission":
            "RutaCo necesita acceso a tu ubicacion para grabar tus rutas."
        }
      ]
    ],
    "android": {
      "permissions": [
        "ACCESS_FINE_LOCATION",
        "ACCESS_BACKGROUND_LOCATION"
      ]
    }
  }
}
```

**ACCESS_FINE_LOCATION vs ACCESS_COARSE_LOCATION:**
- Fine: precision alta usando GPS (necesario para grabar rutas)
- Coarse: precision baja usando WiFi y redes moviles (no es suficiente)

---

## 3. Hook de grabacion

Este hook centraliza toda la logica de grabacion para que la pantalla
solo se preocupe de mostrar la UI:

```typescript
// src/hooks/useActivityRecording.ts

import { useState, useRef, useCallback, useEffect } from 'react'
import * as Location from 'expo-location'
import { AppState } from 'react-native'
import { haversineDistance } from '@/utils/distance'

// Una coordenada grabada incluye posicion, elevacion, velocidad y tiempo
export interface RecordedCoordinate {
  lat: number
  lng: number
  elevation: number    // metros sobre el nivel del mar
  speed: number        // km/h
  timestamp: number    // Unix timestamp en ms
}

export interface RecordingPause {
  lat: number
  lng: number
  startTime: number
  endTime: number
  duration_seconds: number
}

export interface RecordingStats {
  distanceKm: number
  elapsedSeconds: number       // tiempo total incluyendo pausas
  movingSeconds: number        // tiempo solo en movimiento
  currentSpeedKmh: number
  avgSpeedKmh: number
  elevationGainM: number
  elevationLossM: number
}

type RecordingStatus = 'idle' | 'recording' | 'paused' | 'stopped'

export function useActivityRecording() {
  const [status, setStatus] = useState<RecordingStatus>('idle')
  const [coordinates, setCoordinates] = useState<RecordedCoordinate[]>([])
  const [stats, setStats] = useState<RecordingStats>({
    distanceKm: 0,
    elapsedSeconds: 0,
    movingSeconds: 0,
    currentSpeedKmh: 0,
    avgSpeedKmh: 0,
    elevationGainM: 0,
    elevationLossM: 0,
  })
  const [pauses, setPauses] = useState<RecordingPause[]>([])

  // Refs para valores que no deben causar re-renders
  const locationSubscription = useRef<Location.LocationSubscription | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const movingTimerRef = useRef<NodeJS.Timeout | null>(null)
  const lastCoordRef = useRef<RecordedCoordinate | null>(null)
  const pauseStartRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)

  // Detectar cuando la app va al background (pantalla bloqueada)
  // para asegurarnos que el GPS sigue funcionando
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextState) => {
      if (nextState === 'background' && status === 'recording') {
        // La app fue al background - el GPS debe seguir por el permiso background
        console.log('App en background - grabacion continua')
      }
    })
    return () => subscription.remove()
  }, [status])

  const startRecording = useCallback(async () => {
    // Paso 1: pedir permiso de ubicacion en primer plano
    const { status: fgStatus } = await Location.requestForegroundPermissionsAsync()
    if (fgStatus !== 'granted') {
      throw new Error('Permiso de ubicacion denegado')
    }

    // Paso 2: pedir permiso de ubicacion en segundo plano
    const { status: bgStatus } = await Location.requestBackgroundPermissionsAsync()
    // Si no concede background, la grabacion se pausara cuando bloquee la pantalla
    // No es un error fatal, pero avisamos al usuario

    startTimeRef.current = Date.now()
    setStatus('recording')
    setCoordinates([])
    setStats({
      distanceKm: 0,
      elapsedSeconds: 0,
      movingSeconds: 0,
      currentSpeedKmh: 0,
      avgSpeedKmh: 0,
      elevationGainM: 0,
      elevationLossM: 0,
    })

    // Paso 3: iniciar el seguimiento de ubicacion
    locationSubscription.current = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        // Actualizar cada 3 segundos O cada 5 metros, lo que ocurra primero
        timeInterval: 3000,
        distanceInterval: 5,
      },
      (location) => {
        const newCoord: RecordedCoordinate = {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
          elevation: location.coords.altitude ?? 0,
          // GPS da velocidad en m/s, convertir a km/h
          speed: Math.max(0, (location.coords.speed ?? 0) * 3.6),
          timestamp: location.timestamp,
        }

        setCoordinates((prev) => {
          const updated = [...prev, newCoord]

          // Calcular estadisticas actualizadas
          if (lastCoordRef.current) {
            const dist = haversineDistance(
              lastCoordRef.current.lat, lastCoordRef.current.lng,
              newCoord.lat, newCoord.lng
            )

            const elevDiff = newCoord.elevation - lastCoordRef.current.elevation

            setStats((prevStats) => ({
              ...prevStats,
              distanceKm: prevStats.distanceKm + dist,
              currentSpeedKmh: newCoord.speed,
              elevationGainM: elevDiff > 0
                ? prevStats.elevationGainM + elevDiff
                : prevStats.elevationGainM,
              elevationLossM: elevDiff < 0
                ? prevStats.elevationLossM + Math.abs(elevDiff)
                : prevStats.elevationLossM,
            }))
          }

          lastCoordRef.current = newCoord
          return updated
        })
      }
    )

    // Paso 4: timer para el tiempo transcurrido (actualiza cada segundo)
    timerRef.current = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        elapsedSeconds: Math.floor((Date.now() - startTimeRef.current) / 1000),
        // Velocidad promedio = distancia / tiempo en movimiento
        avgSpeedKmh: prev.movingSeconds > 0
          ? (prev.distanceKm / (prev.movingSeconds / 3600))
          : 0,
      }))
    }, 1000)

    // Timer del tiempo en movimiento (no cuenta pausas)
    movingTimerRef.current = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        movingSeconds: prev.movingSeconds + 1,
      }))
    }, 1000)

  }, [])

  const pauseRecording = useCallback(() => {
    setStatus('paused')
    pauseStartRef.current = Date.now()

    // Pausar el timer de tiempo en movimiento
    if (movingTimerRef.current) {
      clearInterval(movingTimerRef.current)
    }

    // Guardar posicion de la pausa
    if (lastCoordRef.current) {
      const pauseLocation = lastCoordRef.current
      setPauses((prev) => [
        ...prev,
        {
          lat: pauseLocation.lat,
          lng: pauseLocation.lng,
          startTime: Date.now(),
          endTime: 0,
          duration_seconds: 0,
        },
      ])
    }
  }, [])

  const resumeRecording = useCallback(() => {
    setStatus('recording')

    // Calcular duracion de la pausa
    if (pauseStartRef.current) {
      const pauseDuration = Math.floor((Date.now() - pauseStartRef.current) / 1000)
      setPauses((prev) => {
        const updated = [...prev]
        const lastPause = updated[updated.length - 1]
        if (lastPause) {
          lastPause.endTime = Date.now()
          lastPause.duration_seconds = pauseDuration
        }
        return updated
      })
    }

    // Reanudar timer de tiempo en movimiento
    movingTimerRef.current = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        movingSeconds: prev.movingSeconds + 1,
      }))
    }, 1000)
  }, [])

  const stopRecording = useCallback(() => {
    // Detener GPS
    locationSubscription.current?.remove()
    locationSubscription.current = null

    // Detener timers
    if (timerRef.current) clearInterval(timerRef.current)
    if (movingTimerRef.current) clearInterval(movingTimerRef.current)

    setStatus('stopped')

    // Retornar todos los datos para guardar
    return {
      coordinates,
      stats,
      pauses,
      startedAt: new Date(startTimeRef.current).toISOString(),
      endedAt: new Date().toISOString(),
    }
  }, [coordinates, stats, pauses])

  return {
    status,
    coordinates,
    stats,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
  }
}
```

---

## 4. Pantalla de grabacion activa

```typescript
// src/screens/activity/RecordingScreen.tsx

import { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, Vibration } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { keepAwake } from 'expo-keep-awake'
import { useNavigation } from '@react-navigation/native'
import MapboxGL from '@rnmapbox/maps'
import { RutaCoMap } from '@/components/map/RutaCoMap'
import { useActivityRecording } from '@/hooks/useActivityRecording'
import { saveActivity } from '@/api/activities'
import { formatDuration, formatDistance, formatSpeed } from '@/utils/format'
import { COLORS } from '@/constants/colors'

export function RecordingScreen() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<any>()
  const {
    status,
    coordinates,
    stats,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
  } = useActivityRecording()

  // Mantener la pantalla encendida durante la grabacion
  useEffect(() => {
    if (status === 'recording') {
      keepAwake()
    }
  }, [status])

  const handleStart = async () => {
    try {
      await startRecording()
    } catch (error) {
      Alert.alert(
        'Permiso necesario',
        'RutaCo necesita acceso a tu ubicacion para grabar la ruta. Actívalo en Ajustes.'
      )
    }
  }

  const handleStop = () => {
    Alert.alert(
      'Terminar grabacion',
      '¿Estas seguro que quieres terminar?',
      [
        { text: 'Continuar rodando', style: 'cancel' },
        {
          text: 'Terminar',
          style: 'destructive',
          onPress: async () => {
            // Vibrar brevemente para confirmar al usuario que termino
            Vibration.vibrate(200)
            const recordingData = stopRecording()
            // Guardar en Supabase
            const activity = await saveActivity(recordingData)
            if (activity) {
              navigation.replace('ActivitySummary', { activityId: activity.id })
            }
          },
        },
      ]
    )
  }

  // Convertir coordenadas grabadas a GeoJSON para mostrar en el mapa
  const routeGeoJSON: GeoJSON.Feature = {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: coordinates.map(c => [c.lng, c.lat]),
    },
    properties: {},
  }

  return (
    <View style={styles.container}>
      {/* Mapa que sigue la posicion del usuario */}
      <RutaCoMap followUser={status === 'recording'}>
        {/* Linea del recorrido actual */}
        {coordinates.length > 1 && (
          <MapboxGL.ShapeSource id="recording-route" shape={routeGeoJSON}>
            <MapboxGL.LineLayer
              id="recording-line"
              style={{
                lineColor: COLORS.primary,
                lineWidth: 4,
                lineCap: 'round',
              }}
            />
          </MapboxGL.ShapeSource>
        )}
      </RutaCoMap>

      {/* Panel de estadisticas */}
      <View style={[styles.statsPanel, { paddingBottom: insets.bottom + 16 }]}>

        {/* Estadisticas principales */}
        <View style={styles.mainStats}>
          <BigStat
            value={formatDistance(stats.distanceKm)}
            label="Distancia"
          />
          <BigStat
            value={formatDuration(stats.movingSeconds)}
            label="Tiempo"
          />
          <BigStat
            value={formatSpeed(stats.currentSpeedKmh)}
            label="Velocidad"
          />
        </View>

        {/* Estadisticas secundarias */}
        <View style={styles.secondaryStats}>
          <SmallStat label="Subida" value={`${Math.round(stats.elevationGainM)}m`} />
          <SmallStat label="Vel. prom." value={formatSpeed(stats.avgSpeedKmh)} />
          <SmallStat label="Bajada" value={`${Math.round(stats.elevationLossM)}m`} />
        </View>

        {/* Controles */}
        <View style={styles.controls}>
          {status === 'idle' && (
            <TouchableOpacity style={styles.startButton} onPress={handleStart}>
              <Text style={styles.startButtonText}>Iniciar grabacion</Text>
            </TouchableOpacity>
          )}

          {status === 'recording' && (
            <View style={styles.activeControls}>
              <TouchableOpacity style={styles.pauseButton} onPress={pauseRecording}>
                <Text style={styles.pauseButtonText}>II Pausar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.stopButton} onPress={handleStop}>
                <Text style={styles.stopButtonText}>■ Terminar</Text>
              </TouchableOpacity>
            </View>
          )}

          {status === 'paused' && (
            <View style={styles.activeControls}>
              <TouchableOpacity style={styles.startButton} onPress={resumeRecording}>
                <Text style={styles.startButtonText}>▶ Continuar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.stopButton} onPress={handleStop}>
                <Text style={styles.stopButtonText}>■ Terminar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Indicador de estado */}
        {status === 'recording' && (
          <View style={styles.recordingIndicator}>
            <View style={styles.recordingDot} />
            <Text style={styles.recordingText}>Grabando...</Text>
          </View>
        )}
      </View>
    </View>
  )
}

function BigStat({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.bigStat}>
      <Text style={styles.bigStatValue}>{value}</Text>
      <Text style={styles.bigStatLabel}>{label}</Text>
    </View>
  )
}

function SmallStat({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.smallStat}>
      <Text style={styles.smallStatValue}>{value}</Text>
      <Text style={styles.smallStatLabel}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  statsPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    gap: 16,
  },
  mainStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  bigStat: { alignItems: 'center', gap: 4 },
  bigStatValue: { fontSize: 28, fontWeight: '800', color: COLORS.text },
  bigStatLabel: { fontSize: 12, color: COLORS.textSecondary },
  secondaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  smallStat: { alignItems: 'center', gap: 2 },
  smallStatValue: { fontSize: 16, fontWeight: '600', color: COLORS.text },
  smallStatLabel: { fontSize: 11, color: COLORS.textMuted },
  controls: { gap: 10 },
  activeControls: { flexDirection: 'row', gap: 10 },
  startButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  startButtonText: { color: '#000', fontSize: 16, fontWeight: '700' },
  pauseButton: {
    flex: 1,
    backgroundColor: COLORS.surfaceAlt,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  pauseButtonText: { color: COLORS.text, fontSize: 16, fontWeight: '600' },
  stopButton: {
    flex: 1,
    backgroundColor: COLORS.error,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  stopButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.error,
  },
  recordingText: { fontSize: 13, color: COLORS.textSecondary },
})
```

---

## 5. Funciones de formato

```typescript
// src/utils/format.ts

/**
 * Formatea segundos como "1:23:45" o "23:45"
 */
export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60

  if (h > 0) {
    return `${h}:${pad(m)}:${pad(s)}`
  }
  return `${m}:${pad(s)}`
}

/**
 * Formatea km con una unidad apropiada
 * Menos de 1 km: "850 m"
 * 1 km o mas: "12.5 km"
 */
export function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)} m`
  return `${km.toFixed(1)} km`
}

/**
 * Formatea velocidad en km/h
 */
export function formatSpeed(kmh: number): string {
  return `${kmh.toFixed(1)} km/h`
}

function pad(n: number): string {
  return n.toString().padStart(2, '0')
}
```

---

## 6. Guardar la actividad en Supabase

```typescript
// src/api/activities.ts

import { supabase } from './supabase'
import type { RecordedCoordinate, RecordingPause, RecordingStats } from '@/hooks/useActivityRecording'
import { calculateElevationSegments } from '@/utils/elevation'

interface RecordingData {
  coordinates: RecordedCoordinate[]
  stats: RecordingStats
  pauses: RecordingPause[]
  startedAt: string
  endedAt: string
}

export async function saveActivity(data: RecordingData) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  // Convertir coordenadas a GeoJSON
  const geojson = {
    type: 'LineString',
    coordinates: data.coordinates.map(c => [c.lng, c.lat, c.elevation]),
  }

  // Calcular segmentos de velocidad para el replay
  const speedSegments = calculateSpeedSegments(data.coordinates)

  const { data: activity, error } = await supabase
    .from('activities')
    .insert({
      user_id: user.id,
      geojson,
      distance_km: data.stats.distanceKm,
      duration_seconds: data.stats.elapsedSeconds,
      moving_seconds: data.stats.movingSeconds,
      elevation_gain_m: data.stats.elevationGainM,
      elevation_loss_m: data.stats.elevationLossM,
      avg_speed_kmh: data.stats.avgSpeedKmh,
      max_speed_kmh: Math.max(...data.coordinates.map(c => c.speed)),
      pauses: data.pauses,
      speed_segments: speedSegments,
      started_at: data.startedAt,
      ended_at: data.endedAt,
    })
    .select()
    .single()

  if (error) {
    console.error('Error guardando actividad:', error)
    return null
  }

  // Actualizar estadisticas acumuladas del perfil
  await supabase.rpc('increment_profile_stats', {
    p_user_id: user.id,
    p_distance: data.stats.distanceKm,
    p_elevation: data.stats.elevationGainM,
  })

  return activity
}

// Agrupa coordenadas en segmentos de velocidad similar para colorear el replay
function calculateSpeedSegments(coords: RecordedCoordinate[]) {
  const segments = []
  let segmentStart = 0

  for (let i = 1; i < coords.length; i++) {
    const speedDiff = Math.abs(coords[i].speed - coords[segmentStart].speed)
    if (speedDiff > 5 || i === coords.length - 1) { // nuevo segmento si cambia mas de 5 km/h
      segments.push({
        start_index: segmentStart,
        end_index: i,
        speed_kmh: coords.slice(segmentStart, i).reduce((a, c) => a + c.speed, 0) / (i - segmentStart),
      })
      segmentStart = i
    }
  }

  return segments
}
```

---

## Checklist de esta sub-fase

```
[ ] La app pide permiso de ubicacion la primera vez
[ ] El punto azul del usuario se mueve en el mapa mientras graba
[ ] La linea del recorrido se dibuja en tiempo real
[ ] El timer cuenta segundos correctamente
[ ] La distancia se acumula con cada punto GPS
[ ] Pausar detiene el timer de tiempo en movimiento pero no el total
[ ] Reanudar continua correctamente
[ ] La pantalla no se apaga durante la grabacion (keepAwake)
[ ] Al terminar navega a ActivitySummary
[ ] La actividad se guarda en Supabase sin errores
[ ] El perfil actualiza las estadisticas acumuladas
```

---

Siguiente documento: 09_directorio_de_servicios.md
