import { useState, useContext, createContext, useEffect } from "react";

import { getTheme } from "../utils/getTheme";

import { movieLists, tvLists } from "../data/Lists";


const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => getTheme());
  const [lang, setLang] = useState('ru');

  // API params
  const [mediaType,setMediaType] = useState('movie');

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  },[theme])

  return <AppContext.Provider value={{
    theme,
    setTheme,
    lang,
    setLang,
    mediaType,
    setMediaType,
    movieLists, 
    tvLists
  }}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
