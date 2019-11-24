import ModalBase from "components/common/modal";
import React from "react";

interface Props {
  open: boolean;
  setOpen: (arg: boolean) => void;
  columnId: number;
  boardId: number;
  columnName: string;
  timestamp: Date;
  isLoading: boolean;
  deleteColumn: (payload: KanbanColumnRemoveRequestDTO) => void;
}

const DeleteColumnModal = ({
  deleteColumn,
  columnId,
  columnName,
  timestamp,
  boardId,
  open,
  setOpen
}: Props) => {
  const actions: ModalButton[] = [
    {
      content: "Delete",
      onClick: () => {
        deleteColumn({ boardId, columnId, timestamp });
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
      contentText={`Do you want to delete '${columnName}' column`}
    />
  );
};

export default DeleteColumnModal;
