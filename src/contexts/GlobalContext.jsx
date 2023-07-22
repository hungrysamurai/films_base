import PropTypes from 'prop-types'

import moviesListReducer from "../reducers/moviesListReducer";

import { getLang } from "../utils/getLang";

import { useState, useContext, createContext, useReducer } from "react";
import { useFetchMoviesList } from "../hooks/useFetchMoviesList";

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
  selectedMovie: ''
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
    selectedMovie
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
        selectedMovie
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

AppProvider.propTypes = {
  children: PropTypes.node
}

export { AppProvider };
