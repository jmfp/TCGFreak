import { FIREBASE_APP, FIREBASE_STORE } from '@/FirebaseConfig'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import { useEffect } from 'react'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

interface job {
  title: string,
  price: number,
  description: string
}

const Jobs = () => {
    const testJob:job = {title: "Test", price: 9.99, description: "A Test Job"}

    //const app = FIREBASE_APP
    //const getJobs = async () =>{
    //    const jobs = await firestore().collection('jobs').get()
    //    console.log(jobs)
    //}
//
    //useEffect(() => {
    //    getJobs()
    //}, [])
  return (
    <ScrollView className="flex bg-slate-700">
      <Animated.View className="bg-slate-800 h-24 w-[80%] rounded-lg m-auto my-6 border-2 border-green-400" entering={FadeIn.delay(300).springify()} exiting={FadeOut}>
        <Text className='text-white m-auto'>{testJob.title}</Text>
        <Text className='text-white m-auto'>{testJob.description}</Text>
        <Text className='text-white m-auto'>
          Payment 
          <Text className='text-green-400 m-auto'> ${testJob.price}</Text>
        </Text>
        <View className="bg-green-400">
          <TouchableOpacity className="text-white text-center m-auto size-full">
            Apply
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Animated.View className="bg-slate-800 h-24 w-[80%] rounded-lg m-auto my-6 border-2 border-green-400" entering={FadeIn.delay(300).springify()} exiting={FadeOut}>
        <Text className='text-white m-auto'>{testJob.title}</Text>
        <Text className='text-white m-auto'>{testJob.description}</Text>
        <Text className='text-white m-auto'>
          Payment 
          <Text className='text-green-400 m-auto'> ${testJob.price}</Text>
        </Text>
        <View className="bg-green-400">
          <TouchableOpacity className="text-white text-center m-auto size-full">
            Apply
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Animated.View className="bg-slate-800 h-24 w-[80%] rounded-lg m-auto my-6 border-2 border-green-400" entering={FadeIn.delay(300).springify()} exiting={FadeOut}>
        <Text className='text-white m-auto'>{testJob.title}</Text>
        <Text className='text-white m-auto'>{testJob.description}</Text>
        <Text className='text-white m-auto'>
          Payment 
          <Text className='text-green-400 m-auto'> ${testJob.price}</Text>
        </Text>
        <View className="bg-green-400">
          <TouchableOpacity className="text-white text-center m-auto size-full">
            Apply
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Animated.View className="bg-slate-800 h-24 w-[80%] rounded-lg m-auto my-6 border-2 border-green-400" entering={FadeIn.delay(300).springify()} exiting={FadeOut}>
        <Text className='text-white m-auto'>{testJob.title}</Text>
        <Text className='text-white m-auto'>{testJob.description}</Text>
        <Text className='text-white m-auto'>
          Payment 
          <Text className='text-green-400 m-auto'> ${testJob.price}</Text>
        </Text>
        <View className="bg-green-400">
          <TouchableOpacity className="text-white text-center m-auto size-full">
            Apply
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Animated.View className="bg-slate-800 h-24 w-[80%] rounded-lg m-auto my-6 border-2 border-green-400" entering={FadeIn.delay(300).springify()} exiting={FadeOut}>
        <Text className='text-white m-auto'>{testJob.title}</Text>
        <Text className='text-white m-auto'>{testJob.description}</Text>
        <Text className='text-white m-auto'>
          Payment 
          <Text className='text-green-400 m-auto'> ${testJob.price}</Text>
        </Text>
        <View className="bg-green-400">
          <TouchableOpacity className="text-white text-center m-auto size-full">
            Apply
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Animated.View className="bg-slate-800 h-24 w-[80%] rounded-lg m-auto my-6 border-2 border-green-400" entering={FadeIn.delay(300).springify()} exiting={FadeOut}>
        <Text className='text-white m-auto'>{testJob.title}</Text>
        <Text className='text-white m-auto'>{testJob.description}</Text>
        <Text className='text-white m-auto'>
          Payment 
          <Text className='text-green-400 m-auto'> ${testJob.price}</Text>
        </Text>
        <View className="bg-green-400">
          <TouchableOpacity className="text-white text-center m-auto size-full">
            Apply
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Animated.View className="bg-slate-800 h-24 w-[80%] rounded-lg m-auto my-6 border-2 border-green-400" entering={FadeIn.delay(300).springify()} exiting={FadeOut}>
        <Text className='text-white m-auto'>{testJob.title}</Text>
        <Text className='text-white m-auto'>{testJob.description}</Text>
        <Text className='text-white m-auto'>
          Payment 
          <Text className='text-green-400 m-auto'> ${testJob.price}</Text>
        </Text>
        <View className="bg-green-400">
          <TouchableOpacity className="text-white text-center m-auto size-full">
            Apply
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Animated.View className="bg-slate-800 h-24 w-[80%] rounded-lg m-auto my-6 border-2 border-green-400" entering={FadeIn.delay(300).springify()} exiting={FadeOut}>
        <Text className='text-white m-auto'>{testJob.title}</Text>
        <Text className='text-white m-auto'>{testJob.description}</Text>
        <Text className='text-white m-auto'>
          Payment 
          <Text className='text-green-400 m-auto'> ${testJob.price}</Text>
        </Text>
        <View className="bg-green-400">
          <TouchableOpacity className="text-white text-center m-auto size-full">
            Apply
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Animated.View className="bg-slate-800 h-24 w-[80%] rounded-lg m-auto my-6 border-2 border-green-400" entering={FadeIn.delay(300).springify()} exiting={FadeOut}>
        <Text className='text-white m-auto'>{testJob.title}</Text>
        <Text className='text-white m-auto'>{testJob.description}</Text>
        <Text className='text-white m-auto'>
          Payment 
          <Text className='text-green-400 m-auto'> ${testJob.price}</Text>
        </Text>
        <View className="bg-green-400">
          <TouchableOpacity className="text-white text-center m-auto size-full">
            Apply
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Animated.View className="bg-slate-800 h-24 w-[80%] rounded-lg m-auto my-6 border-2 border-green-400" entering={FadeIn.delay(300).springify()} exiting={FadeOut}>
        <Text className='text-white m-auto text-4xl'>{testJob.title}</Text>
        <Text className='text-white m-auto text-2xl'>{testJob.description}</Text>
        <Text className='text-white m-auto'>
          Payment 
          <Text className='text-green-400 m-auto'> ${testJob.price}</Text>
        </Text>
        <View className="bg-green-400">
          <TouchableOpacity className="text-white text-center m-auto size-full">
            Apply
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ScrollView>
  )
}

export default Jobs