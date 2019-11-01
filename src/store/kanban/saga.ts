import { authHttpGet, authHttpPost } from "api/methods.ts";
import Urls from "api/urls.ts";
import {
  // call,
  all,
  call,
  put,
  takeLatest
  //  takeEvery,
} from "redux-saga/effects";
import {
  KanbanBoardLoadDTO,
  KanbanColumnAddDTO,
  KanbanColumnMoveDTO,
  KanbanColumnRemoveDTO,
  KanbanItemAddDTO,
  KanbanItemMoveDTO,
  KanbanItemRemoveDTO
} from "src/typings/kanban/dto";
import {
  addColumnCompleted,
  addColumnFailed,
  addItemCompleted,
  addItemFailed,
  KanbanActionTypes,
  loadBoardCompleted,
  loadBoardFailed,
  moveColumnCompleted,
  moveColumnFailed,
  moveItemCompleted,
  moveItemFailed,
  removeColumnCompleted,
  removeColumnFailed,
  removeItemCompleted,
  removeItemFailed
} from "store/kanban/actions.ts";

function* moveItem(action: IReducerAction<KanbanItemMoveDTO>) {
  const { success, response }: IApiResponse = yield call(
    authHttpPost,
    Urls.Kanban.MOVE_ITEM,
    action.payload
  );
  if (success) {
    yield put(moveItemCompleted(response.data));
  } else {
    yield put(moveItemFailed(response.data));
  }
}
function* addItem(action: IReducerAction<KanbanItemAddDTO>) {
  const { success, response }: IApiResponse = yield call(
    authHttpPost,
    Urls.Kanban.ADD_ITEM,
    action.payload
  );
  if (success) {
    yield put(addItemCompleted(response.data));
  } else {
    yield put(addItemFailed(response.data));
  }
}
function* removeItem(action: IReducerAction<KanbanItemRemoveDTO>) {
  const { success, response }: IApiResponse = yield call(
    authHttpPost,
    Urls.Kanban.REMOVE_ITEM,
    action.payload
  );
  if (success) {
    yield put(removeItemCompleted(response.data));
  } else {
    yield put(removeItemFailed(response.data));
  }
}
function* moveColumn(action: IReducerAction<KanbanColumnMoveDTO>) {
  const { success, response }: IApiResponse = yield call(
    authHttpPost,
    Urls.Kanban.MOVE_COLUMN,
    action.payload
  );
  if (success) {
    yield put(moveColumnCompleted(response.data));
  } else {
    yield put(moveColumnFailed(response.data));
  }
}
function* addColumn(action: IReducerAction<KanbanColumnAddDTO>) {
  const { success, response }: IApiResponse = yield call(
    authHttpPost,
    Urls.Kanban.ADD_COLUMN,
    action.payload
  );
  if (success) {
    yield put(addColumnCompleted(response.data));
  } else {
    yield put(addColumnFailed(response.data));
  }
}
function* removeColumn(action: IReducerAction<KanbanColumnRemoveDTO>) {
  const { success, response }: IApiResponse = yield call(
    authHttpPost,
    Urls.Kanban.REMOVE_COLUMN,
    action.payload
  );
  if (success) {
    yield put(removeColumnCompleted(response.data));
  } else {
    yield put(removeColumnFailed(response.data));
  }
}

function* loadBoard(action: IReducerAction<KanbanBoardLoadDTO>) {
  const { success, response }: IApiResponse = yield call(
    authHttpGet,
    `${Urls.Kanban.LOAD_BOARD}/${action.payload.boardId}`
  );
  if (success) {
    yield put(loadBoardCompleted(response.data));
  } else {
    yield put(loadBoardFailed(response.data));
  }
}

export default function* saga() {
  yield all([
    takeLatest(KanbanActionTypes.MOVE_ITEM_REQUEST, moveItem),
    takeLatest(KanbanActionTypes.ADD_ITEM_REQUEST, addItem),
    takeLatest(KanbanActionTypes.REMOVE_ITEM_REQUEST, removeItem),
    takeLatest(KanbanActionTypes.MOVE_COLUMN_REQUEST, moveColumn),
    takeLatest(KanbanActionTypes.ADD_COLUMN_REQUEST, addColumn),
    takeLatest(KanbanActionTypes.REMOVE_COLUMN_REQUEST, removeColumn),
    takeLatest(KanbanActionTypes.LOAD_BOARD_REQUEST, loadBoard)
  ]);
}
