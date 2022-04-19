import React from "react";
import PropTypes from "prop-types";

const TodoCounter = (props) => {
  return (
    <h2>
      You have {props.count} {props.count <= 1 ? "todo" : "todos"}
    </h2>
  );
};

export default TodoCounter;

TodoCounter.propTypes = {
  count: PropTypes.number,
};
