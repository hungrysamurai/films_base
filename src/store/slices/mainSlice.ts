import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Lang } from '../../types';

interface MainState {
  lang: Lang;
  mainTitle: string;
}

const initialState: MainState = {
  lang: Lang.Ru,
  mainTitle: '',
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: (create) => ({
    switchLang: create.reducer((state) => {
      if (state.lang === Lang.Ru) {
        state.lang = Lang.En;
      } else {
        state.lang = Lang.Ru;
      }
    }),

    setMainTitle: create.reducer((state, action: PayloadAction<string>) => {
      state.mainTitle = action.payload;
    }),
  }),

  selectors: {
    getCurrentLang: (state) => state.lang,
    getCurrentMainTitle: (state) => state.mainTitle,
  },
});

export const { switchLang, setMainTitle } = mainSlice.actions;

export const { getCurrentLang, getCurrentMainTitle } = mainSlice.selectors;

export default mainSlice.reducer;
