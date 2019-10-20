interface IKanbanState {
  columns: IKanbanColumn[];
  items: IKanbanItemContainer | undefined;
  canEditColumns: boolean;
  isSaving: boolean;
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
