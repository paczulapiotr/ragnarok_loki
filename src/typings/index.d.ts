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

interface IAppRoute {
  path: string;
  name: string;
  icon: ((...args: any[]) => JSX.Element) | string;
  component: (...args: any[]) => JSX.Element;
}
