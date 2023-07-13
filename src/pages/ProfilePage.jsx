import { useEffect, useReducer, useRef } from "react";
import { useUserContext } from "../contexts/UserContext";
import { useGlobalContext } from "../contexts/GlobalContext";

import userListsReducer from "../reducers/userListsReducer";

import Modal from "../components/modal/Modal";

import { db } from "../utils/firebase/firebase.utils";
import {
  setDoc,
  getDoc,
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

import UserLists from "../components/profilePage/UserLists/UserLists";
import UserMoviesList from "../components/moviesList/UserMoviesList";

const usersListsInitialState = {
  userLists: [],
  currentListIndex: 0,
};

const ProfilePage = () => {
  const { currentUser } = useUserContext();
  const { setCurrentTitle } = useGlobalContext();

  useEffect(() => {
    setCurrentTitle(currentUser.displayName);
  }, [currentUser, setCurrentTitle]);

  const [userListsState, dispatch] = useReducer(
    userListsReducer,
    usersListsInitialState
  );

  const { userLists, currentListIndex } = userListsState;

  const mounted = useRef(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
      if(!doc.data()) return;

      if (!mounted.current) {
        dispatch({
          type: "LOAD_USER_LISTS",
          payload: doc.data().userLists,
        });
        mounted.current = true;
      } else {
        dispatch({
          type: "UPDATE_USER_LISTS",
          payload: doc.data().userLists,
        });
      }
    });
    return unsubscribe;
  }, [currentUser]);


  return (
    <section className="section-profile">
      <UserLists
        userLists={userLists}
        currentListIndex={currentListIndex}
        dispatch={dispatch}
      />

      <div className="user-movies-list-container">
        <div className="user-movies-list-title">
          {userLists[currentListIndex] && (
            <h2>{userLists[currentListIndex]?.title}</h2>
          )}
        </div>
        {userLists[currentListIndex] && (
          <UserMoviesList 
          currentUserList={userLists[currentListIndex].data} />
        )}
      </div>
    </section>
  );
};

export default ProfilePage;
