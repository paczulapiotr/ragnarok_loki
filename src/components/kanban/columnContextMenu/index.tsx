import Menu from "components/common/menu/index";
import AddItemModal from "components/kanban/modals/addItemModal/index";
import DeleteColumnModal from "components/kanban/modals/deleteColumnModal/index";
import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import {
  addItemRequest,
  removeColumnRequest,
  editColumnRequest
} from "store/kanban/actions";
import EditColumnModal from "../modals/editColumnModal";

interface OwnProps {
  columnId: number;
  columnName: string;
}
interface DispatchProps {
  addItem: (payload: KanbanItemAddRequestDTO) => void;
  editColumn: (payloa: KanbanColumnEditRequestDTO) => void;
  deleteColumn: (payload: KanbanColumnRemoveRequestDTO) => void;
}
interface StateProps {
  kanbanState: IKanbanState;
}
type Props = StateProps & DispatchProps & OwnProps;

const ColumnContextMenu = ({
  columnId,
  columnName,
  kanbanState,
  editColumn,
  addItem,
  deleteColumn
}: Props) => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const items: MenuItem[] = [
    {
      content: "Add Item",
      onClick: () => {
        setOpenAdd(true);
      }
    },
    {
      content: "Edit column",
      onClick: () => {
        setOpenEdit(true);
      }
    },
    {
      content: "Delete column",
      onClick: () => {
        setOpenDelete(true);
      }
    }
  ];
  const { board } = kanbanState;
  const isLoading = board == null;
  const boardId = board != null ? board.id : 0;

  const editColumnWrapper = (newColumnName: string) => {
    editColumn({ boardId, columnId, name: newColumnName });
  };

  return (
    <>
      <Menu items={items} />
      <AddItemModal
        boardId={boardId}
        columnId={columnId}
        addItem={addItem}
        isLoading={isLoading}
        open={openAdd}
        setOpen={setOpenAdd}
      />
      <EditColumnModal
        open={openEdit}
        setOpen={setOpenEdit}
        editColumn={editColumnWrapper}
        isLoading={isLoading}
        name={columnName}
      />
      <DeleteColumnModal
        open={openDelete}
        setOpen={setOpenDelete}
        boardId={boardId}
        columnName={columnName}
        columnId={columnId}
        deleteColumn={deleteColumn}
        isLoading={isLoading}
      />
    </>
  );
};

const mapStateToProps = (props: IRootState): StateProps => ({
  kanbanState: props.kanban
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      addItem: addItemRequest,
      editColumn: editColumnRequest,
      deleteColumn: removeColumnRequest
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ColumnContextMenu);
