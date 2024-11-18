import { View, Text, ImageBackground, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FIREBASE_STORE } from '@/FirebaseConfig'
import { collection, query, getDocs, where, getDoc, doc } from 'firebase/firestore'
import { RouteProp, useRoute } from '@react-navigation/native'
import { RootStackParamList } from './_layout'
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from 'expo-router';
type CollectionNavigationProp = StackNavigationProp<RootStackParamList, 'collectionDetails'>;
type CollectionDetailsScreenRouteProp = RouteProp<RootStackParamList, 'collectionDetails'>;

const CollectionDetails = () => {
    const [allJobs, setAllJobs] : any = useState([])
    const store = FIREBASE_STORE
    const route2 = useRoute();
    const {params}:any = route2
    const id = params?.id;
    const navigation = useNavigation<CollectionNavigationProp>();
    const handleNavigate = (id: string, collectionId: string) => {
        navigation.navigate('collectionCardDetails', { id: `${id}`, collectionId: `${collectionId}`});
      };

    useEffect(() => {
    const getCollection = async () =>{
        try {
            const coll = await getDoc(doc(store, "pokecollections", `${id}`))
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
    <View className="size-full flex flex-col">

        <ScrollView className="m-auto bg-slate-800 size-full" contentContainerStyle={{flex: 1}}>
        {allJobs.cards ? 
            allJobs.cards.map((job: any, idx: number) => {
                return(
                    <View className="size-full my-2">
                        <TouchableOpacity className="size-full" onPress={() => handleNavigate(job.id, id)}>
                            <ImageBackground className='w-full m-auto bg-slate-800' style={{flex:1, filter: 'saturate(1.25)'}} key={idx} source={{uri: `${job.image}`}} resizeMode='contain'/>
                        </TouchableOpacity>
                    </View>
                )
            })
        : <Text>No cards in collection</Text>}
        </ScrollView>
    </View>
  )
}

export default CollectionDetails