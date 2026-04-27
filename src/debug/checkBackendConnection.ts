import { BACKEND_URL } from '@/config/backendUrl'

export async function checkBackendConnection() {
  console.log('\n╔════════════════════════════════════════════════════╗')
  console.log('║ 🔍 DIAGNOSTICO DE CONEXIÓN AL BACKEND             ║')
  console.log('╚════════════════════════════════════════════════════╝\n')

  console.log('📍 Backend URL configurada:', BACKEND_URL)
  console.log('🌐 Tipo de URL:', BACKEND_URL.includes('localhost') ? 'LOCAL' : 'REMOTA')

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
  } catch (error) {
    console.error('❌ Endpoint /auth/self-register NO RESPONDE')
    console.error('Error:', error instanceof Error ? error.message : String(error))
  }
}

