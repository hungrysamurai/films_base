// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "filmsbase-bea7b.firebaseapp.com",
  projectId: "filmsbase-bea7b",
  storageBucket: "filmsbase-bea7b.appspot.com",
  messagingSenderId: "350143607848",
  appId: "1:350143607848:web:8a1a9944e08d52a0cab11d",
  measurementId: "G-B08QMRKV1W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();

export const signInWithGoogglePopup = () => signInWithPopup(auth, googleProvider);

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInfo) => {
  if (!userAuth) return;


  const userDocRef = doc(db, "users", userAuth.uid);


  console.log(userDocRef);


  const userSnapshot = await getDoc(userDocRef);
  // Check if user exist
  // If not exist - create
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();


    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (e) {
      console.log(e);
    }
  }

  // return user ref
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  //…если нет почты и пароля - не делать ничего

  return await createUserWithEmailAndPassword(auth, email, password);//помимо почты-пароля передаём в функцию текущий auth
};


export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

export const signOutUser = async () => await signOut(auth);