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

// DTO
interface AppUserBaseResultDTO {
  id: number;
  name: string;
}
// DTO
interface AppUserBaseRequestDTO {
  name: string;
  ignoreUserIds: number[];
  boardId: number | undefined;
  page: number | undefined;
  pageSize: number | undefined;
}

// API
interface IHeaders {
  [key: string]: string;
}

interface IApiResponse {
  type: HttpResponseType;
  response: IApiData;
}
interface IApiData {
  data: any;
  messages: IApiMessage[];
}

interface IApiMessage {
  text: string;
  type: ApiMessageType;
}
