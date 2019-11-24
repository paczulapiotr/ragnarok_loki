import KanbanMenu from "components/common/menu/index";
import _ from "lodash";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { HttpResponseType } from "src/api";
import { authHttpDelete } from "src/api/methods";
import { ApiUrls, ClientUrls } from "src/api/urls";
import AddColumnModal from "src/components/kanban/addColumnModal";

interface Props {
  boardId: number;
}
const KanbanContextMenu = ({ boardId }: Props) => {
  const [addColumnOpen, setAddColumnOpen] = useState(false);
  const history = useHistory();

  const removeBoard = useCallback(
    _.debounce((id: number) => {
      (async () => {
        const { type } = await authHttpDelete(`${ApiUrls.Board.REMOVE}/${id}`);
        if (type === HttpResponseType.Ok) {
          history.push(`${ClientUrls.Board.SEARCH}`);
        }
      })();
    }, boardId),
    [boardId]
  );

  const items: MenuItem[] = [
    {
      content: "Add column",
      onClick: () => {
        setAddColumnOpen(true);
      }
    },
    {
      content: "Edit board",
      onClick: () => {
        history.push(`${ClientUrls.Board.EDIT}/${boardId}`);
      }
    },
    {
      content: "Delete board",
      onClick: () => {
        removeBoard(boardId);
      }
    }
  ];

  return (
    <>
      <KanbanMenu items={items} />
      <AddColumnModal open={addColumnOpen} setOpen={setAddColumnOpen} />
    </>
  );
};

export default KanbanContextMenu;
