import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import mainReducer from './slices/mainSlice';
import homePageParamsReducer from './slices/homePageParamsSlice';
import searchPageParamsReducer from './slices/searchPageParamsSlice';
import userListsReducer from './slices/userListsSlice';
import { apiSlice } from './slices/api/apiSlice';

export const store = configureStore({
  reducer: {
    main: mainReducer,
    auth: authReducer,
    homePageParams: homePageParamsReducer,
    searchPageParams: searchPageParamsReducer,
    userLists: userListsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: import.meta.env.DEV ? true : false,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
