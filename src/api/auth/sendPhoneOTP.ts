import { supabase } from '@/api/supabase'
import { formatColombianPhone } from './formatColombianPhone'

export async function sendPhoneOTP(phone: string) {
  const formatted = formatColombianPhone(phone)

  const { error } = await supabase.auth.signInWithOtp({
    phone: formatted,
  })

  return { error }
}
