import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter()
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <View className="bg-green-400 rounded-lg my-6">
        <TouchableOpacity onPress={() => router.push('./login')} style={{height: hp(7), width: wp(40)}} className="flex items-center text-center mx-auto">
          <Text className="text-white text-center m-auto">Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('./sets')} style={{height: hp(7), width: wp(40)}} className="flex items-center text-center mx-auto">
          <Text className="text-white text-center m-auto">Sets</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('./search')} style={{height: hp(7), width: wp(40)}} className="flex items-center text-center mx-auto">
          <Text className="text-white text-center m-auto">Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
