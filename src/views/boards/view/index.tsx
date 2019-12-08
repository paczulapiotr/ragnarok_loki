import KanbanBoard from "components/kanban";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import "./style.scss";

interface RouteParams {
  boardId: string;
}

const KanbanViewPage = ({ match }: RouteComponentProps<RouteParams>) => {
  const boardId = Number(match.params.boardId);

  return (
    <div className="kanban-board-view-page">
      <KanbanBoard boardId={boardId} />
    </div>
  );
};

export default withRouter(KanbanViewPage);
