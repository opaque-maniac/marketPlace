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
  console.log(error);
  // JWT errors
  if (error instanceof JsonWebTokenError) {
    if (error.message === "jwt expired") {
      res.status(401).json({
        message: "Token expired",
        errorCode: "J401",
      });
      return;
    }
    res.status(403).json({
      message: "Unauthorized",
      errorCode: "J406",
    });
    return;
  }

  // User not found error
  if (error.message === "User not found") {
    res.status(404).json({
      message: "User not found",
      errorCode: "I403",
    });
    return;
  }

  // Cart not found
  if (error.message === "Cart not found") {
    res.status(404).json({
      message: "Cart not found",
      errorCode: "M400",
    });
    return;
  }

  // Cannot cancell order
  if (error.message === "Order cannot be cancelled") {
    res.status(400).json({
      message: "Order cannot be cancelled",
      errorCode: "O402",
    });
    return;
  }

  if (error.message === "No items in cart") {
    res.status(400).json({
      message: "No cart item found",
      errorCode: "M401",
    });
    return;
  }

  // Wishlist error
  if (error.message === "Wishlist not found") {
    res.status(404).json({
      message: "Wishlist not found",
      errorCode: "W400",
    });
    return;
  }

  // Order errors
  if (error.message === "Order not found") {
    res.status(404).json({
      message: "Order not found",
      errorCode: "O400",
    });
    return;
  }

  // Cart item not found
  if (error.message === "Cart item not found") {
    res.status(404).json({
      message: "Cart item not found",
      errorCode: "M402",
    });
    return;
  }

  // internal server error
  if (error.message === "Internal server error") {
    res.status(500).json({
      message: "Internal server error",
      errorCode: "S500",
    });
    return;
  }

  // Prisma errors
  if (error instanceof PrismaClientRustPanicError) {
    res.status(500).json({
      message: "Internal server error",
      errorCode: "DB101",
    });
    return;
  }

  if (error instanceof PrismaClientInitializationError) {
    res.status(500).json({
      message: "Internal server error",
      errorCode: "DB102",
    });
    return;
  }

  if (error instanceof PrismaClientKnownRequestError) {
    res.status(400).json({
      message: error.message,
      errorCode: "DB100",
    });
    return;
  }

  if (error instanceof PrismaClientValidationError) {
    res.status(400).json({
      message: error.message,
      errorCode: "DB103",
    });
    return;
  }

  res.status(500).json({
    message: "Internal server error",
    errorCode: "S500",
  });
};

export default errorHandler;
