import { useState, useContext, createContext, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";

import { getTheme } from "../utils/getTheme";

import { movieLists, tvLists } from "../data/Lists";


const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => getTheme());
  const [lang, setLang] = useState('ru');
  const [mediaType,setMediaType] = useState('movie');

  const {fetchGenresList} = useFetch();

  const getGenresList = () => {
    return fetchGenresList(mediaType,lang);
  }

  // Set color theme
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
    tvLists,
    getGenresList
  }}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
