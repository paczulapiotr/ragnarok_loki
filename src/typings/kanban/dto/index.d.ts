interface KanbanItemMoveDTO {
  boardId: number;
  itemId: number;
  columnDestId?: number;
  index: number;
  timestamp: Date;
}

interface KanbanColumnMoveDTO {
  columnId: number;
  index: number;
  boardId: number;
  timestamp: Date;
}

interface KanbanColumnAddDTO {
  name: string;
  boardId: number;
  timestamp: Date;
}

interface KanbanItemAddDTO {
  name: string;
  boardId: number;
  columnId: number;
  timestamp: Date;
}

interface KanbanBoardDTO {
  id: number;
  name: string;
  timestamp: Date;
  columns: KanbanColumnDTO[];
}

interface KanbanColumnDTO {
  id: number;
  name: string;
  index: number;
  items: KanbanItemDTO[];
  timestamp: Date;
}

interface KanbanItemDTO {
  id: number;
  name: string;
  index: number;
  timestamp: Date;
}

interface KanbanItemRemoveDTO {
  itemId: number;
  boardId: number;
  timestamp: Date;
}

interface KanbanColumnRemoveDTO {
  columnId: number;
  boardId: number;
  timestamp: Date;
}

interface KanbanBoardLoadDTO {
  boardId: number;
}
