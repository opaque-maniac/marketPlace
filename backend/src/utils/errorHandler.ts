import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { Request, Response, NextFunction } from "express";
import { JsonWebTokenError } from "jsonwebtoken";

const errorHandler = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  let status = 500;
  let message = "Internal server error";
  let code = "S001";

  console.log(error);
  switch (error.message) {
    case "User already exists":
      message = error.message;
      code = "PR01";
      status = 400;
      break;
    case "Invalid email or password":
      code = "I002";
      message = error.message;
      status = 400;
      break;
    case "User not found":
      code = "A001";
      message = "Unauthorized";
      status = 401;
      break;
    case "User profile not found":
      code = "PR03";
      status = 404;
      message = error.message;
      break;
    case "User is not active":
      code = "A002";
      message = "Profile is not active";
      status = 401;
      break;
    case "Cart not found":
      message = error.message;
      status = 500;
      code = "C001";
      break;
    case "Cart item not found":
      message = error.message;
      status = 404;
      code = "C002";
      break;
    case "No items in cart":
      code = "C003";
      status = 400;
      message = error.message;
      break;
    case "Product not found":
      status = 404;
      code = "P001";
      message = error.message;
      break;
    case "Comment not found":
      code = "CM01";
      status = 404;
      message = error.message;
      break;
    case "Order not found":
      status = 404;
      code = "OR01";
      message = error.message;
      break;
    case "Seller not found":
      status = 404;
      code = "SE01";
      message = error.message;
      break;
    case "Order seller not found":
      code = "SE02";
      status = 500;
      message = error.message;
      break;
    case "Order cannot be cancelled":
      status = 400;
      code = "OR02";
      message = error.message;
      break;
    case "Profile not found":
      code = "PR02";
      status = 401;
      message = error.message;
      break;
    case "Wishlist not found":
      status = 500;
      code = "W001";
      message = error.message;
      break;
    case "Wishlist item not found":
      status = 404;
      code = "W002";
      message = error.message;
      break;
    case "Auth token not found":
      message = "Unauthorized";
      status = 401;
      code = "A003";
      break;
    case "Customer not found":
      message = error.message;
      status = 404;
      code = "CU01";
      break;
    case "Customer cart not found":
      status = 404;
      code = "CU02";
      message = error.message;
      break;
    case "Staff not found":
      status = 404;
      code = "ST01";
      message = error.message;
      break;
    case "Unauthorized":
      status = 401;
      code = "A005";
      message = error.message;
      break;
    case "Customer wishlist not found":
      code = "CU03";
      status = 404;
      message = error.message;
      break;
    case "Invalid refresh token":
      message = "Session expired";
      status = 401;
      code = "A006";
      break;
    case "Invalid security token":
      message = "Security code has expired";
      status = 401;
      code = "SEC0";
      break;
    case "Permission denied":
      message = error.message;
      status = 401;
      code = "SEC1";
      break;
    case "Reset profile not found":
      message = "Profile not found";
      status = 401;
      code = "SEC2";
      break;
    default:
      // JWT errors
      if (error instanceof JsonWebTokenError) {
        //if (error.message === "jwt expired") {
        //}

        message = "Unauthorized";
        status = 401;
        code = "A004";
        break;
      }

      // internal server error
      if (error.message === "Internal server error") {
        code = "S001";
        message = error.message;
        status = 500;
        break;
      }

      // Prisma errors
      if (error instanceof PrismaClientRustPanicError) {
        code = "S001";
        message = "Internal server error";
        status = 500;
        break;
      }

      if (error instanceof PrismaClientInitializationError) {
        code = "S001";
        message = "Internal server error";
        status = 500;
        break;
      }

      if (error instanceof PrismaClientKnownRequestError) {
        code = "S001";
        message = "Internal server error";
        status = 500;
        break;
      }

      if (error instanceof PrismaClientValidationError) {
        code = "S001";
        message = "Internal server error";
        status = 500;
        break;
      }

      code = "S001";
      message = "Internal server error";
      status = 500;
      break;
  }

  res.status(status).json({
    message,
    errorCode: code,
  });
};

export default errorHandler;
