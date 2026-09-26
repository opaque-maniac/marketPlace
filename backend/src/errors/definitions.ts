import APIErrorCodes from "./error-codes";

export class AppError extends Error {
  public statusCode: number;
  public errorCode: string;
  constructor(
    message: string,
    statusCode: number = 400,
    errorCode: string = APIErrorCodes.generic.bad_request,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    Error.captureStackTrace(this, this.constructor);
  }
}

export const Errors = {
  BadRequest: (msg: string, code: string = APIErrorCodes.generic.bad_request) =>
    new AppError(msg, 400, code),

  NotFound: (
    msg: string,
    entity: "Customer" | "Product" | "Seller" | "Staff",
  ) => new AppError(msg, 404, APIErrorCodes.not_found[entity]),

  Unauthorized: (
    msg: string = "Unauthorized",
    code: string = APIErrorCodes.authentication.unauthorized_access,
  ) => new AppError(msg, 401, code),

  Internal: (
    msg: string = "Internal Server Error",
    code = APIErrorCodes.server_error.internal_server_error,
  ) => new AppError(msg, 500, code),
};
