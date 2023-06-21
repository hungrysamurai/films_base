import { useState, useContext, createContext, useEffect, useCallback } from "react";

import { useFetch } from "../hooks/useFetch";

import { getTheme } from "../utils/getTheme";
import { getBaseName } from "../utils/getBaseName";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const baseName = getBaseName();

  const {fetchGenresList} = useFetch();

  const [theme, setTheme] = useState(() => getTheme());

  // API Params
  const [lang, setLang] = useState('ru');
  // Filters
  const [mediaType,setMediaType] = useState('movie');
  const [filterList, setFilterList] = useState("top_rated");
  const [filterGenre, setFilterGenre] = useState('all')

  const getGenresList = useCallback(async () => {

    const initialGenresList = await fetchGenresList(mediaType,lang);

    initialGenresList.unshift({id:'all', name: lang === 'ru' ? 'Все' : 'All'});
    return initialGenresList;

  },[lang, mediaType, fetchGenresList]);

  useEffect(() => {
    // console.log(import.meta.env);
    console.log(mediaType,filterList, filterGenre, lang);
  },[mediaType, filterGenre, filterList, lang])

  // When change lang or media type
  useEffect(() => {
    setFilterGenre('all');
    setFilterList("top_rated")
  },[lang, mediaType]);

  // Set color theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  },[theme]);

  return <AppContext.Provider value={{
    baseName,
    theme,
    setTheme,
    lang,
    setLang,
    mediaType,
    setMediaType,
    filterList,
    setFilterList,
    filterGenre,
    setFilterGenre,
    getGenresList
  }}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
