import { View, Text, ScrollView, Image, ImageBackground, Linking, TouchableOpacity, Modal, TextInput } from 'react-native'
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript'
import { useEffect, useState } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './_layout';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH, FIREBASE_STORE } from '@/FirebaseConfig';
import { useRouter } from 'expo-router';
import { Platform } from "react-native";
//import {firebase} from '@react-native-firebase/firestore'
import { doc, updateDoc, arrayUnion, getDoc, getDocs, collection, query, where } from "firebase/firestore"; 
import auth from '@react-native-firebase/auth';
import { Dropdown } from 'react-native-element-dropdown';
//import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads'

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'cardDetails'>;
type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'cardDetails'>;


const CardDetails = ({ route }: { route: DetailsScreenRouteProp }) => {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const route2 = useRoute();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [collections, setCollections] = useState([])
    const {params}:any = route2
    const id = params?.id; 
    const [cards, setCards]:any = useState([{images: {large: ""}, name: "", legalities:{unlimited: "", expanded:""}, cardmarket: {prices: {avg1: ""}}}])
    const [image, setImage] = useState("")
    const [showMore, setShowMore] = useState(false)
    const [cardName, setCardName] = useState("")
    const [collectionId, setCollectionId] = useState("")
    const [thisCollectionId, setThisCollectionId] = useState("")
    const store = FIREBASE_STORE
    const auth = FIREBASE_AUTH

    const toggleModal = async () =>{
        setIsModalVisible(!isModalVisible)
        //Get the collections from current user to use for adding cards to collections.
        const getCollection = async () =>{
            try {
                const q = query(collection(store, "pokecollections"), where("userId", "==", `${user?.uid}`));
                const response:any = await getDocs(q)
                //const document = await getDoc(response)
                setCollections(await response.docs.map((doc:any) => doc.data()))
                setThisCollectionId(response.docs.map((doc:any) => doc.id))
                console.log(collections)
            } catch (error:any) {
                console.log(error)
            }
        }
        getCollection()
    }

    const addCardToCollection = async (_id: string) =>{
        try {
            setCollectionId(_id)
            if(collectionId !== ""){
                const docRef = doc(store, "pokecollections", `${collectionId}`);
                const fullDoc = await getDoc(docRef)
                const currentValue = fullDoc.data()?.totalValue;
                await updateDoc(docRef, {
                    cards: arrayUnion({
                        id: cards[0].id,
                        image: cards[0].images.large,
                        value: cards[0].cardmarket.prices.avg1
                    }),
                    totalValue: currentValue + cards[0].cardmarket.prices.avg1 || 0
                  });
                toggleModal()
            }
        } catch (error: any) {
            console.log(error.message)
        }
    }

    useEffect(() =>{
        const getUser = async () =>{
            const currentUser:any = auth.currentUser
            setUser(currentUser)
        }
        getUser()
        const getCards = async () =>{
            const paramsV2: any = { q: `id:${id}` };
            const cards = await PokemonTCG.findCardsByQueries(paramsV2)
            setCards(cards)
            setCardName(cards[0].name)
        }
        getCards()
        setImage(cards[0].images.large)
    }, [])
  return (
    <ScrollView className="bg-slate-950 size-full" contentContainerStyle={{flex: 1}}>
        <View className="flex flex-col h-full w-full">
            <View className="h-full w-[100%] absolute top-0">
                <ImageBackground source={{uri: `${cards[0].images.large}`}} 
                blurRadius={5} style={{flex:1}} className='w-full h-96' resizeMode="cover"/>
            </View>
            <ScrollView 
                showsVerticalScrollIndicator={false} 
                showsHorizontalScrollIndicator={false}
                className="flex flex-col m-auto bg-slate-800 w-full h-[90%] bottom-0 absolute rounded-t-3xl">
            <View className="max-sm:h-[685px] lg:h-[1200px] w-full lg:w-96 lg:m-auto max-sm:m-auto md:mx-0 top-0" style={{height: hp(63.5), width: wp(100)}}>
                <ImageBackground source={{uri: `${cards[0].images.large}`}} style={{flex:1, filter: 'saturate(1.25)'}} className='max-sm:size-full md:size-full lg:size-full m-auto bg-slate-800' resizeMode="contain"/>
            </View>
            <View className='flex flex-col m-auto w-[90%] border-2 border-green-600 mt-3 rounded-md'>
                {cards[0].flavorText ? <Text className='text-white m-auto text-2xl text-center p-2 w-full'>{cards[0].flavorText}</Text> : null}
                <View className='flex flex-col m-auto'>
                    {cards[0].attacks ? 
                        cards[0].attacks.map((attack: any, idx: number) => {
                            return(
                                <Text key={idx} className='text-green-600 m-auto text-xl text-center p-2'>{attack.name} <Text className='text-white m-auto text-xl text-center p-2'>{attack.text}</Text></Text>
                            )
                        })
                     : null}
                </View>
            </View>
                {cards[0].cardmarket ? <Text className='text-white m-auto text-2xl p-2'><Text className='text-green-600'>$</Text>{cards[0].cardmarket.prices.avg1}</Text> : null}
                 
                {cards[0].abilities? 
                    <>
                        <Text className={!showMore ? 'text-white m-auto w-full text-2xl text-center my-8 p-2 max-sm:line-clamp-1' : 'text-white m-auto text-2xl text-center my-8 p-2 w-full'}>
                        <Text className="text-green-500">Ability - {cards[0].abilities[0].name} -</Text> 
                        {cards[0].abilities[0].text }
                        </Text> 

                        {showMore ? 
                            <TouchableOpacity onPress={()=> setShowMore(!showMore)}>
                                <Text className='text-green-600 m-auto'> Show Less</Text>
                            </TouchableOpacity> 
                            : 
                            <TouchableOpacity onPress={()=> setShowMore(!showMore)}>
                                <Text className='text-green-600 m-auto text-center'> Show More</Text>
                            </TouchableOpacity> 
                        }
                    </>
                : null}
                {cards[0].ancientTrait? 
                    <>
                        <Text className='text-white m-auto text-2xl text-center my-8 p-2'>
                            <Text className="text-green-400">{cards[0].ancientTrait.name} -</Text> 
                            {cards[0].ancientTrait.text}
                        </Text> 
                    </>
                : null}
                {cards[0].rules? 
                    cards[0].rules.map((rule: any, idx: number) => {
                        return(
                            <Text key={idx} className='text-white m-auto text-2xl text-center my-8 p-2'>{rule}</Text>
                        )
                    })
                 : null}
                <View className='flex flex-row m-auto w-[80%]'>
                    <Text className='text-white m-auto text-2xl p-2'>Unlimited: <Text style={cards[0].legalities.unlimited === "Legal" ? {color: "green"} : {color: "red"}}>{cards[0].legalities.unlimited}</Text></Text>
                    {cards[0].legalities.expanded !== "" ? <Text className='text-white m-auto text-2xl p-2'>Expanded: <Text style={cards[0].legalities.expanded === "Legal" ? {color: "green"} : {color: "red"}}>{cards[0].legalities.expanded === "Legal" ? "Legal": "Banned"}</Text></Text> : null}
                </View>
                <View className="flex flex-row m-auto gap-2 w-full">
                    {user ?
                        <TouchableOpacity 
                        className='m-auto text-white bg-green-600 p-2 rounded-md h-12 w-48 text-center mt-4 mb-12'
                        onPress={toggleModal}>
                            <Text className='m-auto text-white text-center'>Add To Collection</Text>
                        </TouchableOpacity>
                    : 
                        <TouchableOpacity 
                        className='m-auto text-white bg-green-600 p-2 rounded-md h-12 w-48 text-center mt-4 mb-12'
                        onPress={() => router.replace(`./collection`)}>
                            <Text className='m-auto text-white text-center'>Add To Collection</Text>
                        </TouchableOpacity>
                    }
                    <TouchableOpacity 
                    className='m-auto text-white bg-green-600 p-2 rounded-md h-12 w-48 text-center mt-4 mb-12'
                    onPress={() => Linking.openURL(`https://www.ebay.com/sch/i.html?_nkw=${`${cards[0].set.name} ${cardName}`}&_sacat=0&_from=R40&_trksid=p2334524.m570.l1311&_odkw=gamecube&_osacat=0&mkcid=1&mkrid=711-53200-19255-0&siteid=0&campid=5339086170&customid=gamecube&toolid=10001&mkevt=1`)}>
                        <Text className='m-auto text-white text-center'>Ebay</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View>
            <Modal visible={isModalVisible} animationType="slide">
              <View className='size-full m-auto bg-slate-950'>
                <Text className='text-white m-auto'>Add Card To Collection</Text>
                <View className='w-full h-96'>
                  <ScrollView className="border-2 border-green-600 rounded-md m-auto p-2" style={{width: wp(80)}}>
                      {collections.map((item: any, idx: number) => {
                        return(
                            <TouchableOpacity key={idx} onPress={() => addCardToCollection(thisCollectionId[idx])} className='w-full h-24 bg-green-600 rounded-md my-2'>
                              <Text className='text-white text-2xl m-auto'>{item.name}</Text>
                            </TouchableOpacity>
                        )
                      })}
                  </ScrollView>
                </View>
                <TouchableOpacity onPress={toggleModal} className='w-60 rounded-md m-auto h-16 bg-green-600'>
                  <Text className='text-white m-auto text-4xl'>Cancel</Text>
                </TouchableOpacity>
              </View>
            </Modal>
            </View>
            </View>
    </ScrollView>
  )
}

export default CardDetails