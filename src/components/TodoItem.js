import React from "react";
import PropTypes from "prop-types";

const TodoItem = (props) => {
  return (
    <li className="todo-item">
      {props.name}
      <span
        role="button"
        tabIndex={0}
        className="remove-button"
        onClick={() => {
          props.removeHandler(props.id);
        }}
        onKeyDown={() => {
          props.removeHandler(props.id);
        }}
      ></span>
    </li>
  );
};

export default TodoItem;

TodoItem.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  removeHandler: PropTypes.func,
};
