import KanbanColumn from "components/kanban/column/index.tsx";
import DraggableItem from "components/kanban/draggable/index.tsx";
import _ from "lodash";
import { KanbanBoard } from "logic/kanban/index.ts";
import React, { useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { moveItemRequest } from "store/kanban/actions.ts";

interface IDispatchProps {
  moveItem: (arg: IItemMove) => void;
}

type Props = IDispatchProps & IKanbanState;

const Board = (props: Props) => {
  const kanbanBoard = new KanbanBoard(
    "kanbanBoard",
    props.columns,
    props.board != null ? props.board.timestamp : undefined,
    props.moveItem
  );

  const [columns, setColumns] = useState(kanbanBoard.columns || []);
  const [enableColumnsEdit, setEnableColumnEdit] = useState(false);

  const onDragEnd = (result: DropResult) => {
    kanbanBoard.columns = columns;
    kanbanBoard.move(result as IDropResult, enableColumnsEdit);
    setColumns([...kanbanBoard.columns]);
  };

  return (
    <>
      <button
        onClick={() => {
          setEnableColumnEdit(!enableColumnsEdit);
        }}
      >
        SWITCH MODE
      </button>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId={kanbanBoard.identifier}
          isDropDisabled={!enableColumnsEdit}
          direction="horizontal"
        >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={{ display: "flex", justifyContent: "center" }}
            >
              {columns.map((col, index) => (
                <DraggableItem
                  key={col.id}
                  id={col.id}
                  index={col.index}
                  disableDrag={!enableColumnsEdit}
                >
                  <KanbanColumn
                    disableDrop={enableColumnsEdit}
                    key={col.id}
                    items={col.items}
                    droppableId={col.id}
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

const mapStateToProps = (state: IRootState): IKanbanState => state.kanban;

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ moveItem: moveItemRequest }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
