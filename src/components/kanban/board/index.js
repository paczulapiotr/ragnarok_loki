import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import _ from 'lodash';
import KanbanColumn from 'components/kanban/column';
import KanbanItem from 'components/kanban/item';
// fake data generator
const getItems = (count, offset = 0) => Array.from({ length: 10 }, (k, i) => i).map((z, i) => ({
  id: `item-${z + offset}`,
  index: i,
  content: `item ${z + offset}`,
}));

const Board = () => {
  const [columns, setColumns] = useState({
    columnOne: getItems(10),
    columnTwo: getItems(10, 10),
    columnThree: getItems(10, 20),
    columnFour: getItems(10, 30),
  });

  /**
   * @param {*} array array to remap
   * @returns void
   */
  const remapIndexes = (array) => {
    // eslint-disable-next-line no-param-reassign
    array.forEach((element, index) => { element.index = index; });
  };

  const columnReorder = (result) => {
    debugger;
    const { destination, source } = result;
    if (destination.droppableId !== source.droppableId) {
      throw new Error('Function can be only used for column reorders');
    }

    const destColumnId = destination.droppableId;
    const items = [...columns[destColumnId]];

    if (destination.index === source.index) {
      return;
    }

    const toMove = items.splice(source.index, 1)[0]; // remove item
    items.splice(destination.index, 0, toMove); // add item

    remapIndexes(items);

    // set state
    const columnsState = { ...columns };
    columnsState[destColumnId] = items;
    setColumns(columnsState);
  };

  const itemMove = (result) => {
    debugger;
    const { destination, source, draggableId } = result;
    const srcColumnId = source.droppableId;
    const destColumnId = destination.droppableId;
    const srcItems = [...columns[srcColumnId]];
    const indexToMove = _.findIndex(srcItems, { id: draggableId });
    const toMove = srcItems.splice(indexToMove, 1)[0];
    remapIndexes(srcItems);
    const destItems = [...columns[destColumnId]];
    destItems.splice(destination.index, 0, toMove);
    remapIndexes(destItems);
    setColumns({
      ...columns,
      [srcColumnId]: srcItems,
      [destColumnId]: destItems,
    });
  };

  const reorder = (result) => {
    const { destination, source } = result;
    const srcColumnId = source.droppableId;
    const destColumnId = destination.droppableId;

    if (srcColumnId === destColumnId) {
      // column reorder
      columnReorder(result);
    } else {
      // item move
      itemMove(result);
    }
  };


  const onDragEnd = (result) => {
    console.log(result);
    reorder(result);
  };

  useEffect(() => { console.log('WTF'); }, [columns]);
  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  return (
    <DragDropContext onDragEnd={onDragEnd}>

      <Droppable droppableId="columnContainer" direction="horizontal">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            {Object.keys(columns)
              .map((key, index) => (
                <KanbanItem key={index} id={index.toString()} index={index}>
                  <KanbanColumn key={key} items={columns[key]} droppableId={key} />
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
