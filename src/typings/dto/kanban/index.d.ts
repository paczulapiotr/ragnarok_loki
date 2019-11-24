// Requests
interface KanbanColumnMoveRequestDTO {
  columnId: number;
  index: number;
  boardId: number;
  timestamp: Date;
}

interface KanbanColumnAddRequestDTO {
  name: string;
  boardId: number;
  timestamp: Date;
}

interface KanbanColumnRemoveRequestDTO {
  columnId: number;
  boardId: number;
  timestamp: Date;
}

interface KanbanItemMoveRequestDTO {
  boardId: number;
  itemId: number;
  columnDestId?: number;
  index: number;
  timestamp: Date;
}

interface KanbanItemAddRequestDTO {
  name: string;
  boardId: number;
  columnId: number;
  timestamp: Date;
}

interface KanbanItemRemoveRequestDTO {
  itemId: number;
  boardId: number;
  timestamp: Date;
}

interface KanbanBoardLoadRequestDTO {
  boardId: number;
}

// Results

interface KanbanBoardResultDTO {
  id: number;
  name: string;
  timestamp: Date;
  columns: KanbanColumnResultDTO[];
}

interface KanbanColumnResultDTO {
  id: number;
  name: string;
  index: number;
  items: KanbanItemResultDTO[];
}

interface KanbanItemResultDTO {
  id: number;
  name: string;
  index: number;
}
