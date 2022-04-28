import React, { useRef, useState, useContext } from "react";
import TodoItem from "./TodoItem";
import { v4 as uuidv4 } from "uuid";
import todoContext from "../context";
import { TYPES } from "../reducer";
import TodoCounter from "./TodoCounter";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";

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

  const moveCard = (dragIndex, hoverIndex) => {
    dispatch({
      type: TYPES.SET_TODOS,
      // https://reactjs.org/docs/optimizing-performance.html#the-power-of-not-mutating-data
      payload: update(todoList, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, todoList[dragIndex]],
        ],
      }),
    });
  };

  return (
    <>
      <form className="todo-form" onSubmit={handleSubmit}>
        <input type="text" className="todo-input" ref={todoInput} />
        <input type="submit" className="todo-add" />
      </form>
      <div>
        <TodoCounter count={todoList.length} />
        <DndProvider backend={HTML5Backend}>
          <ul className="todo-container">
            {todoList.map((todoItem) => (
              <TodoItem
                key={todoItem.id}
                id={todoItem.id}
                name={todoItem.name}
                completed={todoItem.completed}
                index={todoItem.index}
                moveCard={moveCard}
              />
            ))}
          </ul>
        </DndProvider>
      </div>
    </>
  );
};

export default Todo;
