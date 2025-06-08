// A custom error class to give more control over the errors we throw
export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message); // Set the error message from the parent class
    this.statusCode = statusCode; // Store HTTP status code

    // Optional: capture the exact location where the error happened
    Error.captureStackTrace(this, this.constructor);
  }
}
