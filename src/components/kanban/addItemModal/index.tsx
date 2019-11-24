import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import Loader from "src/components/common/loader";
import ModalBase from "src/components/common/modal";

interface Props {
  open: boolean;
  setOpen: (arg: boolean) => void;
  columnId: number;
  boardId: number;
  timestamp: Date;
  isLoading: boolean;
  addItem: (payload: KanbanItemAddRequestDTO) => void;
}

const AddItemModal = ({
  open,
  setOpen,
  boardId,
  timestamp,
  isLoading,
  columnId,
  addItem
}: Props) => {
  const [itemName, setItemName] = useState("");
  const actions: ModalButton[] = [
    {
      content: "Add",
      onClick: () => {
        addItem({ boardId, timestamp, columnId, name: itemName });
        setItemName("");
      }
    },
    { content: "Cancel" }
  ];

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemName(e.target.value);
  };

  return (
    <ModalBase
      modalTitle="Add item"
      open={open}
      setOpen={setOpen}
      actions={actions}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <TextField
          value={itemName}
          onChange={onChange}
          placeholder={"Item name"}
          fullWidth
        />
      )}
    </ModalBase>
  );
};

export default AddItemModal;
