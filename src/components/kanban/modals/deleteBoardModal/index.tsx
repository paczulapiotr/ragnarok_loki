import ModalBase from "components/common/modal";
import React from "react";
import ModalContent from "src/components/common/modal/content";
import ModalFooter from "src/components/common/modal/footer";

interface Props {
  open: boolean;
  setOpen: (arg: boolean) => void;
  boardName: string;
  isLoading: boolean;
  deleteBoard: () => void;
}

const DeleteBoardModal = ({ deleteBoard, boardName, open, setOpen }: Props) => {
  const actions: ModalButton[] = [
    {
      content: "Delete",
      onClick: () => {
        deleteBoard();
      }
    },
    { content: "Cancel" }
  ];
  return (
    <ModalBase open={open} setOpen={setOpen}>
      <ModalContent
        modalTitle="Confirmation"
        contentText={`Do you want to delete '${boardName}' board`}
      />
      <ModalFooter setOpen={setOpen} actions={actions} />
    </ModalBase>
  );
};

export default DeleteBoardModal;
