import { TextareaAutosize, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ModalContent from "components/common/modal/content";
import ModalFooter from "components/common/modal/footer";
import AssigneeSelector from "components/kanban/assigneeSelector";
import React, { useEffect, useState } from "react";
import FieldWrapper from "src/components/common/fieldWrapper";
import "./style.scss";

const useStyles = makeStyles({
  root: { overflow: "visible" }
});

interface Props {
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
    {
      content: "Close",
      onClick: () => {
        setOpen(false);
      }
    }
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
  const classes = useStyles();

  return (
    <>
      <ModalContent modalTitle="Edit item" classes={classes.root}>
        <div className="item-modal-content item-edit-modal">
          <FieldWrapper headerTitle="Item name:">
            <TextField
              fullWidth
              value={editedName}
              onChange={e => setEditedName(e.target.value)}
            />
          </FieldWrapper>
          <FieldWrapper headerTitle="Description:">
            <TextareaAutosize
              className="description-textarea"
              aria-label="Description textarea"
              placeholder="Description"
              value={editedDesc || ""}
              onChange={e => setEditedDesc(e.target.value)}
              rowsMax={10}
              rows={3}
            />
          </FieldWrapper>
          <FieldWrapper headerTitle="Assignee:">
            <AssigneeSelector
              boardId={boardId}
              setAssignee={setEditedAssignee}
              selectedOption={selectedAssigneeOption}
            />
          </FieldWrapper>
        </div>
      </ModalContent>
      <ModalFooter setOpen={setOpen} actions={actions} />
    </>
  );
};

export default ItemDetailsEdit;
