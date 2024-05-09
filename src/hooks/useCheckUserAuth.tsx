import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getCurrentUser, login } from "../store/slices/authSlice";

import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "../utils/firebase/firebase.utils";

function useCheckUserAuth() {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(getCurrentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        dispatch(
          login({
            uid: user.uid,
            email: user.email || undefined,
            displayName: user.displayName || null,
            photoURL: user.photoURL || undefined,
          })
        );

        createUserDocumentFromAuth(user);
      }
    });

    return unsubscribe;
  }, []);

  return { currentUser };
}

export default useCheckUserAuth;
