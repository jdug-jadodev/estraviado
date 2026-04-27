import { createStackNavigator } from '@react-navigation/stack'
import { MapStackParams } from '@/types/navigation/navigation'
import { MapScreen } from '@/screens/map/MapScreen'
import { RouteDetailScreen } from '@/screens/map/RouteDetailScreen'
import { PlannerScreen } from '@/screens/map/PlannerScreen'
import { ServicePointsScreen } from '@/screens/map/ServicePointsScreen'


const Stack = createStackNavigator<MapStackParams>()

export function MapStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen
        name="RouteDetail"
        component={RouteDetailScreen}
      />
      <Stack.Screen
        name="Planner"
        component={PlannerScreen}
      />
      <Stack.Screen
        name="ServicePoints"
        component={ServicePointsScreen}
      />
    </Stack.Navigator>
  )
}
