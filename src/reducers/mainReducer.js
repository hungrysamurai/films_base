const initialState = {
  lang: "ru",
  mediaType: "movie",
  filterList: "popular",
  filterGenre: "all",
  page: 1,
  lastPage: false,
  moviesList: [],
  uniqueIds: [],
  totalPages: 0,
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
        moviesList: [...action.payload[0]],
        uniqueIds: [...action.payload[1]],
        totalPages: action.payload[2]
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
    case "SET_LAST_PAGE":
      return {
        ...state,
        lastPage: action.payload,
      };
  }
};

export { initialState, mainReducer };