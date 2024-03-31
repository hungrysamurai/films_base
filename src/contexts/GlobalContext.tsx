import { MediaType, MovieFilterListTerm, Lang, MoviesListMode } from "../types";

import moviesListReducer from "../reducers/moviesListReducer";

import { getLang } from "../utils/getLang";

import { useState, useContext, createContext, useReducer } from "react";
import { useFetchMoviesList } from "../hooks/useFetchMoviesList";

const initialState: MoviesListState = {
  lang: getLang(),
  mediaType: MediaType.Movie,
  filterList: MovieFilterListTerm.TopRated,
  filterGenre: "",
  page: 1,
  totalPages: 0,
  moviesList: [],
  uniqueIds: [],
  moviesListMode: MoviesListMode.Home,
  searchQuery: "",
  selectedMovie: "",
};

const AppContext = createContext<IGlobalContext>({
  baseName: "",
  currentTitle: "",
  dispatch: () => {},
  filterGenre: "",
  filterList: MovieFilterListTerm.Upcoming,
  lang: Lang.Ru,
  mediaType: MediaType.Movie,
  moviesFetchError: {
    message: "",
    show: false,
  },
  moviesFetchLoading: false,
  moviesList: [],
  moviesListMode: MoviesListMode.Home,
  page: 0,
  searchQuery: "",
  selectedMovie: "",
  setCurrentTitle: () => {},
  totalPages: 0,
});

const AppProvider = ({ children }: ReactChildrenType) => {
  const baseName = import.meta.env.BASE_URL;
  const [currentTitle, setCurrentTitle] = useState<string>("");
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
    selectedMovie,
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
        selectedMovie,
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
