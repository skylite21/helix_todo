import React, { useRef, useState, useContext } from "react";
import TodoItem from "./TodoItem";
import { v4 as uuidv4 } from "uuid";
import todoContext from "../context";
import { TYPES } from "../reducer";
import TodoCounter from "./TodoCounter";

const Todo = () => {
  // const [todoList, setTodoList] = useState([{ name: "Buy potatos", id: "1" }]);
  const todoInput = useRef(null);
  const {
    state: { todos: todoList },
    dispatch,
  } = useContext(todoContext);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const todoText = todoInput.current.value;
    dispatch({ type: TYPES.ADD_TODO, payload: todoText });
    todoInput.current.value = "";
  };

  return (
    <>
      <form className="todo-form" onSubmit={handleSubmit}>
        <input type="text" className="todo-input" ref={todoInput} />
        <input type="submit" className="todo-add" />
      </form>
      <div>
        <TodoCounter count={todoList.length} />
        <ul className="todo-container">
          {todoList.map((todoItem) => (
            <TodoItem
              key={todoItem.id}
              id={todoItem.id}
              name={todoItem.name}
              completed={todoItem.completed}
              index={todoItem.index}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Todo;
