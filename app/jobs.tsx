import { FIREBASE_APP, FIREBASE_STORE } from '@/FirebaseConfig'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import { useEffect, useState } from 'react'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { collection, getDoc, getDocs } from 'firebase/firestore'
import firebase from "firebase/app"
import 'firebase/firestore'; 

interface job {
  title: string,
  price: number,
  description: string
}

const Jobs = () => {
  const [allJobs, setAllJobs] : any = useState([])
    const testJob:job = {title: "Test", price: 9.99, description: "A Test Job"}

    const app = FIREBASE_APP
    const getJobs = async () =>{
        const jobs = await getDocs(collection(FIREBASE_STORE, "jobs"))
        jobs.forEach((doc) => {
          setAllJobs([...allJobs, doc.data()])
          //console.log(doc.id, " => ", doc.data());
        })
    }

    useEffect(() => {
        getJobs()
    }, [])
  return (
    <ScrollView className="flex bg-slate-700">
      {allJobs.length > 1 ? 
        allJobs.map((job:any, idx:number) =>{
          return(
            <Animated.View key={idx} className="bg-slate-800 h-24 w-[80%] rounded-lg m-auto my-6 border-2 border-green-400" entering={FadeIn.delay(300).springify()} exiting={FadeOut}>
            <Text className='text-white m-auto'>{job.title}</Text>
            <Text className='text-white m-auto'>{job.description}</Text>
            <Text className='text-white m-auto'>
              Payment 
              <Text className='text-green-400 m-auto'> ${job.price}</Text>
            </Text>
            <View className="bg-green-400">
              <TouchableOpacity className="text-white text-center m-auto size-full">
                Apply
              </TouchableOpacity>
            </View>
            </Animated.View>
          )
      })
      : <Text>No Jobs Available</Text>}
    </ScrollView>
  )
}

export default Jobs