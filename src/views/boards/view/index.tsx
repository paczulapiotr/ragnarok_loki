import KanbanBoard from "components/kanban/board/index";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router";

interface RoutePatams {
  boardId: string;
}

const KanbanViewPage = ({ match }: RouteComponentProps<RoutePatams>) => {
  const boardId = Number(match.params.boardId);

  return <KanbanBoard boardId={boardId} />;
};

export default withRouter(KanbanViewPage);
