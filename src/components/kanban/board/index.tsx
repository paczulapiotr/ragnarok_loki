import { Button, FormControlLabel, Switch } from "@material-ui/core";
import KanbanColumn from "components/kanban/column/index.tsx";
import DraggableItem from "components/kanban/draggable/index.tsx";
import ItemDetailsModal from "components/kanban/modals/itemDetailsModal";
import _ from "lodash";
import { KanbanBoardDecorator } from "logic/kanban/index.ts";
import { KanbanState } from "logic/kanban/models.ts";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import {
  loadBoardRequest,
  moveColumnRequest,
  moveItemRequest,
  removeItemRequest
} from "store/kanban/actions.ts";

interface Props {
  boardId: number;
}

interface StateProps {
  kanbanState: KanbanState;
}

interface DispatchProps {
  moveItem: (arg: KanbanItemMoveRequestDTO) => void;
  moveColumn: (arg: KanbanColumnMoveRequestDTO) => void;
  deleteItem: (payload: KanbanItemRemoveRequestDTO) => void;
  loadBoard: (arg: KanbanBoardLoadRequestDTO) => void;
}

type MergedProps = StateProps & DispatchProps & Props;

const Board = ({
  kanbanState,
  moveItem,
  moveColumn,
  deleteItem,
  loadBoard,
  boardId
}: MergedProps) => {
  const { boardName, columns: kanbanColumns, boardTimestamp } = kanbanState;
  let kanbanBoard = new KanbanBoardDecorator(
    boardId,
    boardName,
    kanbanColumns,
    boardTimestamp,
    moveItem,
    moveColumn
  );
  const [open, setOpen] = useState(false);
  const [itemId, setItemId] = useState<number | null>(null);
  const [columns, setColumns] = useState(kanbanColumns || []);
  const [canEditColumns, setCanEditColumns] = useState(false);

  useEffect(() => {
    loadBoard({ boardId });
  }, []);

  useEffect(() => {
    console.log("kanbanState", kanbanState);
    kanbanBoard = new KanbanBoardDecorator(
      boardId,
      kanbanState.boardName,
      kanbanState.columns,
      kanbanState.boardTimestamp,
      moveItem,
      moveColumn
    );
    setColumns(kanbanBoard.columns || []);
  }, [kanbanState]);
  const onDragEnd = (result: DropResult) => {
    kanbanBoard.columns = columns;
    kanbanBoard.move(result as IDropResult, canEditColumns);
    setColumns([...kanbanBoard.columns]);
  };
  return (
    <>
      <Button onClick={() => loadBoard({ boardId: kanbanBoard.id })}>
        REFRESH
      </Button>
      <FormControlLabel
        control={
          <Switch
            checked={canEditColumns}
            onChange={() => setCanEditColumns(!canEditColumns)}
          />
        }
        label="Move Columns"
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId={kanbanBoard.droppableId}
          isDropDisabled={!canEditColumns}
          direction="horizontal"
        >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={{ display: "flex", justifyContent: "center" }}
            >
              {columns.map((col: IKanbanColumn) => (
                <DraggableItem
                  key={col.draggableId}
                  draggableId={col.draggableId}
                  index={col.index}
                  disableDrag={!canEditColumns}
                >
                  <KanbanColumn
                    id={col.id}
                    columnName={col.name}
                    disableDrop={canEditColumns}
                    key={col.droppableId}
                    droppableId={col.droppableId}
                    items={col.items}
                    openItemDetails={setOpen}
                    setItemDetails={setItemId}
                  />
                </DraggableItem>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <ItemDetailsModal
        boardId={kanbanState.boardId}
        timestamp={kanbanState.boardTimestamp}
        deleteItem={deleteItem}
        open={open}
        setOpen={setOpen}
        itemId={itemId}
      />
    </>
  );
};

const mapStateToProps = (state: IRootState): StateProps => ({
  kanbanState: state.kanban as KanbanState
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      moveItem: moveItemRequest,
      deleteItem: removeItemRequest,
      moveColumn: moveColumnRequest,
      loadBoard: loadBoardRequest
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
