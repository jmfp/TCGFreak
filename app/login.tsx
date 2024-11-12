import { FIREBASE_AUTH } from '@/FirebaseConfig'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { TextInput } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [loading, setIsLoading] = useState(false)
    const auth = FIREBASE_AUTH
    
    //signing existing user in
    const signIn = async () =>{
        setIsLoading(true)
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            console.log(response)
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
            console.log(response)
            alert("Check Your Email!")
        } catch (error: any) {
            console.log(error)
            alert("Something went wrong, try again later")
        }finally{
            setIsLoading(false)
        }
    }
    
  return (
    <View className="flex m-auto gap-2">
        <KeyboardAvoidingView>
            <TextInput className='m-auto caret-green-400 bg-slate-800 h-12 w-96 focus:border-green-400 text-white focus:outline-none focus:ring-0 rounded-lg p-2 text-2xl' placeholder="E-mail"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <TextInput className='m-auto caret-green-400 bg-slate-800 h-12 w-96 focus:border-green-400 text-white focus:outline-none focus:ring-0 rounded-lg p-2 text-2xl' placeholder="Password"
                onChangeText={(text) => setPassword(text)}
                value={password}
                autoCapitalize='none'
                secureTextEntry={!passwordVisible ? true : false}
            />
            <Animated.View className="bg-green-400 rounded-lg my-6" entering={FadeIn.delay(300).springify()} exiting={FadeOut}>
                <TouchableOpacity onPress={() => signIn()} style={{height: hp(7), width: wp(40)}} className="flex items-center text-center mx-auto">
                    <Text className="text-white text-center m-auto text-4xl">Login</Text>
                </TouchableOpacity>
            </Animated.View>
            <Animated.View className="bg-green-400 rounded-lg my-6" entering={FadeIn.delay(300).springify()} exiting={FadeOut}>
                <TouchableOpacity onPress={() => signUp()} style={{height: hp(7), width: wp(40)}} className="flex items-center text-center mx-auto">
                    <Text className="text-white text-center m-auto text-4xl">Sign Up</Text>
                </TouchableOpacity>
            </Animated.View>

        </KeyboardAvoidingView>
    </View>
  )
}

export default Login