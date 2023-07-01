const initialState = {
  lang: "en",
  mediaType: "movie",
  filterList: "top_rated",
  filterGenre: "all",
  page: 1,
  moviesList: [],
  uniqueIds: [],
  totalPages: 0,
  searchQuery: "",
};

const mainReducer = (state, action) => {
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
        filterList: "top_rated",
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
        moviesList: [...action.payload[0]],
        uniqueIds: [...action.payload[1]],
        totalPages: action.payload[2],
      };
    case "APPEND_MOVIES": {
      const ids = [];
      const filtered = action.payload[0].filter((movie) => {
        if (state.uniqueIds.includes(movie.id)) {
          return false;
        } else {
          ids.push(movie.id);
          return true;
        }
      });

      return {
        ...state,
        moviesList: [...state.moviesList, ...filtered],
        uniqueIds: [...state.uniqueIds, ...ids],
      };
    }
    case "SET_SEARCH_QUERY":
      return {
        ...state,
        page: 1,
        searchQuery: action.payload,
      };
    default:
      return state;
  }
};

export { initialState, mainReducer };
