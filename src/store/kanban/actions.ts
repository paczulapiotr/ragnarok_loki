import { result } from "store/utility.ts";

export enum KanbanActionTypes {
  ADD_ITEM_REQUEST = "ADD_ITEM_REQUEST",
  ADD_ITEM_COMPLETED = "ADD_ITEM_COMPLETED",
  ADD_ITEM_FAILED = "ADD_ITEM_FAILED",

  REMOVE_ITEM_REQUEST = "REMOVE_ITEM_REQUEST",
  REMOVE_ITEM_COMPLETED = "REMOVE_ITEM_COMPLETED",
  REMOVE_ITEM_FAILED = "REMOVE_ITEM_FAILED",

  MOVE_ITEM_REQUEST = "MOVE_ITEM_REQUEST",
  MOVE_ITEM_COMPLETED = "MOVE_ITEM_COMPLETED",
  MOVE_ITEM_FAILED = "MOVE_ITEM_FAILED",

  ADD_COLUMN_REQUEST = "ADD_COLUMN_REQUEST",
  ADD_COLUMN_COMPLETED = "ADD_COLUMN_COMPLETED",
  ADD_COLUMN_FAILED = "ADD_COLUMN_FAILED",

  REMOVE_COLUMN_REQUEST = "REMOVE_COLUMN_REQUEST",
  REMOVE_COLUMN_COMPLETED = "REMOVE_COLUMN_COMPLETED",
  REMOVE_COLUMN_FAILED = "REMOVE_COLUMN_FAILED",

  MOVE_COLUMN_REQUEST = "MOVE_COLUMN_REQUEST",
  MOVE_COLUMN_COMPLETED = "MOVE_COLUMN_COMPLETED",
  MOVE_COLUMN_FAILED = "MOVE_COLUMN_FAILED",

  LOAD_BOARD_REQUEST = "LOAD_BOARD_REQUEST",
  LOAD_BOARD_COMPLETED = "LOAD_BOARD_COMPLETED",
  LOAD_BOARD_FAILED = "LOAD_BOARD_FAILED"
}
//#region Item
export const addItemRequest = (payload: KanbanItemAddRequestDTO) =>
  result(KanbanActionTypes.ADD_ITEM_REQUEST, payload);

export const addItemCompleted = (payload: KanbanBoardResultDTO) =>
  result(KanbanActionTypes.ADD_ITEM_COMPLETED, payload);

export const addItemFailed = (payload: KanbanBoardResultDTO) =>
  result(KanbanActionTypes.ADD_ITEM_FAILED, payload);

export const removeItemRequest = (payload: KanbanItemRemoveRequestDTO) =>
  result(KanbanActionTypes.REMOVE_ITEM_REQUEST, payload);

export const removeItemCompleted = (payload: KanbanBoardResultDTO) =>
  result(KanbanActionTypes.REMOVE_ITEM_COMPLETED, payload);

export const removeItemFailed = (payload: KanbanBoardResultDTO) =>
  result(KanbanActionTypes.REMOVE_ITEM_FAILED, payload);

export const moveItemRequest = (payload: KanbanItemMoveRequestDTO) =>
  result(KanbanActionTypes.MOVE_ITEM_REQUEST, payload);

export const moveItemCompleted = (payload: KanbanBoardResultDTO) =>
  result(KanbanActionTypes.MOVE_ITEM_COMPLETED, payload);

export const moveItemFailed = (payload: KanbanBoardResultDTO) =>
  result(KanbanActionTypes.MOVE_ITEM_FAILED, payload);
//#endregion

//#region Column
export const addColumnRequest = (payload: KanbanColumnAddRequestDTO) =>
  result(KanbanActionTypes.ADD_COLUMN_REQUEST, payload);

export const addColumnCompleted = (payload: KanbanBoardResultDTO) =>
  result(KanbanActionTypes.ADD_COLUMN_COMPLETED, payload);

export const addColumnFailed = (payload: KanbanBoardResultDTO) =>
  result(KanbanActionTypes.ADD_COLUMN_FAILED, payload);

export const removeColumnRequest = (payload: KanbanColumnRemoveRequestDTO) =>
  result(KanbanActionTypes.REMOVE_COLUMN_REQUEST, payload);

export const removeColumnCompleted = (payload: KanbanBoardResultDTO) =>
  result(KanbanActionTypes.REMOVE_COLUMN_COMPLETED, payload);

export const removeColumnFailed = (payload: KanbanBoardResultDTO) =>
  result(KanbanActionTypes.REMOVE_COLUMN_FAILED, payload);

export const moveColumnRequest = (payload: KanbanColumnMoveRequestDTO) =>
  result(KanbanActionTypes.MOVE_COLUMN_REQUEST, payload);

export const moveColumnCompleted = (payload: KanbanBoardResultDTO) =>
  result(KanbanActionTypes.MOVE_COLUMN_COMPLETED, payload);

export const moveColumnFailed = (payload: KanbanBoardResultDTO) =>
  result(KanbanActionTypes.MOVE_COLUMN_FAILED, payload);
//#endregion

export const loadBoardRequest = (payload: KanbanBoardLoadRequestDTO) =>
  result(KanbanActionTypes.LOAD_BOARD_REQUEST, payload);

export const loadBoardCompleted = (payload: KanbanBoardResultDTO) =>
  result(KanbanActionTypes.LOAD_BOARD_COMPLETED, payload);

export const loadBoardFailed = (payload: KanbanBoardResultDTO) =>
  result(KanbanActionTypes.LOAD_BOARD_FAILED, payload);
