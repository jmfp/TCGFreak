import { View, Text, ImageBackground, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FIREBASE_STORE } from '@/FirebaseConfig'
import { collection, query, getDocs, where, getDoc, doc } from 'firebase/firestore'
import { RouteProp, useRoute } from '@react-navigation/native'
import { RootStackParamList } from './_layout'
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from 'expo-router';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
type CollectionNavigationProp = StackNavigationProp<RootStackParamList, 'collectionDetails'>;
type CollectionDetailsScreenRouteProp = RouteProp<RootStackParamList, 'collectionDetails'>;

const CollectionDetails = () => {
    const [allCards, setAllcards] : any = useState([])
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
            setAllcards(coll.data())
            const q = await query(collection(store, "pokecollections"), where("id", "==", `${id}`))
            const response:any = await getDocs(q)
        } catch (error:any) {
            console.log(error)
            alert("Something went wrong, try again later")
        }
    }
        getCollection()
    }, [])
  return (
    <View className='size-full' style={{ flex: 1 }}>
        <View className="bg-slate-950 w-full h-24 text-center border-b-2 border-green-600">
            <Text className='text-green-600 m-auto text-4xl'>Estimated Value: ${allCards.totalValue}</Text>
        </View>
        <ScrollView className="m-auto bg-slate-950 size-full" style={{flex: 1}}>
        {allCards.cards ? 
            allCards.cards.map((job: any, idx: number) => {
                return(
                    <View key={idx} className="w-full mx-auto my-2" style={{height: hp(60)}}>
                        <TouchableOpacity className="size-full mx-auto" onPress={() => handleNavigate(job.id, id)}>
                            <ImageBackground className='w-full m-auto bg-slate-950' style={{flex:1, filter: 'saturate(1.25)'}} source={{uri: `${job.image}`}} resizeMode='contain'/>
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