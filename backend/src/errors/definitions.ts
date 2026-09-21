import { stat } from "fs";
import APIErrorCodes from "./error-codes";

export class APIError extends Error {
  statusCode: number = 404;
  errorCode: string;

  constructor(message: string, status: number = 400) {
    super(message);
    this.statusCode = status;
    this.errorCode = APIErrorCodes.generic.api_error;
  }
}

export class InvalidCredentialsErorr extends APIError {
  constructor(message: string, status: number = 401) {
    super(message, status);
    this.errorCode = APIErrorCodes.authentication.invalid_credentials;
  }
}

export class NotFoundError extends APIError {
  constructor(
    message: string,
    errType: "Customer" | "Product" | "Seller" | "Staff",
    status: number = 404,
  ) {
    super(message, status);
    this.errorCode = APIErrorCodes.not_found[errType];
  }
}

export class BadRequestError extends APIError {
  constructor(message: string, status: number = 400) {
    super(message, status);
    this.errorCode = APIErrorCodes.generic.bad_request;
  }
}

export class UnauthorizedError extends APIError {
  constructor(message: string, status: number = 401) {
    super(message, status);
    this.errorCode = APIErrorCodes.authentication.unauthorized_access;
  }
}

export class DatabaseError extends APIError {
  constructor(message: string, status: number = 500) {
    super(message, status);
    this.errorCode = APIErrorCodes.server_error.database_error;
  }
}

export class InternalServerError extends APIError {
  constructor(message: string, status: number = 500) {
    super(message, status);
    this.errorCode = APIErrorCodes.server_error.internal_server_error;
  }
}
