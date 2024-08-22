import { Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";

const errorHandler = async (error: Error, req: Request, res: Response) => {
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
      errorCode: "J406",
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

  // Order errros
  if (error.message === "Order not found") {
    return res.status(404).json({
      message: "Order not found",
      errorCode: "O400",
    });
  }

  return res.status(500).json({
    message: "Internal server error",
  });
};

export default errorHandler;
