import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDfWPqXU76BjnuZvgkzyZ-Lk9QgIu5js3o",
    authDomain: "curso-524cd.firebaseapp.com",
    projectId: "curso-524cd",
    storageBucket: "curso-524cd.appspot.com",
    messagingSenderId: "10744257172",
    appId: "1:10744257172:web:f62fa1c505abb6f1eb7281",
    measurementId: "G-DEXSFTQYKS"
  };

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

export { db, auth }