import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

const grid = 8;
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const KanbanItem = ({
  id, index, children, disableDrag,
}) => (
  <Draggable
    isDragDisabled={disableDrag}
    draggableId={id}
    index={index}
  >
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={getItemStyle(
          snapshot.isDragging,
          provided.draggableProps.style,
        )}
      >
        {children}
      </div>
    )}
  </Draggable>
);

KanbanItem.propTypes = {
  children: PropTypes.any.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  disableDrag: PropTypes.bool,
};

KanbanItem.defaultProps = {
  disableDrag: false,
};

export default KanbanItem;
