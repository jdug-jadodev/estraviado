import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { usePlannerStore } from '@/store/plannerStore'
import { COLORS } from '@/constants/colors'

export function PinDropBanner() {
  const insets = useSafeAreaInsets()
  const { pinDropMode, setPinDropMode } = usePlannerStore()

  if (!pinDropMode) return null

  return (
    <View
      pointerEvents="box-none"
      style={[styles.overlay, { paddingTop: insets.top + 12 }]}
    >
      <View style={styles.banner}>
        <Text style={styles.bannerText}>
          {pinDropMode === 'origin'
            ? '📍 Toca el mapa para marcar el punto de salida'
            : '🎯 Toca el mapa para marcar el punto de llegada'}
        </Text>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => setPinDropMode(null)}
          activeOpacity={0.8}
        >
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 30,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  banner: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    gap: 10,
  },
  bannerText: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  cancelButton: {
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: `${COLORS.error}20`,
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  cancelText: {
    color: COLORS.error,
    fontSize: 13,
    fontWeight: '600',
  },
})
