import ProfilePicPlaceholder from "../ProfilePicPlaceholder";

import useOutsideClick from "../../hooks/useOutsideClick";

import { useRef, useState } from "react";

import {
  updateUserPhoto,
  signOutUser,
  updateUserLogin,
} from "../../utils/firebase/firebase.utils";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";

import { AnimatePresence, motion } from "framer-motion";
import EditListSubmit from "../profilePage/icons/EditListSubmit";
import EditListCancel from "../profilePage/icons/EditListCancel";
import CustomInput from '../CustomInput'
import { useGlobalContext } from "../../contexts/GlobalContext";

const UserModal = ({ hideModal }) => {
  const { currentUser } = useUserContext();
  const { baseName, lang} = useGlobalContext();

  const navigate = useNavigate();

  const [newUserNameInputShow, setNewUserNameInputShow] = useState(false);

  const modalInnerRef = useRef(null);

  const navigateProfile = () => {
    hideModal();
    navigate(`${baseName}profile`);
  };


  const hideUserNameInput = () => {
    setNewUserNameInputShow(() => false);
  };

  const submitNewUserName = (inputValue) => {
    if (
      inputValue === "" ||
      inputValue.length < 3 ||
      inputValue.length > 100
    ) {
      return;
    }

    hideModal();
    updateUserLogin(inputValue);
  };

  const changeUserPic = (file) => {
    updateUserPhoto(file);
    navigate(`${baseName}profile`);
    hideModal();
  };

  const logout = () => {
    hideModal();
    navigate(baseName);
    signOutUser();
  };

  useOutsideClick(modalInnerRef, hideModal);

  return (
    <div className="user-modal-inner" ref={modalInnerRef}>
      {currentUser?.photoURL ? (
        <div className="profile-pic-container">
          <img className="profile-pic" src={currentUser?.photoURL} />
        </div>
      ) : (
        <ProfilePicPlaceholder />
      )}

      <AnimatePresence>
        <div className="user-name-container">
          {newUserNameInputShow
          ? <CustomInput
              initialValue={currentUser?.displayName}
              submit={submitNewUserName}
              hideCustomInput={hideUserNameInput}
              customClass={'user-name-input'}
          /> : (
            <motion.h3
              animate={{
                opacity: 1,
                y: 0,
              }}
              initial={{
                opacity:0,
                y: 50
              }}
              exit={{
                opacity: 0,
                y: -50,
              }}
            >
              {currentUser?.displayName}
            </motion.h3>
          )}
        </div>
      </AnimatePresence>

      <input
        type="file"
        id="file"
        onChange={(e) => changeUserPic(e.target.files[0])}
        hidden
      />
      <ul className="profile-actions-container">
        <li>
          <button onClick={navigateProfile}>
            {lang === 'en' ? 'Profile page' : 'Профиль'}
          </button>
        </li>
        <li>
          <button onClick={() => setNewUserNameInputShow(() => true)}>
             {lang === 'en' ? 'Change username' : 'Изменить логин'}
            </button>
        </li>
        <li>
          <label htmlFor="file">
            {lang === 'en' ? 'Change profile pic' : 'Изменить фото'}</label>
        </li>
        <li>
          <button onClick={logout}>
            {lang === 'en' ? 'Sign-Out' : 'Выйти'}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserModal;
