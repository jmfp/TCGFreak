import { Image, ImageBackground, ScrollView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useRouter } from "expo-router";
import LocalImageCard from "@/components/ImageCard";

export default function Index() {
  const router = useRouter()
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      className="bg-slate-950 size-full flex flex-col"
    >
      <ImageBackground source={require('../assets/images/charizard.png')} 
        style={{height: hp(20), width: wp(100)}} 
        className="m-auto absolute top-0 border-b-2 border-green-600" 
        resizeMode="cover" blurRadius={3}/>
      <View>
        <View className="flex flex-col rounded-md border-2 border-green-600 mt-24">
          <TouchableOpacity onPress={() => router.push('./sets')}>
            <ImageBackground source={require(`../assets/images/mewtwoback.jpg`)} className="rounded-md" style={{width: wp(90), height: hp(20)}} blurRadius={2}>
              <Text className="text-white absolute bottom-2 left-2 m-auto text-3xl">Browse Pokémon</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        {/*<View className="flex flex-col rounded-md border-2 border-green-600 my-2">
          <TouchableOpacity onPress={() => router.push('./sets')}>
            <ImageBackground source={require(`../assets/images/blueeyesback.jpg`)} className="rounded-md" style={{width: wp(80), height: hp(20)}} blurRadius={2}>
              <Text className="text-white absolute bottom-2 left-2 m-auto text-3xl">Pokémon</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>*/}
        <TouchableOpacity onPress={() => router.push('./collection')} style={{height: hp(7), width: wp(40)}} 
          className="flex bg-green-600 rounded-md items-center text-center mx-auto my-2">
          <Text className="text-white text-2xl text-center m-auto">Start collection</Text>
        </TouchableOpacity>
        <Text className="text-white m-auto text-4xl my-6">
          Don't have an account?
        </Text>
          <TouchableOpacity onPress={() => router.replace('./login')} style={{height: hp(7), width: wp(40)}} className="flex items-center text-center m-auto bg-green-600 rounded-md">
              <Text className="text-white text-center m-auto text-2xl">Sign Up</Text>
          </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
