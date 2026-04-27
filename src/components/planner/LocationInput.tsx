import { useCallback, useState } from 'react'
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { COLORS } from '@/constants/colors'
import { LocationPoint } from '@/types/planner'

interface LocationInputProps {
  label: string
  value: LocationPoint | null
  type: 'origin' | 'destination'
  onPress: () => void
  isSelecting: boolean
  onClear?: () => void
  placeholder?: string
}

export function LocationInput({
  label,
  value,
  type,
  onPress,
  isSelecting,
  onClear,
  placeholder = 'Toca para seleccionar...',
}: LocationInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={[styles.input, isSelecting && styles.inputActive]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.inputContent}>
          {isSelecting ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={COLORS.primary} />
              <Text style={styles.selectingText}>Selecciona en el mapa...</Text>
            </View>
          ) : value ? (
            <View style={styles.locationContent}>
              <Text style={styles.coordinateText} numberOfLines={1}>
                📍 {value.latitude.toFixed(4)}, {value.longitude.toFixed(4)}
              </Text>
              {value.address && (
                <Text style={styles.addressText} numberOfLines={1} ellipsizeMode="tail">
                  {value.address}
                </Text>
              )}
            </View>
          ) : (
            <Text style={styles.placeholderText}>{placeholder}</Text>
          )}
        </View>

        {value && !isSelecting && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={(e) => {
              e.stopPropagation()
              onClear?.()
            }}
          >
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  input: {
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.border || '#E0E0E0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: COLORS.background,
    height: 56,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  inputActive: {
    borderColor: COLORS.primary,
    backgroundColor: `${COLORS.primary}10`,
  },
  inputContent: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  selectingText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  locationContent: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  coordinateText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '500',
  },
  addressText: {
    color: COLORS.textSecondary || '#666',
    fontSize: 12,
    marginTop: 4,
  },
  placeholderText: {
    color: COLORS.textSecondary || '#999',
    fontSize: 14,
  },
  clearButton: {
    padding: 4,
    marginLeft: 4,
    flexShrink: 0,
  },
  clearButtonText: {
    fontSize: 16,
    color: COLORS.textSecondary || '#999',
  },
})
