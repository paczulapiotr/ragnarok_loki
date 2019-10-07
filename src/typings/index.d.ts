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
