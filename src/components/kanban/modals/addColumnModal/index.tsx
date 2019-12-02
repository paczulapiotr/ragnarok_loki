import { TextField } from "@material-ui/core";
import Loader from "components/common/loader";
import ModalBase from "components/common/modal";
import ModalContent from "components/common/modal/content";
import ModalFooter from "components/common/modal/footer";
import React, { useState } from "react";
interface Props {
  open: boolean;
  setOpen: (arg: boolean) => void;
  boardId: number;
  isLoading: boolean;
  addColumn: (payload: KanbanColumnAddRequestDTO) => void;
}

const AddColumnModal = ({
  addColumn,
  boardId,
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
            addColumn({ name: columnName, boardId });
            setColumnName("");
          }
        },
        { content: "Cancel" }
      ];

  return (
    <ModalBase open={open} setOpen={setOpen}>
      <ModalContent>
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
      </ModalContent>
      <ModalFooter setOpen={setOpen} actions={actions} />
    </ModalBase>
  );
};

export default AddColumnModal;
