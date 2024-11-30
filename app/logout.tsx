import { FIREBASE_AUTH } from '@/FirebaseConfig'
import { useRouter } from 'expo-router'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native'

const Logout = () => {
  const router = useRouter();
  const handleSubmit = () =>{
    FIREBASE_AUTH.signOut()
    router.replace('./sets')
  }
  return (
    <View className='flex flex-col size-full m-auto bg-slate-800'>
      <TouchableOpacity onPress={handleSubmit} className='w-[80%] h-16 m-auto rounded-md bg-green-600'>
        <Text className='m-auto text-white'>
          Sign Out
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Logout