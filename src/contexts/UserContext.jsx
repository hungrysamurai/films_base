import { createContext, useReducer, useContext, useEffect } from "react";

import { 
  onAuthStateChangedListener,
  createUserDocumentFromAuth 
} from "../utils/firebase/firebase.utils";

import { updateProfile } from "firebase/auth";

import userReducer from '../reducers/userReducer'

const initialUserState = {
 currentUser: null
}

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(userReducer, initialUserState);

  const { currentUser } = userState;

  useEffect(() => {
     const unsubscribe =  onAuthStateChangedListener((user) => {
      if(user){
         createUserDocumentFromAuth(user);
      }
      dispatch({type: 'LOGIN', payload: user});
     })
     
     return unsubscribe;
  },[])


  return <UserContext.Provider value={{currentUser, dispatch}}>{children}</UserContext.Provider>;
  
};

export const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider }