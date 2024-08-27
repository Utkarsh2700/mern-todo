import axios from "axios";
import axiosHandler from "@/utils/AxiosHandler";

const baseURL = "http://localhost:8000/api/v1/todo";

const fetchTodos = async ({ page = 1, limit = 10 }) => {
  const response = await axiosHandler(() =>
    axios.get(`${baseURL}?page=${page}&limit=${limit}`)
  );
  return response.data;
};
const createTodo = async (todo) => {
  const response = await axiosHandler(() => axios.post(`${baseURL}`, todo));
  return response.data;
};
const fetchTodo = async ({ id }) => {
  const response = await axiosHandler(() => axios.get(`${baseURL}/${id}`));
  return response.data;
};

const updateTodo = async (_id, updatedTodo) => {
  const response = await axiosHandler(() =>
    axios.put(`${baseURL}/${_id}`, updatedTodo)
  );
  return response.data;
};

const deleteTodo = async ({ id }) => {
  const response = await axiosHandler(() => axios.delete(`${baseURL}/${id}`));
  return response.data;
};

export { fetchTodos, fetchTodo, createTodo, deleteTodo, updateTodo };
