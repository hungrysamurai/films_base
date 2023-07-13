const userListsReducer = (state, action) => {
 switch (action.type) {
  case "LOAD_USER_LISTS":
   return {
    ...state,
    userLists: action.payload,
   };
  case "UPDATE_USER_LISTS": {
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
   return {
    currentListIndex: newIndex,
    userLists: action.payload,
   };
  }
  case "SET_CURRENT_LIST_INDEX":
   return {
    ...state,
    currentListIndex: action.payload,
   };
  default:
   return state;
 }
};

export default userListsReducer;