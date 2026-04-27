import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RootNavigator } from '@/navigation/RootNavigator'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,   
      gcTime: 1000 * 60 * 30, 
      retry: 2,        
      refetchOnWindowFocus: false, 
    },
  },
})

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <RootNavigator />
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}