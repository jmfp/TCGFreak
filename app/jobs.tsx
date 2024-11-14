import { FIREBASE_APP, FIREBASE_STORE } from '@/FirebaseConfig'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { collection, getDoc, getDocs } from 'firebase/firestore'

const Jobs = () => {
  const [allJobs, setAllJobs] : any = useState([])
    const getJobs = async () =>{
        const jobs = await getDocs(collection(FIREBASE_STORE, "jobs"))
        //setAllJobs(jobs)
        let jobArray:any = []
        jobs.forEach((doc:any) => {
          jobArray.push(doc.data())
          //setAllJobs((allJobs:any) => [...allJobs, doc.data()])
        })
        setAllJobs(jobArray)
    }
    
    useEffect(() => {
      getJobs()
    }, [])
  return (
    <ScrollView className="flex bg-slate-800">
      {allJobs.length !== 0 ? 
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