import { Button, FormControlLabel, Switch } from "@material-ui/core";
import KanbanContextMenu from "components/kanban/contextMenu";
import React from "react";
import { loadBoardRequest } from "src/store/kanban/actions";

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
    <div className="kanban-header">
      <KanbanContextMenu boardId={boardId} />
      <Button onClick={() => loadBoardRequest({ boardId })}>REFRESH</Button>
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
  );
};

export default KanbanHeader;
