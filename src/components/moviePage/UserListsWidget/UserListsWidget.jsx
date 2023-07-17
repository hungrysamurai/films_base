import { useEffect, useState } from "react";

import { useUserContext } from "../../../contexts/UserContext";

import { db } from "../../../utils/firebase/firebase.utils";
import { onSnapshot, doc } from "firebase/firestore";

import Modal from "../../modal/Modal";
import UserListsWidgetModal from "../../modal/UserListsWidgetModal";

import UserListIcon from "../../profilePage/icons/UserListIcon";
import { AnimatePresence } from "framer-motion";

const UserListsWidget = ({ id, mediaType, title }) => {
  const { currentUser } = useUserContext();
  const [showModal, setShowModal] = useState(false);
  const [userLists, setUserLists] = useState([]);

  const hideModal = () => {
    setShowModal(() => false);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
      setUserLists(doc.data().userLists);
    });
    return unsubscribe;
  }, [currentUser]);

  return (
    <>
      <AnimatePresence>
        {showModal && (
          <Modal mode="box" hideModal={hideModal} modalState={showModal}>
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
        <h3>Добавить в список</h3>
        <UserListIcon />
      </div>
    </>
  );
};

export default UserListsWidget;
