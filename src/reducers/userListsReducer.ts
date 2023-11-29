export enum UserListReducerActionTypes {
  LOAD_USER_LISTS = "LOAD_USER_LISTS",
  UPDATE_USER_LISTS = "UPDATE_USER_LISTS",
  SET_CURRENT_LIST_INDEX = "SET_CURRENT_LIST_INDEX",
}

export type UserListReducerAction =
  | { type: UserListReducerActionTypes.LOAD_USER_LISTS; payload: UserList[] }
  | { type: UserListReducerActionTypes.UPDATE_USER_LISTS; payload: UserList[] }
  | {
      type: UserListReducerActionTypes.SET_CURRENT_LIST_INDEX;
      payload: number;
    };

const userListsReducer: React.Reducer<
  UsersListsState,
  UserListReducerAction
> = (state: UsersListsState, action: UserListReducerAction) => {
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
