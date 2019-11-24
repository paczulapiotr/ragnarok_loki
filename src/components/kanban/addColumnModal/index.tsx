import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import Loader from "src/components/common/loader";
import ModalBase from "src/components/common/modal";
import { addColumnRequest } from "src/store/kanban/actions";

interface OwnProps {
  open: boolean;
  setOpen: (arg: boolean) => void;
}

interface StateProps {
  boardId: number;
  timestamp: Date;
  isLoading: boolean;
}

interface DispatchProps {
  addColumn: (payload: KanbanColumnAddDTO) => void;
}

type Props = StateProps & DispatchProps & OwnProps;

const AddColumnModal = ({
  addColumn,
  boardId,
  timestamp,
  isLoading,
  open,
  setOpen
}: Props) => {
  const [columnName, setColumnName] = useState("");

  const actions: ModalButton[] = isLoading
    ? [{ content: "Cancel" }]
    : [
        {
          content: "Add",
          onClick: () => {
            addColumn({ name: columnName, boardId, timestamp });
            setColumnName("");
          }
        },
        { content: "Cancel" }
      ];

  return (
    <div>
      <ModalBase open={open} setOpen={setOpen} actions={actions}>
        {isLoading ? (
          <Loader />
        ) : (
          <TextField
            value={columnName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setColumnName(e.target.value)
            }
            placeholder={"Column name"}
            fullWidth
          />
        )}
      </ModalBase>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      addColumn: addColumnRequest
    },
    dispatch
  );

const mapStateToProps = (props: IRootState) => {
  const board = props.kanban.board;
  let isLoading;
  let boardId: number;
  let timestamp: Date;

  if (board == null) {
    isLoading = true;
    timestamp = new Date();
    boardId = -1;
  } else {
    isLoading = false;
    boardId = board.id;
    timestamp = board.timestamp;
  }

  return {
    boardId,
    timestamp,
    isLoading
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddColumnModal);
