import { useGlobalContext } from "../../contexts/GlobalContext";
import { useUserContext } from "../../contexts/UserContext";

import { Link } from "react-router-dom";

import { getTheme } from "../../utils/getTheme";

import { useEffect, useState } from "react";

import { AnimatePresence } from "framer-motion";

import ProfilePicPlaceholder from "../ProfilePicPlaceholder";
import Modal from "../modal/Modal";
import UserModal from "../modal/UserModal";

const HeaderIconsContainer = () => {
  const { baseName, lang, dispatch } = useGlobalContext();
  const { currentUser } = useUserContext();

  const [showModal, setShowModal] = useState(false);
  const [theme, setTheme] = useState(() => getTheme());

  const hideModal = () => {
    setShowModal(() => false);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme(() => "light");
    } else {
      setTheme("dark");
    }
  };

  const toggleLang = () => {
    if (lang === "ru") {
      dispatch({ type: "SET_LANG", payload: "en" });
      localStorage.setItem("FBlang", "en");
    } else {
      dispatch({ type: "SET_LANG", payload: "ru" });
      localStorage.setItem("FBlang", "ru");
    }
  };

  return (
    <>
      {/* User modal */}
      <AnimatePresence>
        {showModal && (
          <Modal 
          hideModal={hideModal} 
          mode="box" 
          modalState={showModal}>
            <UserModal 
            hideModal={hideModal} />
          </Modal>
        )}
      </AnimatePresence>

      <div className="header-icons-container">

        {/* If current user logged in - set icon */}
        {currentUser ? (
          <button onClick={() => setShowModal(() => true)}>

            {/* if user don't have custom icon - render placeholder, else - user photo */}
            {currentUser.photoURL ? (
              <div className="profile-pic-container">
                <img className="profile-pic" src={currentUser?.photoURL} />
              </div>
            ) : (
              <ProfilePicPlaceholder />
            )}
          </button>
        ) : (
          <Link to="auth">
            <img
              src={`${baseName}assets/images/icons/icon-user-${theme}.svg`}
              alt="user-profile"
            />
          </Link>
        )}

        <a href="#" onClick={toggleTheme}>
          <img
            src={`${baseName}assets/images/icons/icon-theme-${theme}.svg`}
            alt="switch-theme"
          />
        </a>

        <a href="#" onClick={toggleLang}>
          <img
            src={`${baseName}assets/images/icons/icon-lang-${lang}-${theme}.svg`}
            alt="language"
          />
        </a>
      </div>
    </>
  );
};

export default HeaderIconsContainer;
