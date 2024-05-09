import { MediaType, MovieFilterListTerm, MoviesListMode } from "../types";

import moviesListReducer from "../reducers/moviesListReducer";

import { useContext, createContext, useReducer } from "react";
import { useFetchMoviesList } from "../hooks/useFetchMoviesList";
import { useAppSelector } from "../store/hooks";
import { getCurrentLang } from "../store/slices/mainSlice";

const initialState: MoviesListState = {
  // Params
  mediaType: MediaType.Movie,
  filterList: MovieFilterListTerm.TopRated,
  filterGenre: "",
  page: 1,
  totalPages: 0,
  moviesList: [],
  uniqueIds: [],
  // ?
  moviesListMode: MoviesListMode.Home,
  // https://developer.themoviedb.org/reference/search-multi
  searchQuery: "",
  selectedMovie: "",
};

const AppContext = createContext<IGlobalContext>({
  dispatch: () => {},
  filterGenre: "",
  filterList: MovieFilterListTerm.Upcoming,
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
  totalPages: 0,
});

const AppProvider = ({ children }: ReactChildrenType) => {
  const [moviesListState, dispatch] = useReducer(
    moviesListReducer,
    initialState
  );

  const lang = useAppSelector(getCurrentLang);

  const { isLoading: moviesFetchLoading, error: moviesFetchError } =
    useFetchMoviesList(
      moviesListState.mediaType,
      lang,
      moviesListState.filterList,
      moviesListState.filterGenre,
      moviesListState.page,
      moviesListState.searchQuery,
      moviesListState.moviesListMode,
      dispatch
    );

  const {
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
