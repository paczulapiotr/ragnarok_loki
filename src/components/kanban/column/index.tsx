import ColumnContextMenu from "components/kanban/columnContextMenu/index";
import DraggableItem from "components/kanban/draggable/index";
import React from "react";
import { Droppable } from "react-beautiful-dnd";

const grid = 8;

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
  minHeight: "10%"
});

interface Props {
  id: number;
  items: IKanbanItem[];
  droppableId: string;
  disableDrop?: boolean;
  columnName: string;
  setItemDetails: (itemId: number) => void;
  openItemDetails: (open: boolean) => void;
}

const KanbanColumn = ({
  id,
  columnName,
  items,
  droppableId,
  disableDrop = false,
  openItemDetails,
  setItemDetails
}: Props) => (
  <div>
    <div className="column-header">
      <span>{columnName}</span>
      <ColumnContextMenu columnId={id} columnName={columnName} />
    </div>
    <Droppable droppableId={droppableId} isDropDisabled={disableDrop}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          {items.map(item => (
            <DraggableItem
              disableDrag={disableDrop}
              key={item.draggableId}
              draggableId={item.draggableId}
              index={item.index}
            >
              <span
                onClick={() => {
                  setItemDetails(item.id);
                  openItemDetails(true);
                }}
              >
                {item.id}
              </span>
            </DraggableItem>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
);

export default KanbanColumn;
