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

interface AppUserBaseRequestDTO {
  name: string;
  ignoreUserIds?: number[];
  boardId: number | null;
  page?: number;
  pageSize?: number;
}
