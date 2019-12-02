import { Typography } from "@material-ui/core";
import DeleteItemModal from "components/kanban/modals/deleteItemModal/index";
import React, { useState } from "react";
import ModalContent from "src/components/common/modal/content";
import ModalFooter from "src/components/common/modal/footer";

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
    setOpen(false);
    toggleEditMode();
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
      <ModalContent modalTitle="Edit Item">
        <div>
          <Typography variant="h4">{itemName}</Typography>
          <Typography variant="body1">{itemDescription}</Typography>
          <Typography variant="body1">{`Assignee: ${itemAssigneeName}`}</Typography>
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
