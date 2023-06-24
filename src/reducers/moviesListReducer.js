const moviesListInitialState = {
  lang: "ru",
  mediaType: "movie",
  filterList: "popular",
  filterGenre: "all",
  page: 1,
  lastPage: false,
  moviesList: [],
};

const moviesListReducer = (state, action) => {
  switch (action.type) {
    case "SET_LANG":
      return {
        ...state,
        lang: action.payload,
        page: 1,
        moviesList: [],
      };
    case "SET_MEDIA_TYPE":
      return {
        ...state,
        mediaType: action.payload,
        page: 1,
        filterGenre: "all",
        filterList: "popular",
      };
    case "SET_FILTER_LIST":
      return {
        ...state,
        filterList: action.payload,
        page: 1,
        moviesList: [],
      };
    case "SET_FILTER_GENRE":
      return {
        ...state,
        filterGenre: action.payload,
        page: 1,
      };
    case "INCREASE_PAGE":
      return {
        ...state,
        page: state.page + 1,
      };
    case "INITIAL_LOAD_MOVIES":
      return {
        ...state,
        moviesList: [...action.payload],
      };
    case "APPEND_MOVIES":
      return {
        ...state,
        moviesList: [...state.moviesList, ...action.payload],
      };
    case "SET_LAST_PAGE":
      return {
        ...state,
        lastPage: action.payload,
      };
  }
};

export { moviesListInitialState, moviesListReducer };
