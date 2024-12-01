import { View, Text, TextInput, TouchableOpacity, ScrollView, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './_layout';
import { StackNavigationProp } from '@react-navigation/stack';
import Ionicons from '@expo/vector-icons/Ionicons'; 
import { searchParams } from './interfaces/interfaces';
type SearchCardsNavigationProp = StackNavigationProp<RootStackParamList, 'sets'>;

const Search = () => {
    const [cards, setCards]:any = useState([{images: {large: ""}, name: "", legalities:{unlimited: "", expanded:""}, cardmarket: {prices: {avg1: ""}}}])
    const [search, setSearch] = useState("")
    const navigation = useNavigation<SearchCardsNavigationProp>();
    const searchCards = async () =>{
        try {
            const paramsV2: searchParams = { q: `name:${search}` };
            const cards = await PokemonTCG.findCardsByQueries(paramsV2)
            setCards(cards)
        } catch (error: any) {
            setSearch("")
        }
    }
    const handleNavigate = (id: string) => {
        navigation.replace('cardDetails', { id: `${id}`});
    };
  return (
    <ScrollView 
        className="bg-slate-950 size-full p-6"
        showsVerticalScrollIndicator={false} 
        showsHorizontalScrollIndicator={false}  contentContainerStyle={{flexGrow: 1}}>
    <View className="m-auto flex flex-row justify-items-center w-full absolute top-0 h-36 bg-slate-950">
      <TextInput onSubmitEditing={searchCards} placeholder='eg "Charmander", "gyarados"' className='h-12 w-[80%] text-center m-auto text-green-600 text-3xl caret-green-600 mt-12 border-2 rounded-md border-green-600 p-2' value={search} onChangeText={(text) => setSearch(text)}></TextInput>
      <TouchableOpacity className='bg-green-600 h-12 w-[10%] m-auto my-12 rounded-md' onPress={searchCards}>
        <Ionicons name="search" size={30} color="#ffff" className='text-white m-auto text-4xl'/>
      </TouchableOpacity>
    </View>
    <View className="mt-36">
        {cards[0].name !== "" && search !== ""? 
        cards.flat().map((card: any, idx: number) =>{
            return(
                <View key={idx} className="flex flex-col m-auto my-2 h-96 p-6 w-full" style={{height: hp(60.5)}}>
                    <TouchableOpacity className='size-full' onPress={() => handleNavigate(card.id)}>
                        {card.images.large ? <ImageBackground source={{uri: `${card.images.large}`}} style={{flex:1}} className='w-full h-24' resizeMode="contain"/> : null}
                    </TouchableOpacity>
                </View>
            )
        }): 
            <Text className='text-white text-4xl m-auto'>
                Search for cards
            </Text>
        }
    </View>
    </ScrollView>
  )
}

export default Search