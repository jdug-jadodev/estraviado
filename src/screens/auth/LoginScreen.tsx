import { useState } from 'react'
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, KeyboardAvoidingView, Platform
} from 'react-native'
import { signIn } from '@/api/auth'
import { COLORS } from '@/constants/colors'

export function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Campos requeridos', 'Ingresa tu email y contrasena')
      return
    }

    setIsLoading(true)
    const { error } = await signIn(email, password)
    setIsLoading(false)

    if (error) {
      // El error mas comun: credenciales incorrectas
      // Supabase dice "Invalid login credentials" - no decimos cual esta mal
      // por seguridad (no queremos confirmar si el email existe)
      Alert.alert(
        'No pudimos iniciar sesión',
        'Verifica tu email y contraseña'
      )
    }
    // Si no hay error, onAuthStateChange en RootNavigator detecta la sesion
    // y navega automaticamente a MainTabs. No necesitamos navegar manualmente.
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>Bienvenido de vuelta</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor={COLORS.textMuted}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Contrasena"
          placeholderTextColor={COLORS.textMuted}
          secureTextEntry
        />
        <TouchableOpacity
          style={[styles.button, isLoading && { opacity: 0.6 }]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Entrando...' : 'Iniciar sesion'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
    paddingTop: 80,
    gap: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.text,
  },
  form: {
    gap: 12,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: COLORS.text,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },
})