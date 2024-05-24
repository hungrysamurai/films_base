import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from './slices/authSlice';
import mainReducer from './slices/mainSlice';
import homePageParamsReducer from './slices/homePageParamsSlice';
import searchPageParamsReducer from './slices/searchPageParamsSlice';
import userListsReducer from './slices/userListsSlice';
import { apiSlice } from './slices/api/apiSlice';


const persistConfig = {
  key: "root",
  storage,
  blacklist: ["main", "auth", "homePageParams", "searchPageParams", "userLists", apiSlice.reducerPath],
};

const mainPersistConfig = {
  key: "main",
  storage: storage,
  whitelist: ["lang"],
};

const homePageParamsPersistConfig = {
  key: "homePageParams",
  storage: storage,
  whitelist: ["mediaType", "filterList"]
}

const rootReducer = combineReducers({
  main: persistReducer(mainPersistConfig, mainReducer),
  auth: authReducer,
  homePageParams: persistReducer(homePageParamsPersistConfig, homePageParamsReducer),
  searchPageParams: searchPageParamsReducer,
  userLists: userListsReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
  devTools: import.meta.env.DEV ? true : false,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
