/**
 * Handlers for managing products for staff
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Response, NextFunction } from "express";
import prisma from "../../utils/db";
import { AuthenticatedRequest, UpdateOrderStatusRequest } from "../../types";
import { ORDER_STATUS } from "@prisma/client";
import { serverError } from "../../utils/globals";

// Function to fetch all orders
export const fetchAllOrders = async (
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
    const query = req.query.query ? (req.query.query as string) : undefined;

    const orders = await prisma.order.findMany({
      where: query
        ? {
            OR: [
              {
                id: query,
              },
              {
                product: {
                  name: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
              },
              {
                customer: {
                  firstName: query,
                },
              },
              {
                customer: {
                  lastName: query,
                },
              },
            ],
            status,
          }
        : {
            status,
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

    console.log(`Orders found\n${orders}`);

    const hasNext = orders.length > limit;

    if (hasNext) {
      orders.pop();
    }

    res.status(200).json({
      message: "Orders fetched successfully",
      orders,
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

// Fetch individual order
export const fetchIndividualOrder = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        product: {
          include: {
            images: true,
            seller: {
              include: {
                image: true,
              },
            },
          },
        },
      },
    });

    if (!order) {
      throw new Error("Order not found");
    }

    res.status(200).json({
      message: "Order fetched successfully",
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

// Update order status
export const updateOrderStatus = async (
  req: UpdateOrderStatusRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new Error("Order not found");
    }

    if (status === "CANCELLED") {
      await prisma.$transaction(
        async (txl) => {
          await txl.order.update({
            where: {
              id,
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
          id,
        },
        data: {
          status: status,
        },
      });
    }

    res.status(200).json({
      message: "Order status updated successfully",
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

// Delete order
export const deleteOrder = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new Error("Order not found");
    }

    if (order.status === "CANCELLED") {
      await prisma.$transaction(
        async (txl) => {
          await txl.order.delete({
            where: {
              id,
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
      await prisma.order.delete({
        where: {
          id,
        },
      });
    }

    res.status(203).json({
      message: "Order deleted successfully",
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
