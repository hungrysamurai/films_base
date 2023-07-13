import { useEffect, useState } from "react";

import { useUserContext } from "../../../contexts/UserContext";

import { db } from "../../../utils/firebase/firebase.utils";
import {
  setDoc,
  getDoc,
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

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
      console.log('doc updated!',doc.data().userLists);
      setUserLists(doc.data().userLists);
    });
    return unsubscribe;
  }, [currentUser]);


  const addToUserList = async (listIndex) => {
    const userListsRef = doc(db, "users", currentUser.uid);
    const userListsSnap = (await getDoc(userListsRef)).data().userLists;

    userListsSnap[listIndex].data.push({mediaType, id})

    await setDoc(userListsRef, {
      userLists: userListsSnap,
    });
  } 

  const removeFromUserList = async (listIndex) => {
    const userListsRef = doc(db, "users", currentUser.uid);
    const userListsSnap = (await getDoc(userListsRef)).data().userLists;

    userListsSnap[listIndex].data = userListsSnap[listIndex].data.filter(item => item.id !== id);

    await setDoc(userListsRef, {
      userLists: userListsSnap,
    });
  }

  return (
    <>
      <AnimatePresence>
        {showModal && (
          <Modal mode="box" hideModal={hideModal}>
            <UserListsWidgetModal 
            hideModal={hideModal} 
            title={title}
            userLists={userLists}
            currentMovieData={{id, mediaType}}
            addToUserList={addToUserList}
            removeFromUserList={removeFromUserList}
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
