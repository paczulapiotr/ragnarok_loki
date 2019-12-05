import React from "react";
import DraggableItem from "../draggable";
import "./style.scss";

interface Props {
  draggableId: string;
  disableDrop: boolean;
  index: number;
  itemId: number;
  itemName: string;
  assigneeName: string;
  openItemDetails: (itemId: number) => void;
}
const KanbanItem = ({
  draggableId,
  disableDrop,
  index,
  itemId,
  itemName,
  assigneeName,
  openItemDetails
}: Props) => {
  return (
    <div className="kanban-item">
      <DraggableItem
        disableDrag={disableDrop}
        draggableId={draggableId}
        index={index}
      >
        <span
          onClick={() => {
            openItemDetails(itemId);
          }}
        >
          <span>{itemName}</span>
          <span>{assigneeName}</span>
        </span>
      </DraggableItem>
    </div>
  );
};

export default KanbanItem;
