import { View, Text, ImageBackground, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FIREBASE_AUTH, FIREBASE_STORE } from '@/FirebaseConfig'
import { getDoc, collection, doc, getDocs } from 'firebase/firestore'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './_layout';
import { useNavigation, useRouter } from 'expo-router';
import { onAuthStateChanged, User } from 'firebase/auth';
type CollectionNavigationProp = StackNavigationProp<RootStackParamList, 'collection'>;

const Collection = () => {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [allJobs, setAllJobs] : any = useState([])
    const [id, setId] : any = useState([])
    const store = FIREBASE_STORE
    const navigation = useNavigation<CollectionNavigationProp>();

    const handleNavigate = (id: string) => {
      navigation.navigate('collectionDetails', { id: `${id}`});
    };


    //get all collections for user and all id's of the collections
    useEffect(() => {
    const getCollection = async () =>{
        try {
            const response:any = await getDocs(collection(store, "pokecollections"))
            //const document = await getDoc(response)
            response.forEach(async(doc: any) => {
                await setAllJobs([...allJobs, doc.data()])
                await setId([...id, doc.id])
            })
        } catch (error:any) {
            console.log(error)
            alert("Something went wrong, try again later")
        }
    }
        getCollection()
        onAuthStateChanged(FIREBASE_AUTH, (user) =>{
          setUser(user)
        })
    }, [])
  return (
    user? 
    <View className="bg-slate-800 size-full flex" style={{flex: 1}}>
    {allJobs.length ? 
        allJobs.map((job: any, idx: number) => {
            return(
                <TouchableOpacity key={idx} className="size-full" onPress={() => handleNavigate(id[idx])}>
                    <ImageBackground className='size-full' source={{uri: `${job.cards[0].image}`}} resizeMode='contain'/>
                </TouchableOpacity>
            )
    })
    : <Text>No collections</Text>}
    </View>
    : 
    <View className="size-full bg-slate-800">
        <Text className='m-auto text-6xl text-white text-center'>You must be logged in to build collections</Text>
        <View className="m-auto w-[80%]">
            <TouchableOpacity className="bg-green-500 w-full h-24 p-2 m-auto rounded-md" onPress={() => router.push('./login')}>
                <Text className='text-white m-auto text-4xl'>Log In</Text>
            </TouchableOpacity>
        </View>
    </View>
    
    
  )
}

export default Collection