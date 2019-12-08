import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ModalBase from "src/components/common/modal";
import ModalContent from "src/components/common/modal/content";
import ModalFooter from "src/components/common/modal/footer";

interface Props {
  open: boolean;
  comment: string;
  setOpen: (arg: boolean) => void;
  editComment: (columnName: string) => void;
}

const EditCommentModal = ({ comment, open, setOpen, editComment }: Props) => {
  const [commentContent, setCommentContent] = useState(comment);
  useEffect(() => {
    setCommentContent(comment);
  }, [comment]);

  const actions: ModalButton[] = [
    {
      content: "Save",
      onClick: () => {
        editComment(commentContent);
        setCommentContent(comment);
      }
    },
    { content: "Cancel" }
  ];

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentContent(e.target.value);
  };

  return (
    <ModalBase open={open} setOpen={setOpen}>
      <ModalContent modalTitle={`Edit comment`}>
        <TextField
          value={commentContent}
          onChange={onChange}
          placeholder={"Comment content"}
          fullWidth
        />
      </ModalContent>
      <ModalFooter setOpen={setOpen} actions={actions} />
    </ModalBase>
  );
};

export default EditCommentModal;
