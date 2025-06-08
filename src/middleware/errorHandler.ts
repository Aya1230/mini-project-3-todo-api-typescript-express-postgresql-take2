import { Request, Response, NextFunction } from 'express';
import { AppError } from './AppError';

// This middleware handles all errors thrown in the app
export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // Use the status code from the error, or fallback to 500
  const status = err.statusCode || 500;

  // Use the message from the error, or a generic one
  const message = err.message || 'Internal Server Error';

  // Send the error response as JSON
  res.status(status).json({ error: message });
};
