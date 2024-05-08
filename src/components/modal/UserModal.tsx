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
import { useGlobalContext } from "../../contexts/GlobalContext";
import { AnimatePresence, motion } from "framer-motion";

import ProfilePicPlaceholder from "../header/icons/ProfilePicPlaceholderIcon";
import CustomInput from "../CustomInput";
import getBaseURL from "../../utils/getBaseURL";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getCurrentUser,
  logout,
  updateUserDisplayName,
} from "../../store/slices/authSlice";

type UserModalProps = {
  hideModal: () => void;
};

const UserModal: React.FC<UserModalProps> = memo(({ hideModal }) => {
  const { lang } = useGlobalContext();

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(getCurrentUser);

  const navigate = useNavigate();

  const [newUserNameInputShow, setNewUserNameInputShow] = useState(false);

  const modalInnerRef = useRef<HTMLDivElement>(null);

  const navigateProfile = () => {
    hideModal();
    navigate(getBaseURL("profile"));
  };

  const hideUserNameInput = () => {
    setNewUserNameInputShow(() => false);
  };

  const submitNewUserName = (inputValue: string) => {
    if (inputValue === "" || inputValue.length < 3 || inputValue.length > 100) {
      return;
    }

    dispatch(updateUserDisplayName(inputValue));
    setNewUserNameInputShow(() => false);
    updateUserLogin(inputValue);
  };

  const changeUserPic = (file: File) => {
    updateUserPhoto(file);
    hideModal();
  };

  const logoutAndRemoveUserFromStore = () => {
    hideModal();
    dispatch(logout());
    navigate(getBaseURL());
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
          <button onClick={logoutAndRemoveUserFromStore}>
            {lang === Lang.En ? "Sign-Out" : "Выйти"}
          </button>
        </li>
      </ul>
    </div>
  );
});

export default UserModal;
