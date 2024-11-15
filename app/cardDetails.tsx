import { View, Text, ScrollView, Image, ImageBackground, Linking, TouchableOpacity } from 'react-native'
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript'
import { useEffect, useState } from 'react';
import Animated from 'react-native-reanimated';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const CarrdDetails = () => {
  //const route = useRoute();
    //const {setId} : any = route.params;
    const [cards, setCards]:any = useState([{images: "", name: "", legalities:{unlimited: "", expanded:""}, cardmarket: {prices: {avg1: ""}}}])
    const getCards = async () =>{
        const paramsV2: any = { q: 'id:base1-20' };
        const cards = await PokemonTCG.findCardsByQueries(paramsV2)
        console.log(cards)
        setCards(cards)
    }
    useEffect(() =>{
        getCards()
    }, [])
  return (
    <ScrollView className="bg-slate-800 size-full" style={{flex: 1}}>
        <View className="flex flex-col h-[850px] w-full">
            <View className="h-full w-[100%] absolute top-0">
                <ImageBackground source={{uri: `${cards[0].images.large}`}} blurRadius={5} style={{flex:1}} className='w-full h-96' resizeMode="cover"/>
            </View>
            <ScrollView 
                showsVerticalScrollIndicator={false} 
                showsHorizontalScrollIndicator={false}
                className="flex flex-col m-auto bg-slate-800 w-full h-[80%] bottom-0 absolute rounded-t-3xl">
                
                
            <View className="h-[800px] w-[100%] top-0">
                <ImageBackground source={{uri: `${cards[0].images.large}`}} style={{flex:1, filter: 'saturate(1.25)'}} className='w-full m-auto bg-slate-800' resizeMode="contain"/>
            </View>
                <Text className='text-white m-auto text-4xl text-center my-8'>{cards[0].flavorText}</Text>
                <Text className='text-white m-auto text-2xl'>Unlimited: <Text style={cards[0].legalities.unlimited === "Legal" ? {color: "green"} : {color: "red"}}>{cards[0].legalities.unlimited}</Text></Text>
                {cards[0].legalities.expanded ! === "" ? <Text className='text-white m-auto text-2xl'>Expanded: <Text style={cards[0].legalities.expanded === "Legal" ? {color: "green"} : {color: "red"}}>{cards[0].legalities.expanded}</Text></Text> : null}
                <Text className='text-white m-auto text-2xl'>Average Sale Price: {cards[0].cardmarket.prices.avg1}</Text>
                {cards[0].abilities? <Text className='text-white m-auto text-2xl text-center my-8'><Text className="text-purple-400">{cards[0].abilities[0].name} -</Text> {cards[0].abilities[0].text}</Text> : null}
                
                <View className="flex flex-row m-auto gap-2">
                    <TouchableOpacity 
                    className='m-auto text-white bg-purple-400 p-2 rounded-md h-12 w-48 text-center mt-4'
                    onPress={() => Linking.openURL(`https://www.ebay.com/sch/i.html?_nkw=${`${cards[0].set.name} ${cards[0].name}`}&_sacat=0&_from=R40&_trksid=p2334524.m570.l1311&_odkw=gamecube&_osacat=0&mkcid=1&mkrid=711-53200-19255-0&siteid=0&campid=5339086170&customid=gamecube&toolid=10001&mkevt=1`)}>
                        <Text className='m-auto text-white text-center'>Add To Collection</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    className='m-auto text-white bg-purple-400 p-2 rounded-md h-12 w-48 text-center mt-4'
                    onPress={() => Linking.openURL(`https://www.ebay.com/sch/i.html?_nkw=${`${cards[0].set.name} ${cards[0].name}`}&_sacat=0&_from=R40&_trksid=p2334524.m570.l1311&_odkw=gamecube&_osacat=0&mkcid=1&mkrid=711-53200-19255-0&siteid=0&campid=5339086170&customid=gamecube&toolid=10001&mkevt=1`)}>
                        <Text className='m-auto text-white text-center'>Ebay</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            
            </View>
    </ScrollView>
  )
}

export default CarrdDetails