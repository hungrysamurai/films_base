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
  // const [currentMoviesListPage, setCurrentMoviesListPage] = useState(1);
  // & Filters
  const [mediaType, setMediaType] = useState("movie");
  const [filterList, setFilterList] = useState("popular");
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
    pageIndex: currentMoviesListPage,
    setPageIndex: setCurrentMoviesListPage,
    newMovies
  } = useFetchMoviesList(
    mediaType,
    lang,
    filterList,
    filterGenre
  );

  // When change lang or media type
  // useEffect(() => {
  //     console.log('media or lang changes:');
  //     setFilterGenre(() => 'all');
  //     setFilterList(() => "popular");
  //     setCurrentMoviesListPage(() => 1);
  //     console.log(filterGenre, filterList);
  // }, [mediaType, lang])

  useEffect(() => {
    console.log('first useEffect');
    setFilterGenre(() => 'all');
    setCurrentMoviesListPage(() => 1);
    
    setFilterList(() => "popular");
  }, [lang,setCurrentMoviesListPage]);

  useEffect(() => {
    console.log('second useEffect');
    setFilterGenre(() => 'all');
    setCurrentMoviesListPage(() => 1);
    
    setFilterList(() => "popular");
  }, [mediaType,setCurrentMoviesListPage]);

  useEffect(() => {
    console.log('third useEffect');
    setCurrentMoviesListPage(() => 1);
  }, [filterList,setCurrentMoviesListPage])

useEffect(() => {
  console.log('fourth useEffect');
    setCurrentMoviesListPage(() => 1);
},[filterGenre, setCurrentMoviesListPage])

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
        moviesFetchError,
        moviesFetchLoading,
        currentMoviesListPage,
        setCurrentMoviesListPage,
        newMovies
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider,useGlobalContext };
