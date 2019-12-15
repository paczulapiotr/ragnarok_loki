import React from "react";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  draggableId: string;
  index: number;
  children: JSX.Element;
  disableDrag?: boolean;
  className?: string;
}

const DraggableItem = ({
  draggableId,
  index,
  children,
  className,
  disableDrag = false
}: Props) => (
  <Draggable
    isDragDisabled={disableDrag}
    draggableId={draggableId}
    index={index}
  >
    {(provided, snapshot) => (
      <div
        className={className + (snapshot.isDragging ? " draggable-active" : "")}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        {children}
      </div>
    )}
  </Draggable>
);

export default DraggableItem;
