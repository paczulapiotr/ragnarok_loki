import { Paper, Typography } from "@material-ui/core";
import { ViewColumnOutlined } from "@material-ui/icons";
import HeaderTitle from "components/common/headerTitle";
import ColumnContextMenu from "components/kanban/columnContextMenu/index";
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import DraggableItem from "../draggable";
import "./style.scss";
interface Props {
  id: number;
  droppableId: string;
  columnName: string;
  draggableId: string;
  index: number;
  canEditColumn: boolean;
  children?: JSX.Element[] | JSX.Element;
}

const KanbanColumn = ({
  id,
  columnName,
  children,
  droppableId,
  draggableId,
  index,
  canEditColumn
}: Props) => (
  <DraggableItem
    className="kanaban-column"
    key={draggableId}
    draggableId={draggableId}
    index={index}
    disableDrag={!canEditColumn}
  >
    <Paper>
      <div className="column-header">
        <HeaderTitle>
          <div className="column-name">
            <ViewColumnOutlined />
            <Typography>{columnName}</Typography>
          </div>
          <ColumnContextMenu columnId={id} columnName={columnName} />
        </HeaderTitle>
      </div>
      <Droppable droppableId={droppableId} isDropDisabled={canEditColumn}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} className="kanban-items-container">
            {children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Paper>
  </DraggableItem>
);

export default KanbanColumn;
