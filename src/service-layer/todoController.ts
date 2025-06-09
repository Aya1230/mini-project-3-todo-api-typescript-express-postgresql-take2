import { Request, Response, NextFunction } from "express";
import {
  getAllTodosQuery,
  getTodoByIdQuery,
  createTodoQuery,
  updateTodoQuery,
  deleteTodoQuery,
} from "../db-layer/todoQueries";
import { CreateTodo, UpdateTodo } from "../models/todo";
import { AppError } from "../error/AppError";

// Get all todos
export const getAllTodos = async () => {
  return await getAllTodosQuery();
};

// Get a todo by ID
export const getTodoById = async (id: number) => {
  const todo = await getTodoByIdQuery(id);

  if (!todo) throw new AppError("Todo not found", 404);

  return todo;
};

// Create a new todo
export const createTodo = async (todo: CreateTodo) => {
  return await createTodoQuery(todo);
};

// Update an existing todo
export const updateTodo = async (id: number, updatedTodo: UpdateTodo) => {
  let todo = await getTodoByIdQuery(id);

  if (!todo) throw new AppError("not found", 404);

  todo = await updateTodoQuery(id, { ...todo, ...updatedTodo });

  return todo;
};

// Delete a todo
export const deleteTodo = async (id: number) => {
  const todo = await getTodoByIdQuery(id);

  if (!todo) throw new AppError("not found", 404);

  if (todo?.completed === false) throw new AppError("todo is not completed", 409);

  await deleteTodoQuery(id);
};
