# 10 - Guia Auditiva
## Fase 2 - Navegacion y Social

**Proposito de este documento:**
Implementar la guia auditiva de navegacion de RutaCo. El ciclista no puede mirar
la pantalla mientras pedalea, asi que la app tiene que hablarle: avisar la
proxima subida, distancia restante, zonas peligrosas y paradas planificadas.
Esta es una de las funcionalidades mas diferenciadoras frente a Strava.

**Por que Expo Speech y no una API externa:**
`expo-speech` usa el motor de voz nativo del dispositivo (iOS tiene voces en
espanol latinoamericano de alta calidad, Android tambien). Es gratuito, funciona
sin conexion y no tiene latencia de red. Una API como Google TTS seria mejor
calidad en algunos casos, pero agrega costo y latencia, lo cual en una app de
navegacion en tiempo real no es aceptable.

---

## 1. Como funciona la guia auditiva

El motor de guia auditiva se activa cuando el usuario inicia la navegacion activa
(ya sea siguiendo una ruta planificada o en modo grabacion). Mientras el usuario
se mueve, el motor evalua continuamente la posicion GPS y decide cuando hablar.

Reglas del motor:
- Nunca interrumpir un anuncio con otro (cola de mensajes)
- Prioridad alta: alertas de seguridad y zona peligrosa
- Prioridad media: aviso de inclinacion proxima
- Prioridad baja: distancia restante, paradas planificadas

---

## 2. Instalacion y configuracion de Expo Speech

```bash
npx expo install expo-speech
```

No requiere configuracion adicional en `app.json`. El permiso de audio se pide
automaticamente en iOS y no se requiere en Android.

---

## 3. Servicio base de voz

```typescript
// src/utils/voiceGuide.ts

import * as Speech from 'expo-speech'

// Cola de mensajes para no interrumpir uno con otro
const messageQueue: { text: string; priority: number }[] = []
let isSpeaking = false

// Agregar mensaje a la cola
export function announce(text: string, priority: 'high' | 'medium' | 'low' = 'medium') {
  const priorityValue = { high: 3, medium: 2, low: 1 }[priority]

  // Los mensajes de alta prioridad van al frente
  if (priority === 'high') {
    messageQueue.unshift({ text, priority: priorityValue })
    // Interrumpir lo que se esta diciendo si hay algo de alta prioridad
    Speech.stop()
    isSpeaking = false
  } else {
    messageQueue.push({ text, priority: priorityValue })
  }

  processQueue()
}

async function processQueue() {
  if (isSpeaking || messageQueue.length === 0) return

  const next = messageQueue.shift()!
  isSpeaking = true

  Speech.speak(next.text, {
    language: 'es-419', // espanol latinoamericano
    rate: 0.9,          // un poco mas lento que lo normal para mayor claridad
    pitch: 1.0,
    onDone: () => {
      isSpeaking = false
      processQueue() // procesar el siguiente de la cola
    },
    onError: () => {
      isSpeaking = false
      processQueue()
    },
  })
}

// Detener todo y limpiar la cola
export function stopVoiceGuide() {
  messageQueue.length = 0
  isSpeaking = false
  Speech.stop()
}

// Verificar si el sistema de voz esta disponible
export async function checkVoiceAvailable(): Promise<boolean> {
  const voices = await Speech.getAvailableVoicesAsync()
  return voices.some(v => v.language.startsWith('es'))
}
```

---

## 4. Motor de guia auditiva

El motor evalua la posicion del usuario cada vez que llega un nuevo punto GPS
y decide que anunciar.

```typescript
// src/utils/navigationVoiceEngine.ts

import { announce } from './voiceGuide'
import { haversineDistance } from './geo'
import type { ElevationSegment } from './elevation'
import type { RouteWaypoint } from '@/types/database'
import type { SecurityReport } from '@/types/database'

interface NavigationState {
  currentPositionIndex: number       // donde esta en la ruta
  lastAnnouncedSegmentIndex: number  // ultimo segmento de elevacion anunciado
  lastAnnouncedWaypointIndex: number // ultima parada anunciada
  lastDistanceAnnouncement: number   // en km, cuando se anuncio por ultima vez la distancia
  announcedSecurityReports: Set<string> // IDs de reportes ya anunciados
}

// Umbrales de anuncio
const ELEVATION_WARN_DISTANCE_M = 300  // avisar subida/bajada a 300m de distancia
const WAYPOINT_WARN_DISTANCE_M = 200   // avisar parada a 200m
const SECURITY_WARN_DISTANCE_M = 400   // avisar zona peligrosa a 400m
const DISTANCE_ANNOUNCE_INTERVAL_KM = 5 // anunciar distancia restante cada 5km

export class NavigationVoiceEngine {
  private state: NavigationState = {
    currentPositionIndex: 0,
    lastAnnouncedSegmentIndex: -1,
    lastAnnouncedWaypointIndex: -1,
    lastDistanceAnnouncement: Infinity,
    announcedSecurityReports: new Set(),
  }

  private routeCoordinates: [number, number][]
  private elevationSegments: ElevationSegment[]
  private waypoints: RouteWaypoint[]
  private securityReports: SecurityReport[]
  private totalDistanceKm: number

  constructor(
    routeCoordinates: [number, number][],
    elevationSegments: ElevationSegment[],
    waypoints: RouteWaypoint[],
    securityReports: SecurityReport[],
    totalDistanceKm: number
  ) {
    this.routeCoordinates = routeCoordinates
    this.elevationSegments = elevationSegments
    this.waypoints = waypoints
    this.securityReports = securityReports
    this.totalDistanceKm = totalDistanceKm
  }

  // Llamar este metodo cada vez que llega un nuevo punto GPS
  onPositionUpdate(lat: number, lng: number, distanceTraveledKm: number) {
    const distanceRemainingKm = this.totalDistanceKm - distanceTraveledKm

    this.checkElevationAlerts(distanceTraveledKm)
    this.checkWaypointAlerts(lat, lng)
    this.checkSecurityAlerts(lat, lng)
    this.checkDistanceAnnouncement(distanceRemainingKm)
  }

  private checkElevationAlerts(distanceTraveledKm: number) {
    // Buscar el segmento que viene en los proximos 300m
    const lookAheadKm = distanceTraveledKm + (ELEVATION_WARN_DISTANCE_M / 1000)

    for (let i = this.state.lastAnnouncedSegmentIndex + 1; i < this.elevationSegments.length; i++) {
      const seg = this.elevationSegments[i]

      // Si este segmento ya paso, saltar
      if (seg.startKm < distanceTraveledKm) {
        this.state.lastAnnouncedSegmentIndex = i
        continue
      }

      // Si el segmento esta dentro del rango de anuncio
      if (seg.startKm <= lookAheadKm) {
        const absGradient = Math.abs(seg.gradientPercent)

        // Solo anunciar si el cambio es significativo (mas de 5%)
        if (absGradient >= 5) {
          const distanceToSegmentM = Math.round((seg.startKm - distanceTraveledKm) * 1000)
          const segmentLengthM = Math.round((seg.endKm - seg.startKm) * 1000)
          const text = buildElevationAnnouncement(seg, distanceToSegmentM, segmentLengthM)

          announce(text, 'medium')
          this.state.lastAnnouncedSegmentIndex = i
        }

        break // solo anunciar el siguiente segmento significativo
      }
    }
  }

  private checkWaypointAlerts(lat: number, lng: number) {
    const nextWaypointIndex = this.state.lastAnnouncedWaypointIndex + 1

    if (nextWaypointIndex >= this.waypoints.length) return

    const waypoint = this.waypoints[nextWaypointIndex]
    const distanceM = haversineDistance(lat, lng, waypoint.lat, waypoint.lng) * 1000

    if (distanceM <= WAYPOINT_WARN_DISTANCE_M) {
      const typeLabel = WAYPOINT_TYPE_LABELS[waypoint.waypoint_type] ?? 'parada'
      const label = waypoint.label ? `, ${waypoint.label}` : ''
      announce(`En ${Math.round(distanceM)} metros, ${typeLabel}${label}`, 'medium')
      this.state.lastAnnouncedWaypointIndex = nextWaypointIndex
    }
  }

  private checkSecurityAlerts(lat: number, lng: number) {
    for (const report of this.securityReports) {
      if (this.state.announcedSecurityReports.has(report.id)) continue

      const distanceM = haversineDistance(lat, lng, report.lat, report.lng) * 1000

      if (distanceM <= SECURITY_WARN_DISTANCE_M) {
        const typeLabel = SECURITY_TYPE_LABELS[report.report_type] ?? 'zona de alerta'
        announce(`Atencion: ${typeLabel} reportada a ${Math.round(distanceM)} metros`, 'high')
        this.state.announcedSecurityReports.add(report.id)
      }
    }
  }

  private checkDistanceAnnouncement(distanceRemainingKm: number) {
    // Anunciar distancia restante en intervalos de 5km, y al llegar a 1km y 500m
    const milestones = [10, 5, 2, 1, 0.5]

    for (const milestone of milestones) {
      if (
        distanceRemainingKm <= milestone &&
        this.state.lastDistanceAnnouncement > milestone
      ) {
        const text = buildDistanceAnnouncement(distanceRemainingKm)
        announce(text, 'low')
        this.state.lastDistanceAnnouncement = milestone
        break
      }
    }
  }
}

// Construir el texto del anuncio de elevacion
function buildElevationAnnouncement(
  seg: ElevationSegment,
  distanceToM: number,
  segmentLengthM: number
): string {
  const abs = Math.abs(seg.gradientPercent)
  const isUphill = seg.gradientPercent > 0
  const direction = isUphill ? 'subida' : 'bajada'

  let intensity = ''
  if (abs >= 12) intensity = 'muy pronunciada'
  else if (abs >= 8) intensity = 'pronunciada'
  else if (abs >= 5) intensity = 'moderada'

  if (distanceToM < 50) {
    return `${direction} ${intensity} del ${abs}% por ${segmentLengthM} metros`
  }
  return `en ${distanceToM} metros, ${direction} ${intensity} del ${abs}% por ${segmentLengthM} metros`
}

function buildDistanceAnnouncement(remainingKm: number): string {
  if (remainingKm <= 0.1) return 'llegando al destino'
  if (remainingKm <= 0.5) return `${Math.round(remainingKm * 1000)} metros para llegar`
  if (remainingKm < 1) return `${Math.round(remainingKm * 1000)} metros para llegar`
  return `${remainingKm.toFixed(1)} kilometros para llegar`
}

const WAYPOINT_TYPE_LABELS: Record<string, string> = {
  stop: 'parada',
  water: 'punto de agua',
  shop: 'tienda',
  rest: 'zona de descanso',
}

const SECURITY_TYPE_LABELS: Record<string, string> = {
  theft: 'zona de robo',
  assault: 'zona de inseguridad',
  high_traffic: 'trafico alto',
  road_damage: 'via en mal estado',
}
```

---

## 5. Hook de navegacion activa

Este hook conecta el GPS con el motor de voz y el estado de la pantalla.

```typescript
// src/hooks/useActiveNavigation.ts

import { useEffect, useRef, useState, useCallback } from 'react'
import * as Location from 'expo-location'
import { NavigationVoiceEngine } from '@/utils/navigationVoiceEngine'
import { stopVoiceGuide, announce } from '@/utils/voiceGuide'
import { haversineDistance } from '@/utils/geo'
import type { Route } from '@/types/database'

interface NavigationStats {
  distanceTraveledKm: number
  distanceRemainingKm: number
  currentSpeedKmh: number
  elapsedSeconds: number
}

export function useActiveNavigation(route: Route | null) {
  const [isNavigating, setIsNavigating] = useState(false)
  const [stats, setStats] = useState<NavigationStats>({
    distanceTraveledKm: 0,
    distanceRemainingKm: route?.distance_km ?? 0,
    currentSpeedKmh: 0,
    elapsedSeconds: 0,
  })

  const engineRef = useRef<NavigationVoiceEngine | null>(null)
  const watcherRef = useRef<Location.LocationSubscription | null>(null)
  const startTimeRef = useRef<number>(0)
  const lastPositionRef = useRef<{ lat: number; lng: number } | null>(null)
  const distanceTraveledRef = useRef(0)

  const startNavigation = useCallback(async () => {
    if (!route) return

    // Pedir permiso de ubicacion en segundo plano
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') return

    // Inicializar el motor de voz
    // Los reportes de seguridad se pasan desde afuera via React Query
    engineRef.current = new NavigationVoiceEngine(
      route.geojson.coordinates,
      route.elevation_segments ?? [],
      [], // waypoints - se pueden pasar
      [], // security reports - vienen del contexto
      route.distance_km
    )

    startTimeRef.current = Date.now()
    distanceTraveledRef.current = 0
    setIsNavigating(true)

    announce(`Navegacion iniciada. Distancia total: ${route.distance_km.toFixed(1)} kilometros`, 'medium')

    // Suscribirse a actualizaciones de ubicacion
    watcherRef.current = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 1000,      // cada 1 segundo
        distanceInterval: 5,     // o cada 5 metros de movimiento
      },
      (location) => {
        const { latitude, longitude, speed } = location.coords
        const elapsedSeconds = Math.round((Date.now() - startTimeRef.current) / 1000)

        // Calcular distancia acumulada
        if (lastPositionRef.current) {
          const delta = haversineDistance(
            lastPositionRef.current.lat,
            lastPositionRef.current.lng,
            latitude,
            longitude
          )
          distanceTraveledRef.current += delta
        }

        lastPositionRef.current = { lat: latitude, lng: longitude }

        const distanceTraveledKm = distanceTraveledRef.current
        const distanceRemainingKm = Math.max(0, route.distance_km - distanceTraveledKm)
        const currentSpeedKmh = speed ? Math.round(speed * 3.6) : 0

        setStats({ distanceTraveledKm, distanceRemainingKm, currentSpeedKmh, elapsedSeconds })

        // Actualizar el motor de voz
        engineRef.current?.onPositionUpdate(latitude, longitude, distanceTraveledKm)
      }
    )
  }, [route])

  const stopNavigation = useCallback(() => {
    watcherRef.current?.remove()
    stopVoiceGuide()
    setIsNavigating(false)
    announce('Navegacion finalizada', 'low')
  }, [])

  // Limpiar al desmontar
  useEffect(() => {
    return () => {
      watcherRef.current?.remove()
      stopVoiceGuide()
    }
  }, [])

  return { isNavigating, stats, startNavigation, stopNavigation }
}
```

---

## 6. Pantalla de navegacion activa

```typescript
// src/screens/map/ActiveNavigationScreen.tsx

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { RutaCoMap } from '@/components/map/RutaCoMap'
import { RouteLayer } from '@/components/map/RouteLayer'
import { SecurityZonesLayer } from '@/components/map/SecurityZonesLayer'
import { useActiveNavigation } from '@/hooks/useActiveNavigation'
import { fetchRouteById } from '@/api/routes'
import { fetchSecurityReports } from '@/api/security'
import { COLORS } from '@/constants/colors'
import { formatDuration } from '@/utils/time'

export function ActiveNavigationScreen() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const route = useRoute<any>()
  const routeId = route.params?.routeId

  const { data: routeData } = useQuery({
    queryKey: ['route', routeId],
    queryFn: () => fetchRouteById(routeId),
  })

  const { data: securityReports = [] } = useQuery({
    queryKey: ['security-reports'],
    queryFn: fetchSecurityReports,
    refetchInterval: 1000 * 60 * 2, // refrescar cada 2 minutos durante navegacion
  })

  const { isNavigating, stats, startNavigation, stopNavigation } = useActiveNavigation(routeData ?? null)

  const handleFinish = () => {
    stopNavigation()
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      {/* Mapa en modo seguimiento */}
      <RutaCoMap followUser={isNavigating}>
        {routeData && (
          <RouteLayer route={routeData} />
        )}
        <SecurityZonesLayer reports={securityReports} />
      </RutaCoMap>

      {/* Panel de estadisticas en tiempo real */}
      <View style={[styles.statsPanel, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.statsRow}>
          <StatItem
            label="Recorrido"
            value={`${stats.distanceTraveledKm.toFixed(1)} km`}
          />
          <StatItem
            label="Restante"
            value={`${stats.distanceRemainingKm.toFixed(1)} km`}
          />
          <StatItem
            label="Velocidad"
            value={`${stats.currentSpeedKmh} km/h`}
          />
          <StatItem
            label="Tiempo"
            value={formatDuration(stats.elapsedSeconds)}
          />
        </View>

        <View style={styles.buttonsRow}>
          {!isNavigating ? (
            <TouchableOpacity
              style={styles.startButton}
              onPress={startNavigation}
            >
              <Text style={styles.startButtonText}>Iniciar navegacion</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.stopButton}
              onPress={handleFinish}
            >
              <Text style={styles.stopButtonText}>Finalizar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  )
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
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
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '700',
  },
  statLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  startButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 16,
  },
  stopButton: {
    flex: 1,
    backgroundColor: '#ef4444',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  stopButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
})
```

---

## 7. Configuracion de voz por el usuario

Agregar una pantalla de configuracion de navegacion para que el usuario pueda
ajustar la guia auditiva segun sus preferencias.

```typescript
// src/screens/profile/NavigationSettingsScreen.tsx

import { View, Text, Switch, StyleSheet } from 'react-native'
import { MMKV } from 'react-native-mmkv'

const storage = new MMKV()

// Claves de configuracion
const KEYS = {
  voiceEnabled: 'nav_voice_enabled',
  announceElevation: 'nav_announce_elevation',
  announceSecurity: 'nav_announce_security',
  announceDistance: 'nav_announce_distance',
  announceWaypoints: 'nav_announce_waypoints',
}

// Leer configuracion (con valores por defecto)
export function getNavigationSettings() {
  return {
    voiceEnabled: storage.getBoolean(KEYS.voiceEnabled) ?? true,
    announceElevation: storage.getBoolean(KEYS.announceElevation) ?? true,
    announceSecurity: storage.getBoolean(KEYS.announceSecurity) ?? true,
    announceDistance: storage.getBoolean(KEYS.announceDistance) ?? true,
    announceWaypoints: storage.getBoolean(KEYS.announceWaypoints) ?? true,
  }
}

export function NavigationSettingsScreen() {
  const [settings, setSettings] = React.useState(getNavigationSettings)

  const toggle = (key: keyof typeof KEYS) => {
    const newValue = !settings[key]
    storage.set(KEYS[key], newValue)
    setSettings(prev => ({ ...prev, [key]: newValue }))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guia auditiva</Text>

      <SettingRow
        label="Guia por voz activada"
        description="Anuncios de voz durante la navegacion"
        value={settings.voiceEnabled}
        onToggle={() => toggle('voiceEnabled')}
      />
      <SettingRow
        label="Avisos de elevacion"
        description="Avisar subidas y bajadas significativas"
        value={settings.announceElevation}
        onToggle={() => toggle('announceElevation')}
        disabled={!settings.voiceEnabled}
      />
      <SettingRow
        label="Alertas de seguridad"
        description="Avisar zonas reportadas como peligrosas"
        value={settings.announceSecurity}
        onToggle={() => toggle('announceSecurity')}
        disabled={!settings.voiceEnabled}
      />
      <SettingRow
        label="Distancia restante"
        description="Recordatorio periodico de cuanto falta"
        value={settings.announceDistance}
        onToggle={() => toggle('announceDistance')}
        disabled={!settings.voiceEnabled}
      />
      <SettingRow
        label="Paradas planificadas"
        description="Avisar cuando se acerca a una parada"
        value={settings.announceWaypoints}
        onToggle={() => toggle('announceWaypoints')}
        disabled={!settings.voiceEnabled}
      />
    </View>
  )
}

function SettingRow({ label, description, value, onToggle, disabled = false }: any) {
  return (
    <View style={[styles.row, disabled && styles.rowDisabled]}>
      <View style={styles.rowText}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowDescription}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        disabled={disabled}
        trackColor={{ true: COLORS.primary }}
      />
    </View>
  )
}
```

---

## Checklist de esta sub-fase

```
[ ] Expo Speech funciona en iOS y Android con voz en espanol
[ ] La guia avisa subidas de mas del 5% a 300 metros de distancia
[ ] La guia avisa bajadas pronunciadas (mas del 8%)
[ ] Zonas de inseguridad se anuncian a 400 metros
[ ] Paradas planificadas se anuncian a 200 metros
[ ] La distancia restante se anuncia en los hitos (10, 5, 2, 1, 0.5 km)
[ ] Los anuncios no se interrumpen entre si (cola funciona)
[ ] Las alertas de alta prioridad (seguridad) interrumpen los de menor prioridad
[ ] El usuario puede configurar que tipos de anuncios quiere
[ ] Al pausar la navegacion la guia se pausa tambien
[ ] Al finalizar la navegacion la guia se detiene limpiamente
[ ] Probado en ruta real (o simulada con GPX) para verificar los tiempos de anuncio
```

---

Siguiente documento: 11_planificador_de_rutas.md
