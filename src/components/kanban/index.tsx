import BoardContainer from "components/kanban/boardContainer";
import ItemDetailsModal from "components/kanban/modals/itemDetailsModal";
import React, { useCallback, useEffect, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import {
  getDraggableColumnId,
  getDraggableItemId,
  getDroppableBoardId,
  getDroppableColumnId,
  move
} from "src/logic/kanban";
import {
  editItemRequest,
  loadBoardRequest,
  moveColumnRequest,
  moveItemRequest,
  removeColumnRequest,
  removeItemRequest
} from "src/store/kanban/actions";
import KanbanColumn from "./column";
import KanbanItem from "./item";
import KanbanHeader from "./kanbanHeader";

interface Props {
  boardId: number;
}

interface StateProps {
  kanbanState: IKanbanState;
}

interface DispatchProps {
  moveItem: (arg: KanbanItemMoveRequestDTO) => void;
  editItem: (arg: KanbanItemEditRequestDTO) => void;
  deleteItem: (arg: KanbanItemRemoveRequestDTO) => void;
  moveColumn: (arg: KanbanColumnMoveRequestDTO) => void;
  deleteColumn: (arg: KanbanColumnRemoveRequestDTO) => void;
  loadBoard: (arg: KanbanBoardLoadRequestDTO) => void;
}

type MergedProps = StateProps & DispatchProps & Props;
const KanbanBoard = ({
  boardId,
  kanbanState,
  moveItem,
  moveColumn,
  deleteItem,
  editItem,
  loadBoard
}: MergedProps) => {
  const [canEditColumns, setCanEditColumns] = useState(false);
  const [itemDetailsOpen, setItemDetailsOpen] = useState(false);
  const [itemDetailsId, setItemDetailsId] = useState(0);

  useEffect(() => {
    loadBoard({ boardId });
  }, []);
  const openItemDetails = (itemId: number) => {
    setItemDetailsId(itemId);
    setItemDetailsOpen(true);
  };

  const dndDragEndHandler = useCallback(
    (dropResult: DropResult) =>
      move(
        boardId,
        kanbanState.board.timestamp,
        dropResult,
        moveItem,
        moveColumn
      ),
    [boardId, kanbanState.board.timestamp, moveItem, moveColumn]
  );
  const { name: boardName } = kanbanState.board;
  return (
    <>
      <KanbanHeader
        boardId={boardId}
        boardName={boardName}
        canEditColumns={canEditColumns}
        setCanEditColumns={setCanEditColumns}
      />
      <BoardContainer
        droppableId={getDroppableBoardId(boardId)}
        canEditColumns={canEditColumns}
        onDragEnd={dndDragEndHandler}
      >
        {kanbanState.board.columns.map(col => (
          <KanbanColumn
            key={col.id}
            id={col.id}
            columnName={col.name}
            index={col.index}
            draggableId={getDraggableColumnId(col.id)}
            droppableId={getDroppableColumnId(col.id)}
            canEditColumn={canEditColumns}
          >
            {col.items.map(item => (
              <KanbanItem
                key={item.id}
                itemId={item.id}
                itemName={item.name}
                index={item.index}
                assigneeName={item.assigneeName}
                draggableId={getDraggableItemId(item.id)}
                disableDrop={canEditColumns}
                openItemDetails={openItemDetails}
              />
            ))}
          </KanbanColumn>
        ))}
      </BoardContainer>
      <ItemDetailsModal
        boardId={boardId}
        deleteItem={deleteItem}
        editItem={editItem}
        open={itemDetailsOpen}
        setOpen={setItemDetailsOpen}
        itemId={itemDetailsId}
      />
    </>
  );
};

const mapStateToProps = (state: IRootState): StateProps => ({
  kanbanState: state.kanban
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      moveItem: moveItemRequest,
      editItem: editItemRequest,
      deleteItem: removeItemRequest,
      moveColumn: moveColumnRequest,
      deleteColumn: removeColumnRequest,
      loadBoard: loadBoardRequest
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KanbanBoard);
