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
import { newCartItemSocket } from "../../websockets/sockets";

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
      throw new Error("Customer not found");
    }

    const cart = await prisma.cart.findUnique({
      where: {
        customerID: customer.id,
      },
    });

    if (!cart) {
      throw new Error("Cart not found");
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
      throw new Error("Customer cart not found");
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

export const deleteCartItem = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    const item = await prisma.cartItem.findUnique({
      where: { id },
      include: {
        cart: true,
      },
    });

    if (!item) {
      throw new Error("Cart item not found");
    }

    await prisma.cartItem.delete({
      where: { id },
    });

    await newCartItemSocket(item.cart.customerID);

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
