import { useEffect } from 'react'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useAuthStore } from '@/store/authStore'

// Hook que verifica si el usuario tiene telefono verificado.
// Si no lo tiene, muestra un alert y navega a la pantalla de verificacion.
export function useRequireVerifiedPhone() {
  const { profile } = useAuthStore()
  const navigation = useNavigation<any>()

  useEffect(() => {
    if (profile && !profile.phone_verified) {
      Alert.alert(
        'Verificación requerida',
        'Para participar en rodadas necesitas verificar tu número de teléfono.',
        [
          { text: 'Cancelar', style: 'cancel', onPress: () => navigation.goBack() },
          {
            text: 'Verificar ahora',
            onPress: () => navigation.navigate('VerifyPhone', { phone: '' }),
          },
        ]
      )
    }
  }, [profile])
}