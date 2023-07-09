import { useEffect, useMemo, useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import { useGlobalContext } from "../contexts/GlobalContext";

import Modal from "../components/modal/Modal";

import { db } from "../utils/firebase/firebase.utils";
import { collection, getDocs, onSnapshot, doc } from "firebase/firestore";

import UserLists from "../components/profilePage/UserLists/UserLists";
import CustomMoviesList from "../components/moviesList/CustomMoviesList";

const ProfilePage = () => {
  const [userLists, setUserLists] = useState([]);
  const [currentListIndex, setCurrentListIndex] = useState("");
  const [currentListData, setCurrentListData] = useState([]);

  const { currentUser } = useUserContext();
  const { setCurrentTitle } = useGlobalContext();

  useEffect(() => {
    setCurrentTitle(currentUser.displayName);
  }, [currentUser, setCurrentTitle]);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
      const fetchedData = doc.data().userLists;

      setUserLists(() => fetchedData);
      setCurrentListIndex(() => fetchedData[0].id);
      setCurrentListData(() => fetchedData[0].data);
    });
    return unsubscribe;
  }, [currentUser]);

  useEffect(() => {
    setCurrentListData(() => {
      const targetList = userLists.find(
        (listObj) => listObj.id === currentListIndex
      );
      return targetList?.data;
    });
  }, [currentListIndex]);

  return (
    <section className="section-profile">
      <UserLists
        userLists={userLists}
        currentListIndex={currentListIndex}
        setCurrentListIndex={setCurrentListIndex}
      />

      <div className="user-movies-list-container">
        <div className="user-movies-list-title">
          <h2>Новый Год список🎅</h2>
        </div>
        <CustomMoviesList
          listMode="userList"
          currentUserList={currentListData}
        />
      </div>
    </section>
  );
};

export default ProfilePage;
