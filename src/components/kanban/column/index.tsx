import DraggableItem from "components/kanban/draggable/index.tsx";
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { KanbanItem } from "logic/kanban";

const grid = 8;

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

interface Props {
  items: KanbanItem[];
  droppableId: string;
  disableDrop?: boolean;
}

const KanbanColumn = ({ items, droppableId, disableDrop = false }: Props) => (
  <Droppable droppableId={droppableId} isDropDisabled={disableDrop}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        style={getListStyle(snapshot.isDraggingOver)}
      >
        {items.map(item => (
          <DraggableItem
            disableDrag={disableDrop}
            key={item.index}
            id={item.id}
            index={item.index}
          >
            <span>{item.id}</span>
          </DraggableItem>
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

export default KanbanColumn;
