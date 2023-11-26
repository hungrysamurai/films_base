import { User } from "firebase/auth";

export enum UserReducerActionTypes {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

export type UserReducerAction =
  | { type: UserReducerActionTypes.LOGIN; payload: User }
  | { type: UserReducerActionTypes.LOGOUT };

const userReducer: React.Reducer<UserState, UserReducerAction> = (
  state: UserState,
  action: UserReducerAction
) => {
  switch (action.type) {
    case UserReducerActionTypes.LOGIN:
      return {
        currentUser: action.payload,
      };
    case UserReducerActionTypes.LOGOUT:
      return {
        currentUser: null,
      };
    default:
      return state;
  }
};

export default userReducer;
