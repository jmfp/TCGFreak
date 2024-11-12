import { FIREBASE_AUTH } from '@/FirebaseConfig'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native'

const Logout = () => {
  return (
    <View>
      <TouchableOpacity onPress={() => FIREBASE_AUTH.signOut()}>
        SignOut
      </TouchableOpacity>
    </View>
  )
}

export default Logout