import express from 'express';
import {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
} from '../controllers/todoController';

const router = express.Router(); // Create a router object

// Define your REST API routes
router.get('/todos', getAllTodos);           // GET /todos → get all todos
router.get('/todos/:id', getTodoById);       // GET /todos/1 → get todo by ID
router.post('/todos', createTodo);           // POST /todos → create a new todo
router.put('/todos/:id', updateTodo);        // PUT /todos/1 → update a todo
router.delete('/todos/:id', deleteTodo);     // DELETE /todos/1 → delete a todo

export default router;
