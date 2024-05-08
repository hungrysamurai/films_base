import { db } from "../../../utils/firebase/firebase.utils";
import { onSnapshot, doc } from "firebase/firestore";

import { useEffect, useState } from "react";

import { useGlobalContext } from "../../../contexts/GlobalContext";
import { AnimatePresence } from "framer-motion";

import Modal from "../../modal/Modal";
import UserListsWidgetModal from "../../modal/UserListsWidgetModal";
import UserListIcon from "../../profilePage/icons/UserListIcon";
import { User } from "firebase/auth";
import { Lang, MediaType, ModalMode } from "../../../types";

import { useAppSelector } from "../../../store/hooks";
import { getCurrentUser } from "../../../store/slices/authSlice";

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
  const currentUser = useAppSelector(getCurrentUser);
  const { lang } = useGlobalContext();

  const [showModal, setShowModal] = useState(false);
  const [userLists, setUserLists] = useState<UserList[]>([]);

  const hideModal = () => {
    setShowModal(() => false);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "users", (currentUser as User).uid),
      (doc) => {
        setUserLists(doc.data()?.userLists);
      }
    );
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
        <h3>{lang === Lang.En ? "Add to list" : "Добавить в список"}</h3>
        <UserListIcon />
      </div>
    </>
  );
};

export default UserListsWidget;
