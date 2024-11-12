import { FIREBASE_APP, FIREBASE_STORE } from '@/FirebaseConfig'
import { View, Text } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import { useEffect } from 'react'

const Jobs = () => {
    const app = FIREBASE_APP
    const getJobs = async () =>{
        const jobs = await firestore().collection('jobs').get()
        console.log(jobs)
    }

    useEffect(() => {
        getJobs()
    }, [])
  return (
    <View>
      <Text>Jobs</Text>
    </View>
  )
}

export default Jobs