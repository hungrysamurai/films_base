import { useState, useContext, createContext, useEffect } from "react";

import { getTheme } from "../utils/getTheme";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => getTheme());
  const [lang, setLang] = useState('ru')

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  },[theme])

  return <AppContext.Provider value={{
    theme,
    setTheme,
    lang,
    setLang
  }}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
