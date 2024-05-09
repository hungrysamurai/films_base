import { db } from "../utils/firebase/firebase.utils";
import { onSnapshot, doc } from "firebase/firestore";

import userListsReducer, {
  UserListReducerActionTypes,
} from "../reducers/userListsReducer";

import { useEffect, useReducer, useRef, useState } from "react";

import useListenWindowWidth from "../hooks/useListenWindowWidth";
import { AnimatePresence } from "framer-motion";

import UserLists from "../components/profilePage/UserLists/UserLists";
import UserMoviesList from "../components/moviesList/UserMoviesList";
import Modal from "../components/modal/Modal.tsx";
import UserListIcon from "../components/profilePage/icons/UserListIcon";

import { ModalMode } from "../types.ts";

import { useAppDispatch, useAppSelector } from "../store/hooks.ts";
import { AuthUser, getCurrentUser } from "../store/slices/authSlice.ts";
import { setMainTitle } from "../store/slices/mainSlice.ts";

const usersListsInitialState: UsersListsState = {
  userLists: [],
  currentListIndex: 0,
};

const ProfilePage: React.FC = () => {
  const currentUser = useAppSelector(getCurrentUser) as AuthUser;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setMainTitle(currentUser.displayName as string));
  }, [currentUser]);

  const [userListsState, cDispatch] = useReducer(
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
        cDispatch({
          type: UserListReducerActionTypes.LOAD_USER_LISTS,
          payload: doc.data()?.userLists,
        });
        mounted.current = true;
      } else {
        cDispatch({
          type: UserListReducerActionTypes.UPDATE_USER_LISTS,
          payload: doc.data()?.userLists,
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
                <Modal hideModal={hideModal} mode={ModalMode.Overlay}>
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
