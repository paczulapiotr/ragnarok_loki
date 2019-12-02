import { TextField } from "@material-ui/core";
import ModalContent from "components/common/modal/content";
import ModalFooter from "components/common/modal/footer";
import AssigneeSelector from "components/kanban/assigneeSelector";
import React, { useEffect, useState } from "react";

interface Props {
  itemId: number;
  boardId: number;
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
  boardId,
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
  const selectedAssigneeOption: SelectOption | undefined =
    assignee != null ? { label: assignee.name, value: assignee.id } : undefined;
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
          <AssigneeSelector
            boardId={boardId}
            setAssignee={setEditedAssignee}
            selectedOption={selectedAssigneeOption}
          />
        </div>
      </ModalContent>
      <ModalFooter setOpen={setOpen} actions={actions} />
    </>
  );
};

export default ItemDetailsEdit;
