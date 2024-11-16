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
        setCards(cards)
    }
    const handleNavigate = (id: string) => {
        navigation.navigate('setCards', { id: `${id}`});
    };

    useEffect(() =>{
        getCards()
    }, [])
  return (
    <ScrollView className="bg-slate-800 size-full p-6">
        {cards.flat().map((set: any, idx: number) =>{
            return(
                <TouchableOpacity key={idx} onPress={() => handleNavigate(set.id)}>

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