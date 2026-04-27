/**
 * ✅ Script para diagnosticar conexión con el backend
 * Uso: Import en cualquier pantalla y llama: checkBackendConnection()
 */

export async function checkBackendConnection() {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000'

  console.log('\n╔════════════════════════════════════════════════════╗')
  console.log('║ 🔍 DIAGNOSTICO DE CONEXIÓN AL BACKEND             ║')
  console.log('╚════════════════════════════════════════════════════╝\n')

  // 1. Verificar URL
  console.log('📍 Backend URL configurada:', BACKEND_URL)
  console.log('🌐 Tipo de URL:', BACKEND_URL.includes('localhost') ? 'LOCAL' : 'REMOTA')

  // 2. Health check
  try {
    console.log('\n🚀 Intentando /health ...')
    const healthStart = Date.now()
    
    const healthRes = await fetch(`${BACKEND_URL}/health`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    
    const healthTime = Date.now() - healthStart
    console.log(`✅ Health OK - Tiempo: ${healthTime}ms`)
    console.log(`📊 Status: ${healthRes.status}`)
    
    const healthData = await healthRes.json()
    console.log('📨 Response:', JSON.stringify(healthData, null, 2))
  } catch (error) {
    console.error('❌ Health check FALLÓ')
    console.error('Error:', error instanceof Error ? error.message : String(error))
  }

  // 3. Intentar el endpoint de registro (sin datos válidos)
  try {
    console.log('\n🚀 Intentando /auth/self-register (test) ...')
    const registerStart = Date.now()
    
    const registerRes = await fetch(`${BACKEND_URL}/auth/self-register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@test.com',
        password: 'Test12345',
        full_name: 'Test User',
      }),
    })
    
    const registerTime = Date.now() - registerStart
    console.log(`⏱️ Tiempo: ${registerTime}ms`)
    console.log(`📊 Status: ${registerRes.status}`)
    
    const registerData = await registerRes.json()
    console.log('📨 Response:', JSON.stringify(registerData, null, 2))
    
    if (registerRes.ok) {
      console.log('✅ Endpoint /auth/self-register está funcional')
    } else {
      console.log('⚠️ Endpoint retorna error (posible dato test inválido)')
    }
  } catch (error) {
    console.error('❌ Endpoint /auth/self-register NO RESPONDE')
    console.error('Error:', error instanceof Error ? error.message : String(error))
  }

  // 4. Recomendaciones
  console.log('\n╔════════════════════════════════════════════════════╗')
  console.log('║ 💡 CHECKLIST DE DIAGNÓSTICO                        ║')
  console.log('╚════════════════════════════════════════════════════╝')
  console.log('✓ Backend URL es correcto')
  console.log('✓ Backend está corriendo (npm run dev en Loggin-Mcp)')
  console.log('✓ El puerto 4000 no está bloqueado')
  console.log('✓ CORS está permitido para tu app')
  console.log('✓ Las variables de entorno están bien configuradas')
  console.log('\n💾 Guarda los logs de arriba para debugging\n')
}

/**
 * Test rápido de conectividad básica
 */
export async function quickConnectionTest() {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000'
  
  try {
    console.log(`🔗 Conectando a ${BACKEND_URL}...`)
    const res = await fetch(`${BACKEND_URL}/health`)
    
    if (res.ok) {
      console.log('✅ CONECTADO al backend')
      return true
    } else {
      console.log(`⚠️ Backend responde pero con status ${res.status}`)
      return false
    }
  } catch (error) {
    console.error('❌ NO SE PUEDE CONECTAR AL BACKEND')
    console.error('Razón:', error instanceof Error ? error.message : String(error))
    return false
  }
}

/**
 * Test de endpoint específico
 */
export async function testEndpoint(endpoint: string, method: 'GET' | 'POST' = 'GET', body?: any) {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000'
  const url = `${BACKEND_URL}${endpoint}`

  console.log(`\n🧪 Testing ${method} ${url}`)
  
  try {
    const options: RequestInit = {
      method,
      headers: { 'Content-Type': 'application/json' },
    }
    
    if (body && method === 'POST') {
      options.body = JSON.stringify(body)
    }

    const res = await fetch(url, options)
    const data = await res.json()

    console.log(`Status: ${res.status}`)
    console.log('Response:', JSON.stringify(data, null, 2))
    
    return { ok: res.ok, status: res.status, data }
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : String(error))
    return { ok: false, status: 0, data: null }
  }
}
