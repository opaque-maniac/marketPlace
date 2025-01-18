/**
 * Handlers for seller orders
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Response, NextFunction } from "express";
import prisma from "../../utils/db";
import {
  AuthenticatedRequest,
  OrderSearchRequest,
  SellerUpdateOrderRequest,
} from "../../types";
import { ORDER_STATUS } from "@prisma/client";
import { serverError } from "../../utils/globals";

// Function to fetch orders
export const fetchOrders = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const status = req.query.status
      ? (req.query.status as ORDER_STATUS)
      : undefined;

    const { user } = req;

    if (!user) {
      throw new Error("User not found");
    }

    const orderItems = await prisma.order.findMany({
      where: {
        status,
        sellerID: user.id,
      },
      include: {
        product: {
          include: {
            images: true,
          },
        },
      },
      skip: (page - 1) * limit,
      take: limit + 1,
    });

    const hasNext = orderItems.length > limit;

    if (hasNext) {
      orderItems.pop();
    }

    res.status(200).json({
      message: "Orders fetched successfully",
      hasNext,
      orders: orderItems,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

export const fetchIndividualOrder = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { user } = req;

    if (!user) {
      throw new Error("User not found");
    }

    const order = await prisma.order.findUnique({
      where: {
        id,
        sellerID: user.id,
      },
      include: {
        product: {
          include: {
            images: true,
          },
        },
      },
    });

    if (!order) {
      res.status(404).json({
        message: "Order not found",
        errorCode: "O400",
      });
      return;
    }

    res.status(200).json({
      message: "Order fetched successfully",
      order: order,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

// Function to update order status
export const updateOrder = async (
  req: SellerUpdateOrderRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { user } = req;
    const { status } = req.body;

    if (!user) {
      throw new Error("User not found");
    }

    const order = await prisma.order.findUnique({
      where: {
        id,
        sellerID: user.id,
      },
      include: {
        product: {
          include: {
            images: true,
          },
        },
      },
    });

    if (!order) {
      res.status(404).json({
        message: "Order not found",
        errorCode: "O400",
      });
      return;
    }

    if (status === "CANCELLED") {
      if (order.status === "DELIVERED" || order.status === "SHIPPED") {
        throw new Error("Order cannot be cancelled");
      }

      await prisma.$transaction(
        async (txl) => {
          await txl.order.update({
            where: {
              id: order.id,
            },
            data: {
              status: status,
            },
          });

          await txl.product.update({
            where: {
              id: order.productID,
            },
            data: {
              inventory: {
                increment: order.quantity,
              },
            },
          });
        },
        {
          maxWait: 5000,
          timeout: 10000,
        },
      );
    } else {
      await prisma.order.update({
        where: {
          id: order.id,
        },
        data: {
          status: status,
        },
      });
    }

    res.status(200).json({
      message: "Order marked as delivered",
      order,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

// Function to search for order
export const searchOrder = async (
  req: OrderSearchRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const query = req.query.query as string;
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    const products = await prisma.order.findMany({
      where: {
        product: {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
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

    const hasNext = products.length > limit;

    if (hasNext) {
      products.pop();
    }

    res.status(200).json({
      message: "Orders fetched successfully",
      hasNext,
      orders: products,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};
