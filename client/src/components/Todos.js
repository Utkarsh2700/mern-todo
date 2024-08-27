import React from "react";
import AddTodo from "./AddTodo.js";
import Todo from "./Todo.js";

function Todos({ todos, onSelectTodo, handleCreateTodo }) {
  return (
    <div>
      <AddTodo onAddTodo={handleCreateTodo} />
      <div className="invertedTodos flex flex-col-reverse">
        {todos.map((todo) => (
          <Todo key={todo?._id} todo={todo} onSelectTodo={onSelectTodo} />
        ))}
      </div>
    </div>
  );
}

export default Todos;
