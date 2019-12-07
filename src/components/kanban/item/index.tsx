import { Paper, Typography } from "@material-ui/core";
import { PersonOutlined } from "@material-ui/icons";
import React from "react";
import DraggableItem from "../draggable";
import "./style.scss";

interface Props {
  draggableId: string;
  disableDrop: boolean;
  index: number;
  itemId: number;
  itemName: string;
  assigneeName?: string;
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
        <Paper>
          <div
            className="kanban-item-content"
            onClick={() => {
              openItemDetails(itemId);
            }}
          >
            <span>{itemName}</span>
            <span>
              <Typography
                component="div"
                variant="caption"
                className="kanban-item-assignee"
              >
                <PersonOutlined />
                <p>{assigneeName || "Not assigned"}</p>
              </Typography>
            </span>
          </div>
        </Paper>
      </DraggableItem>
    </div>
  );
};

export default KanbanItem;
