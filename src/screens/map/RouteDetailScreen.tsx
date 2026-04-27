import { View, Text, StyleSheet } from 'react-native'
import { COLORS } from '@/constants/colors'

export function RouteDetailScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Detalle de Ruta - Próximamente</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  text: {
    color: COLORS.text,
    fontSize: 16,
  },
})
