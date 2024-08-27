"use client";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function EditTodo({ selectedTodo, onSaveTodo, onChangeNewTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (selectedTodo) {
      setTitle(selectedTodo.title);
      setDescription(selectedTodo.description);
    }
  }, [selectedTodo]);

  const handleSave = function ({ className }) {
    const todo = {
      title,
      description,
      date: new Date().toISOString(),
    };
    console.log("Saving data", todo);
  };
  function stripHtmlTags(input) {
    return input.replace(/<\/?[^>]+(>|$)/g, "");
  }
  const handleSaveClick = () => {
    if (selectedTodo) {
      console.log("selectedTodo =", selectedTodo);
      const updatedTodo = {
        ...selectedTodo,
        _id: selectedTodo._id,
        title,
        description: stripHtmlTags(description),
      };
      console.log("updatedTodo =", updatedTodo);

      onSaveTodo(updatedTodo);
      setTitle("");
      setDescription("");
    }
  };

  useEffect(() => {
    onChangeNewTodo({ title, description: stripHtmlTags(description) });
  }, [title, description, onChangeNewTodo]);

  return (
    <div
      className={`bg-white my-4 p-4 shadow-lg rounded-lg sticky top-10 h-[330px] `}
    >
      <div className="mb-4">
        <label
          className="block border-gray-700 text-sm font-bold mb-2"
          htmlFor=""
        >
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the title"
          id=""
          className="border border-gray-300 p-2 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Description
        </label>
        <ReactQuill
          theme="snow"
          value={description}
          onChange={setDescription}
        />
      </div>
      <button
        onClick={handleSaveClick}
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        Save Todo
      </button>
    </div>
  );
}

export default EditTodo;
