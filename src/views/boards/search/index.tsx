import React, { useEffect, useState } from "react";
import { HttpResponseType } from "src/api";
import { authHttpGet } from "src/api/methods";
import ApiUrls from "src/api/urls";
import { ClientUrls } from "src/routes";
import { Link } from "react-router-dom";

const BoardSearchPage = () => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    (async () => {
      const params: BoardBaseRequestDTO = {
        owned: true,
        page: 1,
        pageSize: 100,
        search: ""
      };
      const { response, type } = await authHttpGet(
        ApiUrls.Board.SEARCH,
        params
      );
      if (type === HttpResponseType.Ok) {
        setBoards(response.data);
      }
    })();
  }, []);

  return (
    <div>
      <h1>Boards</h1>
      {boards.map((b: BoardBaseResultDTO) => (
        <div key={b.id}>
          <Link to={`${ClientUrls.Board.EDIT}/${b.id}`}>{b.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default BoardSearchPage;
