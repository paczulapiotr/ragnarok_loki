import { HttpResponseType } from "api";
import { authHttpGet } from "api/methods";
import { ApiUrls } from "api/urls";
import Loader from "components/common/loader";
import ModalBase from "components/common/modal";
import ItemDetailsEdit from "components/kanban/modals/itemDetailsModal/edit/index";
import ItemDetailsView from "components/kanban/modals/itemDetailsModal/view/index";
import React, { useEffect, useState } from "react";
interface Props {
  itemId: number | null;
  boardId: number;
  timestamp: Date;
  deleteItem: (payload: KanbanItemRemoveRequestDTO) => void;
  editItem: (payload: KanbanItemEditRequestDTO) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const itemDetailsModal = ({
  open,
  setOpen,
  itemId,
  boardId,
  timestamp,
  deleteItem,
  editItem
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  // view
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState<AppUserBaseResultDTO | null>(null);

  const [editMode, setEditMode] = useState(false);
  const assigneeName = assignee != null ? assignee.name : "";
  const toggleEditMode = () => setEditMode((mode: boolean) => !mode);
  const setDetails = (data: KanbanItemDetailsResultDTO) => {
    setName(data.name);
    setDescription(data.description);
    setAssignee(data.assignee);
  };

  const deleteItemHandler = () => {
    const data: KanbanItemRemoveRequestDTO = {
      itemId: itemId!,
      boardId
    };
    deleteItem(data);
  };

  const editItemHandler = (
    newName: string,
    newDesc: string,
    newAssignee: AppUserBaseResultDTO | null
  ) => {
    setName(newName);
    setDescription(newDesc);
    setAssignee(newAssignee);
    const data: KanbanItemEditRequestDTO = {
      itemId: itemId!,
      boardId: boardId!,
      name: newName,
      description: newDesc,
      assigneeId: newAssignee != null ? newAssignee.id : null
    };
    editItem(data);
  };

  const getDetails = async () => {
    setIsLoading(true);
    const { type, response } = await authHttpGet(
      `${ApiUrls.Kanban.GET_ITEM}/${itemId}`
    );
    if (type === HttpResponseType.Ok) {
      setDetails(response.data as KanbanItemDetailsResultDTO);
    }
    setIsLoading(false);
  };

  const resetDetails = () => {
    setIsLoading(true);
    setName("");
    setDescription("");
    setAssignee(null);
  };

  useEffect(() => {
    if (open === false) {
      resetDetails();
    } else {
      getDetails();
    }
  }, [itemId, open]);

  return (
    <>
      <ModalBase open={open} setOpen={setOpen}>
        {isLoading ? (
          <Loader />
        ) : editMode ? (
          <ItemDetailsEdit
            boardId={boardId}
            itemId={itemId || 0}
            assignee={assignee}
            description={description}
            editItem={editItemHandler}
            name={name}
            toggleEditMode={toggleEditMode}
            setOpen={setOpen}
          />
        ) : (
          <ItemDetailsView
            itemAssigneeName={assigneeName}
            setOpen={setOpen}
            deleteItem={deleteItemHandler}
            itemDescription={description}
            itemName={name}
            toggleEditMode={toggleEditMode}
          />
        )}
      </ModalBase>
    </>
  );
};

export default itemDetailsModal;
