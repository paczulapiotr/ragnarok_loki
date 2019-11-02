import KanbanColumn from "components/kanban/column/index.tsx";
import DraggableItem from "components/kanban/draggable/index.tsx";
import _ from "lodash";
import { KanbanBoardDecorator } from "logic/kanban/index.ts";
import { KanbanState } from "logic/kanban/models.ts";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { KanbanBoardLoadDTO, KanbanItemMoveDTO } from "src/typings/kanban/dto";
import {
  changeBoardEditMode,
  loadBoardRequest,
  moveItemRequest
} from "store/kanban/actions.ts";

interface StateProps {
  kanbanState: KanbanState;
}
interface DispatchProps {
  moveItem: (arg: KanbanItemMoveDTO) => void;
  loadBoard: (arg: KanbanBoardLoadDTO) => void;
  changeMode: (arg: boolean) => void;
}

type Props = StateProps & DispatchProps;

const Board = ({ kanbanState, moveItem, loadBoard, changeMode }: Props) => {
  const {
    boardName,
    columns: kanbanColumns,
    boardTimestamp,
    canEditColumns
  } = kanbanState;
  let kanbanBoard = new KanbanBoardDecorator(
    2, // kanbanState.boardId
    boardName,
    kanbanColumns,
    boardTimestamp,
    moveItem
  );

  const [columns, setColumns] = useState(kanbanColumns || []);

  useEffect(() => {
    console.log("kanbanState", kanbanState);
    kanbanBoard = new KanbanBoardDecorator(
      2,
      kanbanState.boardName,
      kanbanState.columns,
      kanbanState.boardTimestamp,
      moveItem
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
      <button onClick={() => loadBoard({ boardId: kanbanBoard.id })}>
        REFRESH
      </button>
      <button
        onClick={() => {
          changeMode(!canEditColumns);
        }}
      >
        SWITCH MODE
      </button>
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
                    disableDrop={canEditColumns}
                    key={col.droppableId}
                    droppableId={col.droppableId}
                    items={col.items}
                  />
                </DraggableItem>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
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
      loadBoard: loadBoardRequest,
      changeMode: changeBoardEditMode
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board as any);
