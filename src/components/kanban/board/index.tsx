import KanbanColumn from "components/kanban/column/index.tsx";
import DraggableItem from "components/kanban/draggable/index.tsx";
import _ from "lodash";
import { KanbanBoard } from "logic/kanban/index.ts";
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { KanbanBoardLoadDTO, KanbanItemMoveDTO } from "src/typings/kanban/dto";
import { loadBoardRequest, moveItemRequest } from "store/kanban/actions.ts";

interface StateProps {
  kanbanState: IKanbanState;
}
interface DispatchProps {
  moveItem: (arg: KanbanItemMoveDTO) => void;
  loadBoard: (arg: KanbanBoardLoadDTO) => void;
}

type Props = StateProps & DispatchProps;

const Board = ({ kanbanState, moveItem, loadBoard }: Props) => {
  let kanbanBoard = new KanbanBoard(
    2, // kanbanState.board == null ? 1 : kanbanState.board.id,
    kanbanState.columns,
    kanbanState.board != null ? kanbanState.board.timestamp : undefined,
    moveItem
  );

  const [columns, setColumns] = useState(kanbanBoard.columns || []);
  const [enableColumnsEdit, setEnableColumnEdit] = useState(false);

  useEffect(() => {
    kanbanBoard = new KanbanBoard(
      2,
      kanbanState.columns,
      kanbanState.board != null ? kanbanState.board.timestamp : undefined,
      moveItem
    );
    setColumns(kanbanBoard.columns || []);
  }, [kanbanState]);

  const onDragEnd = (result: DropResult) => {
    kanbanBoard.columns = columns;
    kanbanBoard.move(result as IDropResult, enableColumnsEdit);
    setColumns([...kanbanBoard.columns]);
  };

  return (
    <>
      <button onClick={() => loadBoard({ boardId: kanbanBoard.identifier })}>
        REFRESH
      </button>
      <button
        onClick={() => {
          setEnableColumnEdit(!enableColumnsEdit);
        }}
      >
        SWITCH MODE
      </button>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId={kanbanBoard.identifier.toString()}
          isDropDisabled={!enableColumnsEdit}
          direction="horizontal"
        >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={{ display: "flex", justifyContent: "center" }}
            >
              {columns.map((col: IKanbanColumn) => (
                <DraggableItem
                  key={col.id}
                  id={col.id.toString()}
                  index={col.index}
                  disableDrag={!enableColumnsEdit}
                >
                  <KanbanColumn
                    disableDrop={enableColumnsEdit}
                    key={col.id}
                    items={col.items}
                    droppableId={col.id.toString()}
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
      loadBoard: loadBoardRequest
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board as any);
