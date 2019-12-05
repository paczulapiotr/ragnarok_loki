import { Typography } from "@material-ui/core";
import DeleteItemModal from "components/kanban/modals/deleteItemModal/index";
import React, { useState } from "react";
import FieldWrapper from "src/components/common/fieldWrapper";
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
          <FieldWrapper headerTitle="Item name:">
            <Typography variant="body1">{itemName}</Typography>
          </FieldWrapper>
          <FieldWrapper headerTitle="Description:">
            <Typography variant="body1">{itemDescription}</Typography>
          </FieldWrapper>
          <FieldWrapper headerTitle="Assignee:">
            <Typography variant="body1">{itemAssigneeName}</Typography>
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
