import { Stack } from "expo-router";

import "../global.css";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { FIREBASE_APP, FIREBASE_AUTH, firebaseConfig } from "@/FirebaseConfig";
import { firebase } from "@react-native-firebase/firestore";
import { initializeApp } from '@react-native-firebase/app';

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null)
  const app = FIREBASE_APP

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) =>{
      setUser(user)
    })
  }, [])

  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="index" />
      {user ?
        <Stack.Screen name="tos" />
       : 
        null
      }
    </Stack>
  );
}
