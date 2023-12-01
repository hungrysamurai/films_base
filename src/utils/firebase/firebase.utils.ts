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
  UserCredential,
  Auth,
  User,
  NextOrObserver,
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
import { MediaType } from "../../types";

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

export const auth: Auth = getAuth();

export const signInWithGoogglePopup = (): Promise<UserCredential> =>
  signInWithPopup(auth, googleProvider);

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const createUserDocumentFromAuth = async (
  userAuth: User,
  displayName?: string
) => {
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

export const updateUserPhoto = async (file: File) => {
  const fileName = new Date().getTime() + file.name;
  const storageRef = ref(storage, fileName);

  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = () => {
    const reduced = imageSizeReducer(reader.result as string, 500, 500);
    reduced.then((reducedImage) => {
      const uploadTask = uploadString(
        storageRef,
        reducedImage.slice(23),
        "base64"
      );

      uploadTask.then((prom) => {
        getDownloadURL(prom.ref).then((photoURL) => {
          updateProfile(auth.currentUser as User, {
            photoURL,
          });
        });
      });
    });
  };
};

export const updateUserLogin = async (newLogin: string) => {
  updateProfile(auth.currentUser as User, {
    displayName: newLogin,
  });
};

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

export const createNewUserList = async (title: string) => {
  const newList: UserList = {
    title,
    data: [],
  };

  const userListsRef = doc(db, "users", (auth.currentUser as User).uid);
  const userListsSnap: UserList[] = (await getDoc(userListsRef)).data()
    ?.userLists;

  if (userListsSnap.find((list) => list.title === newList.title)) {
    return;
  }

  await updateDoc(userListsRef, {
    userLists: arrayUnion(newList),
  });
};

export const removeUserList = async (listIndex: number) => {
  const userListsRef = doc(db, "users", (auth.currentUser as User).uid);
  const userListsSnap: UserList[] = (await getDoc(userListsRef)).data()
    ?.userLists;

  await setDoc(userListsRef, {
    userLists: userListsSnap.toSpliced(listIndex, 1),
  });
};

export const editUserListTitle = async (
  listIndex: number,
  newTitle: string
) => {
  const userListsRef = doc(db, "users", (auth.currentUser as User).uid);
  const userListsSnap: UserList[] = (await getDoc(userListsRef)).data()
    ?.userLists;

  const replace = { ...userListsSnap[listIndex], title: newTitle };

  await setDoc(userListsRef, {
    userLists: userListsSnap.toSpliced(listIndex, 1, replace),
  });
};

export const addToUserList = async (
  listIndex: number,
  id: string,
  mediaType: MediaType
) => {
  const userListsRef = doc(db, "users", (auth.currentUser as User).uid);
  const userListsSnap: UserList[] = (await getDoc(userListsRef)).data()
    ?.userLists;

  userListsSnap[listIndex].data.push({ mediaType, id });

  await setDoc(userListsRef, {
    userLists: userListsSnap,
  });
};

export const removeFromUserList = async (
  listIndex: number,
  id: string,
  mediaType: MediaType
) => {
  const userListsRef = doc(db, "users", (auth.currentUser as User).uid);
  const userListsSnap: UserList[] = (await getDoc(userListsRef)).data()
    ?.userLists;

  userListsSnap[listIndex].data = userListsSnap[listIndex].data.filter(
    (item) => {
      if (item.mediaType === mediaType && item.id === `${id}`) {
        return false;
      } else return true;
    }
  );

  await setDoc(userListsRef, {
    userLists: userListsSnap,
  });
};
