import { View, Text, TextInput, TouchableOpacity, ScrollView, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from './_layout';
import { StackNavigationProp } from '@react-navigation/stack';
type SearchCardsNavigationProp = StackNavigationProp<RootStackParamList, 'sets'>;

const Search = () => {
    const [cards, setCards]:any = useState([{images: {large: ""}, name: "", legalities:{unlimited: "", expanded:""}, cardmarket: {prices: {avg1: ""}}}])
    const [search, setSearch] = useState("")
    const route = useRoute();
    const navigation = useNavigation<SearchCardsNavigationProp>();
    const searchCards = async () =>{
        const paramsV2: any = { q: `name:${search}` };
        const cards = await PokemonTCG.findCardsByQueries(paramsV2)
        setCards(cards)
    }
    const handleNavigate = (id: string) => {
        navigation.navigate('cardDetails', { id: `${id}`});
    };
  return (
    <ScrollView className="bg-slate-800 size-full p-6"
                showsVerticalScrollIndicator={false} 
                showsHorizontalScrollIndicator={false}>
    <View className="m-auto size-full bg-slate-800">
      <TextInput className='h-16 w-80 m-auto caret-green-500 mt-12 p-2 text-white' value={search} onChangeText={(text) => setSearch(text)}></TextInput>
      <View>
        <TouchableOpacity className='bg-green-500 h-16 w-80 m-auto my-12 rounded-md' onPress={searchCards}>
            <Text className='text-white m-auto'>Search</Text>
        </TouchableOpacity>
      </View>
        {cards.flat().map((card: any, idx: number) =>{
            return(
                <View key={idx} className="flex flex-col m-auto my-2 h-96 p-6 w-full" style={{height: hp(60.5)}}>
                    <TouchableOpacity className='size-full' onPress={() => handleNavigate(card.id)}>
                        <ImageBackground source={{uri: `${card.images.large}`}} style={{flex:1}} className='w-full h-24' resizeMode="contain"/>
                    </TouchableOpacity>
                </View>
            )
        })}
    </View>
    </ScrollView>
  )
}

export default Search