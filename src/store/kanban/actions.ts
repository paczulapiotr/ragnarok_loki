import { result } from "store/utility.ts";
import {
  KanbanBoardDTO,
  KanbanBoardLoadDTO,
  KanbanColumnAddDTO,
  KanbanColumnMoveDTO,
  KanbanColumnRemoveDTO,
  KanbanItemAddDTO,
  KanbanItemMoveDTO,
  KanbanItemRemoveDTO
} from "typings/kanban/dto";

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
export const addItemRequest = (payload: KanbanItemAddDTO) =>
  result(KanbanActionTypes.ADD_ITEM_REQUEST, payload);

export const addItemCompleted = (payload: KanbanBoardDTO) =>
  result(KanbanActionTypes.ADD_ITEM_COMPLETED, payload);

export const addItemFailed = (payload: KanbanBoardDTO) =>
  result(KanbanActionTypes.ADD_ITEM_FAILED, payload);

export const removeItemRequest = (payload: KanbanItemRemoveDTO) =>
  result(KanbanActionTypes.REMOVE_ITEM_REQUEST, payload);

export const removeItemCompleted = (payload: KanbanBoardDTO) =>
  result(KanbanActionTypes.REMOVE_ITEM_COMPLETED, payload);

export const removeItemFailed = (payload: KanbanBoardDTO) =>
  result(KanbanActionTypes.REMOVE_ITEM_FAILED, payload);

export const moveItemRequest = (payload: KanbanItemMoveDTO) =>
  result(KanbanActionTypes.MOVE_ITEM_REQUEST, payload);

export const moveItemCompleted = (payload: KanbanBoardDTO) =>
  result(KanbanActionTypes.MOVE_ITEM_COMPLETED, payload);

export const moveItemFailed = (payload: KanbanBoardDTO) =>
  result(KanbanActionTypes.MOVE_ITEM_FAILED, payload);
//#endregion

//#region Column
export const addColumnRequest = (payload: KanbanColumnAddDTO) =>
  result(KanbanActionTypes.ADD_COLUMN_REQUEST, payload);

export const addColumnCompleted = (payload: KanbanBoardDTO) =>
  result(KanbanActionTypes.ADD_COLUMN_COMPLETED, payload);

export const addColumnFailed = (payload: KanbanBoardDTO) =>
  result(KanbanActionTypes.ADD_COLUMN_FAILED, payload);

export const removeColumnRequest = (payload: KanbanColumnRemoveDTO) =>
  result(KanbanActionTypes.REMOVE_COLUMN_REQUEST, payload);

export const removeColumnCompleted = (payload: KanbanBoardDTO) =>
  result(KanbanActionTypes.REMOVE_COLUMN_COMPLETED, payload);

export const removeColumnFailed = (payload: KanbanBoardDTO) =>
  result(KanbanActionTypes.REMOVE_COLUMN_FAILED, payload);

export const moveColumnRequest = (payload: KanbanColumnMoveDTO) =>
  result(KanbanActionTypes.MOVE_COLUMN_REQUEST, payload);

export const moveColumnCompleted = (payload: KanbanBoardDTO) =>
  result(KanbanActionTypes.MOVE_COLUMN_COMPLETED, payload);

export const moveColumnFailed = (payload: KanbanBoardDTO) =>
  result(KanbanActionTypes.MOVE_COLUMN_FAILED, payload);
//#endregion

export const loadBoardRequest = (payload: KanbanBoardLoadDTO) =>
  result(KanbanActionTypes.LOAD_BOARD_REQUEST, payload);

export const loadBoardCompleted = (payload: KanbanBoardDTO) =>
  result(KanbanActionTypes.LOAD_BOARD_COMPLETED, payload);

export const loadBoardFailed = (payload: KanbanBoardDTO) =>
  result(KanbanActionTypes.LOAD_BOARD_FAILED, payload);
