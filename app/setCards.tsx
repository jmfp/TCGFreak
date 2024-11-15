import { View, Text, ScrollView, Image, ImageBackground } from 'react-native'
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript'
import { useEffect, useState } from 'react';
import Animated from 'react-native-reanimated';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const SetCards = ({route}:any) => {

    //const route = useRoute();
    //const {setId} : any = route.params;
    const [cards, setCards]:any = useState([])
    const getCards = async () =>{
        const paramsV2: any = { q: 'set.id:base1' };
        const cards = await PokemonTCG.findCardsByQueries(paramsV2)
         setCards(cards)
    }
    useEffect(() =>{
        getCards()
    }, [])
  return (
    <ScrollView className="bg-slate-800 size-full p-6">
        {cards.flat().map((set: any, idx: number) =>{
            return(
                <View key={idx} className="flex flex-col m-auto my-2 h-96 p-6 border-2 border-purple-400 w-full">
                    
                <ImageBackground source={{uri: `${set.images.large}`}} style={{flex:1}} className='w-full h-24' resizeMode="contain"/>
                <Text className='text-white m-auto'>{set.name}</Text>
                </View>
            )
        })}
    </ScrollView>
  )
}

export default SetCards