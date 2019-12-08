import { Button, TextField, Typography } from "@material-ui/core";
import DeleteItemModal from "components/kanban/modals/deleteItemModal/index";
import React, { useState } from "react";
import FieldWrapper from "src/components/common/fieldWrapper";
import ModalContent from "src/components/common/modal/content";
import ModalFooter from "src/components/common/modal/footer";
import Comment from "src/components/kanban/comment";
import DeleteCommentModal from "../../deleteCommentModal";
import EditCommentModal from "../../editCommentModal";
import "./style.scss";
interface Props {
  itemName: string;
  itemDescription: string;
  itemAssigneeName: string;
  deleteItem: () => void;
  setOpen: (open: boolean) => void;
  toggleEditMode: () => void;
  comments: CommentDTO[];
  sendComment: (comment: string) => void;
  editComment: (commentId: number, content: string) => void;
  deleteComment: (commentId: number) => void;
}
const ItemDetailsView = ({
  itemName,
  itemDescription,
  itemAssigneeName,
  deleteItem,
  setOpen,
  sendComment,
  editComment,
  deleteComment,
  comments,
  toggleEditMode
}: Props) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteCommentModal, setDeleteCommentModal] = useState(false);
  const [editCommentModal, setEditCommentModal] = useState(false);
  // Comment modal state
  const [commentCreate, setCommentCreate] = useState("");
  const [commentEdit, setCommentEdit] = useState("");
  const [commentId, setCommentId] = useState(0);

  const prepareDeleteCommentModal = (ccommentId: number) => {
    setCommentId(ccommentId);
    setDeleteCommentModal(true);
  };

  const prepareEditCommentModal = (
    ccommentId: number,
    ccommentContent: string
  ) => {
    setCommentId(ccommentId);
    setCommentEdit(ccommentContent);
    setEditCommentModal(true);
  };

  const onItemDeleteHandler = () => {
    deleteItem();
    setOpen(false);
  };

  const onSendCommentHandler = () => {
    sendComment(commentCreate);
    setCommentCreate("");
  };
  const onDeleteCommentHandler = () => deleteComment(commentId);
  const onEditCommentHandler = (editedContent: string) =>
    editComment(commentId, editedContent);
  const actions: ModalButton[] = [
    {
      content: "Delete",
      onClick: () => {
        setDeleteModal(true);
      },
      shouldKeepModal: true
    },
    {
      content: "Edit",
      onClick: () => {
        toggleEditMode();
      },
      shouldKeepModal: true
    },
    { content: "Close" }
  ];

  return (
    <>
      <ModalContent modalTitle="Item details">
        <div className="item-modal-content">
          <FieldWrapper headerTitle="Item name:">
            <Typography variant="body1">{itemName}</Typography>
          </FieldWrapper>
          <FieldWrapper headerTitle="Description:">
            <Typography variant="body1">{itemDescription}</Typography>
          </FieldWrapper>
          <FieldWrapper headerTitle="Assignee:">
            <Typography variant="body1">{itemAssigneeName}</Typography>
          </FieldWrapper>
          <FieldWrapper headerTitle="Comments:" className="item-modal-comments">
            <div className="comments-container">
              {comments.map(c => (
                <Comment
                  key={c.id}
                  authorName={c.authorName}
                  content={c.content}
                  createdOn={c.createdOn}
                  editedOn={c.editedOn}
                  onDelete={() => prepareDeleteCommentModal(c.id)}
                  onEdit={() => prepareEditCommentModal(c.id, c.content)}
                  canModify={c.isOwner}
                />
              ))}
            </div>
            <div className="item-modal-send-comment">
              <TextField
                fullWidth
                placeholder="Write comment"
                value={commentCreate}
                onChange={e => setCommentCreate(e.target.value)}
              />
              <Button onClick={onSendCommentHandler}>Send</Button>
            </div>
          </FieldWrapper>
        </div>
        <DeleteItemModal
          onDelete={onItemDeleteHandler}
          open={deleteModal}
          setOpen={setDeleteModal}
          itemName={itemName}
        />
        <DeleteCommentModal
          open={deleteCommentModal}
          setOpen={setDeleteCommentModal}
          onDelete={onDeleteCommentHandler}
        />
        <EditCommentModal
          open={editCommentModal}
          setOpen={setEditCommentModal}
          comment={commentEdit}
          editComment={onEditCommentHandler}
        />
      </ModalContent>
      <ModalFooter setOpen={setOpen} actions={actions} />
    </>
  );
};

export default ItemDetailsView;
