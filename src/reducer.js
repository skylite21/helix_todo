export const initialState = { todos: [] };
import { v4 as uuidv4 } from "uuid";

export const TYPES = {
  ADD_TODO: "ADD_TODO",
  REMOVE_TODO: "REMOVE_TODO",
  EDIT_TODO: "EDIT_TODO",
};

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
      state.todos[index] = action.payload;
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

export default todoReducer;
