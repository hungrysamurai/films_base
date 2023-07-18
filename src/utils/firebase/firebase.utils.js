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
  updateProfile,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

import {
  getStorage,
  ref,
  getDownloadURL,
  uploadString,
} from "firebase/storage";

import { imageSizeReducer } from "../imageSizeReducer";

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
export const db = getFirestore();
export const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGoogglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const createUserDocumentFromAuth = async (userAuth, displayName) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  // Check if user exist
  // If not exist - create
  if (!userSnapshot.exists()) {
    try {
      if (displayName) {
        await updateProfile(userAuth, {
          displayName,
        });
      }

      await setDoc(userDocRef, {
        userLists: [
          {
            title: "Посмотреть позже...",
            data: [],
          },
        ],
      });
    } catch (err) {
      console.log("createUserDocumentFromAuth error:");
      console.log(err);
    }
  }
  return userDocRef;
};

export const signOutUser = async () => await signOut(auth);

export const updateUserPhoto = async (file) => {
  const fileName = new Date().getTime() + file.name;
  const storageRef = ref(storage, fileName);

  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = (e) => {
    const reduced = imageSizeReducer(e.target.result, 500, 500);
    reduced.then((reducedImage) => {
      const uploadTask = uploadString(
        storageRef,
        reducedImage.slice(23),
        "base64"
      );

      uploadTask.then((prom) => {
        getDownloadURL(prom.ref).then((photoURL) => {
          updateProfile(auth.currentUser, {
            photoURL,
          });
        });
      });
    });
  };
};

export const updateUserLogin = async (newLogin) => {
  updateProfile(auth.currentUser, {
    displayName: newLogin,
  });
};

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const createNewUserList = async (title) => {
  const newList = {
    title,
    data: [],
  };

  const userListsRef = doc(db, "users", auth.currentUser.uid);
  const userListsSnap = (await getDoc(userListsRef)).data().userLists;

  if (userListsSnap.find((list) => list.title === newList.title)) {
    return;
  }

  await updateDoc(userListsRef, {
    userLists: arrayUnion(newList),
  });
};

export const removeUserList = async (listIndex) => {
  const userListsRef = doc(db, "users", auth.currentUser.uid);
  const userListsSnap = (await getDoc(userListsRef)).data().userLists;

  await setDoc(userListsRef, {
    userLists: userListsSnap.toSpliced(listIndex, 1),
  });
};

export const editUserListTitle = async (listIndex, newTitle) => {
  const userListsRef = doc(db, "users", auth.currentUser.uid);
  const userListsSnap = (await getDoc(userListsRef)).data().userLists;

  const replace = { ...userListsSnap[listIndex], title: newTitle };

  await setDoc(userListsRef, {
    userLists: userListsSnap.toSpliced(listIndex, 1, replace),
  });
};

export const addToUserList = async (listIndex, id, mediaType) => {
  const userListsRef = doc(db, "users", auth.currentUser.uid);
  const userListsSnap = (await getDoc(userListsRef)).data().userLists;

  userListsSnap[listIndex].data.push({ mediaType, id });

  await setDoc(userListsRef, {
    userLists: userListsSnap,
  });
};

export const removeFromUserList = async (listIndex, id, mediaType) => {
  console.log(listIndex, id, mediaType);
  const userListsRef = doc(db, "users", auth.currentUser.uid);
  const userListsSnap = (await getDoc(userListsRef)).data().userLists;

  userListsSnap[listIndex].data = userListsSnap[listIndex].data.filter(
    (item) => {
      if (item.mediaType === mediaType && item.id === `${id}`) {
        return false;
      } else return true;
    }
  );

  console.log(userListsSnap);

  await setDoc(userListsRef, {
    userLists: userListsSnap,
  });
};
