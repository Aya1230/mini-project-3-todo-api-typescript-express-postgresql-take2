export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed?: boolean;
}

export type CreateTodo = Omit<Todo, "id">;
export type UpdateTodo = Partial<CreateTodo>;
