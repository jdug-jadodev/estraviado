import { create } from 'zustand'
import { supabase } from '@/api/supabase'
import { AuthStore } from '@/interface/authStore'

export const useAuthStore = create<AuthStore>((set) => ({
  session: null,
  profile: null,
  isLoading: true,

  setSession: (session) => set({ session }),

  setProfile: (profile) => set({ profile }),

  loadProfile: async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (data) set({ profile: data })
  },

  signOut: async () => {
    await supabase.auth.signOut()
    set({ session: null, profile: null })
  },
}))