/**
 * Handlers for managing carts for staff
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../../types";
import prisma from "../../utils/db";

export const fetchUserCart = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
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
      return res.status(404).json({
        errorCode: "P400",
        message: "User not found",
      });
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

    return res.status(200).json({
      message: "User cart fetched successfully",
      cartItems,
      hasNext,
    });
  } catch (e) {
    return next(e as Error);
  }
};

export const emptyCart = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
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

    return res.status(203).json({
      message: "Empty cart successfully",
    });
  } catch (e) {
    return next(e as Error);
  }
};

export const orderCart = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const cart = await prisma.cart.findUnique({
      where: {
        customerID: id,
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
        product: true,
      },
    });

    if (cartItems.length === 0) {
      throw new Error("No items in cart");
    }

    const order = await prisma.$transaction(
      async (txl) => {
        const newOrder = await txl.order.create({
          data: {
            customerID: cart.customerID,
            status: "PENDING",
          },
        });

        let price: number = 0;

        for (let i = 0; i < cartItems.length; i++) {
          let item = cartItems[i];

          await txl.orderItem.create({
            data: {
              orderID: newOrder.id,
              productID: item.productID,
              quantity: item.quantity,
              ready: false,
            },
          });

          price += item.product.price * item.quantity;
        }

        const updatedOrder = await txl.order.update({
          where: {
            id: newOrder.id,
          },
          data: {
            totalAmount: price,
          },
        });

        await txl.cartItem.deleteMany({
          where: {
            cartID: cart.id,
          },
        });

        return updatedOrder;
      },
      {
        maxWait: 5000,
        timeout: 10000,
      }
    );

    return res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (e) {
    return next(e as Error);
  }
};

export const fetchCartItem = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
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

    return res.status(200).json({
      message: "Cart item fetched successfully",
      cartItem,
    });
  } catch (e) {
    return next(e as Error);
  }
};

export const updateCartItem = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
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

    return res.status(200).json({
      message: "Cart item updated successfully",
      cartItem: updatedCartItem,
    });
  } catch (e) {
    return next(e as Error);
  }
};

export const deleteCartItem = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await prisma.cartItem.delete({
      where: { id },
    });

    return res.status(203).json({
      message: "Cart item deleted successfully",
    });
  } catch (e) {
    return next(e as Error);
  }
};
