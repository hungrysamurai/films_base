import PropTypes from 'prop-types';

import { db } from "../../../utils/firebase/firebase.utils";
import { onSnapshot, doc } from "firebase/firestore";

import { useEffect, useState } from "react";
import { useUserContext } from "../../../contexts/UserContext";
import { useGlobalContext } from "../../../contexts/GlobalContext";
import { AnimatePresence } from "framer-motion";

import Modal from "../../modal/Modal";
import UserListsWidgetModal from "../../modal/UserListsWidgetModal";
import UserListIcon from "../../profilePage/icons/UserListIcon";

const UserListsWidget = ({ id, mediaType, title }) => {
  const { currentUser } = useUserContext();
  const { lang } = useGlobalContext();

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
          <Modal mode="box" hideModal={hideModal}>
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
        <h3>{lang === "en" ? "Add to list" : "Добавить в список"}</h3>
        <UserListIcon />
      </div>
    </>
  );
};

UserListsWidget.propTypes = {
  id: PropTypes.string, 
  mediaType: PropTypes.string,
  title: PropTypes.string
}

export default UserListsWidget;
