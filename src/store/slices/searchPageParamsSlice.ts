import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface SearchPageParamsState {
  searchQuery: string;
  currentPage: number;
  lastActiveItem: string;
}

const initialState: SearchPageParamsState = {
  searchQuery: '',
  currentPage: 1,
  lastActiveItem: '',
};

const searchPageParamsSlice = createSlice({
  name: 'searchPageParams',
  initialState,
  reducers: (create) => ({
    setSearchPageSearchQuery: create.reducer(
      (state, action: PayloadAction<string>) => {
        state.searchQuery = action.payload;

        state.currentPage = 1;
        state.lastActiveItem = '';
      },
    ),

    increaseSearchPageCurrentPage: create.reducer((state) => {
      state.currentPage = state.currentPage + 1;
    }),

    setSearchPageLastActiveItem: create.reducer(
      (state, action: PayloadAction<string>) => {
        state.lastActiveItem = action.payload;
      },
    ),
  }),

  selectors: {
    getSearchPageSearchQuery: (state) => state.searchQuery,
    getSearchPageCurrentPage: (state) => state.currentPage,
    getSearchPageLastActiveItem: (state) => state.lastActiveItem,
  },
});

export const {
  setSearchPageSearchQuery,
  increaseSearchPageCurrentPage,
  setSearchPageLastActiveItem,
} = searchPageParamsSlice.actions;

export const {
  getSearchPageSearchQuery,
  getSearchPageCurrentPage,
  getSearchPageLastActiveItem,
} = searchPageParamsSlice.selectors;

export default searchPageParamsSlice.reducer;
