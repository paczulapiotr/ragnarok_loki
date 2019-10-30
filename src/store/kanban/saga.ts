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
  KanbanItemMoveDTO,
  KanbanColumnRemoveDTO,
  KanbanColumnAddDTO,
  KanbanColumnMoveDTO,
  KanbanItemRemoveDTO,
  KanbanItemAddDTO
} from "src/typings/kanban/dto";
import {
  KanbanActionTypes,
  moveItemCompleted,
  moveItemFailed,
  addItemCompleted,
  addItemFailed,
  removeItemCompleted,
  removeItemFailed,
  moveColumnCompleted,
  moveColumnFailed,
  addColumnCompleted,
  addColumnFailed,
  removeColumnCompleted,
  removeColumnFailed
} from "store/kanban/actions.ts";
import { awaited } from "utils/common.ts";

function* moveItem(action: IReducerAction<KanbanItemMoveDTO>) {
  const { success, response } = awaited(
    authHttpPost(Urls.Kanban.MOVE_ITEM, action.payload)
  );
  if (success) {
    yield put(moveItemCompleted(response.data));
  } else {
    yield put(moveItemFailed(response.data));
  }
}
function* addItem(action: IReducerAction<KanbanItemAddDTO>) {
  const { success, response } = awaited(
    authHttpPost(Urls.Kanban.ADD_ITEM, action.payload)
  );
  if (success) {
    yield put(addItemCompleted(response.data));
  } else {
    yield put(addItemFailed(response.data));
  }
}
function* removeItem(action: IReducerAction<KanbanItemRemoveDTO>) {
  const { success, response } = awaited(
    authHttpPost(Urls.Kanban.REMOVE_ITEM, action.payload)
  );
  if (success) {
    yield put(removeItemCompleted(response.data));
  } else {
    yield put(removeItemFailed(response.data));
  }
}
function* moveColumn(action: IReducerAction<KanbanColumnMoveDTO>) {
  const { success, response } = awaited(
    authHttpPost(Urls.Kanban.MOVE_COLUMN, action.payload)
  );
  if (success) {
    yield put(moveColumnCompleted(response.data));
  } else {
    yield put(moveColumnFailed(response.data));
  }
}
function* addColumn(action: IReducerAction<KanbanColumnAddDTO>) {
  const { success, response } = awaited(
    authHttpPost(Urls.Kanban.ADD_COLUMN, action.payload)
  );
  if (success) {
    yield put(addColumnCompleted(response.data));
  } else {
    yield put(addColumnFailed(response.data));
  }
}
function* removeColumn(action: IReducerAction<KanbanColumnRemoveDTO>) {
  const { success, response } = awaited(
    authHttpPost(Urls.Kanban.REMOVE_COLUMN, action.payload)
  );
  if (success) {
    yield put(removeColumnCompleted(response.data));
  } else {
    yield put(removeColumnFailed(response.data));
  }
}

export default function* saga() {
  yield all([takeLatest(KanbanActionTypes.MOVE_ITEM_REQUEST, moveItem)]);
  yield all([takeLatest(KanbanActionTypes.ADD_ITEM_REQUEST, addItem)]);
  yield all([takeLatest(KanbanActionTypes.REMOVE_ITEM_REQUEST, removeItem)]);
  yield all([takeLatest(KanbanActionTypes.MOVE_COLUMN_REQUEST, moveColumn)]);
  yield all([takeLatest(KanbanActionTypes.ADD_COLUMN_REQUEST, addColumn)]);
  // tslint:disable-next-line: prettier
  yield all([
    takeLatest(KanbanActionTypes.REMOVE_COLUMN_REQUEST, removeColumn)
  ]);
}
