import React from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import KanbanItem from 'components/kanban/item';

const grid = 8;

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250,
});

const KanbanColumn = ({ items, droppableId }) => (
  <Droppable droppableId={droppableId}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        style={getListStyle(snapshot.isDraggingOver)}
      >
        {items.map((item, index) => (
          <KanbanItem key={index} id={item.id} index={index}>{item.id}</KanbanItem>
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

KanbanColumn.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
  droppableId: PropTypes.string.isRequired,
};

export default KanbanColumn;
