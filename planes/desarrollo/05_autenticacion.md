# 05 - Autenticacion
## Fase 1 - MVP Base

**Proposito de este documento:**
Implementar el sistema de registro e inicio de sesion de RutaCo. El usuario debe
poder crear una cuenta con email y contrasena, iniciar sesion, y la app debe
recordar su sesion entre cierres.

**Por que es lo primero que implementamos:**
Sin autenticacion no podemos saber quien es el usuario, y sin saber quien es el
usuario no podemos guardar sus rutas, mostrar su perfil ni aplicar las politicas
de seguridad (RLS) que configuramos en Supabase.

---

## 1. Como funciona la autenticacion en RutaCo

### El flujo completo

```
1. Usuario abre la app por primera vez
         |
2. RootNavigator verifica si hay sesion guardada en MMKV
         |
   No hay sesion --> muestra AuthStack (Welcome, Login, Register)
   Hay sesion    --> muestra MainTabs (la app completa)
         |
3. Usuario se registra con email y contrasena
         |
4. Supabase crea el usuario en auth.users
         |
5. El trigger SQL que creamos dispara y crea el perfil en la tabla profiles
         |
6. Supabase retorna un token de sesion (JWT)
         |
7. El token se guarda en MMKV automaticamente
         |
8. RootNavigator detecta la nueva sesion y muestra MainTabs
```

### Que es un JWT (JSON Web Token)

Un JWT es un token (cadena de texto) que Supabase le da al usuario cuando
inicia sesion. Contiene informacion codificada sobre quien es el usuario
y cuando expira la sesion.

La app envia este token en cada peticion a Supabase. Supabase lo verifica
y usa `auth.uid()` para saber quien esta haciendo la peticion y aplicar
las politicas RLS correctas.

El token expira cada hora, pero Supabase lo renueva automaticamente
(por eso configuramos `autoRefreshToken: true`).

---

## 2. Pantalla de bienvenida

```typescript
// src/screens/auth/WelcomeScreen.tsx

import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { StackNavigationProp } from '@react-navigation/stack'
import type { AuthStackParams } from '@/types/navigation'
import { COLORS } from '@/constants/colors'

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
```

---

## 3. Logica de autenticacion

Separar la logica de las pantallas en un archivo dedicado:

```typescript
// src/api/auth.ts

import { supabase } from './supabase'

// REGISTRO
export async function signUp(email: string, password: string, fullName: string) {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim().toLowerCase(),
    password,
    options: {
      data: {
        // Estos datos van a raw_user_meta_data en auth.users
        // El trigger SQL los usa para crear el perfil
        full_name: fullName.trim(),
      },
    },
  })

  return { data, error }
}

// INICIO DE SESION
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  })

  return { data, error }
}

// CERRAR SESION
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

// VERIFICAR TELEFONO - ENVIAR OTP
// OTP = One Time Password: codigo de 6 digitos que llega por SMS
export async function sendPhoneOTP(phone: string) {
  // Asegurar formato colombiano: +57 seguido de 10 digitos
  const formatted = formatColombianPhone(phone)

  const { error } = await supabase.auth.signInWithOtp({
    phone: formatted,
  })

  return { error }
}

// VERIFICAR TELEFONO - CONFIRMAR OTP
export async function verifyPhoneOTP(phone: string, token: string) {
  const formatted = formatColombianPhone(phone)

  const { error } = await supabase.auth.verifyOtp({
    phone: formatted,
    token,
    type: 'sms',
  })

  if (!error) {
    // Marcar el telefono como verificado en el perfil
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase
        .from('profiles')
        .update({ phone: formatted, phone_verified: true })
        .eq('id', user.id)
    }
  }

  return { error }
}

// Formatea un numero colombiano al formato internacional
function formatColombianPhone(phone: string): string {
  // Remover espacios, guiones y parentesis
  const clean = phone.replace(/[\s\-\(\)]/g, '')

  // Si ya tiene el codigo de pais, retornar tal cual
  if (clean.startsWith('+57')) return clean
  if (clean.startsWith('57') && clean.length === 12) return `+${clean}`

  // Agregar codigo de Colombia
  return `+57${clean}`
}
```

---

## 4. Pantalla de registro

```typescript
// src/screens/auth/RegisterScreen.tsx

import { useState } from 'react'
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { StackNavigationProp } from '@react-navigation/stack'
import type { AuthStackParams } from '@/types/navigation'
import { signUp } from '@/api/auth'
import { COLORS } from '@/constants/colors'

type Nav = StackNavigationProp<AuthStackParams, 'Register'>

export function RegisterScreen() {
  const navigation = useNavigation<Nav>()

  // Estado local del formulario
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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

    setIsLoading(true)

    const { error } = await signUp(email, password, fullName)

    setIsLoading(false)

    if (error) {
      // Traducir mensajes de error de Supabase al espanol
      const message = translateAuthError(error.message)
      Alert.alert('No pudimos crear tu cuenta', message)
      return
    }

    // Registro exitoso - Supabase puede pedir confirmacion de email
    Alert.alert(
      'Cuenta creada',
      'Revisa tu email para confirmar tu cuenta antes de iniciar sesion',
      [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
    )
  }

  return (
    // KeyboardAvoidingView hace que el teclado no tape los inputs
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
```

---

## 5. Pantalla de inicio de sesion

```typescript
// src/screens/auth/LoginScreen.tsx
// Estructura similar a RegisterScreen pero mas simple

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
        'No pudimos iniciar sesion',
        'Verifica tu email y contrasena'
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
```

---

## 6. AuthStack (agrupa las pantallas de auth)

```typescript
// src/navigation/AuthStack.tsx

import { createStackNavigator } from '@react-navigation/stack'
import type { AuthStackParams } from '@/types/navigation'
import { WelcomeScreen } from '@/screens/auth/WelcomeScreen'
import { LoginScreen } from '@/screens/auth/LoginScreen'
import { RegisterScreen } from '@/screens/auth/RegisterScreen'
import { VerifyPhoneScreen } from '@/screens/auth/VerifyPhoneScreen'

const Stack = createStackNavigator<AuthStackParams>()

export function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // Animacion de entrada de derecha a izquierda (natural en movil)
        cardStyleInterpolator: ({ current, layouts }) => ({
          cardStyle: {
            transform: [
              {
                translateX: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [layouts.screen.width, 0],
                }),
              },
            ],
          },
        }),
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="VerifyPhone" component={VerifyPhoneScreen} />
    </Stack.Navigator>
  )
}
```

---

## 7. Proteger pantallas con hook

Para pantallas que requieren telefono verificado (como crear rodadas):

```typescript
// src/hooks/useRequireVerifiedPhone.ts

import { useEffect } from 'react'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useAuthStore } from '@/store/authStore'

// Hook que verifica si el usuario tiene telefono verificado.
// Si no lo tiene, muestra un alert y navega a la pantalla de verificacion.
export function useRequireVerifiedPhone() {
  const { profile } = useAuthStore()
  const navigation = useNavigation<any>()

  useEffect(() => {
    if (profile && !profile.phone_verified) {
      Alert.alert(
        'Verificacion requerida',
        'Para participar en rodadas necesitas verificar tu numero de telefono.',
        [
          { text: 'Cancelar', style: 'cancel', onPress: () => navigation.goBack() },
          {
            text: 'Verificar ahora',
            onPress: () => navigation.navigate('VerifyPhone', { phone: '' }),
          },
        ]
      )
    }
  }, [profile])
}
```

---

## Checklist de esta sub-fase

```
[ ] WelcomeScreen se muestra cuando no hay sesion
[ ] Registro con email y contrasena funciona
[ ] El trigger crea el perfil automaticamente al registrarse
[ ] Login funciona y navega a MainTabs
[ ] La sesion persiste al cerrar y reabrir la app
[ ] Logout limpia la sesion y vuelve a AuthStack
[ ] Mensajes de error estan en espanol y son comprensibles
[ ] Validaciones de formulario funcionan antes de llamar a Supabase
[ ] KeyboardAvoidingView funciona en iOS y Android
```

---

Siguiente documento: 06_mapa_principal.md
