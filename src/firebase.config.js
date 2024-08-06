import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAmpOUvb6iHUkyHn0naUUhhsjEmbYNKWOw",
    authDomain: "ecom-poc-b61dd.firebaseapp.com",
    projectId: "ecom-poc-b61dd",
    storageBucket: "ecom-poc-b61dd.appspot.com",
    messagingSenderId: "85878371501",
    appId: "1:85878371501:web:1c1ca72fc25c5a462b0224"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app
