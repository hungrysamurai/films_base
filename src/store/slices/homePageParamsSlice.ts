import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MediaType, MovieFilterListTerm, TVFilterListTerm } from "../../types";

export interface HomePageParamsState {
  mediaType: MediaType;
  filterList: MovieFilterListTerm | TVFilterListTerm;
  filterGenre: string;
}

const initialState: HomePageParamsState = {
  mediaType: MediaType.Movie,
  filterList: MovieFilterListTerm.TopRated,
  filterGenre: "",
};

const homePageParamsSlice = createSlice({
  name: "homePageParams",
  initialState,
  reducers: (create) => ({
    setHomePageMediaType: create.reducer(
      (state, action: PayloadAction<MediaType>) => {
        state.filterGenre = "";
        state.filterList = MovieFilterListTerm.TopRated;
        state.mediaType = action.payload;
      }
    ),
    setHomePageFilterList: create.reducer(
      (
        state,
        action: PayloadAction<MovieFilterListTerm | TVFilterListTerm>
      ) => {
        state.filterList = action.payload;
      }
    ),
    setHomePageFilterGenre: create.reducer(
      (state, action: PayloadAction<string>) => {
        state.filterGenre = action.payload;
      }
    ),
  }),
  selectors: {
    getHomePageMediaType: (state) => state.mediaType,
    getHomePageFilterList: (state) => state.filterList,
    getHomePageFilterGenre: (state) => state.filterGenre,
  },
});

export const {
  setHomePageMediaType,
  setHomePageFilterList,
  setHomePageFilterGenre,
} = homePageParamsSlice.actions;

export const {
  getHomePageMediaType,
  getHomePageFilterList,
  getHomePageFilterGenre,
} = homePageParamsSlice.selectors;

export default homePageParamsSlice.reducer;
