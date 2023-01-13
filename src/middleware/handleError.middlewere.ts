import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";

class ErrorMiddleware {
  static async handle(
    error: AppError,
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({ message: error.message });
    }

    return response.status(500).json({ message: "Internal server error" });
  }
}

export default ErrorMiddleware;
