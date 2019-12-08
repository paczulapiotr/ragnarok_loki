import { Paper, TablePagination } from "@material-ui/core";
import { ApiUrls } from "api/urls";
import BoardLinkContainer from "components/board/boardLinkContainer/index";
import BoardLink from "components/board/boardLinkItem/index";
import Loader from "components/common/loader/index";
import SearchBar from "components/common/searchBar/index";
import React, { useCallback, useEffect, useState } from "react";
import { HttpResponseType } from "src/api";
import { authHttpGet } from "src/api/methods";
import "./style.scss";

const initialBoardState: PaginationList<BoardBaseResultDTO> = {
  list: [],
  page: 0,
  pageCount: 1,
  totalCount: 0
};
const rowSizeOptions = [10, 25, 50];

const BoardSearchPage = () => {
  const [boards, setBoards] = useState<PaginationList<BoardBaseResultDTO>>(
    initialBoardState
  );
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(rowSizeOptions[0]);
  const [owned, setOwned] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const getBoards = useCallback(
    async (ssearch: string, ppage: number, ppageSize: number, oowned) => {
      setIsLoading(true);
      const params: BoardBaseRequestDTO = {
        owned: oowned,
        page: ppage,
        pageSize: ppageSize,
        search: ssearch
      };
      const { response, type } = await authHttpGet(
        ApiUrls.Board.SEARCH,
        params
      );
      if (type === HttpResponseType.Ok) {
        setBoards(response.data);
      }
      setIsLoading(false);
    },
    []
  );

  const onChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newPage = 0;
    const newPageSize = Number(event.target.value);
    setPage(newPage);
    setPageSize(newPageSize);
    getBoards(search, newPage, newPageSize, owned);
  };

  const onSearch = (ssearch: string, oowned: boolean) => {
    setSearch(ssearch);
    setOwned(oowned);
    getBoards(ssearch, page, pageSize, oowned);
  };

  const pageUpdate = (_: any, ppage: number) => {
    setPage(ppage);
    getBoards(search, ppage, pageSize, owned);
  };

  useEffect(() => {
    getBoards(search, page, pageSize, owned);
  }, []);

  return (
    <div className="board-search-page">
      <Paper>
        <h1 className="board-search-title">Boards</h1>
        <SearchBar onSearch={onSearch} placeholder={"Board name"} />
        {isLoading ? (
          <Loader />
        ) : (
          <BoardLinkContainer className={"board-search-list"}>
            {boards.list.map((b: BoardBaseResultDTO) => (
              <BoardLink key={b.id} id={b.id} name={b.name} />
            ))}
          </BoardLinkContainer>
        )}
        <TablePagination
          component="div"
          page={page}
          rowsPerPage={pageSize}
          count={boards.totalCount}
          onChangePage={pageUpdate}
          rowsPerPageOptions={rowSizeOptions}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangeRowsPerPage={onChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default BoardSearchPage;
