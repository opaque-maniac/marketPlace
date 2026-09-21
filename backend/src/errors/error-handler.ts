import type { Request, Response, NextFunction } from "express";
import { APIError } from "./definitions";
import APIErrorCodes from "./error-codes";

export default async function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  if (err instanceof APIError) {
    res.status(err.statusCode).json({
      message: err.message,
      error_code: err.errorCode,
    });
    return;
  }

  res.status(500).json({
    message: "Internal Server Error",
    error_code: APIErrorCodes.server_error.internal_server_error,
  });
}
