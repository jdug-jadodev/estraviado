import { createStackNavigator } from '@react-navigation/stack'
import { RidesStackParams } from '@/types/navigation/navigation'
import { RidesListScreen } from '@/screens/rides/RidesListScreen'
import { CreateRideScreen } from '@/screens/rides/CreateRideScreen'
import { RideDetailScreen } from '@/screens/rides/RideDetailScreen'
import { RideRequestsScreen } from '@/screens/rides/RideRequestsScreen'

const Stack = createStackNavigator<RidesStackParams>()

export function RidesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="RidesList" component={RidesListScreen} />
      <Stack.Screen
        name="CreateRide"
        component={CreateRideScreen}
      />
      <Stack.Screen
        name="RideDetail"
        component={RideDetailScreen}
      />
      <Stack.Screen
        name="RideRequests"
        component={RideRequestsScreen}
      />
    </Stack.Navigator>
  )
}
