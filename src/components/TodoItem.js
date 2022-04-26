import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import todoContext from "../context";
import { TYPES } from "../reducer";

const TodoItem = (props) => {
  const { dispatch } = useContext(todoContext);
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(props.name);

  const editTodo = (e) => {
    setEditing(false);
    if (e.target.value === name) return;
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
        <li className="todo-item">
          <span
            role="button"
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
};
