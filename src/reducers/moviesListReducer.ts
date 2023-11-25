import {
  Lang,
  MediaType,
  MovieFilterListTerm,
  MoviesListMode,
  TVFilterListTerm,
} from "../types";

export enum MoviesListReducerActionTypes {
  SET_LANG = "SET_LANG",
  SET_MEDIA_TYPE = "SET_MEDIA_TYPE",
  SET_FILTER_LIST = "SET_FILTER_LIST",
  SET_FILTER_GENRE = "SET_FILTER_GENRE",
  INCREASE_PAGE = "INCREASE_PAGE",
  INITIAL_LOAD_MOVIES = "INITIAL_LOAD_MOVIES",
  APPEND_MOVIES = "APPEND_MOVIES",
  SET_SEARCH_MODE = "SET_SEARCH_MODE",
  SET_HOME_MODE = "SET_HOME_MODE",
  SET_MOVIE_TO_SCROLL = "SET_MOVIE_TO_SCROLL",
}

export type MoviesListReducerAction =
  | { type: MoviesListReducerActionTypes.SET_LANG; payload: Lang }
  | { type: MoviesListReducerActionTypes.SET_MEDIA_TYPE; payload: MediaType }
  | {
      type: MoviesListReducerActionTypes.SET_FILTER_LIST;
      payload: TVFilterListTerm | MovieFilterListTerm;
    }
  | { type: MoviesListReducerActionTypes.SET_FILTER_GENRE; payload: string }
  | { type: MoviesListReducerActionTypes.INCREASE_PAGE; payload: number }
  | {
      type: MoviesListReducerActionTypes.INITIAL_LOAD_MOVIES;
      payload: FetchedListInitialData;
    }
  | {
      type: MoviesListReducerActionTypes.APPEND_MOVIES;
      payload: FetchedListInitialData;
    }
  | { type: MoviesListReducerActionTypes.SET_SEARCH_MODE; payload: string }
  | {
      type: MoviesListReducerActionTypes.SET_HOME_MODE;
      payload: MoviesListMode.Home;
    }
  | { type: MoviesListReducerActionTypes.SET_MOVIE_TO_SCROLL; payload: string };

const moviesListReducer: React.Reducer<
  MoviesListState,
  MoviesListReducerAction
> = (
  state: MoviesListState,
  action: MoviesListReducerAction
): MoviesListState => {
  switch (action.type) {
    case MoviesListReducerActionTypes.SET_LANG:
      return {
        ...state,
        lang: action.payload,
        page: 1,
        selectedMovie: "",
      };
    case MoviesListReducerActionTypes.SET_MEDIA_TYPE:
      return {
        ...state,
        mediaType: action.payload,
        page: 1,
        selectedMovie: "",
        filterGenre: "all",
        filterList: MovieFilterListTerm.TopRated,
      };
    case MoviesListReducerActionTypes.SET_FILTER_LIST:
      return {
        ...state,
        filterList: action.payload,
        page: 1,
        selectedMovie: "",
      };
    case MoviesListReducerActionTypes.SET_FILTER_GENRE:
      return {
        ...state,
        filterGenre: action.payload,
        page: 1,
        selectedMovie: "",
      };
    case MoviesListReducerActionTypes.INCREASE_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case MoviesListReducerActionTypes.INITIAL_LOAD_MOVIES:
      return {
        ...state,
        moviesList: [...action.payload[0]],
        uniqueIds: [...action.payload[1]],
        totalPages: action.payload[2] as number,
      };
    case MoviesListReducerActionTypes.APPEND_MOVIES: {
      const ids: number[] = [];
      const filtered = action.payload[0].filter((movie) => {
        if (state.uniqueIds.includes(movie.id as number)) {
          return false;
        } else {
          ids.push(movie.id as number);
          return true;
        }
      });
      return {
        ...state,
        moviesList: [...state.moviesList, ...filtered],
        uniqueIds: [...state.uniqueIds, ...ids],
      };
    }
    case MoviesListReducerActionTypes.SET_SEARCH_MODE:
      return {
        ...state,
        page: 1,
        selectedMovie: "",
        filterList: MovieFilterListTerm.TopRated,
        filterGenre: "all",
        moviesListMode: MoviesListMode.Search,
        searchQuery: action.payload,
      };
    case MoviesListReducerActionTypes.SET_HOME_MODE:
      return {
        ...state,
        page: 1,
        selectedMovie: "",
        filterList: MovieFilterListTerm.TopRated,
        filterGenre: "all",
        moviesListMode: MoviesListMode.Home,
      };
    case MoviesListReducerActionTypes.SET_MOVIE_TO_SCROLL:
      return {
        ...state,
        selectedMovie: action.payload,
      };
    default:
      return state;
  }
};

export default moviesListReducer;
