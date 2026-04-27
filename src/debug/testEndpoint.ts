import { BACKEND_URL } from '@/config/backendUrl'

export async function testEndpoint(
  endpoint: string,
  method: 'GET' | 'POST' = 'GET',
  body?: any
) {
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
