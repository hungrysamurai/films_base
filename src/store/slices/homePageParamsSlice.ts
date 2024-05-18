import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MediaType, MovieFilterListTerm, TVFilterListTerm } from '../../types';

export interface HomePageParamsState {
  mediaType: MediaType;
  filterList: MovieFilterListTerm | TVFilterListTerm;
  filterGenre: string;
  currentPage: number;
  totalPages: number;
  lastActiveItem: string;
}

const initialState: HomePageParamsState = {
  mediaType: MediaType.Movie,
  filterList: MovieFilterListTerm.TopRated,
  filterGenre: '',
  currentPage: 1,
  totalPages: 0,
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
        state.totalPages = 0;
      },
    ),

    setHomePageFilterList: create.reducer(
      (
        state,
        action: PayloadAction<MovieFilterListTerm | TVFilterListTerm>,
      ) => {
        state.filterList = action.payload;

        state.currentPage = 1;
        state.totalPages = 0;
      },
    ),

    setHomePageFilterGenre: create.reducer(
      (state, action: PayloadAction<string>) => {
        state.filterGenre = action.payload;

        state.currentPage = 1;
        state.totalPages = 0;
      },
    ),

    increaseHomePageCurrentPage: create.reducer((state) => {
      state.currentPage = state.currentPage + 1;
    }),

    setHomePageTotalPages: create.reducer(
      (state, action: PayloadAction<number>) => {
        state.totalPages = action.payload;
      },
    ),

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
    getHomePageTotalPages: (state) => state.totalPages,
    getHomePageLastActiveItem: (state) => state.lastActiveItem,
  },
});

export const {
  setHomePageMediaType,
  setHomePageFilterList,
  setHomePageFilterGenre,
  increaseHomePageCurrentPage,
  setHomePageTotalPages,
  setHomePageLastActiveItem,
} = homePageParamsSlice.actions;

export const {
  getHomePageMediaType,
  getHomePageFilterList,
  getHomePageFilterGenre,
  getHomePageCurrentPage,
  getHomePageTotalPages,
  getHomePageLastActiveItem,
} = homePageParamsSlice.selectors;

export default homePageParamsSlice.reducer;
