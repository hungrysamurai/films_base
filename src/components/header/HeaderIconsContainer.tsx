import { ColorTheme, Lang, ModalMode } from "../../types";

import { useGlobalContext } from "../../contexts/GlobalContext";

import { Link } from "react-router-dom";

import { getTheme } from "../../utils/getTheme";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import ProfilePicPlaceholder from "./icons/ProfilePicPlaceholderIcon";

import Modal from "../modal/Modal.tsx";
import UserModal from "../modal/UserModal";
import AuthIcon from "./icons/AuthIcon";
import ThemeDarkIcon from "./icons/ThemeDarkIcon";
import ThemeLightIcon from "./icons/ThemeLightIcon";
import LangEnIcon from "./icons/LangEnIcon";
import LangRuIcon from "./icons/LangRuIcon";
import { MoviesListReducerActionTypes } from "../../reducers/moviesListReducer";

import { useAppSelector } from "../../store/hooks.ts";
import { getCurrentUser } from "../../store/slices/authSlice.ts";

const HeaderIconsContainer = () => {
  const { lang, dispatch } = useGlobalContext();

  const currentUser = useAppSelector(getCurrentUser);

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
      setTheme(() => ColorTheme.Light);
    } else {
      setTheme(ColorTheme.Dark);
    }
  };

  const toggleLang = () => {
    if (lang === "ru") {
      dispatch({
        type: MoviesListReducerActionTypes.SET_LANG,
        payload: Lang.En,
      });
      localStorage.setItem("FBlang", "en");
    } else {
      dispatch({
        type: MoviesListReducerActionTypes.SET_LANG,
        payload: Lang.Ru,
      });
      localStorage.setItem("FBlang", "ru");
    }
  };

  return (
    <>
      {/* User modal */}
      <AnimatePresence>
        {showModal && (
          <Modal hideModal={hideModal} mode={ModalMode.Box}>
            <UserModal hideModal={hideModal} />
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
            <AuthIcon />
          </Link>
        )}

        <a href="#" onClick={toggleTheme} className="theme-icons-container">
          <AnimatePresence>
            {theme === ColorTheme.Dark ? (
              <ThemeDarkIcon key="dark-mode-icon" />
            ) : (
              <ThemeLightIcon key="light-mode-icon" />
            )}
          </AnimatePresence>
        </a>

        <button onClick={toggleLang}>
          {lang === "en" ? <LangEnIcon /> : <LangRuIcon />}
        </button>
      </div>
    </>
  );
};

export default HeaderIconsContainer;
