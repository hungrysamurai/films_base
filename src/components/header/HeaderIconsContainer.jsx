import { useGlobalContext } from "../../contexts/GlobalContext";
import { useUserContext } from "../../contexts/UserContext";

import { Link } from "react-router-dom";

import { getTheme } from "../../utils/getTheme";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import ProfilePicPlaceholder from "./icons/ProfilePicPlaceholderIcon";

import Modal from "../modal/Modal";
import UserModal from "../modal/UserModal";
import AuthIcon from "./icons/AuthIcon";
import ThemeDarkIcon from "./icons/ThemeDarkIcon";
import ThemeLightIcon from "./icons/ThemeLightIcon";
import LangEnIcon from "./icons/LangEnIcon";
import LangRuIcon from "./icons/LangRuIcon";

const HeaderIconsContainer = () => {
  const { lang, dispatch } = useGlobalContext();
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
          mode="box">
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
            <AuthIcon/>
          </Link>
        )}
  
        <a href="#" onClick={toggleTheme} className="theme-icons-container">
            <AnimatePresence>
              {theme === 'dark' ? 
              <ThemeDarkIcon key='dark-mode-icon' /> : 
              <ThemeLightIcon key='light-mode-icon' />
              }
            </AnimatePresence>
        </a>

        <button href="#" onClick={toggleLang}>
          {lang === 'en' ? 
          <LangEnIcon/> : 
          <LangRuIcon/>
          }
          {/* <img
            src={`${baseName}assets/images/icons/icon-lang-${lang}-${theme}.svg`}
            alt="language"
          /> */}
        </button>
      </div>
    </>
  );
};

export default HeaderIconsContainer;
