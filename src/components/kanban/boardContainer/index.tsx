import React from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import "./style.scss";
interface Props {
  droppableId: string;
  canEditColumns: boolean;
  children?: JSX.Element[] | JSX.Element;
  onDragEnd: (result: DropResult) => void;
}

type MergedProps = Props;

const BoardContainer = ({
  droppableId,
  canEditColumns,
  children,
  onDragEnd
}: MergedProps) => {
  return (
    <div className="board-container">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId={droppableId}
          isDropDisabled={!canEditColumns}
          direction="horizontal"
        >
          {(provided, snapshot) => (
            <div className="board-columns-container" ref={provided.innerRef}>
              {children}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default BoardContainer;
