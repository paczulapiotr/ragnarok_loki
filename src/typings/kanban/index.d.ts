interface IKanbanState {
  board: IKanbanBoard | undefined;
  canEditColumns: boolean;
  isSaving: boolean;
  version: number;
}

interface IIndexable {
  index: number;
}

interface IKanbanBoard {
  id: number;
  name: string;
  droppableId: string;
  columns: IKanbanColumn[];
  timestamp: Date;
}

interface IKanbanColumn extends IIndexable {
  id: number;
  index: number;
  draggableId: string;
  droppableId: string;
  name: string;
  timestamp: Date;
  items: IKanbanItem[];
}

interface IKanbanItem extends IIndexable {
  id: number;
  draggableId: string;
  index: number;
  name: string;
  timestamp: Date;
}
