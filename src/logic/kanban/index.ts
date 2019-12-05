import { DropResult } from "react-beautiful-dnd";

const DROP_BOARD_PREFIX = "droppable_kanban_";
const DROP_COLUMN_PREFIX = "droppable_column_";
const DRAG_COLUMN_PREFIX = "draggable_column_";
const DRAG_ITEM_PREFIX = "draggable_item_";

export const getDroppableBoardId = (id: number) => DROP_BOARD_PREFIX + id;
export const getDroppableColumnId = (id: number) => DROP_COLUMN_PREFIX + id;
export const getDraggableColumnId = (id: number) => DRAG_COLUMN_PREFIX + id;
export const getDraggableItemId = (id: number) => DRAG_ITEM_PREFIX + id;

export enum IdentifierType {
  BOARD,
  ITEM,
  COLUMN
}
export enum DndType {
  DRAG,
  DROP
}
interface DndDecodingResult {
  idType: IdentifierType;
  dndType: DndType;
  id: number;
}
const dndRegexFactory = (prefix: string): RegExp =>
  new RegExp(`^${prefix}(\\d+)$`);

const dndIdentifierDecoder = (identifier: string): DndDecodingResult => {
  let id = 0;

  let regex = dndRegexFactory(DROP_BOARD_PREFIX);
  if (regex.test(identifier)) {
    id = Number(regex.exec(identifier)!.pop());
    return {
      id,
      idType: IdentifierType.BOARD,
      dndType: DndType.DROP
    };
  }

  regex = dndRegexFactory(DROP_COLUMN_PREFIX);
  if (regex.test(identifier)) {
    id = Number(regex.exec(identifier)!.pop());
    return {
      id,
      idType: IdentifierType.COLUMN,
      dndType: DndType.DROP
    };
  }
  regex = dndRegexFactory(DRAG_COLUMN_PREFIX);
  if (regex.test(identifier)) {
    id = Number(regex.exec(identifier)!.pop());
    return {
      id,
      idType: IdentifierType.COLUMN,
      dndType: DndType.DRAG
    };
  }

  regex = dndRegexFactory(DRAG_ITEM_PREFIX);
  if (regex.test(identifier)) {
    id = Number(regex.exec(identifier)!.pop());
    return {
      id,
      idType: IdentifierType.ITEM,
      dndType: DndType.DRAG
    };
  }

  throw Error("Unknown dnd action");
};

export const move = (
  boardId: number,
  boardTimestamp: Date,
  result: DropResult,
  moveItem: (arg: KanbanItemMoveRequestDTO) => void,
  moveColumn: (arg: KanbanColumnMoveRequestDTO) => void
): void => {
  const { destination, draggableId } = result;
  if (destination == null) {
    return;
  }
  // dnd target type
  const { id: targetId, idType: targetType } = dndIdentifierDecoder(
    draggableId
  );

  // target destination
  const { index, droppableId } = destination;
  const { id: destId, idType: destType } = dndIdentifierDecoder(droppableId);

  // Item move
  if (
    targetType === IdentifierType.ITEM &&
    destType === IdentifierType.COLUMN
  ) {
    moveItem({
      boardId,
      index,
      columnDestId: destId,
      itemId: targetId,
      timestamp: boardTimestamp
    });
  } else if (
    // Column move
    targetType === IdentifierType.COLUMN &&
    destType === IdentifierType.BOARD
  ) {
    moveColumn({
      boardId,
      index,
      columnId: targetId,
      timestamp: boardTimestamp
    });
  }
};
