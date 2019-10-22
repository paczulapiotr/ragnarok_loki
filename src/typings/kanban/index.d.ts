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
  id: string;
  name: string;
  timestamp: Date;
}

interface IKanbanColumn extends IIndexable {
  id: string;
  name: string;
  timestamp: Date;
  items: IKanbanItem[];
}

interface IKanbanItem extends IIndexable {
  id: string;
  name: string;
  timestamp: Date;
}

interface IItemMove {
  itemId: string;
  columnDestId: string;
  indexDest: number;
  timestamp: Date;
}

interface IColumnMove {
  columnId: string;
  indexDest: number;
  timestamp: Date;
}
