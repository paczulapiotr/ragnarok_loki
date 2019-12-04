import { AuthActionTypes } from "./actions";
interface AuthState {
  isLoggingOut: boolean;
}
const initialState: AuthState = {
  isLoggingOut: false
};

export default function(
  state: AuthState = initialState,
  { type }: IReducerAction<any>
): AuthState {
  switch (type) {
    case AuthActionTypes.LOG_OUT_REQUEST:
      return {
        isLoggingOut: true
      };
    default:
      return state;
  }
}
