import type { Request, Response, NextFunction } from "express";
import APIErrorCodes from "./error-codes";
import { AppError } from "./definitions";

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  // Log the error internally for debugging
  console.error(`[Error] ${err.name}: ${err.message}`);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error_code: err.errorCode,
    });
    return;
  }

  // Fallback for unhandled/native errors
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error_code: APIErrorCodes.server_error.internal_server_error,
  });
}
