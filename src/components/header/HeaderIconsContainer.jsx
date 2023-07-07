import { useGlobalContext } from "../../contexts/GlobalContext";
import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import { getTheme } from "../../utils/getTheme";

import { useEffect, useState } from "react";

const HeaderIconsContainer = () => {

  const { baseName, lang, dispatch } = useGlobalContext();
  const { currentUser } = useUserContext();

  const [theme, setTheme] = useState(() => getTheme());
  
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  },[theme])

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
    } else {
      dispatch({ type: "SET_LANG", payload: "ru" });
    }
  };

  return (
    <div className="header-icons-container">
      <Link to={currentUser ? 'profile' : 'auth'}>
        <img
          src={`${baseName}assets/images/icons/icon-user-${theme}.svg`}
          alt="user-profile"
        />
      </Link>

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
  );
};

export default HeaderIconsContainer;
