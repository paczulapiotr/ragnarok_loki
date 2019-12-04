import { result } from "store/utility.ts";

export enum AuthActionTypes {
  LOG_OUT_REQUEST = "LOG_OUT_REQUEST",
  LOG_OUT_COMPLETED = "LOG_OUT_COMPLETED"
}

export const logOutRequest = () =>
  result(AuthActionTypes.LOG_OUT_REQUEST, true);

export const logOutCompleted = () =>
  result(AuthActionTypes.LOG_OUT_COMPLETED, true);
