import React, { useReducer } from "react";
import "./scss/style.scss";
import Header from "./components/Header";
import Todo from "./components/Todo";
import todoContext from "./context";
import todoReducer, { initialState } from "./reducer";

const App = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <todoContext.Provider value={{ state, dispatch }}>
      <Header />
      <Todo />
    </todoContext.Provider>
  );
};
export default App;
