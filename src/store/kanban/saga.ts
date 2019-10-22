import { authHttpPost } from "api/methods.ts";
import Urls from "api/urls.ts";
import {
  // call,
  all,
  put,
  takeLatest
  //  takeEvery,
} from "redux-saga/effects";
import {
  KanbanActionTypes,
  moveItemCompleted,
  moveItemFailed
} from "store/kanban/actions.ts";
import { awaited } from "utils/common.ts";

function* moveItem(action: IReducerAction<IItemMove>) {
  const response = awaited(authHttpPost(Urls.Kanban.MOVE_ITEM, action.payload));
  if (response.success) {
    yield put(moveItemCompleted(response.json));
  } else {
    yield put(moveItemFailed(response.json));
  }
}

export default function* saga() {
  yield all([takeLatest(KanbanActionTypes.MOVE_ITEM_REQUEST, moveItem)]);
}
