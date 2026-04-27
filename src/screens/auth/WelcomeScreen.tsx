import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { StackNavigationProp } from '@react-navigation/stack'
import { COLORS } from '@/constants/colors'
import { AuthStackParams } from '@/types/navigation/navigation'

type Nav = StackNavigationProp<AuthStackParams, 'Welcome'>

export function WelcomeScreen() {
  const navigation = useNavigation<Nav>()

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.logo}>RutaCo</Text>
        <Text style={styles.tagline}>
          Las mejores rutas de ciclismo de Colombia
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.primaryButtonText}>Crear cuenta gratis</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.secondaryButtonText}>Ya tengo cuenta</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingTop: 80,
    paddingBottom: 48,
  },
  hero: {
    alignItems: 'center',
    gap: 16,
  },
  logo: {
    fontSize: 48,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 18,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  actions: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
  },
})