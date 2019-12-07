import { Button, TextField, Typography } from "@material-ui/core";
import DeleteItemModal from "components/kanban/modals/deleteItemModal/index";
import React, { useState } from "react";
import FieldWrapper from "src/components/common/fieldWrapper";
import ModalContent from "src/components/common/modal/content";
import ModalFooter from "src/components/common/modal/footer";
import Comment from "src/components/kanban/comment";
import "./style.scss";
interface Props {
  itemName: string;
  itemDescription: string;
  itemAssigneeName: string;
  deleteItem: () => void;
  setOpen: (open: boolean) => void;
  toggleEditMode: () => void;
  // comments: CommentDTO[];
}
const ItemDetailsView = ({
  itemName,
  itemDescription,
  itemAssigneeName,
  deleteItem,
  setOpen,

  toggleEditMode
}: Props) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [comment, setComment] = useState("");
  const onDeleteHandler = () => {
    deleteItem();
    toggleEditMode();
    setOpen(false);
  };
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
  const comments: CommentDTO[] = [
    {
      content: "Com content 1",
      id: 1,
      authorId: 1,
      authorName: "Jay Doe",
      createdOn: new Date()
    },
    {
      content: "Com content 2",
      id: 1,
      authorId: 1,
      authorName: "Janice Doe",
      createdOn: new Date(),
      editedOn: new Date()
    },
    {
      content: "Com content 2",
      id: 1,
      authorId: 1,
      authorName: "Janice Doe",
      createdOn: new Date(),
      editedOn: new Date()
    },
    {
      content: "Com content 2",
      id: 1,
      authorId: 1,
      authorName: "Janice Doe",
      createdOn: new Date(),
      editedOn: new Date()
    }
  ];
  const sendComment = () => {};

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
                  onDelete={() => {}}
                  onEdit={() => {}}
                />
              ))}
            </div>
            <div className="item-modal-send-comment">
              <TextField
                fullWidth
                placeholder="Write comment"
                value={comment}
                onChange={e => setComment(e.target.value)}
              />
              <Button onClick={sendComment}>Send</Button>
            </div>
          </FieldWrapper>
        </div>
        <DeleteItemModal
          onDelete={onDeleteHandler}
          open={deleteModal}
          setOpen={setDeleteModal}
          itemName={itemName}
        />
      </ModalContent>
      <ModalFooter setOpen={setOpen} actions={actions} />
    </>
  );
};

export default ItemDetailsView;
