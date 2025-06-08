import test, { before, describe, mock } from "node:test";
import assert from "node:assert";
import { getAllTodos } from "../service-layer/todoController";
import { getAllTodosQuery } from "../db-layer/todoQueries";

describe("Simple test", () => {
  before(() => {
    mock.module("../db-layer/todoQueries.ts", {
      namedExports: {
        getAllTodosQuery: mock.fn(),
      },
    });
  });

  test("Get all todos", async () => {
    // Arrange - Mock the return value
    const mockTodos = [
      { id: "1", title: "Test Todo 1", description: "Description 1", completed: false },
      { id: "2", title: "Test Todo 2", description: "Description 2", completed: true },
    ];

    getAllTodosQuery.mock.mockImplementation(() => Promise.resolve(mockTodos));

    // Act - Call the service function
    const result = await getAllTodos();

    // Assert - Verify the results
    assert.deepStrictEqual(result, mockTodos);
    assert.strictEqual((getAllTodosQuery as any).mock.callCount(), 1);
  });
});
