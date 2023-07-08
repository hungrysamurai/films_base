import { useEffect, useMemo } from "react";
import { useUserContext } from "../contexts/UserContext";
import { useGlobalContext } from "../contexts/GlobalContext";

import Modal from "../components/modal/Modal";

import UserLists from "../components/profilePage/UserLists/UserLists";
import CustomMoviesList from "../components/moviesList/CustomMoviesList";

const ProfilePage = () => {
  const tempData = useMemo(() => {
    return [
      { id: 238, mediaType: "movie" },
      { id: 129, mediaType: "movie" },
      { id: 155, mediaType: "movie" },
      { id: 94605, mediaType: "tv" },
      { id: 772071, mediaType: "movie" },
      { id: 39102, mediaType: "movie" },
    ];
  }, []);

  const { currentUser } = useUserContext();
  const { setCurrentTitle } = useGlobalContext();

  useEffect(() => {
    setCurrentTitle(currentUser.displayName);
  }, [currentUser, setCurrentTitle]);

  return (
    <section className="section-profile">
      {/* <Modal>
        <div>this is modal</div>
      </Modal> */}

      {/* <span onClick={signOutUser}>SIGN OUT</span> */}
      <UserLists />

      <div className="user-movies-list-container">
        <div className="user-movies-list-title">
          <h2>Новый Год список🎅</h2>
        </div>
        <CustomMoviesList listMode="userList" currentUserList={tempData} />
      </div>
    </section>
  );
};

export default ProfilePage;
