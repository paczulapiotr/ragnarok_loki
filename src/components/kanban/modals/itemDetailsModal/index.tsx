import Loader from "components/common/loader";
import ModalBase from "components/common/modal";
import DeleteItemModal from "components/kanban/modals/deleteItemModal/index";
import React, { useEffect, useState } from "react";
import { HttpResponseType } from "src/api";
import { authHttpGet } from "src/api/methods";
import { ApiUrls } from "src/api/urls";
interface Props {
  itemId: number | null;
  boardId: number;
  timestamp: Date;
  deleteItem: (payload: KanbanItemRemoveRequestDTO) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const itemDetailsModal = ({
  open,
  setOpen,
  itemId,
  boardId,
  timestamp,
  deleteItem
}: Props) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [assignee, setAssignee] = useState<AppUserBaseResultDTO | null>(null);
  const [description, setDescription] = useState("");
  const actions: ModalButton[] = [
    {
      content: "Delete",
      onClick: () => {
        setDeleteModal(true);
      },
      shouldKeepModal: true
    },
    { content: "Close" }
  ];
  const assigneeName = assignee != null ? assignee.name : "";
  const closeModal = () => setOpen(false);
  const getDetails = async () => {
    setIsLoading(true);
    const { type, response } = await authHttpGet(
      `${ApiUrls.Kanban.GET_ITEM}/${itemId}`
    );
    if (type === HttpResponseType.Ok) {
      const details = response.data as KanbanItemDetailsResultDTO;
      setName(details.name);
      setDescription(details.description);
      setAssignee(details.assignee);
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
      <ModalBase
        modalTitle="Item details"
        open={open}
        setOpen={setOpen}
        actions={actions}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            <h6>{name}</h6>
            <p>{description}</p>
            <p>
              Assignee:<span>{assigneeName}</span>
            </p>
          </div>
        )}
      </ModalBase>
      <DeleteItemModal
        onDelete={closeModal}
        timestamp={timestamp}
        boardId={boardId}
        deleteItem={deleteItem}
        open={deleteModal}
        setOpen={setDeleteModal}
        itemId={itemId || 0}
        itemName={name}
      />
    </>
  );
};

export default itemDetailsModal;
