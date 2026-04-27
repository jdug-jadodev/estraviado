import { supabase } from '@/api/supabase'

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}
