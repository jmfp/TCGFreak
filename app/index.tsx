import { Image, ImageBackground, ScrollView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter()
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      className="bg-slate-800 size-full flex flex-col"
    >
      <View className="absolute top-0 h-64 w-full m-auto flex flex-col">
        <ImageBackground source={require('../assets/images/charizard.png')} className="w-full h-64 fixed top-0 rounded-md border-b-2 border-green-600 m-auto" resizeMode="cover" blurRadius={5}/>
      </View>
      <View>
          <TouchableOpacity onPress={() => router.push('./login')} style={{height: hp(7), width: wp(40)}} className="flex bg-green-600 rounded-md items-center text-center mx-auto my-2">
            <Text className="text-white text-center m-auto">Get Started</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('./sets')} style={{height: hp(7), width: wp(40)}} className="flex items-center text-center mx-auto my-2">
            <Text className="text-white text-center m-auto">Sets</Text>
          </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
