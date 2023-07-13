import ProfilePicPlaceholder from "../ProfilePicPlaceholder";

import useOutsideClick from '../../hooks/useOutsideClick';

import { useRef } from "react";

import {
  updateUserPhoto,
  signOutUser,
} from "../../utils/firebase/firebase.utils";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";

const UserModal = ({ hideModal }) => {
  const { currentUser } = useUserContext();
  const navigate = useNavigate();

  const modalInnerRef = useRef(null);
  useOutsideClick(modalInnerRef, hideModal);
  
  const navigateProfile = () => {
    hideModal();
    navigate("/profile");
  };

  const changeUserName = () => {};

  const changeUserPic = (file) => {
    updateUserPhoto(file);
    navigate("/profile");
    hideModal();
  };

  const logout = () => {
    hideModal();
    navigate("/");
    signOutUser();
  };

  return (
    <div className="user-modal-inner" ref={modalInnerRef}>
      {currentUser?.photoURL ? (
        <div className="profile-pic-container">
          <img className="profile-pic" src={currentUser?.photoURL} />
        </div>
      ) : (
        <ProfilePicPlaceholder />
      )}

      <h3>{currentUser?.displayName}</h3>
      <input
        type="file"
        id="file"
        onChange={(e) => changeUserPic(e.target.files[0])}
        hidden
      />
      <ul className="profile-actions-container">
        <li>
          <button onClick={navigateProfile}>Профиль</button>
        </li>
        <li>
          <button onClick={changeUserName}>Изменить логин</button>
        </li>
        <li>
          <label htmlFor="file">Изменить фото</label>
        </li>
        <li>
          <button onClick={logout}>Выйти</button>
        </li>
      </ul>
    </div>
  );
};

export default UserModal;
