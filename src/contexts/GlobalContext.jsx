import { useState, useContext, createContext, useReducer } from "react";

import moviesListReducer from "../reducers/moviesListReducer";

import { useFetchMoviesList } from "../hooks/useFetchMoviesList";

import { getLang } from "../utils/getLang";

const initialState = {
  lang: getLang(),
  mediaType: "movie",
  filterList: "top_rated",
  filterGenre: "all",
  page: 1,
  totalPages: 0,
  moviesList: [],
  uniqueIds: [],
  moviesListMode: "home",
  searchQuery: "",
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const baseName = import.meta.env.BASE_URL;
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
