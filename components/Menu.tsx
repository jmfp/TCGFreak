import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { User } from "firebase/auth";

export default function Menu(props: {user:User}) {
  const router = useRouter()
  return (
    <View className='z-50 h-36 w-full flex flex-row border-t-2 border-green-600 bg-slate-800 justify-evenly'>
      <TouchableOpacity onPress={() => router.replace('./sets')}>
        <MaterialCommunityIcons name="cards" size={50} color="white" className='m-auto mt-6' />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.replace('./search')}>
        <MaterialCommunityIcons name="card-search" size={50} color="white" className='m-auto mt-6' />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.replace('./collection')}>
        <MaterialCommunityIcons name="archive" size={50} color="white" className='m-auto mt-6' />
      </TouchableOpacity>
      <TouchableOpacity onPress={props.user == null ? () => router.replace('./login') : () => router.replace('./logout')}>
        <MaterialCommunityIcons name="account" size={50} color="white" className='m-auto mt-6' />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.replace('./')}>
        <MaterialCommunityIcons name="home" size={50} color="white" className='m-auto mt-6' />
      </TouchableOpacity>
    </View>
  )
}