import { createStackNavigator } from '@react-navigation/stack'
import { ProfileStackParams } from '@/types/navigation/navigation'
import { EditProfileScreen } from '@/screens/profile/EditProfileScreen'
import { ProfileScreen } from '@/screens/profile/ProfileScreen'
import { MedalsScreen } from '@/screens/profile/MedalsScreen'


const Stack = createStackNavigator<ProfileStackParams>()

export function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
      />
      <Stack.Screen
        name="Medals"
        component={MedalsScreen}
      />
    </Stack.Navigator>
  )
}
