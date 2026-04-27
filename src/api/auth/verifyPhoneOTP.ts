import { supabase } from '@/api/supabase'
import { formatColombianPhone } from './formatColombianPhone'

export async function verifyPhoneOTP(phone: string, token: string) {
  const formatted = formatColombianPhone(phone)

  const { error } = await supabase.auth.verifyOtp({
    phone: formatted,
    token,
    type: 'sms',
  })

  if (!error) {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      await supabase
        .from('profiles')
        .update({ phone: formatted, phone_verified: true })
        .eq('id', user.id)
    }
  }

  return { error }
}
