import { Stack } from "expo-router";

import "../global.css";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { FIREBASE_APP, FIREBASE_AUTH } from "@/FirebaseConfig";
import Menu from "@/components/Menu";



export type RootStackParamList = {
  setCards: {id: string}; 
  cardDetails: { id: string, collectionId?: string}; 
  sets: undefined;
  collection: undefined;
  collectionDetails: {id: string;};
  collectionCardDetails: {id: string, collectionId: string};
  search: undefined
};

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null)
  const app = FIREBASE_APP

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) =>{
      setUser(user)
      console.log(user)
    })
  }, [])

  return (
    <>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="index"/>
      </Stack>
      <Menu user={user}/>
    </>
    
  );
}
