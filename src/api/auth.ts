import { supabase } from './supabase'

// URL del backend
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://loggin-mcp.onrender.com'

// REGISTRO VÍA BACKEND
export async function selfRegister(email: string, password: string, fullName: string, username?: string) {
  console.log('=== selfRegister INICIO ===')
  console.log('📍 Backend URL:', BACKEND_URL)
  console.log('📝 Email:', email)
  console.log('📝 Full Name:', fullName)
  console.log('📝 Username:', username || 'N/A')
  console.log('🔒 Password length:', password.length)

  const url = `${BACKEND_URL}/auth/self-register`
  const payload = {
    email: email.trim().toLowerCase(),
    password,
    full_name: fullName.trim(),
    username: username?.trim() || undefined,
  }

  try {
    console.log('🚀 Enviando REQUEST a:', url)
    console.log('📦 Payload:', JSON.stringify(payload, null, 2))

    const startTime = Date.now()
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    const duration = Date.now() - startTime

    console.log('⏱️ Tiempo de respuesta:', `${duration}ms`)
    console.log('📊 HTTP Status:', response.status)
    console.log('📄 Content-Type:', response.headers.get('content-type'))

    let data
    try {
      data = await response.json()
      console.log('📨 Response JSON:', JSON.stringify(data, null, 2))
    } catch (parseError) {
      console.error('❌ Error parseando JSON:', parseError)
      const text = await response.text()
      console.error('📄 Response text:', text)
      return { 
        data: null, 
        error: { 
          message: `Invalid response format: ${text.substring(0, 100)}`, 
          status: response.status,
          code: 'PARSE_ERROR'
        } 
      }
    }

    if (!response.ok) {
      console.error('❌ selfRegister ERROR ===')
      console.error('❌ Status:', response.status)
      console.error('❌ Message:', data.message)
      console.error('❌ Code:', data.code)
      return { 
        data: null, 
        error: { 
          message: data.message || `HTTP ${response.status}`, 
          status: response.status,
          code: data.code || 'HTTP_ERROR'
        } 
      }
    }

    console.log('✅ selfRegister OK ===')
    console.log('✅ User ID:', data.user?.id)
    console.log('✅ Token received:', !!data.token)

    return { data, error: null }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('🔥 selfRegister NETWORK ERROR ===')
    console.error('🔥 Error type:', error instanceof TypeError ? 'TypeError' : typeof error)
    console.error('🔥 Error message:', errorMessage)
    console.error('🔥 Stack:', error instanceof Error ? error.stack : 'N/A')

    // Detectar tipo de error específico
    let errorType = 'NETWORK_ERROR'
    let userMessage = 'Error de conexión'

    if (errorMessage.includes('Network request failed')) {
      errorType = 'NETWORK_FAILED'
      userMessage = '❌ No se puede conectar al servidor. Verifica que el backend está corriendo.'
    } else if (errorMessage.includes('timeout')) {
      errorType = 'TIMEOUT'
      userMessage = '⏱️ El servidor tardó mucho en responder. Intenta de nuevo.'
    } else if (errorMessage.includes('getaddrinfo') || errorMessage.includes('ENOTFOUND')) {
      errorType = 'HOST_NOT_FOUND'
      userMessage = `❌ No se puede resolver el host: ${BACKEND_URL}`
    } else if (errorMessage.includes('ECONNREFUSED')) {
      errorType = 'CONNECTION_REFUSED'
      userMessage = `❌ Conexión rechazada. Backend no está escuchando en ${BACKEND_URL}`
    } else if (errorMessage.includes('ECONNRESET')) {
      errorType = 'CONNECTION_RESET'
      userMessage = '❌ Conexión reiniciada por el servidor'
    }

    console.error(`🔥 Error Type: ${errorType}`)
    console.error(`🔥 Mensaje para usuario: ${userMessage}`)
    console.error(`🔥 Backend URL intentado: ${BACKEND_URL}`)

    return { 
      data: null, 
      error: { 
        message: userMessage,
        status: 0,
        code: errorType,
        details: errorMessage
      } 
    }
  }
}

// REGISTRO DIRECTO A SUPABASE (deprecated - usar selfRegister)
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