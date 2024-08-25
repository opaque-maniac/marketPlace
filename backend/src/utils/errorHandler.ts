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
  next: NextFunction
) => {
  console.log(error);
  // JWT errors
  if (error instanceof JsonWebTokenError) {
    if (error.message === "jwt expired") {
      return res.status(401).json({
        message: "Token expired",
        errorCode: "J401",
      });
    }
    return res.status(403).json({
      message: "Unauthorized",
      errorCode: "J406",
    });
  }

  // User not found error
  if (error.message === "User not found") {
    return res.status(404).json({
      message: "User not found",
      errorCode: "I403",
    });
  }

  // Cart not found
  if (error.message === "Cart not found") {
    return res.status(404).json({
      message: "Cart not found",
      errorCode: "M400",
    });
  }

  if (error.message === "No items in cart") {
    return res.status(400).json({
      message: "No cart item found",
      errorCode: "M401",
    });
  }

  // Wishlist error
  if (error.message === "Wishlist not found") {
    return res.status(404).json({
      message: "Wishlist not found",
      errorCode: "W400",
    });
  }

  // Order errors
  if (error.message === "Order not found") {
    return res.status(404).json({
      message: "Order not found",
      errorCode: "O400",
    });
  }

  // Cart item not found
  if (error.message === "Cart item not found") {
    return res.status(404).json({
      message: "Cart item not found",
      errorCode: "M402",
    });
  }

  // Prisma errors
  if (error instanceof PrismaClientRustPanicError) {
    return res.status(500).json({
      message: "Internal server error",
      errorCode: "DB101",
    });
  }

  if (error instanceof PrismaClientInitializationError) {
    return res.status(500).json({
      message: "Internal server error",
      errorCode: "DB102",
    });
  }

  if (error instanceof PrismaClientKnownRequestError) {
    return res.status(400).json({
      message: error.message,
      errorCode: "DB100",
    });
  }

  if (error instanceof PrismaClientValidationError) {
    return res.status(400).json({
      message: error.message,
      errorCode: "DB103",
    });
  }

  return res.status(500).json({
    message: "Internal server error",
    errorCode: "S500",
  });
};

export default errorHandler;
