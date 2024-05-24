import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface UsersListsState {
 userLists: UserList[];
 currentListIndex: number;
};

const initialState: UsersListsState = {
 userLists: [],
 currentListIndex: 0,
};

const userListsSlice = createSlice({
 name: 'userLists',
 initialState,
 reducers: (create) => ({
  loadUserLists: create.reducer((state, action: PayloadAction<UserList[]>) => {
   state.userLists = action.payload
  }),

  updateUserLists: create.reducer((state, action: PayloadAction<UserList[]>) => {
   const oldIndex = state.currentListIndex;
   const oldLength = state.userLists.length;

   let newIndex;

   if (
    action.payload.length > oldLength ||
    action.payload.length === oldLength
   ) {
    newIndex = oldIndex;
   } else {
    if (oldIndex - 1 <= 0) {
     newIndex = 0;
    } else {
     newIndex = oldIndex - 1;
    }
   }

   state.currentListIndex = newIndex;
   state.userLists = action.payload;
  }),

  setCurrentListIndex: create.reducer((state, action: PayloadAction<number>) => {
   state.currentListIndex = action.payload;
  })
 }),

 selectors: {
  getUserLists: (state) => state.userLists,
  getUserListsCurrentIndex: (state) => state.currentListIndex
 }
});

export const { getUserLists, getUserListsCurrentIndex } = userListsSlice.selectors;

export const { loadUserLists, updateUserLists, setCurrentListIndex } = userListsSlice.actions;

export default userListsSlice.reducer;