import { BACKEND_URL } from '@/config/backendUrl'

export async function quickConnectionTest(): Promise<boolean> {
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
