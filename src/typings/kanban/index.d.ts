interface IKanbanState {
  columns: IKanbanColumn[] | undefined;
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
  timestamp: Date;
}

interface IKanbanColumn extends IIndexable {
  id: number;
  name: string;
  timestamp: Date;
  items: IKanbanItem[];
}

interface IKanbanItem extends IIndexable {
  id: number;
  name: string;
  timestamp: Date;
}

interface IItemMove {
  itemId: number;
  columnDestId: number;
  indexDest: number;
  timestamp: Date;
}

interface IColumnMove {
  columnId: number;
  indexDest: number;
  timestamp: Date;
}
