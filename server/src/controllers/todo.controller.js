import { Todo } from "../models/todo.model.js";
import { asyncHadler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Get all todos

// To add limit and skip for pagination of response

const getTodos = asyncHadler(async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  const todos = await Todo.find()
    .limit(limitNumber)
    .skip((pageNumber - 1) * limitNumber);

  const totalTodos = await Todo.countDocuments();

  if (todos.length === 0) {
    throw new ApiError(404, "No todos found");
  }

  res.status(200).json(
    new ApiResponse(
      200,
      {
        todos,
        totalTodos,
        totalPages: Math.ceil(totalTodos / limitNumber),
        currentPage: pageNumber,
      },
      "Todos reterieved Sucessfully"
    )
  );
});

// Create a todo

const createTodo = asyncHadler(async (req, res, next) => {
  const { title, description } = req.body;

  if (!title || !description) {
    throw new ApiError("400", "Both title and description are reauired");
  }
  const newTodo = new Todo({
    title,
    description,
  });

  const savedTodo = await newTodo.save();

  res
    .status(200)
    .json(new ApiResponse(201, savedTodo, "Todo created Sucessfully"));
});

// get a single todoBy ID

const getTodoById = asyncHadler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    throw new ApiError(404, "Todo not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, todo, "Todo retrieved Sucessfully"));
});

// Update a todo

const updateTodo = asyncHadler(async (req, res, next) => {
  const { title, description, _id } = req.body;

  console.log("req.body =", req.body);

  const todo = await Todo.findById(_id);

  if (!todo) {
    throw new ApiError(404, "Todo not found");
  }
  if (title) todo.title = title;
  if (description) todo.description = description;

  const updatedTodo = await todo.save();

  res
    .status(200)
    .json(new ApiResponse(200, updatedTodo, "Todo updated Sucessfully"));
});

// Delete a todo

const deleteTodo = asyncHadler(async (req, res) => {
  const result = await Todo.deleteOne({ _id: req.params.id });

  if (result.deletedCount === 0) {
    throw new ApiError(404, "Todo not found");
  }

  res.status(200).json(new ApiResponse(200, null, "Todo deleted Sucessfully"));
});

export { getTodos, createTodo, getTodoById, updateTodo, deleteTodo };
