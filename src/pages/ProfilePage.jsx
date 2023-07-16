import { useEffect, useReducer, useRef, useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import { useGlobalContext } from "../contexts/GlobalContext";

import userListsReducer from "../reducers/userListsReducer";

import { db } from "../utils/firebase/firebase.utils";
import { onSnapshot, doc } from "firebase/firestore";

import UserLists from "../components/profilePage/UserLists/UserLists";
import UserMoviesList from "../components/moviesList/UserMoviesList";

import Modal from "../components/modal/Modal";
import UserListIcon from "../components/profilePage/icons/UserListIcon";

import useListenWindowWidth from "../hooks/useListenWindowWidth";

import { AnimatePresence } from "framer-motion";

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

  const [showModal, setShowModal] = useState(false);

  const currentWindowWidth = useListenWindowWidth();

  const { userLists, currentListIndex } = userListsState;

  const mounted = useRef(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
      if (!doc.data()) return;

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

  const hideModal = () => {
    setShowModal(() => false);
  };

  return (
    <section className="section-profile">
      <div className="left-col">
        {currentWindowWidth === "desktop" ? (
          <>
            <UserLists
              userLists={userLists}
              currentListIndex={currentListIndex}
              dispatch={dispatch}
            />
          </>
        ) : (
          <>
            <div
              className="user-lists-modal-toggler"
              onClick={() => setShowModal(() => true)}
            >
              <UserListIcon />
              <h3>Мои списки</h3>
            </div>

            <AnimatePresence>
              {showModal && (
                <Modal hideModal={hideModal} mode="overlay">
                  <div className="user-lists-modal-inner">
                    <UserLists
                      userLists={userLists}
                      currentListIndex={currentListIndex}
                      dispatch={dispatch}
                      hideModal={hideModal}
                    />
                  </div>
                </Modal>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      <div className="right-col">
        <div className="user-movies-list-title">
          {userLists[currentListIndex] && (
            <h2>{userLists[currentListIndex]?.title}</h2>
          )}
        </div>
        {userLists[currentListIndex] && (
          <UserMoviesList
            currentUserList={userLists[currentListIndex].data}
            listIndex={currentListIndex}
          />
        )}
      </div>
    </section>
  );
};

export default ProfilePage;
