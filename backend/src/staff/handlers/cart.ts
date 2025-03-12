/**
 * Handlers for managing carts for staff
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { NextFunction, Response } from "express";
import { AuthenticatedRequest, UpdateCartItemRequest } from "../../types";
import prisma from "../../utils/db";
import { serverError } from "../../utils/globals";
import { newCartItemSocket } from "../../websockets/sockets";
import { CartItem } from "@prisma/client";

export const fetchUserCart = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const query = req.query.query ? (req.query.query as string) : undefined;

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

    let cartItems: CartItem[] = [];
    if (query) {
      cartItems = await prisma.cartItem.findMany({
        where: {
          OR: [
            {
              product: {
                name: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            },
          ],
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
    } else {
      cartItems = await prisma.cartItem.findMany({
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
    }

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

export const updateCartItem = async (
  req: UpdateCartItemRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const exists = await prisma.cartItem.findUnique({
      where: { id },
      include: {
        product: true,
      },
    });

    if (!exists) {
      throw new Error("Cart item not found");
    }

    if (exists.product.inventory > quantity) {
      if (quantity >= 1) {
        const newItem = await prisma.cartItem.update({
          where: { id },
          data: {
            quantity,
          },
        });

        res.status(200).json({
          message: "Updated quantity",
          quantity: newItem.quantity,
        });
        return;
      }
    }

    res.status(200).json({
      message: "Updated quantity",
      quantity: exists.quantity,
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
