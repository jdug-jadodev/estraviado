import { View, Text, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { usePlannerStore } from '@/store/plannerStore'
import { formatDuration } from '@/utils/formatDuration'
import { COLORS } from '@/constants/colors'

interface Props {
  plannerActive: boolean
  isPanelExpanded: boolean
}

export function RouteDetailsCard({ plannerActive, isPanelExpanded }: Props) {
  const insets = useSafeAreaInsets()
  const { route, pinDropMode, isDrawingMode } = usePlannerStore()

  // No mostrar si no hay ruta, si el planificador está inactivo,
  // si el panel está expandido, si el pin drop está activo,
  // o si el modo dibujo está activo (evita solapamiento con DrawingModeBanner)
  if (!route || !plannerActive || isPanelExpanded || !!pinDropMode || isDrawingMode) return null

  return (
    <View style={[styles.card, { top: insets.top + 16 }]}>
      <View style={styles.header}>
        <Text style={styles.title}>📍 Tu Ruta</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.label}>Distancia</Text>
          <Text style={styles.value}>{route.distance_km} km</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>Tiempo</Text>
          <Text style={styles.value}>{formatDuration(route.duration_minutes)}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    left: 16,
    right: 16,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: `${COLORS.primary}15`,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: `${COLORS.border}50`,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
  divider: {
    height: 1,
    backgroundColor: `${COLORS.border}50`,
    marginVertical: 4,
  },
})
