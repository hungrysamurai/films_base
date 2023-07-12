import { useEffect, useReducer, useRef } from "react";
import { useUserContext } from "../contexts/UserContext";
import { useGlobalContext } from "../contexts/GlobalContext";

import Modal from "../components/modal/Modal";

import { db } from "../utils/firebase/firebase.utils";
import { setDoc, getDoc, onSnapshot, doc, updateDoc, arrayUnion } from "firebase/firestore";

import { nanoid } from "nanoid";

import UserLists from "../components/profilePage/UserLists/UserLists";
import CustomMoviesList from "../components/moviesList/CustomMoviesList";

const usersListsInitialState = {
  userLists: [],
  currentListIndex: 0
}

const userListsReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_USER_LISTS':
      return {
        ...state,
        userLists: action.payload,
     }
    case 'UPDATE_USER_LIST':{
      const oldIndex = state.currentListIndex;
      const oldLength = state.userLists.length;
      let newIndex;

      if (action.payload.length > oldLength || 
        action.payload.length === oldLength) {
        newIndex = oldIndex;
      } else {
        if (oldIndex - 1 <= 0){
          newIndex = 0;
        } else {
          newIndex = oldIndex - 1;
        }
      }
      return {
        currentListIndex: newIndex,
        userLists: action.payload,
      }
    }
    case 'SET_CURRENT_LIST_INDEX': 
      return {
        ...state,
        currentListIndex: action.payload
      }
    default: 
      return state;
  }
}

const ProfilePage = () => {
  const { currentUser } = useUserContext();
  const { setCurrentTitle } = useGlobalContext();

  useEffect(() => {
    setCurrentTitle(currentUser.displayName);
  }, [currentUser, setCurrentTitle]);

  const [userListsState, dispatch] = useReducer(userListsReducer, usersListsInitialState)

  const { userLists, currentListIndex } = userListsState;
  
  const mounted = useRef(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {

      if (!mounted.current){
        dispatch({ 
          type:'LOAD_USER_LISTS',
          payload: doc.data().userLists 
        })
        mounted.current = true;
      } else {
        dispatch({
        type: 'UPDATE_USER_LIST', 
        payload:doc.data().userLists 
      })
      }
    });
    return unsubscribe;
  }, [currentUser]);

  const createNewUserList = async (title) => {
  const newList = {
      title,
      data: []
    }

  const userListsRef = doc(db, 'users', currentUser.uid);
  const userListsSnap = (await getDoc(userListsRef)).data().userLists;

  if(userListsSnap.find(list => list.title === newList.title)){
    return;
  }

  await updateDoc(userListsRef, {
    userLists: arrayUnion(newList)
   });
  }

  const deleteUserList = async (listIndex) => {

  const userListsRef = doc(db, 'users', currentUser.uid);
  const userListsSnap = (await getDoc(userListsRef)).data().userLists;

  await setDoc(userListsRef, {
      userLists: userListsSnap.toSpliced(listIndex, 1)
    });
  }

  const editUserListTitle = async (listIndex, newTitle) => {
    console.log(listIndex, newTitle);

    const userListsRef = doc(db, 'users', currentUser.uid);
    const userListsSnap = (await getDoc(userListsRef)).data().userLists;

    const replace = {...userListsSnap[listIndex], title: newTitle};

    // console.log(replace);
    // console.log(userListsSnap.toSpliced(listIndex, 1, replace));

    await setDoc(userListsRef, {
      userLists: userListsSnap.toSpliced(listIndex, 1, replace)
    });
  }

  const deleteUserListItem = async () => {
    console.log(currentListIndex);
  }

  return (
    <section className="section-profile">
      <UserLists
        userLists={userLists}
        currentListIndex={currentListIndex}
        dispatch={dispatch}
        createNewUserList={createNewUserList}
        deleteUserList={deleteUserList}
        editUserListTitle={editUserListTitle}
      />

      <div className="user-movies-list-container">
        <div className="user-movies-list-title">

          {
          userLists[currentListIndex] &&
          <h2>{userLists[currentListIndex]?.title}</h2> 
          }
          
        </div>
        {
          userLists[currentListIndex] &&
        <CustomMoviesList
          listMode="userList"
          currentUserList={userLists[currentListIndex].data}
        />
        }
       
      </div>
    </section>
  );
};

export default ProfilePage;
