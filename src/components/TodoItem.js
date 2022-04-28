import React, { useContext, useState, useRef } from "react";
import PropTypes from "prop-types";
import todoContext from "../context";
import { TYPES } from "../reducer";
import { useDrop, useDrag } from "react-dnd";

const TodoItem = (props) => {
  const { dispatch } = useContext(todoContext);
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(props.name);
  const todoRef = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: "card",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!todoRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = props.index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = todoRef.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      props.moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => {
      return { id: props.id, index: props.index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: () => {
      console.log("dragging ended, reindexing state...");
      dispatch({ type: TYPES.REINDEX_TODOS });
    },
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(todoRef));

  const editTodo = (e) => {
    setEditing(false);
    if (e.target.value === props.name) return;
    const todo = {
      name: e.target.value,
      id: props.id,
      index: props.index,
      completed: props.completed,
    };
    // action creator
    const editTodo = (todo) => {
      return { type: TYPES.EDIT_TODO, payload: todo };
    };

    dispatch(editTodo(todo));
  };

  return (
    <>
      {editing ? (
        <input
          type="text"
          className="todo-item todo-item-input"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          autoFocus
          value={inputValue}
          onBlur={editTodo}
          onKeyDown={(e) => {
            if (e.key === "Enter") editTodo(e);
          }}
        />
      ) : (
        <li
          className="todo-item"
          ref={todoRef}
          style={{ opacity }}
          data-handler-id={handlerId}
        >
          <span
            role="button"
            className={`complete-button ${props.completed ? "completed" : ""}`}
            tabIndex={0}
            onKeyDown={() => {
              dispatch({ type: TYPES.TOGGLE_COMPLETE_TODO, payload: props.id });
            }}
            onClick={() =>
              dispatch({ type: TYPES.TOGGLE_COMPLETE_TODO, payload: props.id })
            }
          ></span>
          <span
            role="button"
            className={`${props.completed ? "todo-completed" : ""}`}
            tabIndex={0}
            onKeyPress={() => {}}
            onClick={() => setEditing(true)}
          >
            {props.name}
          </span>
          <span
            role="button"
            tabIndex={0}
            className="remove-button"
            onClick={() => {
              dispatch({ type: TYPES.REMOVE_TODO, payload: props.id });
            }}
            onKeyDown={() => {
              dispatch({ type: TYPES.REMOVE_TODO, payload: props.id });
            }}
          ></span>
        </li>
      )}
    </>
  );
};

export default TodoItem;

TodoItem.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  index: PropTypes.number,
  completed: PropTypes.bool,
  removeHandler: PropTypes.func,
  moveCard: PropTypes.func,
};
