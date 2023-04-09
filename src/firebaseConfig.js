import { initializeApp } from "firebase/app";
import {getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCxxvMQOUeXnjjtQLhZ4K_4CZiCmMDlfHE",
  authDomain: "mushfiqin-52934.firebaseapp.com",
  projectId: "mushfiqin-52934",
  storageBucket: "mushfiqin-52934.appspot.com",
  messagingSenderId: "109659061560",
  appId: "1:109659061560:web:201586d20d5cf7fa9015cd"
};

const app = initializeApp(firebaseConfig);
const fireDb = getFirestore(app)

export {app, fireDb}