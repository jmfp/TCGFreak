// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCmKlkJ9Ne2Z0Oj_P5rt3AG0hYomkeGvaU",
  authDomain: "devwurk.firebaseapp.com",
  projectId: "devwurk",
  storageBucket: "devwurk.firebasestorage.app",
  messagingSenderId: "871117396527",
  appId: "1:871117396527:web:63352de70c7385bbf844da",
  measurementId: "G-BY8H426L6X"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
//export const analytics = getAnalytics(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
export const FIREBASE_STORE = getFirestore(FIREBASE_APP)