import {
  useState,
  useContext,
  createContext,
  useEffect,
  useCallback,
} from "react";

import { useFetchGenres } from "../hooks/useFetchGenres";
import { useFetchMoviesList } from "../hooks/useFetchMoviesList";

import { getTheme } from "../utils/getTheme";
import { getBaseName } from "../utils/getBaseName";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const baseName = getBaseName();
  const [theme, setTheme] = useState(() => getTheme());

  // API Params
  const [lang, setLang] = useState("ru");
  const [currentMoviesListPage, setCurrentMoviesListPage] = useState(1);
  // & Filters
  const [mediaType, setMediaType] = useState("movie");
  const [filterList, setFilterList] = useState("top_rated");
  const [filterGenre, setFilterGenre] = useState("all");

  const {
    isLoading: genresFetchLoading,
    error: genresFetchError,
    data: genresFetchedList,
  } = useFetchGenres(mediaType, lang);

  const {
    isLoading: moviesFetchLoading,
    error: moviesFetchError,
    data: moviesFetchedList,
  } = useFetchMoviesList(
    mediaType,
    lang,
    filterList,
    filterGenre,
    currentMoviesListPage
  );

  const resetGenresAndFilters = useCallback(() => {
    setFilterGenre("all");
    setFilterList("top_rated");
  }, []);

  // When change lang or media type
  useEffect(() => {
    resetGenresAndFilters();
  }, [lang, mediaType, resetGenresAndFilters]);

  useEffect(() => {
    setCurrentMoviesListPage(1);
  }, [lang, mediaType, filterGenre, filterList]);

  // Set color theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <AppContext.Provider
      value={{
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
        genresFetchLoading,
        genresFetchError,
        genresFetchedList,
        moviesFetchedList,
        currentMoviesListPage,
        setCurrentMoviesListPage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
