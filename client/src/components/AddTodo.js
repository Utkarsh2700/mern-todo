import React from "react";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
function AddTodo({ onAddTodo }) {
  // console.log(onAddTodo);
  return (
    <div className="todo flex justify-between items-center my-4">
      <div className="addTodos flex items-center bg-black text-white py-3 justify-between px-4 rounded-md">
        <RiStickyNoteAddLine className="mr-2" size={24} />
        <button onClick={onAddTodo} className="add">
          AC TODO
        </button>
      </div>
      <div className="search bg-white flex items-center p-4 rounded-md">
        <IoSearchOutline size={24} />
      </div>
    </div>
  );
}

export default AddTodo;
