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

// Function to fetch all orders
export const fetchAllOrders = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const status = req.query.status
      ? (req.query.status as ORDER_STATUS)
      : undefined;
    const query = req.query.query ? (req.query.query as string) : "";

    const order = await prisma.order.findMany({
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
        customer: true,
        product: true,
      },
      skip: (page - 1) * limit,
      take: limit + 1,
    });

    const hasNext = order.length > limit;

    if (hasNext) {
      order.pop();
    }

    return res.status(200).json({
      message: "Orders fetched successfully",
      order,
      hasNext,
    });
  } catch (e) {
    return next(e as Error);
  }
};

// Fetch individual order
export const fetchIndividualOrder = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
        errorCode: "O400",
      });
    }

    return res.status(200).json({
      message: "Order fetched successfully",
      order,
    });
  } catch (e) {
    return next(e as Error);
  }
};

// Update order status
export const updateOrderStatus = async (
  req: UpdateOrderStatusRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
        errorCode: "O400",
      });
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

    return res.status(200).json({
      message: "Order status updated successfully",
      order,
    });
  } catch (e) {
    return next(e as Error);
  }
};

// Delete order
export const deleteOrder = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
        errorCode: "O400",
      });
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

    return res.status(203).json({
      message: "Order deleted successfully",
      order,
    });
  } catch (e) {
    return next(e as Error);
  }
};
