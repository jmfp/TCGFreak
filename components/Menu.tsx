import { View, Text } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Menu() {
  return (
    <View className='z-50 h-36 w-full flex flex-row border-t-2 border-green-600 bg-slate-800 justify-evenly'>
      <MaterialCommunityIcons name="cards" size={50} color="white" className='m-auto mt-6' />
      <MaterialCommunityIcons name="card-search" size={50} color="white" className='m-auto mt-6' />
      <MaterialCommunityIcons name="archive" size={50} color="white" className='m-auto mt-6' />
      <MaterialCommunityIcons name="account" size={50} color="white" className='m-auto mt-6' />
    </View>
  )
}