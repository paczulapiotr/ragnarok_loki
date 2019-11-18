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

interface ISidebarAppRoute extends IAppRoute {
  icon: ((...args: any[]) => JSX.Element) | string;
}

interface IAppRoute {
  path: string;
  name: string;
  component: (...args: any[]) => JSX.Element;
}

// DTO
interface PaginationList<T> {
  list: T[];
  page: number;
  pageCount: number;
  totalCount: number;
}
interface AppUserBaseResultDTO {
  id: number;
  name: string;
}
interface BoardBaseResultDTO {
  id: number;
  name: string;
}
interface BoardBaseRequestDTO {
  owned: boolean;
  page: number;
  pageSize: number;
  search: string;
}
interface EditBoardParticipantsRequestDTO {
  id: number;
  participantIds: number[];
}
interface EditBoardRequestDTO {
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

interface AppUserBaseResultDto {
  id: number;
  name: string;
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
