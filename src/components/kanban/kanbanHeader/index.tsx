import { FormControlLabel, IconButton, Switch, Paper } from "@material-ui/core";
import { Refresh } from "@material-ui/icons";
import KanbanContextMenu from "components/kanban/contextMenu";
import React from "react";
import { loadBoardRequest } from "src/store/kanban/actions";
import "./style.scss";
interface Props {
  boardId: number;
  setCanEditColumns: (can: boolean) => void;
  canEditColumns: boolean;
}

const KanbanHeader = ({
  boardId,
  canEditColumns,
  setCanEditColumns
}: Props) => {
  return (
    <Paper className="kanban-header">
      <div className="kanban-header-left">
        <IconButton onClick={() => loadBoardRequest({ boardId })}>
          <Refresh />
        </IconButton>
        <FormControlLabel
          control={
            <Switch
              checked={canEditColumns}
              onChange={() => setCanEditColumns(!canEditColumns)}
            />
          }
          label="Move Columns"
        />
      </div>
      <KanbanContextMenu boardId={boardId} />
    </Paper>
  );
};

export default KanbanHeader;
