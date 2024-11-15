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
      <Animated.View className="bg-green-400 rounded-lg my-6" entering={FadeIn.delay(300).springify()} exiting={FadeOut}>
        <TouchableOpacity onPress={() => router.push('./login')} style={{height: hp(7), width: wp(40)}} className="flex items-center text-center mx-auto">
          <Text className="text-white text-center m-auto">Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('./jobs')} style={{height: hp(7), width: wp(40)}} className="flex items-center text-center mx-auto">
          <Text className="text-white text-center m-auto">Jobs</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('./cardDetails')} style={{height: hp(7), width: wp(40)}} className="flex items-center text-center mx-auto">
          <Text className="text-white text-center m-auto">Jobs</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
