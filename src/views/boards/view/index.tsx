import KanbanBoard from "components/kanban/board/index";
import KanbanContextMenu from "components/kanban/contextMenu/index";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
interface RoutePatams {
  boardId: string;
}

const KanbanViewPage = ({ match }: RouteComponentProps<RoutePatams>) => {
  const boardId = Number(match.params.boardId);

  return (
    <>
      <KanbanContextMenu boardId={boardId} />
      <KanbanBoard boardId={boardId} />
    </>
  );
};

export default withRouter(KanbanViewPage);
