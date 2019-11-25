import ModalBase from "components/common/modal";
import React from "react";

interface Props {
  onDelete: () => void;
  open: boolean;
  setOpen: (arg: boolean) => void;
  itemId: number;
  boardId: number;
  itemName: string;
  timestamp: Date;
  deleteItem: (payload: KanbanItemRemoveRequestDTO) => void;
}

const deleteItemModal = ({
  open,
  setOpen,
  onDelete,
  deleteItem,
  boardId,
  itemId,
  timestamp,
  itemName
}: Props) => {
  const actions: ModalButton[] = [
    {
      content: "Delete",
      onClick: () => {
        deleteItem({ boardId, itemId, timestamp });
        onDelete();
      }
    },
    { content: "Cancel" }
  ];

  return (
    <ModalBase
      modalTitle="Confirmation"
      open={open}
      setOpen={setOpen}
      contentText={`Do you want to delete '${itemName}' item`}
      actions={actions}
    />
  );
};

export default deleteItemModal;
