import { MediaType, MovieFilterListTerm, TVFilterListTerm } from "../types";

export enum HomePageParamsActionTypes {
  SET_HOME_PAGE_MEDIA_TYPE = "SET_HOME_PAGE_MEDIA_TYPE",
  SET_HOME_PAGE_FILTER_LIST = "SET_HOME_PAGE_FILTER_LIST",
  SET_HOME_PAGE_FILTER_GENRE = "SET_HOME_PAGE_FILTER_GENRE",
}

export type HomePageParamsReducerAction =
  | {
      type: HomePageParamsActionTypes.SET_HOME_PAGE_MEDIA_TYPE;
      payload: MediaType;
    }
  | {
      type: HomePageParamsActionTypes.SET_HOME_PAGE_FILTER_LIST;
      payload: TVFilterListTerm | MovieFilterListTerm;
    }
  | {
      type: HomePageParamsActionTypes.SET_HOME_PAGE_FILTER_GENRE;
      payload: string;
    };

const homePageParamsReducer: React.Reducer<
  HomePageParamsState,
  HomePageParamsReducerAction
> = (
  state: HomePageParamsState,
  action: HomePageParamsReducerAction
): HomePageParamsState => {
  switch (action.type) {
    case HomePageParamsActionTypes.SET_HOME_PAGE_MEDIA_TYPE:
      return {
        mediaType: action.payload,
        filterGenre: "",
        filterList: MovieFilterListTerm.TopRated,
      };
    case HomePageParamsActionTypes.SET_HOME_PAGE_FILTER_LIST:
      return {
        ...state,
        filterList: action.payload,
      };
    case HomePageParamsActionTypes.SET_HOME_PAGE_FILTER_GENRE:
      return {
        ...state,
        filterGenre: action.payload,
      };
    default:
      return state;
  }
};

export default homePageParamsReducer;
