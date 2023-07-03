// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzprVs3tA3oUsLUjr0k__RWuf5uGWt8nM",
  authDomain: "filmsbase-bea7b.firebaseapp.com",
  projectId: "filmsbase-bea7b",
  storageBucket: "filmsbase-bea7b.appspot.com",
  messagingSenderId: "350143607848",
  appId: "1:350143607848:web:8a1a9944e08d52a0cab11d",
  measurementId: "G-B08QMRKV1W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
