import { createStackNavigator } from '@react-navigation/stack'
import { ActivityStackParams } from '@/types/navigation/navigation'
import { ActivitySummaryScreen } from '@/screens/activity/ActivitySummaryScreen'
import { ActivityReplayScreen } from '@/screens/activity/ActivityReplayScreen'
import { RecordingScreen } from '@/screens/activity/RecordingScreen'


const Stack = createStackNavigator<ActivityStackParams>()

export function RecordStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Recording" component={RecordingScreen} />
      <Stack.Screen
        name="ActivitySummary"
        component={ActivitySummaryScreen}
      />
      <Stack.Screen
        name="ActivityReplay"
        component={ActivityReplayScreen}
      />
    </Stack.Navigator>
  )
}
