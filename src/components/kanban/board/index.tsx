import KanbanColumn from "components/kanban/column";
import KanbanItem from "components/kanban/item";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { Item } from "KanbanBoad";

// interface Item {
//   id: string;
//   index: number;
//   content: string;
// }

const getItems = (count: number, offset: number = 0): Item[] =>
  Array.from({ length: 10 }, (k: number, i: number) => i).map(
    (z: number, i: number): Item => ({
      id: `item-${z + offset}`,
      index: i,
      content: `item ${z + offset}`
    })
  );

const Board = () => {
  const [columns, setColumns] = useState({
    columnOne: getItems(10),
    columnTwo: getItems(10, 10),
    columnThree: getItems(10, 20),
    columnFour: getItems(10, 30)
  });

  /**
   * @param {*} array array to remap
   * @returns void
   */
  const remapIndexes = (array: Item[]): void => {
    // eslint-disable-next-line no-param-reassign
    array.forEach((element: Item, index: number): void => {
      element.index = index;
    });
  };

  const columnReorder = (result: DropResult) => {
    debugger;
    const { destination, source } = result;
    if (destination!.droppableId !== source.droppableId) {
      throw new Error("Function can be only used for column reorders");
    }

    const destColumnId = destination!.droppableId;
    const items = [...columns[destColumnId]];

    if (destination!.index === source.index) {
      return;
    }

    const toMove = items.splice(source.index, 1)[0]; // remove item
    items.splice(destination!.index, 0, toMove); // add item

    remapIndexes(items);

    // set state
    const columnsState = { ...columns };
    columnsState[destColumnId] = items;
    setColumns(columnsState);
  };

  const itemMove = (result: DropResult) => {
    debugger;
    const { destination, source, draggableId } = result;
    const srcColumnId = source.droppableId;
    const destColumnId = destination!.droppableId;
    const srcItems = [...columns[srcColumnId]];
    const indexToMove = _.findIndex(srcItems, { id: draggableId });
    const toMove = srcItems.splice(indexToMove, 1)[0];
    remapIndexes(srcItems);
    const destItems = [...columns[destColumnId]];
    destItems.splice(destination!.index, 0, toMove);
    remapIndexes(destItems);
    setColumns({
      ...columns,
      [srcColumnId]: srcItems,
      [destColumnId]: destItems
    });
  };

  const reorder = (result: DropResult) => {
    const { destination, source } = result;
    const srcColumnId = source.droppableId;
    const destColumnId = destination!.droppableId;

    if (srcColumnId === destColumnId) {
      // column reorder
      columnReorder(result);
    } else {
      // item move
      itemMove(result);
    }
  };

  const onDragEnd = (result: DropResult) => {
    console.log(result);
    reorder(result);
  };

  useEffect(() => {
    console.log("WTF");
  }, [columns]);
  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="columnContainer" direction="horizontal">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {Object.keys(columns).map((key, index) => (
              <KanbanItem key={index} id={index.toString()} index={index}>
                <KanbanColumn
                  key={key}
                  items={columns[key]}
                  droppableId={key}
                />
              </KanbanItem>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
