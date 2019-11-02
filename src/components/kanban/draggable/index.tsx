import React from "react";
import { Draggable } from "react-beautiful-dnd";

const grid = 8;
const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

interface Props {
  draggableId: string;
  index: number;
  children: JSX.Element;
  disableDrag?: boolean;
}

const DraggableItem = ({
  draggableId,
  index,
  children,
  disableDrag = false
}: Props) => (
  <Draggable
    isDragDisabled={disableDrag}
    draggableId={draggableId}
    index={index}
  >
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
      >
        {children}
      </div>
    )}
  </Draggable>
);

export default DraggableItem;
