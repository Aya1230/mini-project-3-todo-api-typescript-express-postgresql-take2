import express from "express";
import { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo } from "../service-layer/todoController";
import { AppError } from "../error/AppError";
import { createSchema, deleteSchema } from "../validators-layer/todo";
import { ZodError } from "zod";

const router = express.Router(); // Create a router object

// Define your REST API routes
// GET /todos → get all todos
router.get("/todos", async (req, res) => {
  const todos = await getAllTodos();
  res.json(todos);
});

// GET /todos/1 → get todo by ID
router.get("/todos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const todo = await getTodoById(id);
  res.status(200).json(todo);
});

// POST /todos → create a new todo
router.post(
  "/todos",
  (req, res, next) => {
    try {
      createSchema.parse(req);
      next();
    } catch (error) {
      if (error instanceof ZodError) res.status(400).json(error.errors);
    }
  },
  async (req, res) => {
    const newTodo = await createTodo(req.body);
    res.status(201).json(newTodo);
  }
);

// PUT /todos/1 → update a todo
router.put("/todos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedTodo = await updateTodo(id, req.body);
  res.json(updatedTodo);
});

// DELETE /todos/1 → delete a todo
router.delete(
  "/todos/:id",
  (req, res, next) => {
    try {
      deleteSchema.parse(req);
      next();
    } catch (error) {
      if (error instanceof ZodError) res.status(400).json(error.errors);
    }
  },
  async (req, res) => {
    const id = parseInt(req.params.id);
    await deleteTodo(id);
    res.status(204).send();
  }
);

export default router;
