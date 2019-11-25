import ModalBase from "components/common/modal";
import React from "react";

interface Props {
  open: boolean;
  setOpen: (arg: boolean) => void;
  itemId: number;
  boardId: number;
  itemName: string;
  timestamp: Date;
  isLoading: boolean;
  deleteItem: (payload: KanbanItemRemoveRequestDTO) => void;
}

const deleteItemModal = ({
  open,
  setOpen,
  deleteItem,
  boardId,
  itemId,
  timestamp,
  isLoading,
  itemName
}: Props) => {
  const actions: ModalButton[] = [
    {
      content: "Delete",
      onClick: () => {
        deleteItem({ boardId, itemId, timestamp });
      }
    },
    { content: "Cancel" }
  ];

  return (
    <ModalBase
      modalTitle="Confirmation"
      open={open}
      setOpen={setOpen}
      actions={actions}
    />
  );
};

export default deleteItemModal;
