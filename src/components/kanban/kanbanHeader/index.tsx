import {
  FormControlLabel,
  IconButton,
  Paper,
  Switch,
  Typography
} from "@material-ui/core";
import { Refresh } from "@material-ui/icons";
import KanbanContextMenu from "components/kanban/contextMenu";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { loadBoardRequest } from "src/store/kanban/actions";
import "./style.scss";

interface Props {
  boardId: number;
  boardName: string;
  setCanEditColumns: (can: boolean) => void;
  canEditColumns: boolean;
}
interface DispatchProps {
  refreshBoard: (payload: KanbanBoardLoadRequestDTO) => void;
}

type MergedProps = Props & DispatchProps;

const KanbanHeader = ({
  refreshBoard,
  boardId,
  boardName,
  canEditColumns,
  setCanEditColumns
}: MergedProps) => {
  return (
    <Paper className="kanban-header">
      <div className="kanban-header-left">
        <IconButton onClick={() => refreshBoard({ boardId })}>
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

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ refreshBoard: loadBoardRequest }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(KanbanHeader);
