import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Text } from 'react-native'

import { COLORS } from '@/constants/colors'
import { MapStack } from './MapStack'
import { FeedScreen } from '@/screens/social/FeedScreen'
import { RecordStack } from './RecordStack'
import { RidesStack } from './RidesStack'
import { ProfileStack } from './ProfileStack'

const Tabs = createBottomTabNavigator()

// Iconos simples usando texto Unicode
function MapIcon({ color }: { color: string }) {
  return <Text style={{ fontSize: 20, color }}>🗺️</Text>
}

function FeedIcon({ color }: { color: string }) {
  return <Text style={{ fontSize: 20, color }}>📰</Text>
}

function RecordIcon({ color }: { color: string }) {
  return <Text style={{ fontSize: 20, color }}>🎙️</Text>
}

function RidesIcon({ color }: { color: string }) {
  return <Text style={{ fontSize: 20, color }}>🚴</Text>
}

function ProfileIcon({ color }: { color: string }) {
  return <Text style={{ fontSize: 20, color }}>👤</Text>
}

export function MainTabs() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopColor: COLORS.border,
        },
      }}
    >
      <Tabs.Screen
        name="MapTab"
        component={MapStack}
        options={{ title: 'Mapa', tabBarIcon: ({ color }) => <MapIcon color={color} /> }}
      />
      <Tabs.Screen
        name="FeedTab"
        component={FeedScreen}
        options={{ title: 'Feed', tabBarIcon: ({ color }) => <FeedIcon color={color} /> }}
      />
      <Tabs.Screen
        name="RecordTab"
        component={RecordStack}
        options={{ title: 'Grabar', tabBarIcon: ({ color }) => <RecordIcon color={color} /> }}
      />
      <Tabs.Screen
        name="RidesTab"
        component={RidesStack}
        options={{ title: 'Rodadas', tabBarIcon: ({ color }) => <RidesIcon color={color} /> }}
      />
      <Tabs.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{ title: 'Perfil', tabBarIcon: ({ color }) => <ProfileIcon color={color} /> }}
      />
    </Tabs.Navigator>
  )
}