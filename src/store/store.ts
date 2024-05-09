import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import mainReducer from "./slices/mainSlice";

export const store = configureStore({
  reducer: {
    main: mainReducer,
    auth: authReducer,
  },
  devTools: import.meta.env.DEV ? true : false,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
