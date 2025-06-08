import { pool } from './db';
import { Todo } from '../models/todo';
import fs from 'fs';
import path from 'path';

// Helper to load SQL from the sql/ folder
const loadSQL = (filename: string): string => {
  return fs.readFileSync(path.join(__dirname, 'sql', filename), 'utf-8');
};

// Load all SQL query strings
const getAllTodosSQL = loadSQL('getAllTodos.sql');
const getTodoByIdSQL = loadSQL('getTodoById.sql');
const createTodoSQL = loadSQL('createTodo.sql');
const updateTodoSQL = loadSQL('updateTodo.sql');
const deleteTodoSQL = loadSQL('deleteTodo.sql');

// Get all todos
export const getAllTodosQuery = async (): Promise<Todo[]> => {
  const result = await pool.query(getAllTodosSQL);
  return result.rows;
};

// Get one todo by ID
export const getTodoByIdQuery = async (id: number): Promise<Todo | null> => {
  const result = await pool.query(getTodoByIdSQL, [id]);
  return result.rows[0] || null;
};

// Create a new todo
export const createTodoQuery = async (
  title: string,
  description: string,
  completed: boolean
): Promise<Todo> => {
  const result = await pool.query(createTodoSQL, [title, description, completed]);
  return result.rows[0];
};

// Update an existing todo
export const updateTodoQuery = async (
  id: number,
  title: string,
  description: string,
  completed: boolean
): Promise<Todo | null> => {
  const result = await pool.query(updateTodoSQL, [title, description, completed, id]);
  return result.rows[0] || null;
};

// Delete a todo by ID
export const deleteTodoQuery = async (id: number): Promise<void> => {
  await pool.query(deleteTodoSQL, [id]);
};
