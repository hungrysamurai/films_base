import { ColorTheme, ModalMode } from '../../types';

import { Link } from 'react-router-dom';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { getCurrentUser } from '../../store/slices/authSlice.ts';
import { getCurrentLang, switchLang } from '../../store/slices/mainSlice.ts';
import { setHomePageCurrentPage } from '../../store/slices/homePageParamsSlice.ts';

import { getTheme } from '../../utils/getTheme';

import ProfilePicPlaceholder from './icons/ProfilePicPlaceholderIcon';
import Modal from '../modal/Modal.tsx';
import UserModal from '../modal/UserModal';
import AuthIcon from './icons/AuthIcon';
import ThemeDarkIcon from './icons/ThemeDarkIcon';
import ThemeLightIcon from './icons/ThemeLightIcon';
import LangEnIcon from './icons/LangEnIcon';
import LangRuIcon from './icons/LangRuIcon';

const HeaderIconsContainer = () => {
  const dispatch = useAppDispatch();
  const lang = useAppSelector(getCurrentLang);

  const currentUser = useAppSelector(getCurrentUser);

  const [showModal, setShowModal] = useState(false);
  const [theme, setTheme] = useState(() => getTheme());

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const hideModal = useCallback(() => {
    setShowModal(() => false);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) =>
      prevTheme === ColorTheme.Dark ? ColorTheme.Light : ColorTheme.Dark,
    );
  }, []);

  const handleLangSwitch = useCallback(() => {
    dispatch(switchLang());
    dispatch(setHomePageCurrentPage(1));
  }, [dispatch]);

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

        <a onClick={toggleTheme} className="theme-icons-container">
          <AnimatePresence>
            {theme === ColorTheme.Dark ? (
              <ThemeDarkIcon key="dark-mode-icon" />
            ) : (
              <ThemeLightIcon key="light-mode-icon" />
            )}
          </AnimatePresence>
        </a>

        <button onClick={handleLangSwitch}>
          {lang === 'en' ? <LangEnIcon /> : <LangRuIcon />}
        </button>
      </div>
    </>
  );
};

export default HeaderIconsContainer;
