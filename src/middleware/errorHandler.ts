import { Request, Response, NextFunction } from "express";
import { AppError } from "../error/AppError";

// This middleware handles all errors thrown in the app
export const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    res.status(500).json({ message: "Internal Server Error", stack: err.stack });
  }
};
