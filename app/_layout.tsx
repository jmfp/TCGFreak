import { Stack } from "expo-router";

import "../global.css";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { FIREBASE_APP, FIREBASE_AUTH, firebaseConfig } from "@/FirebaseConfig";
import SetCards from "./setCards";

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
      <Stack.Screen name="setCards" />
      {user ?
        <Stack.Screen name="tos" />
       : 
        null
      }
    </Stack>
  );
}
