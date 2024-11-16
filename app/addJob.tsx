import { FIREBASE_STORE } from '@/FirebaseConfig'
import { addDoc, collection } from 'firebase/firestore'
import { useState } from 'react'
import { View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { TextInput } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const AddJob = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [loading, setIsLoading] = useState(false)
    const store = FIREBASE_STORE

    const addJob = async () =>{
        setIsLoading(true)
        try {
            const response = await addDoc(collection(store, "jobs"), {
                title,
                description,
                employerId: "0",
                price
            })
            console.log(response)
        } catch (error:any) {
            console.log(error)
            alert("Something went wrong, try again later")
        }finally{
            setIsLoading(false)
        }
    }
    
  return (
    <View className="flex m-auto gap-2">
        <KeyboardAvoidingView>
            <TextInput className='m-auto caret-green-400 bg-slate-800 h-12 w-96 focus:border-green-400 text-white focus:outline-none focus:ring-0 rounded-lg p-2 text-2xl' placeholder="Title"
                onChangeText={(text) => setTitle(text)}
                value={title}
            />
            <TextInput className='m-auto caret-green-400 bg-slate-800 h-12 w-96 focus:border-green-400 text-white focus:outline-none focus:ring-0 rounded-lg p-2 text-2xl' placeholder="Description"
                onChangeText={(text) => setDescription(text)}
                value={description}
            />
            <Animated.View className="bg-green-400 rounded-lg my-6" entering={FadeIn.delay(300).springify()} exiting={FadeOut}>
                <TouchableOpacity onPress={() => addJob()} style={{height: hp(7), width: wp(40)}} className="flex items-center text-center mx-auto">
                    <Text className="text-white text-center m-auto text-4xl">Login</Text>
                </TouchableOpacity>
            </Animated.View>
        </KeyboardAvoidingView>
    </View>
  )
}

export default AddJob