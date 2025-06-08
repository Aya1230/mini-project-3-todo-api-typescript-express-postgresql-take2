
# Todo Application API (TypeScript + Express + PostgreSQL)

This project is a backend Todo Application built with **TypeScript**, **Express.js**, and **PostgreSQL**. It demonstrates how to build a clean, RESTful API with a database layer separated from business logic.

## ✅ Features

- Full **CRUD** operations on Todo items
- Clean folder structure and separation of concerns
- PostgreSQL database with raw SQL queries (stored separately)
- Error handling with a custom error class and centralized handler
- `.env` configuration for database settings

---

## 📁 Project Structure

```
mini-project-3-todo-api-typescript-express-postgresql/
│
├── src/
│   ├── controllers/       # Logic for handling requests
│   │   └── todoController.ts
│   ├── data/              # DB connection
│   │   └── db.ts
│   ├── routes/            # Express routes
│   │   └── todoRoutes.ts
│   ├── models/            # TypeScript interfaces/types
│   │   └── todo.ts
│   ├── middleware/        # Custom error handler
│   │   └── errorHandler.ts
│   ├── utils/             # Custom error class
│   │   └── AppError.ts
│   ├── sql/               # SQL queries (abstracted from code)
│   │   ├── getAllTodos.sql
│   │   ├── getTodoById.sql
│   │   ├── createTodo.sql
│   │   ├── updateTodo.sql
│   │   └── deleteTodo.sql
│   └── index.ts           # Main server file
│
├── .env                   # Environment variables
├── .gitignore             # Ignored files/folders
├── tsconfig.json          # TypeScript config
├── package.json
└── README.md              # You're reading it!
```

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create PostgreSQL database and table

Example SQL (run in PgAdmin or `psql`):
```sql
CREATE DATABASE todo_db;

CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT false
);
```

### 3. Create `.env` file

```
DB_USER=postgres
DB_HOST=localhost
DB_DATABASE=todo_db
DB_PASSWORD=1234
DB_PORT=5432
```

---

### 4. Start the server

```bash
npm start
```

Server runs at:  
```
http://localhost:5000
```

---

## 🔌 API Endpoints

| Method | Endpoint            | Description               |
|--------|---------------------|---------------------------|
| GET    | `/api/todos`        | Get all todos             |
| GET    | `/api/todos/:id`    | Get a single todo by ID   |
| POST   | `/api/todos`        | Create a new todo         |
| PUT    | `/api/todos/:id`    | Update a todo             |
| DELETE | `/api/todos/:id`    | Delete a todo             |

---

## 📦 Scripts

```json
"scripts": {
  "start": "ts-node-dev src/index.ts"
}
```

---

## 🧪 Test the API

Use [Thunder Client](https://www.thunderclient.com/) or [Postman] to send requests to `http://localhost:5000/api/todos`.

---

## ✅ Good to Know

- Errors are handled globally using a custom `AppError` class and `errorHandler` middleware.
- SQL queries are stored in the `/sql` folder and read at runtime.
- Cleanly separates database logic from controller logic (DB layer abstraction).

---

