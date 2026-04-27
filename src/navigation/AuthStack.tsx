import { createStackNavigator } from '@react-navigation/stack'
import { WelcomeScreen } from '@/screens/auth/WelcomeScreen'
import { AuthStackParams } from '@/types/navigation/navigation'
import { RegisterScreen } from '@/screens/auth/RegisterScreen'
import { LoginScreen } from '@/screens/auth/LoginScreen'

const Stack = createStackNavigator<AuthStackParams>()

export function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: ({ current, layouts }) => ({
          cardStyle: {
            transform: [
              {
                translateX: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [layouts.screen.width, 0],
                }),
              },
            ],
          },
        }),
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      {/* <Stack.Screen name="VerifyPhone" component={VerifyPhoneScreen} /> */}
    </Stack.Navigator>
  )
}