# 09 - Directorio de Servicios
## Fase 1 - MVP Base

**Proposito de este documento:**
Implementar el directorio de talleres, puestos informales y puntos de servicio
para ciclistas. Esta es una de las funcionalidades mas unicas de RutaCo: ninguna
app del mundo mapea los puestos ambulantes de reparacion de bicicletas.

---

## 1. Tipos de puntos de servicio

```
formal_shop     Talleres formales con local fijo, horario establecido
informal_stand  Puestos ambulantes o informales (muy comunes en Bogota)
water           Puntos de agua potable en ruta
food            Tiendas, fruterias, puntos de alimentacion
other           Otros servicios utiles para ciclistas
```

Los puntos informales son los mas valiosos porque no estan en ninguna otra app.
Son conocidos solo por la comunidad ciclista local.

---

## 2. Pantalla del directorio

```typescript
// src/screens/map/ServicePointsScreen.tsx

import { useState } from 'react'
import {
  View, Text, StyleSheet, FlatList,
  TouchableOpacity, TextInput
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { fetchServicePoints } from '@/api/services'
import { ServicePointCard } from '@/components/map/ServicePointCard'
import { COLORS } from '@/constants/colors'

// Configuracion visual de cada tipo de servicio
export const SERVICE_TYPE_CONFIG = {
  formal_shop: {
    label: 'Taller',
    emoji: '🔧',
    color: '#3b82f6',
    description: 'Taller de bicicletas con local fijo',
  },
  informal_stand: {
    label: 'Puesto',
    emoji: '⚙️',
    color: '#f59e0b',
    description: 'Puesto informal o ambulante',
  },
  water: {
    label: 'Agua',
    emoji: '💧',
    color: '#06b6d4',
    description: 'Punto de agua potable',
  },
  food: {
    label: 'Comida',
    emoji: '🍌',
    color: '#10b981',
    description: 'Tienda o punto de alimentacion',
  },
  other: {
    label: 'Otro',
    emoji: '📍',
    color: '#6b7280',
    description: 'Otro servicio util',
  },
}

type ServiceFilter = keyof typeof SERVICE_TYPE_CONFIG | 'all'

export function ServicePointsScreen() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<any>()
  const [activeFilter, setActiveFilter] = useState<ServiceFilter>('all')
  const [searchText, setSearchText] = useState('')

  const { data: allPoints = [], isLoading } = useQuery({
    queryKey: ['service-points'],
    queryFn: fetchServicePoints,
  })

  // Filtrar puntos segun el filtro activo y el texto de busqueda
  const filteredPoints = allPoints.filter((point) => {
    const matchesType = activeFilter === 'all' || point.service_type === activeFilter
    const matchesSearch = !searchText
      || point.name.toLowerCase().includes(searchText.toLowerCase())
      || point.address?.toLowerCase().includes(searchText.toLowerCase())
    return matchesType && matchesSearch
  })

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Servicios</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddServicePoint')}
        >
          <Text style={styles.addButtonText}>+ Agregar</Text>
        </TouchableOpacity>
      </View>

      {/* Buscador */}
      <TextInput
        style={styles.searchInput}
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Buscar talleres, puestos..."
        placeholderTextColor={COLORS.textMuted}
      />

      {/* Filtros de tipo */}
      <View style={styles.filters}>
        <FilterChip
          label="Todos"
          isActive={activeFilter === 'all'}
          onPress={() => setActiveFilter('all')}
        />
        {Object.entries(SERVICE_TYPE_CONFIG).map(([type, config]) => (
          <FilterChip
            key={type}
            label={config.label}
            emoji={config.emoji}
            isActive={activeFilter === type}
            onPress={() => setActiveFilter(type as ServiceFilter)}
            color={config.color}
          />
        ))}
      </View>

      {/* Lista de puntos */}
      <FlatList
        data={filteredPoints}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ServicePointCard
            point={item}
            onPress={() => navigation.navigate('ServicePointDetail', { pointId: item.id })}
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              {isLoading ? 'Cargando...' : 'No hay puntos en esta categoria'}
            </Text>
            <Text style={styles.emptySubtext}>
              Sé el primero en agregar uno
            </Text>
          </View>
        }
      />
    </View>
  )
}

function FilterChip({
  label, emoji, isActive, onPress, color
}: {
  label: string
  emoji?: string
  isActive: boolean
  onPress: () => void
  color?: string
}) {
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        isActive && { backgroundColor: color ?? COLORS.primary, borderColor: color ?? COLORS.primary }
      ]}
      onPress={onPress}
    >
      <Text style={[styles.chipText, isActive && { color: '#000' }]}>
        {emoji ? `${emoji} ${label}` : label}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 14,
  },
  searchInput: {
    marginHorizontal: 16,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: COLORS.text,
    marginBottom: 12,
  },
  filters: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  chip: {
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  chipText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
  list: {
    padding: 16,
    gap: 10,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 48,
    gap: 8,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 16,
  },
  emptySubtext: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
})
```

---

## 3. Tarjeta de punto de servicio

```typescript
// src/components/map/ServicePointCard.tsx

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import type { ServicePoint } from '@/types/database'
import { SERVICE_TYPE_CONFIG } from '@/screens/map/ServicePointsScreen'
import { COLORS } from '@/constants/colors'

interface Props {
  point: ServicePoint
  onPress: () => void
}

export function ServicePointCard({ point, onPress }: Props) {
  const config = SERVICE_TYPE_CONFIG[point.service_type as keyof typeof SERVICE_TYPE_CONFIG]
    ?? SERVICE_TYPE_CONFIG.other

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      {/* Icono del tipo */}
      <View style={[styles.iconContainer, { backgroundColor: config.color + '20' }]}>
        <Text style={styles.icon}>{config.emoji}</Text>
      </View>

      {/* Informacion */}
      <View style={styles.info}>
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1}>{point.name}</Text>
          {point.is_verified && (
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedText}>✓ Verificado</Text>
            </View>
          )}
        </View>

        <Text style={styles.type}>{config.label}</Text>

        {point.address && (
          <Text style={styles.address} numberOfLines={1}>
            📍 {point.address}
          </Text>
        )}

        {point.schedule && (
          <Text style={styles.schedule} numberOfLines={1}>
            🕐 {point.schedule}
          </Text>
        )}
      </View>

      {/* Votos */}
      <View style={styles.votes}>
        <Text style={styles.voteCount}>👍 {point.upvotes}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  icon: { fontSize: 24 },
  info: { flex: 1, gap: 3 },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
    flex: 1,
  },
  verifiedBadge: {
    backgroundColor: COLORS.primary + '20',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  verifiedText: {
    fontSize: 10,
    color: COLORS.primary,
    fontWeight: '600',
  },
  type: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  address: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  schedule: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  votes: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  voteCount: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
})
```

---

## 4. Formulario para agregar un punto

```typescript
// src/screens/map/AddServicePointScreen.tsx

import { useState } from 'react'
import {
  View, Text, StyleSheet, TextInput,
  TouchableOpacity, ScrollView, Alert
} from 'react-native'
import * as Location from 'expo-location'
import { useNavigation } from '@react-navigation/native'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addServicePoint } from '@/api/services'
import { SERVICE_TYPE_CONFIG } from './ServicePointsScreen'
import { COLORS } from '@/constants/colors'

export function AddServicePointScreen() {
  const navigation = useNavigation()
  const queryClient = useQueryClient()

  const [name, setName] = useState('')
  const [serviceType, setServiceType] = useState<string>('formal_shop')
  const [address, setAddress] = useState('')
  const [schedule, setSchedule] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)

  // useMutation de React Query para operaciones que modifican datos
  // Maneja automaticamente el estado de carga y los errores
  const mutation = useMutation({
    mutationFn: addServicePoint,
    onSuccess: () => {
      // Invalidar el cache de service-points para que se recargue la lista
      queryClient.invalidateQueries({ queryKey: ['service-points'] })
      Alert.alert(
        'Punto agregado',
        'Gracias por contribuir a la comunidad RutaCo. El punto sera revisado pronto.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      )
    },
    onError: () => {
      Alert.alert('Error', 'No pudimos guardar el punto. Intentalo de nuevo.')
    },
  })

  const useMyLocation = async () => {
    setIsGettingLocation(true)
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert('Permiso requerido', 'Necesitamos acceso a tu ubicacion.')
        return
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      })

      setCoords({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      })

      // Intentar obtener el nombre de la direccion
      const [geocode] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })

      if (geocode) {
        const addr = [geocode.street, geocode.streetNumber, geocode.district]
          .filter(Boolean)
          .join(', ')
        setAddress(addr)
      }
    } finally {
      setIsGettingLocation(false)
    }
  }

  const handleSubmit = () => {
    if (!name.trim()) {
      Alert.alert('Nombre requerido', 'Ingresa el nombre del punto de servicio')
      return
    }
    if (!coords) {
      Alert.alert('Ubicacion requerida', 'Usa "Mi ubicacion" o marca el punto en el mapa')
      return
    }

    mutation.mutate({
      name: name.trim(),
      service_type: serviceType,
      lat: coords.lat,
      lng: coords.lng,
      address: address.trim() || null,
      schedule: schedule.trim() || null,
      phone: phone.trim() || null,
      notes: notes.trim() || null,
    })
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Agregar punto de servicio</Text>
      <Text style={styles.subtitle}>
        Ayuda a la comunidad ciclista colombiana compartiendo este lugar
      </Text>

      {/* Tipo de servicio */}
      <View style={styles.field}>
        <Text style={styles.label}>Tipo de servicio</Text>
        <View style={styles.typeGrid}>
          {Object.entries(SERVICE_TYPE_CONFIG).map(([type, config]) => (
            <TouchableOpacity
              key={type}
              style={[styles.typeOption, serviceType === type && styles.typeOptionActive]}
              onPress={() => setServiceType(type)}
            >
              <Text style={styles.typeEmoji}>{config.emoji}</Text>
              <Text style={[
                styles.typeLabel,
                serviceType === type && { color: COLORS.primary }
              ]}>
                {config.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Nombre */}
      <View style={styles.field}>
        <Text style={styles.label}>Nombre *</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Ej: Ciclo Express, Puesto de la Calle 45"
          placeholderTextColor={COLORS.textMuted}
        />
      </View>

      {/* Ubicacion */}
      <View style={styles.field}>
        <Text style={styles.label}>Ubicacion *</Text>
        <TouchableOpacity
          style={[styles.locationButton, coords && styles.locationButtonActive]}
          onPress={useMyLocation}
          disabled={isGettingLocation}
        >
          <Text style={styles.locationButtonText}>
            {isGettingLocation ? 'Obteniendo ubicacion...'
              : coords ? '✓ Ubicacion guardada'
              : '📍 Usar mi ubicacion actual'}
          </Text>
        </TouchableOpacity>
        {coords && (
          <Text style={styles.coordsText}>
            {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
          </Text>
        )}
      </View>

      {/* Direccion */}
      <View style={styles.field}>
        <Text style={styles.label}>Direccion (opcional)</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Ej: Calle 45 # 12-34, Chapinero"
          placeholderTextColor={COLORS.textMuted}
        />
      </View>

      {/* Horario */}
      <View style={styles.field}>
        <Text style={styles.label}>Horario (opcional)</Text>
        <TextInput
          style={styles.input}
          value={schedule}
          onChangeText={setSchedule}
          placeholder="Ej: Lunes a sabado 8am - 6pm"
          placeholderTextColor={COLORS.textMuted}
        />
      </View>

      {/* Notas */}
      <View style={styles.field}>
        <Text style={styles.label}>Notas adicionales (opcional)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={notes}
          onChangeText={setNotes}
          placeholder="Servicios que ofrece, precios aproximados, etc."
          placeholderTextColor={COLORS.textMuted}
          multiline
          numberOfLines={3}
        />
      </View>

      {/* Boton de envio */}
      <TouchableOpacity
        style={[styles.submitButton, mutation.isPending && { opacity: 0.6 }]}
        onPress={handleSubmit}
        disabled={mutation.isPending}
      >
        <Text style={styles.submitButtonText}>
          {mutation.isPending ? 'Guardando...' : 'Agregar punto'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20, gap: 20, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: '800', color: COLORS.text },
  subtitle: { fontSize: 14, color: COLORS.textSecondary, marginTop: -12 },
  field: { gap: 8 },
  label: { fontSize: 14, fontWeight: '600', color: COLORS.textSecondary },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.text,
  },
  textArea: { height: 80, textAlignVertical: 'top' },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeOption: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    gap: 4,
    width: '30%',
  },
  typeOptionActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '15',
  },
  typeEmoji: { fontSize: 20 },
  typeLabel: { fontSize: 12, color: COLORS.textSecondary, fontWeight: '500' },
  locationButton: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  locationButtonActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '15',
  },
  locationButtonText: { color: COLORS.primary, fontWeight: '600', fontSize: 15 },
  coordsText: { fontSize: 11, color: COLORS.textMuted, textAlign: 'center' },
  submitButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: { color: '#000', fontSize: 16, fontWeight: '700' },
})
```

---

## 5. API de servicios

```typescript
// src/api/services.ts

import { supabase } from './supabase'

export async function fetchServicePoints() {
  const { data, error } = await supabase
    .from('service_points')
    .select('*')
    .eq('is_active', true)
    .order('upvotes', { ascending: false })

  if (error) return []
  return data ?? []
}

export async function addServicePoint(point: Omit<ServicePoint,
  'id' | 'added_by' | 'is_verified' | 'is_active' | 'upvotes' | 'downvotes' | 'created_at'
>) {
  const { data: { user } } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('service_points')
    .insert({ ...point, added_by: user?.id })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function voteServicePoint(pointId: string, isUpvote: boolean) {
  const column = isUpvote ? 'upvotes' : 'downvotes'
  await supabase.rpc('increment_service_point_vote', {
    p_point_id: pointId,
    p_column: column,
  })
}
```

---

## Checklist de esta sub-fase

```
[ ] Lista de servicios se muestra con datos de prueba
[ ] Filtros por tipo funcionan correctamente
[ ] Busqueda por nombre y direccion funciona
[ ] Tarjetas muestran nombre, tipo, horario y verificacion
[ ] Formulario de agregar punto captura todos los campos
[ ] Boton "mi ubicacion" obtiene coordenadas correctamente
[ ] Geocodificacion inversa muestra la direccion aproximada
[ ] El punto se guarda en Supabase correctamente
[ ] Tras guardar, la lista se actualiza automaticamente (React Query)
[ ] Pins aparecen en el mapa principal con clustering
```

---

Con esto termina la Fase 1 (MVP Base). El siguiente conjunto de documentos
cubre la Fase 2: Navegacion auditiva, planificador de rutas, clima y feed social.

Siguiente documento: 10_guia_auditiva.md
