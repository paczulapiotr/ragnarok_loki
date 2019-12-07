import {
  FormControlLabel,
  IconButton,
  Switch,
  Paper,
  Typography
} from "@material-ui/core";
import { Refresh } from "@material-ui/icons";
import KanbanContextMenu from "components/kanban/contextMenu";
import React from "react";
import { loadBoardRequest } from "src/store/kanban/actions";
import "./style.scss";
interface Props {
  boardId: number;
  boardName: string;
  setCanEditColumns: (can: boolean) => void;
  canEditColumns: boolean;
}

const KanbanHeader = ({
  boardId,
  boardName,
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
        <Typography className="kanban-header-name">{boardName}</Typography>
      </div>
      <KanbanContextMenu boardId={boardId} />
    </Paper>
  );
};

export default KanbanHeader;
