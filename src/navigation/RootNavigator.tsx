import { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { supabase } from '@/api/supabase'
import { useAuthStore } from '@/store/authStore'
import { MainTabs } from './MainTabs'
import { LoadingScreen } from '@/screens/LoadingScreen'
import { AuthStack } from './AuthStack'

const Stack = createStackNavigator()

export function RootNavigator() {
  const { session, isLoading, setSession, loadProfile } = useAuthStore()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session?.user) loadProfile(session.user.id)
      useAuthStore.setState({ isLoading: false })
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session)
        if (session?.user) loadProfile(session.user.id)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  if (isLoading) return <LoadingScreen />

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {session ? (
          <Stack.Screen name="Main" component={MainTabs} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}