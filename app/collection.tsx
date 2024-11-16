import { View, Text, ImageBackground, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FIREBASE_STORE } from '@/FirebaseConfig'
import { getDoc, collection, doc, getDocs } from 'firebase/firestore'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './_layout';
import { useNavigation } from 'expo-router';
type CollectionNavigationProp = StackNavigationProp<RootStackParamList, 'collection'>;

const Collection = () => {
    const [allJobs, setAllJobs] : any = useState([])
    const [id, setId] : any = useState([])
    const store = FIREBASE_STORE
    const navigation = useNavigation<CollectionNavigationProp>();

    const handleNavigate = (id: string) => {
      navigation.navigate('collectionDetails', { id: `${id}`});
    };

    useEffect(() => {
    const getCollection = async () =>{
        try {
            const response:any = await getDocs(collection(store, "pokecollections"))
            //const document = await getDoc(response)
            response.forEach(async(doc: any) => {
                await setAllJobs([...allJobs, doc.data()])
                await setId([...id, doc.id])
            })

            console.log(id)
        } catch (error:any) {
            console.log(error)
            alert("Something went wrong, try again later")
        }
    }
        getCollection()
    }, [])
  return (
    <View className="bg-slate-800 size-full flex" style={{flex: 1}}>
            {allJobs.length ? 
                allJobs.map((job: any, idx: number) => {
                    console.log(job)
                    return(
                        <TouchableOpacity key={idx} className="size-full" onPress={() => handleNavigate(id[idx])}>
                            <ImageBackground className='size-full' source={{uri: `${job.cards[0].image}`}} resizeMode='contain'/>
                        </TouchableOpacity>
                    )
            })
            : <Text>No collections</Text>}
    </View>
  )
}

export default Collection