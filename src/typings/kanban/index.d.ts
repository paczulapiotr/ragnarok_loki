interface IKanbanState {
  columns: IKanbanColumn[];
  items: IKanbanItemContainer | undefined;
  canEditColumns: boolean;
  isSaving: boolean;
  timestamp: number;
}

interface IKanbanItemContainer {
  [key: string]: IKanbanItem[];
}

interface IKanbanColumn {
  id: number;
  index: number;
  name: string;
}

interface IKanbanItem {
  id: number;
  index: number;
  name: string;
}

interface IItemMove {
  itemId: number;
  columnDestId: number;
  indexDest: number;
  version: string;
}
