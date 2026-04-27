import { supabase } from './supabase'

// REGISTRO
export async function signUp(email: string, password: string, fullName: string, username?: string) {
  console.log('=== signUp INICIO ===')
  console.log('Params:', { email, fullName, username })

  const payload = {
    email: email.trim().toLowerCase(),
    password,
    options: {
      data: {
        full_name: fullName.trim(),
        ...(username?.trim() ? { username: username.trim() } : {}),
      },
    },
  }
  console.log('Payload enviado a Supabase:', JSON.stringify(payload.options.data))

  const { data, error } = await supabase.auth.signUp(payload)

  if (error) {
    console.error('=== signUp ERROR ===')
    console.error('Mensaje:', error.message)
    console.error('Status:', error.status)
    console.error('Objeto completo:', JSON.stringify(error))
  } else {
    console.log('=== signUp OK ===')
    console.log('User ID:', data.user?.id)
    console.log('Email confirmado:', data.user?.email_confirmed_at)
    console.log('Identidades:', JSON.stringify(data.user?.identities))
  }

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