import { User } from "firebase/auth";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

import { createContext, useReducer, useContext, useEffect } from "react";

import userReducer, { UserReducerActionTypes } from "../reducers/userReducer";

const initialUserState = {
  currentUser: null,
};

const UserContext = createContext<IUserContext>({
  currentUser: null,
  dispatch: () => {},
});

const UserProvider = ({ children }: ReactChildrenType) => {
  const [userState, dispatch] = useReducer(userReducer, initialUserState);

  const { currentUser } = userState;

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch({ type: UserReducerActionTypes.LOGIN, payload: user as User });
    });

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider };
