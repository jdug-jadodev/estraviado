import { Profile } from "@/types/database/profile"
import { Session } from "@supabase/supabase-js"

export interface AuthStore {
  session: Session | null        
  profile: Profile | null       
  isLoading: boolean               

  setSession: (session: Session | null) => void
  setProfile: (profile: Profile | null) => void
  signOut: () => Promise<void>
  loadProfile: (userId: string) => Promise<void>
}