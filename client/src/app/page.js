"use client";
import { useEffect, useState } from "react";
import Container from "@/components/Container";
import EditTodo from "@/components/EditTodo";
import Header from "@/components/Header";
import Todos from "@/components/Todos";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  fetchTodo,
  deleteTodo,
} from "@/db/todoService";
import BottomDrawer from "@/components/BottomDrawer";

export default function Home() {
  const [todos, setTodo] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });

  useEffect(() => {
    let fetchedTodos;
    (async () => {
      fetchedTodos = await fetchTodos(1, 10);
      // console.log(fetchedTodos);
      setTodo(fetchedTodos?.data?.todos);
    })();
  }, []);

  const handleCreateTodo = async () => {
    if (newTodo.title && newTodo.description) {
      const todoToCreate = {
        ...newTodo,
        date: new Date().toISOString(),
      };
      try {
        const response = await createTodo(newTodo);
        console.log(response);
        setTodo((prevTodos) => [...prevTodos, response.data]);
        selectedTodo({ title: "", description: "" });
      } catch (error) {
        console.log("Failed to add todo", error);
      }
    }
  };

  // will be handling it in the last
  const handleUpdateTodo = async (updatedTodo) => {
    console.log("Updating todo with ID:", updatedTodo._id);
    console.log("updatedTodo", updatedTodo);

    try {
      const response = await updateTodo(updatedTodo._id, updatedTodo);
      const updatedTodoFromDB = response.data;
      console.log(response.data);

      setTodo((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === updatedTodoFromDB._id ? updatedTodoFromDB : todo
        )
      );
    } catch (error) {
      console.error("Failed to update todo", error);
    }
  };
  return (
    <main className="bg-gray-200">
      <Header />
      <Container>
        <BottomDrawer
          selectedTodo={selectedTodo}
          onSaveTodo={handleUpdateTodo}
          onChangeNewTodo={setNewTodo}
        />
        <div className="flex justify-between gap-4">
          <Todos
            todos={todos}
            onSelectTodo={setSelectedTodo}
            handleCreateTodo={handleCreateTodo}
          />
          <div className="hidden sm:block">
            <EditTodo
              selectedTodo={selectedTodo}
              onSaveTodo={handleUpdateTodo}
              onChangeNewTodo={setNewTodo}
            />
          </div>
        </div>
      </Container>
    </main>
  );
}
