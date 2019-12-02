import ModalBase from "components/common/modal";
import React from "react";
import ModalContent from "src/components/common/modal/content";
import ModalFooter from "src/components/common/modal/footer";

interface Props {
  open: boolean;
  setOpen: (arg: boolean) => void;
  columnId: number;
  boardId: number;
  columnName: string;
  isLoading: boolean;
  deleteColumn: (payload: KanbanColumnRemoveRequestDTO) => void;
}

const DeleteColumnModal = ({
  deleteColumn,
  columnId,
  columnName,
  boardId,
  open,
  setOpen
}: Props) => {
  const actions: ModalButton[] = [
    {
      content: "Delete",
      onClick: () => {
        deleteColumn({ boardId, columnId });
      }
    },
    { content: "Cancel" }
  ];
  return (
    <ModalBase open={open} setOpen={setOpen}>
      <ModalContent
        modalTitle="Confirmation"
        contentText={`Do you want to delete '${columnName}' column`}
      />
      <ModalFooter setOpen={setOpen} actions={actions} />
    </ModalBase>
  );
};

export default DeleteColumnModal;
