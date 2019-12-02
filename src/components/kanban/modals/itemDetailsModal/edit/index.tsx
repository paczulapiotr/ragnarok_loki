import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ModalContent from "src/components/common/modal/content";
import ModalFooter from "src/components/common/modal/footer";

interface Props {
  itemId: number;
  name: string;
  description: string;
  assignee: AppUserBaseResultDTO | null;
  setOpen: (open: boolean) => void;
  editItem: (
    name: string,
    description: string,
    assignee: AppUserBaseResultDTO | null
  ) => void;
  toggleEditMode: () => void;
}
const ItemDetailsEdit = ({
  itemId,
  name,
  assignee,
  description,
  editItem,
  setOpen,
  toggleEditMode
}: Props) => {
  const [editedName, setEditedName] = useState(name);
  const [editedDesc, setEditedDesc] = useState(description);
  const [
    editedAssignee,
    setEditedAssignee
  ] = useState<AppUserBaseResultDTO | null>(assignee);
  const editItemHandler = () => {
    console.log(editedName, editedDesc, editedAssignee);
    editItem(editedName, editedDesc, editedAssignee);
  };
  const actions: ModalButton[] = [
    {
      content: "Save",
      onClick: () => {
        editItemHandler();
        toggleEditMode();
      },
      shouldKeepModal: true
    },
    {
      content: "Cancel",
      onClick: () => {
        setEditedName(name);
        setEditedDesc(description);
        setEditedAssignee(assignee);
        toggleEditMode();
      },
      shouldKeepModal: true
    },
    { content: "Close", onClick: () => setOpen(false) }
  ];

  useEffect(() => {
    if (editedName !== name) {
      setEditedName(name);
    }
    if (editedDesc !== description) {
      setEditedDesc(description);
    }
  }, [name, description]);

  return (
    <>
      <ModalContent modalTitle="Item details">
        <div>
          <TextField
            value={editedName}
            onChange={e => setEditedName(e.target.value)}
          />
          <TextField
            value={editedDesc}
            onChange={e => setEditedDesc(e.target.value)}
          />
          <span>Assignee</span>
        </div>
      </ModalContent>
      <ModalFooter setOpen={setOpen} actions={actions} />
    </>
  );
};

export default ItemDetailsEdit;
