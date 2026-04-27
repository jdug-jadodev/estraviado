import { View, Text, StyleSheet } from 'react-native'
import { COLORS } from '@/constants/colors'

export function EditProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Editar Perfil - Próximamente</Text>
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
