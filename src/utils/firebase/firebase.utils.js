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
  updateProfile
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore'

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
  return await signInWithEmailAndPassword(auth, email, password);
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, displayName) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  // Check if user exist
  // If not exist - create
  if (!userSnapshot.exists()) {
    const { email } = userAuth;
    const createdAt = new Date();

    try {

      if (displayName) {
        await updateProfile(userAuth, {
          displayName
        });
      }

      await setDoc(userDocRef, {
        email,
        createdAt,
      });

    } catch (err) {
      console.log('createUserDocumentFromAuth error:');
      console.log(err);
    }
  }

  return userDocRef;
};

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

export const signOutUser = async () => await signOut(auth);