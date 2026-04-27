import { TouchableOpacity, StyleSheet, Text } from 'react-native'
import { COLORS } from '@/constants/colors'

interface SwapLocationsButtonProps {
  onPress: () => void
  disabled?: boolean
}

export function SwapLocationsButton({
  onPress,
  disabled = false,
}: SwapLocationsButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={styles.text}>⇅ Intercambiar</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.secondary || '#F5F5F5',
    alignItems: 'center',
    marginVertical: 12,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  text: {
    color: COLORS.textMuted,
    fontSize: 14,
    fontWeight: '600',
  },
})
