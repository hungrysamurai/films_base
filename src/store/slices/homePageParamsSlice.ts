import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MediaType, MovieFilterListTerm, TVFilterListTerm } from '../../types';

export interface HomePageParamsState {
  mediaType: MediaType;
  filterList: MovieFilterListTerm | TVFilterListTerm;
  filterGenre: string;
  currentPage: number;
  lastActiveItem: string;
}

const initialState: HomePageParamsState = {
  mediaType: MediaType.Movie,
  filterList: MovieFilterListTerm.TopRated,
  filterGenre: '',
  currentPage: 1,
  lastActiveItem: '',
};

const homePageParamsSlice = createSlice({
  name: 'homePageParams',
  initialState,
  reducers: (create) => ({
    setHomePageMediaType: create.reducer(
      (state, action: PayloadAction<MediaType>) => {
        state.filterGenre = '';
        state.filterList = MovieFilterListTerm.TopRated;
        state.mediaType = action.payload;
        state.currentPage = 1;
      },
    ),

    setHomePageFilterList: create.reducer(
      (
        state,
        action: PayloadAction<MovieFilterListTerm | TVFilterListTerm>,
      ) => {
        state.filterList = action.payload;
        state.currentPage = 1;
      },
    ),

    setHomePageFilterGenre: create.reducer(
      (state, action: PayloadAction<string>) => {
        state.filterGenre = action.payload;
        state.currentPage = 1;
      },
    ),

    increaseHomePageCurrentPage: create.reducer((state) => {
      state.currentPage = state.currentPage + 1;
    }),

    setHomePageLastActiveItem: create.reducer(
      (state, action: PayloadAction<string>) => {
        state.lastActiveItem = action.payload;
      },
    ),
  }),

  selectors: {
    getHomePageMediaType: (state) => state.mediaType,
    getHomePageFilterList: (state) => state.filterList,
    getHomePageFilterGenre: (state) => state.filterGenre,
    getHomePageCurrentPage: (state) => state.currentPage,
    getHomePageLastActiveItem: (state) => state.lastActiveItem,
  },
});

export const {
  setHomePageMediaType,
  setHomePageFilterList,
  setHomePageFilterGenre,
  increaseHomePageCurrentPage,
  setHomePageLastActiveItem,
} = homePageParamsSlice.actions;

export const {
  getHomePageMediaType,
  getHomePageFilterList,
  getHomePageFilterGenre,
  getHomePageCurrentPage,
  getHomePageLastActiveItem,
} = homePageParamsSlice.selectors;

export default homePageParamsSlice.reducer;
