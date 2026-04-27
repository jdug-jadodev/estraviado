import { supabase } from '@/api/supabase'

// Registro directo a Supabase (deprecated - usar selfRegister)
export async function signUp(
  email: string,
  password: string,
  fullName: string,
  username?: string
) {
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

  const { data, error } = await supabase.auth.signUp(payload)

  if (error) {
    console.error('=== signUp ERROR ===', error.message)
  } else {
    console.log('=== signUp OK - User ID:', data.user?.id)
  }

  return { data, error }
}
