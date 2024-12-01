import { View, Image } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React from 'react'

export default function LocalImageCard(props: {image: string}) {
    console.log(props.image)
  return (
    <View>
      <Image source={require(`../assets/images/${props.image}`)} style={{width: wp(80), height: hp(100)}}/>
    </View>
  )
}