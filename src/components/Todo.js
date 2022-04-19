import React, { useRef, useState } from "react";
import TodoItem from "./TodoItem";
import { v4 as uuidv4 } from "uuid";
import TodoCounter from "./TodoCounter";

const Todo = () => {
  const [todoList, setTodoList] = useState([{ name: "Buy potatos", id: "1" }]);
  const todoInput = useRef(null);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // const todo = document.querySelector('.todo-input').value;
    const name = todoInput.current.value;
    const id = uuidv4();
    const newTodo = { name, id };
    // console.log(todoList);
    // todoList.push(newTodo);
    if (name !== "") {
      setTodoList([...todoList, newTodo]);
    }
    todoInput.current.value = "";
  };

  const handleRemove = (id) => {
    const newTodos = todoList.filter((e) => e.id !== id);
    setTodoList(newTodos);
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
              removeHandler={handleRemove}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Todo;
