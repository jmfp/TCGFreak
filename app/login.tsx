import { FIREBASE_AUTH, FIREBASE_STORE } from '@/FirebaseConfig'
import { useRouter } from 'expo-router'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'
import { useState } from 'react'
import { View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { TextInput } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [loading, setIsLoading] = useState(false)
    const auth = FIREBASE_AUTH
    const store = FIREBASE_STORE
    
    //signing existing user in
    const signIn = async () =>{
        setIsLoading(true)
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            router.replace('./sets')
        } catch (error:any) {
            console.log(error)
            alert("Something went wrong, try again later")
        }finally{
            setIsLoading(false)
        }
    }

    //creating new user
    const signUp = async () =>{
        setIsLoading(true)
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            const newUser = await addDoc(collection(store, "users"), {
                userId: response.user.uid
            })
            alert("Check Your Email!")
            router.push('./sets')
        } catch (error: any) {
            console.log(error)
            alert("Something went wrong, try again later")
        }finally{
            setIsLoading(false)
        }
    }
    
  return (
        <KeyboardAvoidingView className="flex flex-col m-auto gap-2 bg-slate-950 size-full p-6" style={{ flex: 1, height: hp(100)}}>
            <View className='flex m-auto w-full'>
                <TextInput className='m-auto caret-green-400 bg-slate-950 my-6 h-12 w-full focus:border-green-400 text-center text-white focus:outline-none focus:ring-0 rounded-lg p-2 text-2xl' placeholder="E-mail"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                />
                <TextInput className='m-auto caret-green-400 bg-slate-950 my-6 h-12 w-full focus:border-green-400 text-center text-white focus:outline-none focus:ring-0 rounded-lg p-2 text-2xl' placeholder="Password"
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    autoCapitalize='none'
                    secureTextEntry={!passwordVisible ? true : false}
                />
            </View>
            <View className="bg-green-600 rounded-lg my-6">
                <TouchableOpacity onPress={() => signIn()} style={{height: hp(7), width: wp(40)}} className="flex items-center text-center m-auto">
                    <Text className="text-white text-center m-auto text-4xl">Login</Text>
                </TouchableOpacity>
            </View>
            <View className="bg-green-600 rounded-lg my-6">
                <TouchableOpacity onPress={() => signUp()} style={{height: hp(7), width: wp(40)}} className="flex items-center text-center m-auto">
                    <Text className="text-white text-center m-auto text-4xl">Sign Up</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
  )
}

export default Login