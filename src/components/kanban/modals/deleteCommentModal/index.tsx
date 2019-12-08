import ModalBase from "components/common/modal";
import React from "react";
import ModalContent from "src/components/common/modal/content";
import ModalFooter from "src/components/common/modal/footer";

interface Props {
  onDelete: () => void;
  open: boolean;
  setOpen: (arg: boolean) => void;
}

const DeleteCommentModal = ({ open, setOpen, onDelete }: Props) => {
  const actions: ModalButton[] = [
    {
      content: "Delete",
      onClick: onDelete
    },
    { content: "Cancel" }
  ];

  return (
    <ModalBase open={open} setOpen={setOpen}>
      <ModalContent
        modalTitle="Confirmation"
        contentText={`Do you want to delete comment`}
      />
      <ModalFooter setOpen={setOpen} actions={actions} />
    </ModalBase>
  );
};

export default DeleteCommentModal;
