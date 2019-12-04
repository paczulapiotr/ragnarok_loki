import {
  // call,
  all,
  put,
  takeLeading
  //  takeEvery,
} from "redux-saga/effects";
import userManager from "src/utils/userManager";
import { AuthActionTypes, logOutCompleted } from "./actions";

function* logOutRequest(action: IReducerAction<any>) {
  console.log("LogOutRequest Saga");
  yield put(logOutCompleted());
}

function* logginOut(action: IReducerAction<any>) {
  console.log("logginOut Saga");
  yield userManager.signoutRedirect();
}

export default function* saga() {
  yield all([takeLeading(AuthActionTypes.LOG_OUT_REQUEST, logOutRequest)]);
  yield all([takeLeading(AuthActionTypes.LOG_OUT_COMPLETED, logginOut)]);
}
