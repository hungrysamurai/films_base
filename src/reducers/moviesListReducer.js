const moviesListReducer = (state, action) => {
  switch (action.type) {
    case "SET_LANG":
      return {
        ...state,
        lang: action.payload,
        page: 1,
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
        page: action.payload,
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
    case "SET_SEARCH_MODE":
      return {
        ...state,
        page: 1,
        filterList: "top_rated",
        filterGenre: "all",
        moviesListMode: 'search',
        searchQuery: action.payload,
      };
    case 'SET_HOME_MODE':
      return {
        ...state,
        page: 1,
        filterList: "top_rated",
        filterGenre: "all",
        moviesListMode: "home",
      }
    case 'SET_USER_MODE':
      return {
        ...state,
        moviesListMode: 'userList'
      }
    default:
      return state;
  }
};

export default moviesListReducer;
