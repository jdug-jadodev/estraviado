# 12 - Clima
## Fase 2 - Navegacion y Social

**Proposito de este documento:**
Integrar informacion climatica en tiempo real dentro de RutaCo. El ciclista
necesita saber la temperatura y probabilidad de lluvia en la zona donde va a
pedalear, especialmente en Bogota donde el clima cambia radicalmente por zonas
en cuestion de kilometros.

**Por que Open-Meteo y no Weather API u OpenWeatherMap:**
Open-Meteo es completamente gratis, sin limites, sin necesidad de tarjeta de credito
y sin necesidad de crear cuenta. La precision en Colombia es comparable a las opciones
de pago. Para una app en etapa MVP y con un stack de costo cero, es la eleccion obvia.

---

## 1. Que datos de clima usamos

Para una app de ciclismo, no necesitamos todos los datos meteorologicos. Lo que
le sirve al ciclista es:

- Temperatura actual en la zona de salida
- Probabilidad de lluvia en las proximas 2-4 horas
- Velocidad del viento (relevante para rutas largas o en cordillera)
- Si hay lluvia en este momento en alguna zona de la ruta

---

## 2. Open-Meteo: como funciona la API

Open-Meteo devuelve datos por coordenadas (latitud y longitud). No hay que
registrarse ni usar tokens. La URL base es:

```
https://api.open-meteo.com/v1/forecast
```

Parametros principales:
- `latitude` y `longitude`: coordenadas del punto a consultar
- `current`: variables del momento actual (temperatura, precipitacion, etc.)
- `hourly`: variables hora por hora para las proximas 24 horas
- `timezone`: para que las horas vengan en hora local

Para Colombia usar `timezone=America/Bogota`.

---

## 3. Servicio de clima

```typescript
// src/api/weather.ts

const OPEN_METEO_URL = 'https://api.open-meteo.com/v1/forecast'

export interface WeatherCurrent {
  temperature: number        // Celsius
  feelsLike: number
  precipitationMmH: number   // mm/hora de lluvia en este momento
  windSpeedKmh: number
  weatherCode: number        // codigo WMO para condicion general
  isRaining: boolean
}

export interface WeatherHourly {
  hour: Date
  temperature: number
  precipitationProbability: number  // porcentaje 0-100
  precipitationMm: number
}

export interface WeatherData {
  current: WeatherCurrent
  nextHours: WeatherHourly[]  // proximas 4 horas
  summary: string             // descripcion en texto natural para mostrar al usuario
}

export async function getWeatherForRoute(
  lat: number,
  lng: number
): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lng.toString(),
    current: [
      'temperature_2m',
      'apparent_temperature',
      'precipitation',
      'wind_speed_10m',
      'weather_code',
    ].join(','),
    hourly: [
      'temperature_2m',
      'precipitation_probability',
      'precipitation',
    ].join(','),
    timezone: 'America/Bogota',
    forecast_days: '1',
  })

  const res = await fetch(`${OPEN_METEO_URL}?${params}`)

  if (!res.ok) {
    throw new Error('No se pudo obtener el clima')
  }

  const data = await res.json()
  return parseWeatherResponse(data)
}

function parseWeatherResponse(data: any): WeatherData {
  const c = data.current

  const current: WeatherCurrent = {
    temperature: Math.round(c.temperature_2m),
    feelsLike: Math.round(c.apparent_temperature),
    precipitationMmH: c.precipitation ?? 0,
    windSpeedKmh: Math.round(c.wind_speed_10m),
    weatherCode: c.weather_code,
    isRaining: (c.precipitation ?? 0) > 0.1,
  }

  // Parsear las proximas 4 horas desde la hora actual
  const now = new Date()
  const currentHour = now.getHours()
  const nextHours: WeatherHourly[] = []

  for (let i = currentHour; i < currentHour + 4 && i < data.hourly.time.length; i++) {
    nextHours.push({
      hour: new Date(data.hourly.time[i]),
      temperature: Math.round(data.hourly.temperature_2m[i]),
      precipitationProbability: data.hourly.precipitation_probability[i] ?? 0,
      precipitationMm: data.hourly.precipitation[i] ?? 0,
    })
  }

  const summary = buildWeatherSummary(current, nextHours)

  return { current, nextHours, summary }
}

// Generar una descripcion util en texto natural para el ciclista
function buildWeatherSummary(current: WeatherCurrent, nextHours: WeatherHourly[]): string {
  const parts: string[] = []

  // Temperatura actual
  parts.push(`${current.temperature}°C`)

  // Si esta lloviendo ahora
  if (current.isRaining) {
    parts.push('lloviendo ahora')
  }

  // Si va a llover en las proximas 2 horas
  const rainSoon = nextHours.slice(0, 2).find(h => h.precipitationProbability >= 60)
  if (!current.isRaining && rainSoon) {
    const hoursUntilRain = nextHours.indexOf(rainSoon) + 1
    parts.push(`lluvia en ${hoursUntilRain}h (${rainSoon.precipitationProbability}%)`)
  }

  // Viento fuerte (mas de 20 km/h es relevante en bicicleta)
  if (current.windSpeedKmh >= 20) {
    parts.push(`viento ${current.windSpeedKmh} km/h`)
  }

  return parts.join(' · ')
}

// Obtener el clima en multiples puntos de una ruta (inicio, mitad y fin)
// Util para rutas largas donde el clima puede ser distinto en cada extremo
export async function getRouteWeatherProfile(
  coordinates: [number, number][]  // [lng, lat]
): Promise<{ point: string; weather: WeatherData }[]> {
  const points = [
    { point: 'Salida', coord: coordinates[0] },
    { point: 'Mitad', coord: coordinates[Math.floor(coordinates.length / 2)] },
    { point: 'Llegada', coord: coordinates[coordinates.length - 1] },
  ]

  // Hacer las 3 llamadas en paralelo
  const results = await Promise.allSettled(
    points.map(p => getWeatherForRoute(p.coord[1], p.coord[0]))
  )

  return points
    .map((p, i) => {
      const result = results[i]
      if (result.status === 'fulfilled') {
        return { point: p.point, weather: result.value }
      }
      return null
    })
    .filter(Boolean) as any[]
}
```

---

## 4. Componentes de clima

### Widget compacto para la pantalla del mapa

```typescript
// src/components/weather/WeatherWidget.tsx

import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { getWeatherForRoute } from '@/api/weather'
import type { WeatherData } from '@/api/weather'
import { COLORS } from '@/constants/colors'

// Emojis del codigo WMO de condicion climatica
function getWeatherEmoji(code: number, isRaining: boolean): string {
  if (isRaining || (code >= 51 && code <= 67)) return '🌧️'
  if (code >= 71 && code <= 77) return '❄️'
  if (code >= 80 && code <= 82) return '🌦️'
  if (code >= 95) return '⛈️'
  if (code >= 2 && code <= 3) return '☁️'
  if (code === 1) return '🌤️'
  return '☀️'
}

interface Props {
  lat: number
  lng: number
  onPress?: () => void
}

export function WeatherWidget({ lat, lng, onPress }: Props) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getWeatherForRoute(lat, lng)
      .then(setWeather)
      .catch(() => null) // silenciar errores en el widget compacto
      .finally(() => setLoading(false))
  }, [lat, lng])

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>...</Text>
      </View>
    )
  }

  if (!weather) return null

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.emoji}>
        {getWeatherEmoji(weather.current.weatherCode, weather.current.isRaining)}
      </Text>
      <Text style={styles.temp}>{weather.current.temperature}°</Text>
      {weather.current.isRaining && (
        <View style={styles.rainBadge}>
          <Text style={styles.rainText}>lluvia</Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  loading: { color: COLORS.textSecondary, fontSize: 13 },
  emoji: { fontSize: 16 },
  temp: { color: COLORS.text, fontSize: 15, fontWeight: '600' },
  rainBadge: {
    backgroundColor: '#3b82f620',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  rainText: { color: '#60a5fa', fontSize: 11 },
})
```

### Panel de clima detallado para detalle de ruta

```typescript
// src/components/weather/RouteWeatherPanel.tsx

import { View, Text, StyleSheet } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { getRouteWeatherProfile } from '@/api/weather'
import { COLORS } from '@/constants/colors'

interface Props {
  routeCoordinates: [number, number][]
}

export function RouteWeatherPanel({ routeCoordinates }: Props) {
  const { data: weatherProfile, isLoading } = useQuery({
    queryKey: ['route-weather', routeCoordinates[0], routeCoordinates[routeCoordinates.length - 1]],
    queryFn: () => getRouteWeatherProfile(routeCoordinates),
    staleTime: 1000 * 60 * 30, // cachear 30 minutos
  })

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Consultando clima...</Text>
      </View>
    )
  }

  if (!weatherProfile || weatherProfile.length === 0) return null

  // Determinar si hay alerta de lluvia en algun punto de la ruta
  const hasRainAlert = weatherProfile.some(
    p => p.weather.current.isRaining ||
    p.weather.nextHours.slice(0, 2).some(h => h.precipitationProbability >= 60)
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clima en la ruta</Text>

      {hasRainAlert && (
        <View style={styles.alert}>
          <Text style={styles.alertText}>
            ⚠️ Posibilidad de lluvia en el recorrido
          </Text>
        </View>
      )}

      <View style={styles.pointsRow}>
        {weatherProfile.map(({ point, weather }) => (
          <View key={point} style={styles.pointCard}>
            <Text style={styles.pointLabel}>{point}</Text>
            <Text style={styles.pointTemp}>{weather.current.temperature}°C</Text>
            <Text style={styles.pointSummary}>{weather.summary}</Text>

            {/* Proximas 2 horas */}
            <View style={styles.hoursRow}>
              {weather.nextHours.slice(0, 3).map((h, i) => (
                <View key={i} style={styles.hourCell}>
                  <Text style={styles.hourTime}>
                    {h.hour.getHours()}:00
                  </Text>
                  <Text style={styles.hourTemp}>{h.temperature}°</Text>
                  {h.precipitationProbability > 0 && (
                    <Text style={styles.hourRain}>{h.precipitationProbability}%</Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
  },
  loading: { color: COLORS.textSecondary, textAlign: 'center' },
  title: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  alert: {
    backgroundColor: '#f59e0b20',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  alertText: { color: '#f59e0b', fontSize: 13 },
  pointsRow: { gap: 12 },
  pointCard: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 12,
  },
  pointLabel: {
    color: COLORS.textSecondary,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  pointTemp: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: '700',
  },
  pointSummary: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginTop: 4,
    marginBottom: 8,
  },
  hoursRow: {
    flexDirection: 'row',
    gap: 8,
  },
  hourCell: {
    alignItems: 'center',
    minWidth: 44,
  },
  hourTime: { color: COLORS.textSecondary, fontSize: 11 },
  hourTemp: { color: COLORS.text, fontSize: 13, fontWeight: '600' },
  hourRain: { color: '#60a5fa', fontSize: 11 },
})
```

---

## 5. Integracion en la pantalla de detalle de ruta

En la pantalla `RouteDetailScreen` (ya existente del MVP) agregar el panel de clima
justo antes del grafico de elevacion. El clima se carga de forma independiente para
no bloquear el resto de la pantalla.

```typescript
// Dentro de RouteDetailScreen.tsx, en el ScrollView de contenido:

{/* Clima de la ruta */}
{route.geojson?.coordinates && (
  <RouteWeatherPanel routeCoordinates={route.geojson.coordinates} />
)}

{/* Grafico de elevacion (ya existia) */}
<ElevationChart segments={route.elevation_segments} />
```

---

## 6. Alerta de clima durante la navegacion activa

Cuando el usuario esta navegando, si el clima cambia (empieza a llover), la guia
auditiva lo avisa automaticamente.

```typescript
// Dentro de useActiveNavigation.ts, en el intervalo de actualizacion:

// Revisar clima cada 15 minutos durante la navegacion
useEffect(() => {
  if (!isNavigating || !route) return

  const interval = setInterval(async () => {
    const position = lastPositionRef.current
    if (!position) return

    try {
      const weather = await getWeatherForRoute(position.lat, position.lng)

      if (weather.current.isRaining) {
        announce('Atencion: esta comenzando a llover en tu zona', 'high')
      } else {
        const rainSoon = weather.nextHours[0]?.precipitationProbability >= 70
        if (rainSoon) {
          announce('Probablemente llueva en la proxima hora en tu zona', 'medium')
        }
      }
    } catch {
      // Ignorar errores de clima durante navegacion
    }
  }, 1000 * 60 * 15) // cada 15 minutos

  return () => clearInterval(interval)
}, [isNavigating, route])
```

---

## Checklist de esta sub-fase

```
[ ] Open-Meteo devuelve datos correctos para coordenadas de Bogota
[ ] El widget compacto de clima aparece en la pantalla del mapa
[ ] El panel de clima detallado aparece en el detalle de cada ruta
[ ] Los tres puntos de la ruta (inicio, mitad, fin) muestran clima correcto
[ ] La alerta de lluvia se muestra cuando hay 60% o mas de probabilidad
[ ] El clima se cachea 30 minutos para no hacer llamadas innecesarias
[ ] Durante la navegacion activa el clima se revisa cada 15 minutos
[ ] La guia auditiva avisa cuando empieza a llover durante la navegacion
[ ] El emoji de condicion climatica corresponde al codigo WMO correcto
[ ] Funciona sin conexion mostrando los datos del ultimo cache
```

---

Siguiente documento: 13_feed_social.md
