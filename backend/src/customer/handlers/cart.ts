/**
 * Handlers for managing products for customers
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Response, NextFunction, Request } from "express";
import prisma from "../../utils/db";
import {
  AuthenticatedRequest,
  CommentCreateRequest,
  ProductSearchRequest,
} from "../../types";

// Function to fetch cart
export const fetchCart = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req;
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    const cart = await prisma.cart.findUnique({
      where: {
        customerID: user?.id,
      },
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const cartItems = await prisma.cartItem.findMany({
      where: {
        cartID: cart.id,
      },
      include: {
        product: {
          include: {
            images: true,
          },
        },
      },
      take: limit + 1,
      skip: (page - 1) * limit,
    });

    const hasNext = cartItems.length > limit;

    if (hasNext) {
      cartItems.pop();
    }

    return res.status(200).json({
      message: "Cart fetched successfully",
      cart,
      hasNext,
      cartItems,
    });
  } catch (e) {
    return next(e as Error);
  }
};

// Fetch individual cart item
export const fetchCartItem = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const cartItems = await prisma.cartItem.findUnique({
      where: {
        id,
      },
      include: {
        product: {
          include: {
            images: true,
          },
        },
      },
    });

    if (!cartItems) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    return res.status(200).json({
      message: "Cart item fetched successfully",
      data: cartItems,
    });
  } catch (e) {
    return next(e as Error);
  }
};
