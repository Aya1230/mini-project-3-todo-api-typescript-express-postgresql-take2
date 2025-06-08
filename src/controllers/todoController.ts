import { Request, Response, NextFunction } from 'express';
import {
  getAllTodosQuery,
  getTodoByIdQuery,
  createTodoQuery,
  updateTodoQuery,
  deleteTodoQuery
} from '../data/todoQueries';
import { AppError } from '../middleware/AppError';

// Get all todos
export const getAllTodos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todos = await getAllTodosQuery();
    res.json(todos);
  } catch (error) {
    next(error);
  }
};

// Get a todo by ID
export const getTodoById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const todo = await getTodoByIdQuery(id);

    if (!todo) {
      return next(new AppError('Todo not found', 404));
    }

    res.json(todo);
  } catch (error) {
    next(error);
  }
};

// Create a new todo
export const createTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, completed } = req.body;
    const newTodo = await createTodoQuery(title, description, completed);
    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
};

// Update an existing todo
export const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const { title, description, completed } = req.body;

    const updatedTodo = await updateTodoQuery(id, title, description, completed);

    if (!updatedTodo) {
      return next(new AppError('Todo not found', 404));
    }

    res.json(updatedTodo);
  } catch (error) {
    next(error);
  }
};

// Delete a todo
export const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    await deleteTodoQuery(id);
    res.status(204).send(); // No content
  } catch (error) {
    next(error);
  }
};
