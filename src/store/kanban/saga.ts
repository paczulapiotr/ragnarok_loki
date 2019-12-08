import {
  authHttpDelete,
  authHttpGet,
  authHttpPatch,
  authHttpPost,
  authHttpPut
} from "api/methods.ts";
import { ApiUrls } from "api/urls";
import {
  // call,
  all,
  call,
  put,
  takeLatest
  //  takeEvery,
} from "redux-saga/effects";
import { HttpResponseType } from "src/api/index.ts";
import {
  addColumnCompleted,
  addItemCompleted,
  editItemCompleted,
  KanbanActionTypes,
  loadBoardCompleted,
  loadBoardRequest,
  moveColumnCompleted,
  moveItemCompleted,
  removeColumnCompleted,
  removeItemCompleted,
  editColumnCompleted
} from "store/kanban/actions.ts";

function* moveItem(action: IReducerAction<KanbanItemMoveRequestDTO>) {
  const { type, response }: IApiResponse = yield call(
    authHttpPost,
    ApiUrls.Kanban.MOVE_ITEM,
    action.payload
  );
  if (type === HttpResponseType.Ok) {
    yield put(moveItemCompleted(response.data));
  } else if (type === HttpResponseType.Conflict) {
    yield put(loadBoardRequest({ boardId: action.payload.boardId }));
  }
}

function* addItem(action: IReducerAction<KanbanItemAddRequestDTO>) {
  const { type, response }: IApiResponse = yield call(
    authHttpPut,
    ApiUrls.Kanban.ADD_ITEM,
    action.payload
  );
  if (type === HttpResponseType.Ok) {
    yield put(addItemCompleted(response.data));
  } else if (type === HttpResponseType.Conflict) {
    yield put(loadBoardRequest({ boardId: action.payload.boardId }));
  }
}

function* editItem(action: IReducerAction<KanbanItemEditRequestDTO>) {
  const { type, response }: IApiResponse = yield call(
    authHttpPatch,
    ApiUrls.Kanban.EDIT_ITEM,
    action.payload
  );
  if (type === HttpResponseType.Ok) {
    yield put(editItemCompleted(response.data));
  } else if (type === HttpResponseType.Conflict) {
    yield put(loadBoardRequest({ boardId: action.payload.boardId }));
  }
}

function* removeItem(action: IReducerAction<KanbanItemRemoveRequestDTO>) {
  const { type, response }: IApiResponse = yield call(
    authHttpDelete,
    ApiUrls.Kanban.REMOVE_ITEM,
    action.payload
  );
  if (type === HttpResponseType.Ok) {
    yield put(removeItemCompleted(response.data));
  } else if (type === HttpResponseType.Conflict) {
    yield put(loadBoardRequest({ boardId: action.payload.boardId }));
  }
}

function* moveColumn(action: IReducerAction<KanbanColumnMoveRequestDTO>) {
  const { type, response }: IApiResponse = yield call(
    authHttpPost,
    ApiUrls.Kanban.MOVE_COLUMN,
    action.payload
  );
  if (type === HttpResponseType.Ok) {
    yield put(moveColumnCompleted(response.data));
  } else if (type === HttpResponseType.Conflict) {
    yield put(loadBoardRequest({ boardId: action.payload.boardId }));
  }
}

function* addColumn(action: IReducerAction<KanbanColumnAddRequestDTO>) {
  const { type, response }: IApiResponse = yield call(
    authHttpPut,
    ApiUrls.Kanban.ADD_COLUMN,
    action.payload
  );
  if (type === HttpResponseType.Ok) {
    yield put(addColumnCompleted(response.data));
  } else if (type === HttpResponseType.Conflict) {
    yield put(loadBoardRequest({ boardId: action.payload.boardId }));
  }
}

function* editColumn(action: IReducerAction<KanbanColumnEditRequestDTO>) {
  const { type, response }: IApiResponse = yield call(
    authHttpPatch,
    ApiUrls.Kanban.EDIT_COLUMN,
    action.payload
  );
  if (type === HttpResponseType.Ok) {
    yield put(editColumnCompleted(response.data));
  } else if (type === HttpResponseType.Conflict) {
    yield put(loadBoardRequest({ boardId: action.payload.boardId }));
  }
}

function* removeColumn(action: IReducerAction<KanbanColumnRemoveRequestDTO>) {
  const { type, response }: IApiResponse = yield call(
    authHttpDelete,
    ApiUrls.Kanban.REMOVE_COLUMN,
    action.payload
  );
  if (type === HttpResponseType.Ok) {
    yield put(removeColumnCompleted(response.data));
  } else if (type === HttpResponseType.Conflict) {
    yield put(loadBoardRequest({ boardId: action.payload.boardId }));
  }
}

function* loadBoard(action: IReducerAction<KanbanBoardLoadRequestDTO>) {
  const { type, response }: IApiResponse = yield call(
    authHttpGet,
    `${ApiUrls.Kanban.LOAD_BOARD}/${action.payload.boardId}`
  );
  if (type === HttpResponseType.Ok) {
    yield put(loadBoardCompleted(response.data));
  } else if (type === HttpResponseType.Conflict) {
    yield put(loadBoardRequest({ boardId: action.payload.boardId }));
  }
}

export default function* saga() {
  yield all([
    takeLatest(KanbanActionTypes.MOVE_ITEM_REQUEST, moveItem),
    takeLatest(KanbanActionTypes.ADD_ITEM_REQUEST, addItem),
    takeLatest(KanbanActionTypes.EDIT_ITEM_REQUEST, editItem),
    takeLatest(KanbanActionTypes.REMOVE_ITEM_REQUEST, removeItem),
    takeLatest(KanbanActionTypes.MOVE_COLUMN_REQUEST, moveColumn),
    takeLatest(KanbanActionTypes.ADD_COLUMN_REQUEST, addColumn),
    takeLatest(KanbanActionTypes.EDIT_COLUMN_REQUEST, editColumn),
    takeLatest(KanbanActionTypes.REMOVE_COLUMN_REQUEST, removeColumn),
    takeLatest(KanbanActionTypes.LOAD_BOARD_REQUEST, loadBoard)
  ]);
}
