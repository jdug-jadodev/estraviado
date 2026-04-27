import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import { useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { COLORS } from '@/constants/colors'

export function ProfileScreen() {
  const { profile, session, signOut } = useAuthStore()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: async () => {
            setIsLoggingOut(true)
            try {
              await signOut()
            } catch (error) {
              Alert.alert('Error', 'No se pudo cerrar la sesión')
            } finally {
              setIsLoggingOut(false)
            }
          },
        },
      ]
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>👤</Text>
        </View>

        <Text style={styles.nameText}>{profile?.full_name || 'Usuario'}</Text>
        <Text style={styles.emailText}>{session?.user?.email || 'email@example.com'}</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Distancia</Text>
            <Text style={styles.statValue}>{profile?.total_distance_km || 0} km</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Elevación</Text>
            <Text style={styles.statValue}>{profile?.total_elevation_m || 0} m</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Rodadas</Text>
            <Text style={styles.statValue}>{profile?.total_rides || 0}</Text>
          </View>
        </View>

        <Text style={styles.planBadge}>
          Plan: {profile?.plan === 'premium' ? '⭐ Premium' : '📋 Gratuito'}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.logoutButton, isLoggingOut && styles.logoutButtonDisabled]}
        onPress={handleLogout}
        disabled={isLoggingOut}
      >
        {isLoggingOut ? (
          <ActivityIndicator color={COLORS.text} />
        ) : (
          <Text style={styles.logoutButtonText}>🚪 Cerrar sesión</Text>
        )}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
    justifyContent: 'space-between',
    paddingTop: 40,
  },
  profileCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 40,
  },
  nameText: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  emailText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
  planBadge: {
    fontSize: 14,
    color: COLORS.text,
    backgroundColor: COLORS.surfaceAlt,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    overflow: 'hidden',
  },
  logoutButton: {
    backgroundColor: COLORS.error,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logoutButtonDisabled: {
    opacity: 0.6,
  },
  logoutButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
  },
})
