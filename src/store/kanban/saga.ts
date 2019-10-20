import {
  // call,
  all,
  put,
  takeLatest
  //  takeEvery,
} from "redux-saga/effects";
import { KanbanActionTypes, moveItemCompleted } from "store/kanban/actions.ts";

function* moveItem(action: IReducerAction) {
  yield put(moveItemCompleted(action.payload));
}

export default function* saga() {
  yield all([takeLatest(KanbanActionTypes.MOVE_ITEM_REQUEST, moveItem)]);
}
