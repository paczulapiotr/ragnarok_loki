import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import Loader from "src/components/common/loader";
import ModalBase from "src/components/common/modal";
import ModalContent from "src/components/common/modal/content";
import ModalFooter from "src/components/common/modal/footer";

interface Props {
  open: boolean;
  setOpen: (arg: boolean) => void;
  columnId: number;
  boardId: number;
  isLoading: boolean;
  addItem: (payload: KanbanItemAddRequestDTO) => void;
}

const AddItemModal = ({
  open,
  setOpen,
  boardId,
  isLoading,
  columnId,
  addItem
}: Props) => {
  const [itemName, setItemName] = useState("");
  const actions: ModalButton[] = [
    {
      content: "Add",
      onClick: () => {
        addItem({ boardId, columnId, name: itemName });
        setItemName("");
      }
    },
    { content: "Cancel" }
  ];

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemName(e.target.value);
  };

  return (
    <ModalBase open={open} setOpen={setOpen}>
      <ModalContent modalTitle="Add item">
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
      </ModalContent>
      <ModalFooter setOpen={setOpen} actions={actions} />
    </ModalBase>
  );
};

export default AddItemModal;
