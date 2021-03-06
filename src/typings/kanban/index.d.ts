interface IKanbanState {
  board: IKanbanBoard;
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
  isOwner: boolean;
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
  items: IKanbanItem[];
}

interface IKanbanItem extends IIndexable {
  id: number;
  draggableId: string;
  index: number;
  name: string;
  assigneeName: string;
}

interface IDropResult {
  draggableId: string;
  source: IDropSource;
  destination: IDropDestination;
}

interface IDropDestination {
  index: number;
  droppableId: string;
}

interface IDropSource {
  index: number;
  droppableId: string;
}
