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
  searchQuery: ""
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const baseName = getBaseName();
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
      dispatch
    );


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
        // theme,
        // setTheme,
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
