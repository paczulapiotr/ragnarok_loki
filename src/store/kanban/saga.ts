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
  const { success, response } = awaited(
    authHttpPost(Urls.Kanban.MOVE_ITEM, action.payload)
  );
  if (success) {
    yield put(moveItemCompleted(response));
  } else {
    yield put(moveItemFailed(response));
  }
}

export default function* saga() {
  yield all([takeLatest(KanbanActionTypes.MOVE_ITEM_REQUEST, moveItem)]);
}
