export interface KanbanItemMoveDTO {
  boardId: number;
  itemId: number;
  columnDestId?: number;
  index: number;
  timestamp: Date;
}

export interface KanbanColumnMoveDTO {
  columnId: number;
  index: number;
  boardId: number;
  timestamp: Date;
}

export interface KanbanColumnAddDTO {
  name: string;
  boardId: number;
  timestamp: Date;
}

export interface KanbanItemAddDTO {
  name: string;
  boardId: number;
  columnId: number;
  timestamp: Date;
}

export interface KanbanBoardDTO {
  id: number;
  name: string;
  timestamp: Date;
  columns: KanbanColumnDTO[];
}

export interface KanbanColumnDTO {
  id: number;
  name: string;
  index: number;
  items: KanbanItemDTO[];
  timestamp: Date;
}

export interface KanbanItemDTO {
  id: number;
  name: string;
  index: number;
  timestamp: Date;
}

export interface KanbanItemRemoveDTO {
  itemId: number;
  boardId: number;
  timestamp: Date;
}

export interface KanbanColumnRemoveDTO {
  columnId: number;
  boardId: number;
  timestamp: Date;
}

export interface KanbanBoardLoadDTO {
  boardId: number;
}
