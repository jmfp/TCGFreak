import { View, Text, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript'
import { useEffect, useState } from 'react';
import Animated from 'react-native-reanimated';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation, useRouter } from 'expo-router';

const Sets = ({navigation}:any) => {
    const router = useRouter()
    const [cards, setCards]:any = useState([])
    const getCards = async () =>{
        const cards = await PokemonTCG.getAllSets()
        setCards(cards)
        console.log(cards)
    }
    useEffect(() =>{
        getCards()
    }, [])
  return (
    <ScrollView className="bg-slate-800 size-full p-6">
        {cards.flat().map((set: any, idx: number) =>{
            return(
                <TouchableOpacity key={idx}>

                <View className="flex flex-col m-auto my-2 h-48 p-6 border-2 border-purple-400 w-full rounded-full">
                <ImageBackground source={{uri: `${set.images.logo}`}} style={{flex:1}} resizeMode="contain"/>
                <Text className='text-white m-auto'>{set.name}</Text>
                </View>
                </TouchableOpacity>
            )
        })}
    </ScrollView>
  )
}

export default Sets