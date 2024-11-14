import { View, Text, ScrollView, Image, ImageBackground } from 'react-native'
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript'
import { useEffect, useState } from 'react';
import Animated from 'react-native-reanimated';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const CarrdDetails = () => {
  //const route = useRoute();
    //const {setId} : any = route.params;
    const [cards, setCards]:any = useState([{images: "", name: ""}])
    const getCards = async () =>{
        const paramsV2: any = { q: 'id:xy7-54' };
        const cards = await PokemonTCG.findCardsByQueries(paramsV2)
        console.log(cards)
        setCards(cards)
    }
    useEffect(() =>{
        getCards()
    }, [])
  return (
    <ScrollView className="bg-slate-800 size-full p-6">
        <Animated.View className="flex flex-col m-auto my-2 h-96 p-6 border-2 border-purple-400 w-full">
                    
            <ImageBackground source={{uri: `${cards[0].images.large}`}} style={{flex:1}} className='w-full h-24' resizeMode="contain"/>
            <Text className='text-white m-auto'>{cards[0].name}</Text>
            <Text className='text-white m-auto'>{cards[0].flavorText}</Text>
            <Text className='text-white m-auto'>Unlimited: {cards[0].legalities.unlimited}</Text>
            <Text className='text-white m-auto'>Expanded: {cards[0].legalities.expanded}</Text>
            </Animated.View>
    </ScrollView>
  )
}

export default CarrdDetails