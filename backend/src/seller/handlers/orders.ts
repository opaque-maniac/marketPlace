/**
 * Handlers for seller orders
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Response, NextFunction } from "express";
import prisma from "../../utils/db";
import { AuthenticatedRequest, SellerUpdateOrderRequest } from "../../types";
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
    const query = req.query.query ? (req.query.query as string) : "";
    const status = req.query.status
      ? (req.query.status as ORDER_STATUS)
      : undefined;

    const { user } = req;

    if (!user) {
      throw new Error("User not found");
    }

    const orderItems = await prisma.order.findMany({
      where: {
        product: {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        status: status ? ORDER_STATUS[status] : "PENDING",
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
        customer: true,
      },
    });

    if (!order) {
      throw new Error("Order not found");
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
      throw new Error("Order not found");
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

    // send client email

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
