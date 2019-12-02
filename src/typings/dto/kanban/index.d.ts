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
}

interface KanbanColumnEditRequestDTO {
  columnId: number;
  boardId: number;
  name: string;
}

interface KanbanColumnRemoveRequestDTO {
  columnId: number;
  boardId: number;
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
}

interface KanbanItemRemoveRequestDTO {
  itemId: number;
  boardId: number;
}

interface KanbanBoardLoadRequestDTO {
  boardId: number;
}

interface KanbanItemEditRequestDTO {
  itemId: number;
  boardId: number;
  name: string;
  description: string;
  assigneeId: number | null;
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

interface KanbanItemDetailsResultDTO {
  id: number;
  name: string;
  description: string;
  assignee: AppUserBaseResultDTO;
}
