import CloseModalIcon from "./CloseModalIcon";
import ProfilePicPlaceholder from "../ProfilePicPlaceholder";

import { useEffect, useState } from "react";

import {
  updateUserPhoto,
  signOutUser,
} from "../../utils/firebase/firebase.utils";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";

const UserModal = ({ setShowModal }) => {
  const { currentUser } = useUserContext();
  const navigate = useNavigate();

  const hideModal = () => {
    setShowModal(() => false);
  };

  const navigateProfile = () => {
    setShowModal(() => false);
    navigate("/profile");
  };

  const changeUserName = () => {};

  const changeUserPic = (file) => {
    updateUserPhoto(file);
    navigate("/profile");
    setShowModal(() => false);
  };

  const logout = () => {
    setShowModal(() => false);
    navigate("/");
    signOutUser();
  };

  return (
    <div className="modal-wrapper-container">
      <button className="close-modal" onClick={hideModal}>
        <CloseModalIcon />
      </button>
      <div className="user-modal-inner">
        {currentUser.photoURL ? (
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
    </div>
  );
};

export default UserModal;
