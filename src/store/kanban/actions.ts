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
  MOVE_COLUMN_FAILED = "MOVE_COLUMN_FAILED"
}
// Item
export const addItemRequest = (payload: any) =>
  result(KanbanActionTypes.ADD_ITEM_REQUEST, payload);

export const addItemCompleted = (payload: any) =>
  result(KanbanActionTypes.ADD_ITEM_COMPLETED, payload);

export const addItemFailed = (payload: any) =>
  result(KanbanActionTypes.ADD_ITEM_FAILED, payload);

export const removeItemRequest = (payload: any) =>
  result(KanbanActionTypes.REMOVE_ITEM_REQUEST, payload);

export const removeItemCompleted = (payload: any) =>
  result(KanbanActionTypes.REMOVE_ITEM_COMPLETED, payload);

export const removeItemFailed = (payload: any) =>
  result(KanbanActionTypes.REMOVE_ITEM_FAILED, payload);

export const moveItemRequest = (payload: IItemMove) =>
  result(KanbanActionTypes.MOVE_ITEM_REQUEST, payload);

export const moveItemCompleted = (payload: any) =>
  result(KanbanActionTypes.MOVE_ITEM_COMPLETED, payload);

export const moveItemFailed = (payload: any) =>
  result(KanbanActionTypes.MOVE_ITEM_FAILED, payload);

// Column
export const addColumnRequest = (payload: any) =>
  result(KanbanActionTypes.ADD_COLUMN_REQUEST, payload);

export const addColumnCompleted = (payload: any) =>
  result(KanbanActionTypes.ADD_COLUMN_COMPLETED, payload);

export const addColumnFailed = (payload: any) =>
  result(KanbanActionTypes.ADD_COLUMN_FAILED, payload);

export const removeColumnRequest = (payload: any) =>
  result(KanbanActionTypes.REMOVE_COLUMN_REQUEST, payload);

export const removeColumnCompleted = (payload: any) =>
  result(KanbanActionTypes.REMOVE_COLUMN_COMPLETED, payload);

export const removeColumnFailed = (payload: any) =>
  result(KanbanActionTypes.REMOVE_COLUMN_FAILED, payload);

export const moveColumnRequest = (payload: any) =>
  result(KanbanActionTypes.MOVE_COLUMN_REQUEST, payload);

export const moveColumnCompleted = (payload: any) =>
  result(KanbanActionTypes.MOVE_COLUMN_COMPLETED, payload);

export const moveColumnFailed = (payload: any) =>
  result(KanbanActionTypes.MOVE_COLUMN_FAILED, payload);
