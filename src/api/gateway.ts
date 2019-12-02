import { HttpResponseType } from ".";
import { authHttpGet } from "./methods";
import { ApiUrls } from "./urls";

export const searchNewBoardUsers = async (
  name: string,
  boardId: number,
  setUsers: (users: AppUserBaseResultDTO[]) => void,
  setIsLoading: (isLoading: boolean) => void,
  page: number = 0,
  pageSize: number = 5,
  ignoreUserIds?: number[]
) => {
  setIsLoading(true);
  const params: AppUserBaseRequestDTO = {
    name,
    ignoreUserIds,
    boardId: boardId || null,
    page,
    pageSize
  };
  const { type, response } = await authHttpGet(
    ApiUrls.Board.NEW_PARTICIPANTS,
    params
  );
  if (type === HttpResponseType.Ok) {
    const users = (response.data as PaginationList<AppUserBaseResultDTO>).list;
    setUsers(users);
  }
  setIsLoading(false);
};

export const getBoardUsers = async (
  name: string,
  boardId: number,
  setUsers: (users: AppUserBaseResultDTO[]) => void,
  setIsLoading: (isLoading: boolean) => void,
  page: number = 0,
  pageSize: number = 5
) => {
  setIsLoading(true);
  const params: AppUserBaseRequestDTO = {
    name,
    boardId,
    page,
    pageSize
  };
  const { type, response } = await authHttpGet(
    ApiUrls.Board.PARTICIPANTS,
    params
  );
  if (type === HttpResponseType.Ok) {
    const users = (response.data as PaginationList<AppUserBaseResultDTO>).list;
    setUsers(users);
  }
  setIsLoading(false);
};
