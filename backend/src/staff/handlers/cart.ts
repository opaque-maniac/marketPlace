/**
 * Handlers for managing carts for staff
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../../types";
import prisma from "../../utils/db";
import { serverError } from "../../utils/globals";

export const fetchUserCart = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    const customer = await prisma.customer.findUnique({
      where: {
        id,
      },
    });

    if (!customer) {
      res.status(404).json({
        errorCode: "P400",
        message: "User not found",
      });
      return;
    }

    const cartItems = await prisma.cartItem.findMany({
      where: {
        cart: {
          customerID: customer.id,
        },
      },
      include: {
        product: true,
      },
      take: limit + 1,
      skip: (page - 1) * limit,
    });

    const hasNext = cartItems.length > limit;

    if (hasNext) {
      cartItems.pop();
    }

    res.status(200).json({
      message: "User cart fetched successfully",
      cartItems,
      hasNext,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

export const emptyCart = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    const cart = await prisma.cart.findUnique({
      where: {
        id,
      },
    });

    if (!cart) {
      throw new Error("Cart not found");
    }

    await prisma.cartItem.deleteMany({
      where: {
        cartID: cart.id,
      },
    });

    res.status(203).json({
      message: "Empty cart successfully",
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

export const fetchCartItem = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    const cartItem = await prisma.cartItem.findUnique({
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

    if (!cartItem) {
      throw new Error("Cart item not found");
    }

    res.status(200).json({
      message: "Cart item fetched successfully",
      cartItem,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

export const updateCartItem = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const quatity = req.query.quatity
      ? parseInt(req.query.quatity as string)
      : 1;

    const cartItem = await prisma.cartItem.findUnique({
      where: {
        id,
      },
    });

    if (!cartItem) {
      throw new Error("Cart item not found");
    }

    const updatedCartItem = await prisma.cartItem.update({
      where: {
        id,
      },
      data: {
        quantity: quatity,
      },
    });

    res.status(200).json({
      message: "Cart item updated successfully",
      cartItem: updatedCartItem,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

export const deleteCartItem = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.cartItem.delete({
      where: { id },
    });

    res.status(203).json({
      message: "Cart item deleted successfully",
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};
