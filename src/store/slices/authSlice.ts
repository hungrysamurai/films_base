import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface AuthUser {
  uid: string;
  email?: string;
  displayName: string | null;
  photoURL?: string;
}

interface AuthState {
  currentUser: AuthUser | null;
}

const initialState: AuthState = {
  currentUser: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: (create) => ({
    login: create.reducer((state, action: PayloadAction<AuthUser>) => {
      state.currentUser = action.payload;
    }),

    updateUserDisplayName: create.reducer(
      (state, action: PayloadAction<string>) => {
        if (state.currentUser) {
          state.currentUser.displayName = action.payload;
        }
      },
    ),

    updateUserPhotoURL: create.reducer(
      (state, action: PayloadAction<string>) => {
        if (state.currentUser) {
          state.currentUser.photoURL = action.payload;
        }
      },
    ),

    logout: create.reducer((state) => {
      state.currentUser = null;
    }),
  }),

  selectors: {
    getCurrentUser: (state) => state.currentUser,
  },
});

export const { login, logout, updateUserDisplayName, updateUserPhotoURL } =
  authSlice.actions;

export const { getCurrentUser } = authSlice.selectors;

export default authSlice.reducer;
