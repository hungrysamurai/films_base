import {
  useState,
  useContext,
  createContext,
  useEffect,
  useReducer,
} from "react";

import { initialState, moviesListReducer } from "../reducers/moviesListReducer";

import { useFetchMoviesList } from "../hooks/useFetchMoviesList";

import { getTheme } from "../utils/getTheme";
import { getBaseName } from "../utils/getBaseName";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const baseName = getBaseName();
  const [theme, setTheme] = useState(() => getTheme());
  const [currentTitle, setCurrentTitle] = useState("");

  const [moviesListState, dispatch] = useReducer(
    moviesListReducer,
    initialState
  );

  const { isLoading: moviesFetchLoading, error: moviesFetchError } =
    useFetchMoviesList(
      moviesListState.mediaType,
      moviesListState.lang,
      moviesListState.filterList,
      moviesListState.filterGenre,
      moviesListState.page,
      moviesListState.searchQuery,
      moviesListState.moviesListMode,
      moviesListState.currentUserList,
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
    moviesList,
    totalPages,
    searchQuery,
    moviesListMode,
  } = moviesListState;

  return (
    <AppContext.Provider
      value={{
        baseName,
        lang,
        theme,
        setTheme,
        moviesFetchError,
        moviesFetchLoading,
        mediaType,
        filterList,
        filterGenre,
        page,
        totalPages,
        searchQuery,
        moviesListMode,
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
