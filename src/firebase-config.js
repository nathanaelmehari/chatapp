
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore' 
const firebaseConfig = {
  apiKey: "AIzaSyCU-aSypAemb0Tg3JR5eGGI-JSBw-u5vEM",
  authDomain: "secret-b9c00.firebaseapp.com",
  projectId: "secret-b9c00",
  storageBucket: "secret-b9c00.appspot.com",
  messagingSenderId: "3260901662",
  appId: "1:3260901662:web:1e6366f884b52db7d8010f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)