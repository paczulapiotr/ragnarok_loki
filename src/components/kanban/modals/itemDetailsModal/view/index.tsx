import { Typography } from "@material-ui/core";
import DeleteItemModal from "components/kanban/modals/deleteItemModal/index";
import React, { useState } from "react";
import ModalContent from "src/components/common/modal/content";
import ModalFooter from "src/components/common/modal/footer";
import TextLabel from "src/components/common/label";

interface Props {
  itemName: string;
  itemDescription: string;
  itemAssigneeName: string;
  deleteItem: () => void;
  setOpen: (open: boolean) => void;
  toggleEditMode: () => void;
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

  return (
    <>
      <ModalContent modalTitle="Item details">
        <div className="item-modal-content">
          <TextLabel>Item name:</TextLabel>
          <Typography variant="body1">{itemName}</Typography>
          <TextLabel>Description:</TextLabel>
          <Typography variant="body1">{itemDescription}</Typography>
          <TextLabel>Assignee: </TextLabel>
          <Typography variant="body1">{itemAssigneeName}</Typography>
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
