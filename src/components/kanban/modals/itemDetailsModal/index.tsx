import { makeStyles } from "@material-ui/styles";
import { HttpResponseType } from "api";
import {
  authHttpDelete,
  authHttpGet,
  authHttpPatch,
  authHttpPut
} from "api/methods";
import { ApiUrls } from "api/urls";
import Loader from "components/common/loader";
import ModalBase from "components/common/modal";
import ItemDetailsEdit from "components/kanban/modals/itemDetailsModal/edit/index";
import ItemDetailsView from "components/kanban/modals/itemDetailsModal/view/index";
import React, { useEffect, useState } from "react";
import "./style.scss";

const useStyles = makeStyles({ root: { overflow: "visible" } });

interface Props {
  itemId: number | null;
  boardId: number;
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
  deleteItem,
  editItem
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  // view
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState<AppUserBaseResultDTO | null>(null);
  const [comments, setComments] = useState<CommentDTO[]>([]);

  const [editMode, setEditMode] = useState(false);
  const assigneeName = assignee != null ? assignee.name : "";
  const toggleEditMode = () => setEditMode((mode: boolean) => !mode);
  const setDetails = (data: KanbanItemDetailsResultDTO) => {
    setName(data.name);
    setDescription(data.description);
    setAssignee(data.assignee);
    setComments(data.comments);
  };

  useEffect(() => {
    if (open) {
      setEditMode(false);
    }
  }, [open]);

  const setModalOpen = (oopen: boolean) => {
    setEditMode(false);
    setOpen(oopen);
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
    setComments([]);
  };

  useEffect(() => {
    if (open === false) {
      resetDetails();
    } else {
      getDetails();
    }
  }, [itemId, open]);
  const classes = useStyles();

  // Comment requests
  const RequestCommentHandler = ({ type, response }: IApiResponse) => {
    if (type === HttpResponseType.Ok) {
      setComments(response.data as CommentDTO[]);
    }
  };

  const sendComment = async (comment: string) => {
    const data: AddCommentRequestDTO = {
      content: comment,
      boardId,
      itemId: itemId!
    };
    const response = await authHttpPut(ApiUrls.Comment.ADD, data);
    RequestCommentHandler(response);
  };

  const editComment = async (commentId: number, content: string) => {
    const data: EditCommentRequestDTO = {
      boardId,
      commentId,
      content,
      itemId: itemId!
    };
    const response = await authHttpPatch(ApiUrls.Comment.EDIT, data);
    RequestCommentHandler(response);
  };

  const deleteComment = async (commentId: number) => {
    const data: DeleteCommentRequestDTO = {
      boardId,
      commentId,
      itemId: itemId!
    };
    const response = await authHttpDelete(ApiUrls.Comment.DELETE, data);
    RequestCommentHandler(response);
  };

  return (
    <>
      <ModalBase
        open={open}
        setOpen={setOpen}
        fullWidth
        classes={classes.root}
        fullscreen
      >
        {isLoading ? (
          <Loader />
        ) : editMode ? (
          <ItemDetailsEdit
            boardId={boardId}
            assignee={assignee}
            description={description}
            editItem={editItemHandler}
            name={name}
            toggleEditMode={toggleEditMode}
            setOpen={setModalOpen}
          />
        ) : (
          <ItemDetailsView
            itemAssigneeName={assigneeName}
            setOpen={setOpen}
            deleteItem={deleteItemHandler}
            itemDescription={description}
            itemName={name}
            toggleEditMode={toggleEditMode}
            comments={comments}
            sendComment={sendComment}
            editComment={editComment}
            deleteComment={deleteComment}
          />
        )}
      </ModalBase>
    </>
  );
};

export default itemDetailsModal;
