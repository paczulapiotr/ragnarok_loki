import {
  // call,
  all,
  put,
  takeLatest
  //  takeEvery,
} from "redux-saga/effects";
import { authHttpPost } from "src/api/methods.ts";
import {
  KanbanActionTypes,
  moveItemCompleted,
  moveItemFailed
} from "store/kanban/actions.ts";

async function* moveItem(action: IReducerAction<IItemMove>) {
  const response = await authHttpPost(
    "https://localhost:5001/api/kanban/moveitem",
    action.payload
  );
  if (response.success) {
    yield put(moveItemCompleted(response.json));
  } else {
    yield put(moveItemFailed(response.json));
  }
}

export default function* saga() {
  yield all([takeLatest(KanbanActionTypes.MOVE_ITEM_REQUEST, moveItem)]);
}
