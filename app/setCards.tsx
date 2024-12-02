import { View, Text, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript'
import { useEffect, useState } from 'react';
import Animated from 'react-native-reanimated';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from './_layout';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'setCards'>;
type SetCardsNavigationProp = StackNavigationProp<RootStackParamList, 'setCards'>;

const SetCards = () => {
    const route = useRoute();
    const {params}:any = route
    const id = params?.id; 
    const navigation = useNavigation<SetCardsNavigationProp>();

    const handleNavigate = (id: string) => {
      navigation.pop()
      navigation.push('cardDetails', { id: `${id}`});
    };

    const [cards, setCards]:any = useState([])
    const getCards = async () =>{
        const paramsV2: any = { q: `set.id:${id}` };
        const cards = await PokemonTCG.findCardsByQueries(paramsV2)
         setCards(cards)
    }
    useEffect(() =>{
        getCards()
    }, [])
  return (
    <ScrollView className="bg-slate-950 size-full p-6"
        showsVerticalScrollIndicator={false} 
        showsHorizontalScrollIndicator={false}>
        {cards.flat().map((set: any, idx: number) =>{
            return(
                <View key={idx} className="flex flex-col m-auto my-2 h-96 p-6 w-full" style={{height: hp(60.5)}}>
                    <TouchableOpacity className='size-full' onPress={() => handleNavigate(set.id)}>
                        <ImageBackground source={{uri: `${set.images.large}`}} style={{flex:1}} className='w-full h-24' resizeMode="contain"/>
                    </TouchableOpacity>
                </View>
            )
        })}
    </ScrollView>
  )
}

export default SetCards