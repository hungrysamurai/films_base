import { ColorTheme, ModalMode } from "../../types";

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

import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { getCurrentUser } from "../../store/slices/authSlice.ts";
import { getCurrentLang, switchLang } from "../../store/slices/mainSlice.ts";

const HeaderIconsContainer = () => {
  const dispatch = useAppDispatch();
  const lang = useAppSelector(getCurrentLang);

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
    if (theme === ColorTheme.Dark) {
      setTheme(() => ColorTheme.Light);
    } else {
      setTheme(ColorTheme.Dark);
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

        <button onClick={() => dispatch(switchLang())}>
          {lang === "en" ? <LangEnIcon /> : <LangRuIcon />}
        </button>
      </div>
    </>
  );
};

export default HeaderIconsContainer;
