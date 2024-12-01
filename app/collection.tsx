import { View, Text, ImageBackground, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FIREBASE_AUTH, FIREBASE_STORE } from '@/FirebaseConfig'
import { getDoc, collection, doc, getDocs, addDoc } from 'firebase/firestore'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './_layout';
import { useNavigation, useRouter } from 'expo-router';
import { onAuthStateChanged, User } from 'firebase/auth';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
type CollectionNavigationProp = StackNavigationProp<RootStackParamList, 'collection'>;

const Collection = () => {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [allCards, setAllCards] = useState<any>([])
    const [collectionName, setCollectionName] = useState("")
    const [id, setId] : any = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const store = FIREBASE_STORE
    const navigation = useNavigation<CollectionNavigationProp>();

    const handleNavigate = (id: string) => {
      navigation.replace('collectionDetails', { id: `${id}`});
    };

    const addCollection = async () => {
        try {
            const newUser = await addDoc(collection(store, "pokecollections"), {
                cards: [],
                name: collectionName,
                totalValue: 0,
                userId: user?.uid
            })
        } catch (error: any) {
            console.log(error.message)
        }finally{
            toggleModal();
            router.replace("./collection")
        }
    }

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
      };

    //get all collections for user and all id's of the collections
    useEffect(() => {
        const getCollection = async () =>{
            try {
                const response:any = await getDocs(collection(store, "pokecollections"))
                //const document = await getDoc(response)
                setAllCards(response.docs.map((doc:any) => doc.data()))
                setId(response.docs.map((doc:any) => doc.id))
                console.log(allCards)
            } catch (error:any) {
                console.log(error)
                alert("Something went wrong, try again later")
            }
        }
        getCollection()
        onAuthStateChanged(FIREBASE_AUTH, (user) =>{
          setUser(user)
        })
    }, [])
  return (
    user?
        <ScrollView className="bg-slate-950 size-full p-8"
            showsVerticalScrollIndicator={false} 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{flex: 1, height: hp(100)}}
            >
        {allCards.length ? 
            allCards.map((card: any, idx: number) => {
                return(
                    <TouchableOpacity key={idx} className="size-full m-auto my-6 flex flex-col rounded-lg" onPress={() => handleNavigate(id[idx])}>
                        <ImageBackground className='size-full m-auto rounded-lg' 
                            source={card.cards.length? {uri: `${card.cards[0].image}`} : require(`../assets/images/charizard.png`)} 
                            resizeMode='cover' 
                            blurRadius={2}>
                            <View className='absolute bottom-0 w-full rounded-b-md bg-green-600 h-12'>
                                <Text className='m-auto text-4xl text-white'>{card.name}</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                )
        })
        : <Text className='text-white text-4xl m-auto'>No collections</Text>}
        <TouchableOpacity className='rounded-md m-auto bg-green-600 w-60 h-16 b-12' onPress={toggleModal}>
          <Text className='text-white text-4xl m-auto'>+</Text>
        </TouchableOpacity>

          <Modal visible={isModalVisible} animationType="slide">
            <View className='size-full m-auto bg-slate-950'>
              <Text className='text-white m-auto'>Hello from Modal!</Text>
              <TextInput placeholder='New Collection Name' onChangeText={(value) => setCollectionName(value)} className='w-80 h-16 border-2 border-green-600 rounded-md m-auto text-green-600 text-center caret-green-600'/>
              <TouchableOpacity onPress={addCollection} className='w-60 rounded-md m-auto h-16 bg-green-600'>
                <Text className='text-white m-auto text-4xl'>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleModal} className='w-60 rounded-md m-auto h-16 bg-green-600'>
                <Text className='text-white m-auto text-4xl'>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </ScrollView>
    : 
    <View className="size-full bg-slate-950">
        <Text className='m-auto text-6xl text-white text-center'>You must be logged in to build collections</Text>
        <View className="m-auto w-[80%]">
            <TouchableOpacity className="bg-green-600 w-full h-24 p-2 m-auto rounded-md" onPress={() => router.replace('./login')}>
                <Text className='text-white m-auto text-4xl'>Log In</Text>
            </TouchableOpacity>
        </View>
    </View>
    
    
  )
}

export default Collection