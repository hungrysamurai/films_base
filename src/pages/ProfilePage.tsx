import { ModalMode } from '../types.ts';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { db } from '../utils/firebase/firebase.utils';
import { onSnapshot, doc } from 'firebase/firestore';

import { useAppDispatch, useAppSelector } from '../store/hooks.ts';
import { AuthUser, getCurrentUser } from '../store/slices/authSlice.ts';
import { setMainTitle } from '../store/slices/mainSlice.ts';
import {
  getUserLists,
  getUserListsCurrentIndex,
  loadUserLists,
  updateUserLists,
} from '../store/slices/userListsSlice.ts';

import useListenWindowWidth from '../hooks/useListenWindowWidth';

import UserLists from '../components/profilePage/UserLists/UserLists';
import UserMoviesList from '../components/moviesList/UserMoviesList';
import Modal from '../components/modal/Modal.tsx';
import UserListIcon from '../components/profilePage/icons/UserListIcon';

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(getCurrentUser) as AuthUser;
  const userLists = useAppSelector(getUserLists);
  const currentListIndex = useAppSelector(getUserListsCurrentIndex);

  const [showModal, setShowModal] = useState(false);

  const currentWindowWidth = useListenWindowWidth();

  const mounted = useRef(false);

  useEffect(() => {
    dispatch(setMainTitle(currentUser.displayName as string));
  }, [currentUser]);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'users', currentUser.uid), (doc) => {
      if (!doc.data()) return;

      if (!mounted.current) {
        dispatch(loadUserLists(doc.data()?.userLists));

        mounted.current = true;
      } else {
        dispatch(updateUserLists(doc.data()?.userLists));
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
        {currentWindowWidth === 'desktop' ? (
          <>
            <UserLists
              userLists={userLists}
              currentListIndex={currentListIndex}
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
