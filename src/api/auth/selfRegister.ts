import { BACKEND_URL } from '@/config/backendUrl'

export async function selfRegister(
  email: string,
  password: string,
  fullName: string,
  username?: string
) {
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const duration = Date.now() - startTime

    console.log('⏱️ Tiempo de respuesta:', `${duration}ms`)
    console.log('📊 HTTP Status:', response.status)

    let data
    try {
      data = await response.json()
      console.log('📨 Response JSON:', JSON.stringify(data, null, 2))
    } catch (parseError) {
      console.error('❌ Error parseando JSON:', parseError)
      const text = await response.text()
      return {
        data: null,
        error: {
          message: `Invalid response format: ${text.substring(0, 100)}`,
          status: response.status,
          code: 'PARSE_ERROR',
        },
      }
    }

    if (!response.ok) {
      console.error('❌ selfRegister ERROR - Status:', response.status)
      return {
        data: null,
        error: {
          message: data.message || `HTTP ${response.status}`,
          status: response.status,
          code: data.code || 'HTTP_ERROR',
        },
      }
    }

    console.log('✅ selfRegister OK - User ID:', data.user?.id)
    return { data, error: null }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('🔥 selfRegister NETWORK ERROR:', errorMessage)

    let errorType = 'NETWORK_ERROR'
    let userMessage = 'Error de conexión'

    if (errorMessage.includes('Network request failed')) {
      errorType = 'NETWORK_FAILED'
      userMessage = '❌ No se puede conectar al servidor.'
    } else if (errorMessage.includes('timeout')) {
      errorType = 'TIMEOUT'
      userMessage = '⏱️ El servidor tardó mucho en responder.'
    } else if (errorMessage.includes('getaddrinfo') || errorMessage.includes('ENOTFOUND')) {
      errorType = 'HOST_NOT_FOUND'
      userMessage = `❌ No se puede resolver el host: ${BACKEND_URL}`
    } else if (errorMessage.includes('ECONNREFUSED')) {
      errorType = 'CONNECTION_REFUSED'
      userMessage = `❌ Conexión rechazada en ${BACKEND_URL}`
    } else if (errorMessage.includes('ECONNRESET')) {
      errorType = 'CONNECTION_RESET'
      userMessage = '❌ Conexión reiniciada por el servidor'
    }

    return {
      data: null,
      error: { message: userMessage, status: 0, code: errorType, details: errorMessage },
    }
  }
}
