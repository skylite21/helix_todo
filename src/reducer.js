import { v4 as uuidv4 } from "uuid";
import update from "immutability-helper";

export const TYPES = {
  ADD_TODO: "ADD_TODO",
  REMOVE_TODO: "REMOVE_TODO",
  EDIT_TODO: "EDIT_TODO",
  TOGGLE_COMPLETE_TODO: "TOGGLE_COMPLETE_TODO",
  REINDEX_TODOS: "REINDEX_TODOS",
};

export const initialState = { todos: [] };

// action is dispatched to the reducer

const todoReducer = (state, action) => {
  switch (action.type) {
    case TYPES.ADD_TODO: {
      if (action.payload !== "") {
        const id = uuidv4();
        const todo = {
          name: action.payload,
          id,
          completed: false,
          index: state.todos.length,
        };
        return {
          ...state,
          todos: [...state.todos, todo],
        };
      }
      return state;
    }
    case TYPES.REMOVE_TODO: {
      // const todoToRemove = state.todos.find(
      //   (todo) => todo.id === action.payload
      // );
      const todos = state.todos
        .filter((todo) => todo.id !== action.payload)
        .map((todo, index) => ({ ...todo, index }));
      return {
        ...state,
        todos,
      };
    }
    case TYPES.EDIT_TODO: {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      // state.todos[index] = action.payload;
      // return {
      //   ...state,
      // };
      return {
        ...state,
        todos: update(state.todos, {
          [index]: { name: { $set: action.payload.name } },
        }),
      };
    }
    case TYPES.TOGGLE_COMPLETE_TODO: {
      const result = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          const completedTodo = { ...todo, completed: !todo.completed };
          return completedTodo;
        }
        return todo;
      });
      return {
        ...state,
        todos: result,
      };
    }
    case TYPES.REINDEX_TODOS: {
      const newTodoList = state.todos.map((todo, index) => ({
        ...todo,
        index,
      }));
      return {
        ...state,
        todos: newTodoList,
      };
    }
    case TYPES.SET_TODOS: {
      return {
        ...state,
        todos: [...action.payload],
      };
    }

    default:
      return state;
  }
};

export default todoReducer;
