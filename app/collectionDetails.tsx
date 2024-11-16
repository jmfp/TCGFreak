import { View, Text, ImageBackground, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FIREBASE_STORE } from '@/FirebaseConfig'
import { collection, query, getDocs, where, getDoc, doc } from 'firebase/firestore'
import { RouteProp, useRoute } from '@react-navigation/native'
import { RootStackParamList } from './_layout'
type CollectionDetailsScreenRouteProp = RouteProp<RootStackParamList, 'collectionDetails'>;

const CollectionDetails = () => {
    const [allJobs, setAllJobs] : any = useState([])
    const store = FIREBASE_STORE
    const route2 = useRoute();
    const {params}:any = route2
    const id = params?.id; 

    useEffect(() => {
    const getCollection = async () =>{
        try {
            console.log(id)
            const coll = await getDoc(doc(store, "pokecollections", `${id}`))
            console.log(coll.data())
            setAllJobs(coll.data())
            const q = await query(collection(store, "pokecollections"), where("id", "==", `${id}`))
            const response:any = await getDocs(q)
            //const document = await getDoc(response)
            //response.forEach(async(doc: any) => {
//
            //    await setAllJobs([...allJobs, doc.data()])
            //})

            //console.log(allJobs)
        } catch (error:any) {
            console.log(error)
            alert("Something went wrong, try again later")
        }
    }
        getCollection()
    }, [])
  return (
    <ScrollView className="flex flex-col m-auto bg-slate-800 size-full bottom-0 absolute rounded-t-3xl overflow-y-visible" style={{ flex: 1}}>
    <View className="size-full flex flex-col">
        {allJobs.cards ? 
            allJobs.cards.map((job: any, idx: number) => {
                return(
                    <View className="size-full">
                    <ImageBackground className='w-full m-auto bg-red-800' style={{flex:1, filter: 'saturate(1.25)'}} key={idx} source={{uri: `${job.image}`}} resizeMode='cover'/>
                    </View>
                )
            })
        : <Text>No cards in collection</Text>}
    </View>
    </ScrollView>
  )
}

export default CollectionDetails