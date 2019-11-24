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

interface AppUserBaseRequestDTO {
  name: string;
  ignoreUserIds: number[];
  boardId: number | null;
  page: number | null;
  pageSize: number | null;
}

interface AppUserBaseResultDto {
  id: number;
  name: string;
}
