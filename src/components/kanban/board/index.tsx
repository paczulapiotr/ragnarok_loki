import KanbanColumn from "components/kanban/column/index.tsx";
import DraggableItem from "components/kanban/draggable/index.tsx";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import {
  KanbanBoard,
  KanbanColumn as Column,
  KanbanItem as Item
} from "logic/kanban.ts";

const getItems = (count: number, offset: number = 0): Item[] =>
  Array.from({ length: count }, (k: number, i: number) => i).map(
    (z: number, i: number): Item => ({
      id: `item-${z + offset}`,
      index: i,
      content: `item ${z + offset}`
    })
  );

const Board = () => {
  const kanbanBoard = new KanbanBoard("kanbanBoard", [
    new Column("columnOne", 0, getItems(10)),
    new Column("columnTwo", 1, getItems(10, 10)),
    new Column("columnThree", 2, getItems(10, 20)),
    new Column("columnFour", 3, getItems(10, 30))
  ]);

  const [columns, setColumns] = useState<Column[]>(kanbanBoard.columns);
  const [enableColumnsEdit, setEnableColumnEdit] = useState<boolean>(false);

  const onDragEnd = (result: DropResult) => {
    debugger;
    console.log(result);
    kanbanBoard.move(result, enableColumnsEdit);
    setColumns(kanbanBoard.columns);
  };

  useEffect(() => {
    console.log("WTF");
  }, [columns]);

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
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
                  key={index}
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

export default Board;
