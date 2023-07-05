import {
  useState,
  useContext,
  createContext,
  useEffect,
  useReducer,
} from "react";

import moviesListReducer from "../reducers/moviesListReducer";

import { useFetchMoviesList } from "../hooks/useFetchMoviesList";

import { getTheme } from "../utils/getTheme";
import { getBaseName } from "../utils/getBaseName";

const initialState = {
  lang: "en",
  mediaType: "movie",
  filterList: "top_rated",
  filterGenre: "all",
  page: 1,
  totalPages: 0,
  moviesList: [],
  uniqueIds: [],
  moviesListMode: "home",
  searchQuery: "",
  currentUserList: [
    { id: 6321321321321, mediaType: 'movie' },
    { id: 129, mediaType: 'movie' },
    { id: 155, mediaType: 'movie' },
    { id: 94605, mediaType: 'tv' },
    { id: 772071, mediaType: 'movie' },
    { id: 39102, mediaType: 'movie' }
  ],
};

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
