import ProfilePicPlaceholder from "../ProfilePicPlaceholder";

import useOutsideClick from '../../hooks/useOutsideClick';

import { useRef, useState } from "react";

import {
  updateUserPhoto,
  signOutUser,
  updateUserLogin
} from "../../utils/firebase/firebase.utils";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";

import { AnimatePresence, motion } from "framer-motion";
import EditListSubmit from "../profilePage/icons/EditListSubmit";
import EditListCancel from "../profilePage/icons/EditListCancel";

const UserModal = ({ hideModal }) => {
  const { currentUser } = useUserContext();
  const navigate = useNavigate();

  const [newUserNameInput, setNewUserNameInput] = useState({
    show: false,
    value: currentUser?.displayName
  });

  const newUserNameFormRef = useRef(null);
  const modalInnerRef = useRef(null);
 
  
  const navigateProfile = () => {
    hideModal();
    navigate("/profile");
  };

  const showUserNameInput = () => {
    setNewUserNameInput((prev) => {
      return {
        ...prev,
        show: true
      }
    });
  };

  const hideUserNameInput = () => {
    setNewUserNameInput(() => {
      return {
        value: currentUser.displayName,
        show: false
      }
    });
  }

  const submitNewUserName = (e) => {
    e.preventDefault();

     const newUserName = newUserNameInput.value;

    if (newUserName === '' || newUserName.length < 3 || newUserName.length > 100){
      return;
    }

    hideModal()
    updateUserLogin(newUserName)
  } 

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

  useOutsideClick(newUserNameFormRef, hideUserNameInput);
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

        {newUserNameInput.show ? 
          <motion.div 
          className="new-user-input-container"
          initial={{
            opacity:0,
            y:-50
          }}
          animate={{
            opacity:1,
            y:0
          }}
          exit={{
            opacity: 0,
            y: 50
          }}>
            <form 
            onSubmit={submitNewUserName}
            ref={newUserNameFormRef}>
              <input 
                type='text' 
                value={newUserNameInput.value} 
                onChange={(e) => setNewUserNameInput((prev) => ({...prev, value: e.target.value}))} 
                autoFocus/>

                <div className="input-buttons-container">
                  <button 
                  className="submit-button" 
                  type='submit'>
                    <EditListSubmit/>
                  </button>
                  <button 
                  className="cancel-button" 
                  type='button'
                  onClick={hideUserNameInput}>
                    <EditListCancel/>
                  </button>
                </div>
            </form>
          </motion.div> : 
          <motion.h3
          initial={{
            opacity:0,
            y:50
          }}
          animate={{
            opacity:1,
            y:0
          }}
          exit={{
            opacity: 0,
            y: -50
          }}
          >{currentUser?.displayName}
          </motion.h3>}

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
          <button onClick={navigateProfile}>Профиль</button>
        </li>
        <li>
          <button onClick={showUserNameInput}>Изменить логин</button>
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
