import test, { describe, mock, beforeEach, Mock } from "node:test";
import assert from "node:assert";

describe("Service", () => {
  let getAllTodosQueryMock: Mock<Function>;
  let getTodoByIdQueryMock: Mock<Function>;
  let createTodoQueryMock: Mock<Function>;
  let updateTodoQueryMock: Mock<Function>;
  let deleteTodoQueryMock: Mock<Function>;

  beforeEach(async () => {
    // Reset mocks
    mock.reset();

    // Create fresh mock functions with default implementations
    getAllTodosQueryMock = mock.fn();
    getTodoByIdQueryMock = mock.fn();
    createTodoQueryMock = mock.fn();
    updateTodoQueryMock = mock.fn();
    deleteTodoQueryMock = mock.fn();

    // Mock the entire module with all exports
    mock.module("../db-layer/todoQueries", {
      namedExports: {
        getAllTodosQuery: getAllTodosQueryMock,
        getTodoByIdQuery: getTodoByIdQueryMock,
        createTodoQuery: createTodoQueryMock,
        updateTodoQuery: updateTodoQueryMock,
        deleteTodoQuery: deleteTodoQueryMock,
      },
    });
  });

  test("Get all todos", async () => {
    // Arrange
    // Mock data
    const mockTodos = [
      { id: "1", title: "Test Todo 1", description: "Description 1", completed: false },
      { id: "2", title: "Test Todo 2", description: "Description 2", completed: true },
    ];

    // Reset the mock with new implementation
    getAllTodosQueryMock.mock.mockImplementation(async () => mockTodos);

    // Import after setting up the mock
    const { getAllTodos } = await import("../service-layer/todoController");

    // Act - Call the service function
    const result = await getAllTodos();

    // Assert - Verify the results
    assert.deepStrictEqual(result, mockTodos);
    assert.strictEqual(getAllTodosQueryMock.mock.callCount(), 1);
  });
});
