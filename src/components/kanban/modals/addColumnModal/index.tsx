import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import Loader from "src/components/common/loader";
import ModalBase from "src/components/common/modal";

interface Props {
  open: boolean;
  setOpen: (arg: boolean) => void;
  boardId: number;
  timestamp: Date;
  isLoading: boolean;
  addColumn: (payload: KanbanColumnAddRequestDTO) => void;
}

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
  );
};

export default AddColumnModal;
