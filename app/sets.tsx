import { View, Text, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript'
import { useEffect, useState } from 'react';
import Animated from 'react-native-reanimated';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation, useRouter } from 'expo-router';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './_layout';
type SetCardsNavigationProp = StackNavigationProp<RootStackParamList, 'sets'>;

const Sets = () => {
    const navigation = useNavigation<SetCardsNavigationProp>();
    const router = useRouter()
    const [cards, setCards]:any = useState([])
    const getCards = async () =>{
        const cards = await PokemonTCG.getAllSets()
        setCards(cards.reverse())
    }
    const handleNavigate = (id: string) => {
        navigation.pop()
        navigation.push('setCards', { id: `${id}`});
    };

    useEffect(() =>{
        getCards()
    }, [])
  return (
    <View className="m-auto size-full pt-12 bg-slate-950">
    <ScrollView className="bg-slate-950 size-full p-6 m-auto"
        showsVerticalScrollIndicator={false} 
        showsHorizontalScrollIndicator={false}>
        {cards.flat().map((set: any, idx: number) =>{
            return(
                <TouchableOpacity key={idx} onPress={() => handleNavigate(set.id)}>
                <View className="flex flex-col m-auto my-2 h-48 p-6 border-2 border-green-500 w-full rounded-md">
                <ImageBackground source={{uri: `${set.images.logo}`}} style={{flex:1}} resizeMode="contain"/>
                <Text className='text-white m-auto'>{set.name}</Text>
                </View>
                </TouchableOpacity>
            )
        })}
    </ScrollView>
    </View>
  )
}

export default Sets