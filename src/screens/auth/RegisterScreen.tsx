import { useState } from 'react'
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { StackNavigationProp } from '@react-navigation/stack'
import { selfRegister } from '@/api/auth'
import { COLORS } from '@/constants/colors'
import { AuthStackParams } from '@/types/navigation/navigation'

type Nav = StackNavigationProp<AuthStackParams, 'Register'>

export function RegisterScreen() {
  const navigation = useNavigation<Nav>()

  // Estado local del formulario
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = async () => {
    // Validaciones basicas antes de llamar a Supabase
    if (!fullName.trim()) {
      Alert.alert('Falta tu nombre', 'Ingresa tu nombre completo')
      return
    }

    if (!email.includes('@')) {
      Alert.alert('Email invalido', 'Ingresa un email valido')
      return
    }
    if (password.length < 8) {
      Alert.alert('Contrasena muy corta', 'La contrasena debe tener al menos 8 caracteres')
      return
    }

    console.log('=== handleRegister INICIO ===')
    console.log('📝 Campos del form:', { fullName, username, email, passwordLength: password.length })
    console.log('🌐 Ambiente:', __DEV__ ? 'DESARROLLO' : 'PRODUCCIÓN')

    setIsLoading(true)

    const { error } = await selfRegister(email, password, fullName, username)

    setIsLoading(false)

    console.log('=== handleRegister RESULTADO ===')
    if (error) {
      console.error('❌ Error al registrar:', JSON.stringify(error, null, 2))
      console.error('❌ Error Code:', error.code)
      console.error('❌ Error Status:', error.status)
      console.error('❌ Error Details:', error.details)
      
      const message = translateAuthError(error.message)
      const debugInfo = `
Error Code: ${error.code}
HTTP Status: ${error.status}
Mensaje: ${error.message}
${error.details ? `Detalles: ${error.details}` : ''}
      `.trim()
      
      Alert.alert(
        'No pudimos crear tu cuenta',
        message,
        [
          {
            text: 'Copiar debug info',
            onPress: () => {
              // En Expo, copia al clipboard
              console.log('Debug Info:', debugInfo)
              Alert.alert('Debug Info copiada a logs')
            }
          },
          { text: 'OK' }
        ]
      )
      return
    }
    
    console.log('✅ handleRegister ÉXITO')

    Alert.alert(
      'Cuenta creada',
      'Revisa tu email para confirmar tu cuenta antes de iniciar sesion',
      [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
    )
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Crear cuenta</Text>
        <Text style={styles.subtitle}>Unete a la comunidad ciclista colombiana</Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre completo</Text>
            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Tu nombre"
              placeholderTextColor={COLORS.textMuted}
              autoCapitalize="words"
              autoComplete="name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre de usuario <Text style={{ color: COLORS.textMuted, fontWeight: '400' }}>(opcional)</Text></Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Tu nombre de usuario"
              placeholderTextColor={COLORS.textMuted}
              autoCapitalize="words"
              autoComplete="username"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="tu@email.com"
              placeholderTextColor={COLORS.textMuted}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Contrasena</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Minimo 8 caracteres"
              placeholderTextColor={COLORS.textMuted}
              secureTextEntry
              autoComplete="new-password"
            />
          </View>

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Ya tengo cuenta - Iniciar sesion</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

// Traduce los mensajes de error en ingles de Supabase al espanol
function translateAuthError(message: string): string {
  if (message.includes('already registered')) return 'Ya existe una cuenta con este email'
  if (message.includes('invalid email')) return 'El email no es valido'
  if (message.includes('weak password')) return 'La contrasena es muy debil'
  if (message.includes('rate limit') || message.includes('over_email_send_rate_limit')) return 'Demasiados intentos. Espera unos minutos e intenta de nuevo'
  return 'Ocurrio un error. Intentalo de nuevo.'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 24,
    paddingTop: 60,
    gap: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: -16,
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
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
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },
  link: {
    color: COLORS.primary,
    textAlign: 'center',
    fontSize: 15,
  },
})