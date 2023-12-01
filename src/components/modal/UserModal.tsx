import { ChangeEvent, MutableRefObject } from "react";
import { Lang } from "../../types";

import {
  updateUserPhoto,
  signOutUser,
  updateUserLogin,
} from "../../utils/firebase/firebase.utils";

import useOutsideClick from "../../hooks/useOutsideClick";
import { useRef, useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { AnimatePresence, motion } from "framer-motion";

import ProfilePicPlaceholder from "../header/icons/ProfilePicPlaceholderIcon";
import CustomInput from "../CustomInput";

type UserModalProps = {
  hideModal: () => void;
};

const UserModal: React.FC<UserModalProps> = memo(({ hideModal }) => {
  const { currentUser } = useUserContext();
  const { baseName, lang } = useGlobalContext();

  const navigate = useNavigate();

  const [newUserNameInputShow, setNewUserNameInputShow] = useState(false);

  const modalInnerRef = useRef<HTMLDivElement>(null);

  const navigateProfile = () => {
    hideModal();
    navigate(`${baseName}profile`);
  };

  const hideUserNameInput = () => {
    setNewUserNameInputShow(() => false);
  };

  const submitNewUserName = (inputValue: string) => {
    if (inputValue === "" || inputValue.length < 3 || inputValue.length > 100) {
      return;
    }

    hideModal();
    updateUserLogin(inputValue);
  };

  const changeUserPic = (file: File) => {
    updateUserPhoto(file);
    hideModal();
  };

  const logout = () => {
    hideModal();
    navigate(baseName);
    signOutUser();
  };

  useOutsideClick(modalInnerRef as MutableRefObject<HTMLDivElement>, hideModal);

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
          {newUserNameInputShow ? (
            <CustomInput
              initialValue={currentUser?.displayName as string}
              submit={submitNewUserName}
              hideCustomInput={hideUserNameInput}
              customClass={"user-name-input"}
            />
          ) : (
            <motion.h3
              animate={{
                opacity: 1,
              }}
              initial={{
                opacity: 0,
              }}
              exit={{
                opacity: 0,
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
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          if (e.target.files) {
            changeUserPic(e.target.files[0]);
          }
        }}
        hidden
      />
      <ul className="profile-actions-container">
        <li>
          <button onClick={navigateProfile}>
            {lang === Lang.En ? "Profile page" : "Профиль"}
          </button>
        </li>
        <li>
          <button onClick={() => setNewUserNameInputShow(() => true)}>
            {lang === Lang.En ? "Change username" : "Изменить логин"}
          </button>
        </li>
        <li>
          <label htmlFor="file">
            {lang === Lang.En ? "Change profile pic" : "Изменить фото"}
          </label>
        </li>
        <li>
          <button onClick={logout}>
            {lang === Lang.En ? "Sign-Out" : "Выйти"}
          </button>
        </li>
      </ul>
    </div>
  );
});

export default UserModal;
