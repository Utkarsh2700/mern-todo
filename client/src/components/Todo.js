import React from "react";

function Todo({ todo, onSelectTodo }) {
  const handleTodoClick = function () {
    onSelectTodo(todo);
  };
  return (
    <div
      className="my-2 bg-white p-2  shadow-sm rounded-sm focus:border cursor-pointer"
      onClick={handleTodoClick}
    >
      <h3 className="title font-bold">{todo.title}</h3>
      <p className="description">{todo.description}</p>
      <p className="time flex justify-end text-[10px] text-gray-600">
        {todo.date}
      </p>
    </div>
  );
}

export default Todo;
