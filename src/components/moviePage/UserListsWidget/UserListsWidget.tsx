import { Lang, MediaType, ModalMode } from '../../../types';

import { db } from '../../../utils/firebase/firebase.utils';
import { onSnapshot, doc } from 'firebase/firestore';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { AuthUser } from '../../../store/slices/authSlice';
import { useAppSelector } from '../../../store/hooks';
import { getCurrentUser } from '../../../store/slices/authSlice';
import { getCurrentLang } from '../../../store/slices/mainSlice';

import Modal from '../../modal/Modal';
import UserListsWidgetModal from '../../modal/UserListsWidgetModal';
import UserListIcon from '../../profilePage/icons/UserListIcon';

type UserListsWidgetProps = {
  id: string;
  mediaType: MediaType;
  title: string;
};

const UserListsWidget: React.FC<UserListsWidgetProps> = ({
  id,
  mediaType,
  title,
}) => {
  const currentUser = useAppSelector(getCurrentUser) as AuthUser;
  const lang = useAppSelector(getCurrentLang);

  const [showModal, setShowModal] = useState(false);
  const [userLists, setUserLists] = useState<UserList[]>([]);

  const hideModal = useCallback(() => {
    setShowModal(() => false);
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'users', currentUser.uid), (doc) => {
      setUserLists(doc.data()?.userLists);
    });
    return unsubscribe;
  }, [currentUser]);

  return (
    <>
      <AnimatePresence>
        {showModal && (
          <Modal mode={ModalMode.Box} hideModal={hideModal}>
            <UserListsWidgetModal
              hideModal={hideModal}
              title={title}
              userLists={userLists}
              currentMovieData={{ id, mediaType }}
            />
          </Modal>
        )}
      </AnimatePresence>

      <div
        className="add-to-user-list-container"
        onClick={() => setShowModal(() => true)}
      >
        <h3>{lang === Lang.En ? 'Add to list' : 'Добавить в список'}</h3>
        <UserListIcon />
      </div>
    </>
  );
};

export default UserListsWidget;
