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

export const moveRequest = (
  boardId: number,
  boardTimestamp: Date,
  result: DropResult,
  columns: IKanbanColumn[],
  columnSetter: (columns: IKanbanColumn[]) => void,
  moveItem: (arg: KanbanItemMoveRequestDTO) => void,
  moveColumn: (arg: KanbanColumnMoveRequestDTO) => void
): void => {
  const { destination, draggableId, source } = result;
  if (destination == null) {
    return;
  }

  // dnd target source
  const { index: srcIndex, droppableId: srcDroppableId } = source;
  const { id: srcId } = dndIdentifierDecoder(srcDroppableId);

  // dnd target type
  const { id: targetId, idType: targetType } = dndIdentifierDecoder(
    draggableId
  );

  // dnd target destination
  const { index: destIndex, droppableId: destDroppableId } = destination;
  const { id: destId, idType: destType } = dndIdentifierDecoder(
    destDroppableId
  );

  // Item move
  if (
    targetType === IdentifierType.ITEM &&
    destType === IdentifierType.COLUMN
  ) {
    moveItemLocal(targetId, srcId, destId, destIndex, columns, columnSetter);
    moveItem({
      boardId,
      index: destIndex,
      columnDestId: destId,
      itemId: targetId,
      timestamp: boardTimestamp
    });
  } else if (
    // Column move
    targetType === IdentifierType.COLUMN &&
    destType === IdentifierType.BOARD
  ) {
    moveColumnLocal(srcIndex, destIndex, columns, columnSetter);
    moveColumn({
      boardId,
      index: destIndex,
      columnId: targetId,
      timestamp: boardTimestamp
    });
  }
};

const moveItemLocal = (
  itemId: number,
  srcId: number,
  destId: number,
  index: number,
  columns: IKanbanColumn[],
  columnSetter: (newColumns: IKanbanColumn[]) => void
) => {
  const columnsCopy = JSON.parse(JSON.stringify(columns));
  const srcColumn = getColumn(columnsCopy, srcId);
  if (!srcColumn) {
    return;
  }
  const srcItems = srcColumn.items;
  const indexToMove = srcItems.findIndex(x => x.id === itemId);
  const toMove = srcItems.splice(indexToMove, 1)[0];
  remapIndexes(srcItems);

  const destColumn = getColumn(columnsCopy, destId);
  if (!destColumn) {
    return;
  }
  const destItems = destColumn.items;
  destItems.splice(index, 0, toMove);

  remapIndexes(destItems);
  columnSetter(columnsCopy);
};

const moveColumnLocal = (
  srcIndex: number,
  destIndex: number,
  columns: IKanbanColumn[],
  columnSetter: (newColumns: IKanbanColumn[]) => void
) => {
  const columnsCopy = JSON.parse(JSON.stringify(columns));
  const toMove = columnsCopy.splice(srcIndex, 1)[0]; // remove column
  columnsCopy.splice(destIndex, 0, toMove); // add column
  remapIndexes(columnsCopy);
  columnSetter(columnsCopy);
};

const getColumn = (columns: IKanbanColumn[], colId: number): IKanbanColumn => {
  return columns.find(x => x.id === colId)!;
};

const remapIndexes = (array: IIndexable[]) =>
  array.forEach((element, index) => {
    element.index = index;
  });
