import { pool } from "./db";
import { CreateTodo, Todo, UpdateTodo } from "../models/todo";
import fs from "fs";
import path from "path";

// Helper to load SQL from the sql/ folder
const loadSQL = (filename: string): string => {
  return fs.readFileSync(path.join(__dirname, "sql", filename), "utf-8");
};

// Get all todos
export const getAllTodosQuery = async (): Promise<Todo[]> => {
  const result = await pool.query(`
    SELECT * FROM todos ORDER BY id ASC
    `);
  return result.rows;
};

// Get one todo by ID
export const getTodoByIdQuery = async (id: number): Promise<Todo | null> => {
  const result = await pool.query(
    `
    SELECT * FROM todos WHERE id = $1;`,
    [id]
  );
  return result.rows[0] || null;
};

// Create a new todo
export const createTodoQuery = async ({ title, completed, description }: CreateTodo): Promise<Todo> => {
  console.log({ title, completed, description });
  const result = await pool.query(
    `
    INSERT INTO todos (title, description, completed)
    VALUES ($1, $2, $3)
    RETURNING *;
    `,
    [title, description, completed || false]
  );
  return result.rows[0];
};

// Update an existing todo
export const updateTodoQuery = async (id: number, todo: UpdateTodo): Promise<Todo | null> => {
  const result = await pool.query(
    `
    UPDATE todos SET
      title = $1,
      description = $2,
      completed = $3
    WHERE id = $4
    RETURNING *;
`,
    [todo.title, todo.description, todo.completed, id]
  );
  return result.rows[0] || null;
};

// Delete a todo by ID
export const deleteTodoQuery = async (id: number): Promise<void> => {
  await pool.query(
    `
    DELETE FROM todos WHERE id = $1;
    `,
    [id]
  );
};
