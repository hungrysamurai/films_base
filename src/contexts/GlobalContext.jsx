import {
  useState,
  useContext,
  createContext,
  useEffect,
  useReducer,
} from "react";

import { initialState, mainReducer } from "../reducers/mainReducer";

import { useFetchGenres } from "../hooks/useFetchGenres";
import { useFetchMoviesList } from "../hooks/useFetchMoviesList";

import { getTheme } from "../utils/getTheme";
import { getBaseName } from "../utils/getBaseName";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const baseName = getBaseName();
  const [theme, setTheme] = useState(() => getTheme());
  const [currentTitle, setCurrentTitle] = useState("asas");

  const [moviesListState, dispatch] = useReducer(mainReducer, initialState);

  const {
    isLoading: genresFetchLoading,
    error: genresFetchError,
    data: genresFetchedList,
  } = useFetchGenres(moviesListState.mediaType, moviesListState.lang);

  const { isLoading: moviesFetchLoading, error: moviesFetchError } =
    useFetchMoviesList(
      moviesListState.mediaType,
      moviesListState.lang,
      moviesListState.filterList,
      moviesListState.filterGenre,
      moviesListState.page,
      dispatch
    );

  // Set color theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const {
    lang,
    mediaType,
    filterList,
    filterGenre,
    page,
    lastPage,
    moviesList,
    totalPages
  } = moviesListState;

  return (
    <AppContext.Provider
      value={{
        baseName,
        lang,
        theme,
        setTheme,
        genresFetchLoading,
        genresFetchError,
        genresFetchedList,
        moviesFetchError,
        moviesFetchLoading,
        mediaType,
        filterList,
        filterGenre,
        page,
        lastPage,
        totalPages,
        dispatch,
        moviesList,
        currentTitle,
        setCurrentTitle,
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
