import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { usePlannerStore } from '@/store/plannerStore'
import { COLORS } from '@/constants/colors'

interface DrawingModeBannerProps {
  onFinish?: () => void | Promise<void>
}

export function DrawingModeBanner({ onFinish }: DrawingModeBannerProps) {
  const insets = useSafeAreaInsets()
  const { isDrawingMode, drawnStrokes, undoLastStroke, clearDrawnPoints } = usePlannerStore()

  if (!isDrawingMode) return null

  const strokeCount = drawnStrokes.filter(s => s.length > 0).length
  const hasStrokes = strokeCount > 0

  return (
    <View
      pointerEvents="box-none"
      style={[styles.container, { top: insets.top + 80 }]}
    >
      {/* Calcular ruta */}
      <TouchableOpacity
        style={[styles.btn, styles.btnConfirm, !hasStrokes && styles.btnDisabled]}
        onPress={() => onFinish?.()}
        activeOpacity={0.8}
        disabled={!hasStrokes}
      >
        <Text style={styles.icon}>✓</Text>
      </TouchableOpacity>

      {/* Deshacer último trazo */}
      <TouchableOpacity
        style={[styles.btn, styles.btnUndo, !hasStrokes && styles.btnDisabled]}
        onPress={undoLastStroke}
        activeOpacity={0.8}
        disabled={!hasStrokes}
      >
        <Text style={styles.icon}>↩</Text>
      </TouchableOpacity>

      {/* Limpiar todo */}
      <TouchableOpacity
        style={[styles.btn, styles.btnClear, !hasStrokes && styles.btnDisabled]}
        onPress={clearDrawnPoints}
        activeOpacity={0.8}
        disabled={!hasStrokes}
      >
        <Text style={styles.icon}>✕</Text>
      </TouchableOpacity>
    </View>
  )
}

const BTN_SIZE = 44

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 14,
    zIndex: 30,
    alignItems: 'center',
    gap: 10,
  },
  btn: {
    width: BTN_SIZE,
    height: BTN_SIZE,
    borderRadius: BTN_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  btnConfirm: {
    backgroundColor: '#8b5cf6',
  },
  btnUndo: {
    backgroundColor: COLORS.surface,
    borderWidth: 1.5,
    borderColor: '#8b5cf6',
  },
  btnClear: {
    backgroundColor: COLORS.surface,
    borderWidth: 1.5,
    borderColor: COLORS.error,
  },
  btnDisabled: {
    opacity: 0.35,
  },
  icon: {
    fontSize: 18,
    color: COLORS.text,
    fontWeight: '700',
  },
})

