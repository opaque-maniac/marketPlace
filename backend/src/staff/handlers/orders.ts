/**
 * Handlers for managing products for staff
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Response, NextFunction } from "express";
import prisma from "../../utils/db";
import { AuthenticatedRequest, UpdateOrderStatusRequest } from "../../types";

// Function to fetch all orders
export const fetchAllOrders = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    const order = await prisma.order.findMany({
      include: {
        customer: true,
        orderItems: true,
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
  next: NextFunction
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
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await prisma.order.update({
      where: {
        id,
      },
      data: {
        status: status,
      },
    });

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
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.delete({
      where: {
        id,
      },
    });

    return res.status(203).json({
      message: "Order deleted successfully",
      order,
    });
  } catch (e) {
    return next(e as Error);
  }
};

// Make Order Item Ready
export const makeOrderReady = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const orderItem = await prisma.orderItem.findUnique({
      where: {
        id,
      },
      include: {
        order: true,
      },
    });

    if (!orderItem) {
      throw new Error("Order not found");
    }

    let otherItems = await prisma.orderItem.findMany({
      where: {
        orderID: orderItem.orderID,
      },
    });
    otherItems = otherItems.filter((item) => item.id !== orderItem.id);

    const newOrder = await prisma.$transaction(
      async (txl) => {
        const item = await txl.orderItem.update({
          where: {
            id: orderItem.id,
          },
          data: {
            ready: true,
          },
        });

        let ready = true;

        for (const item of otherItems) {
          if (!item.ready) {
            ready = false;
            break;
          }
        }

        if (ready) {
          await txl.order.update({
            where: {
              id: orderItem.orderID,
            },
            data: {
              status: "READY",
            },
          });
        } else if (orderItem.order.status === "PENDING") {
          await txl.order.update({
            where: {
              id: orderItem.orderID,
            },
            data: {
              status: "PROCESSING",
            },
          });
        }

        return item;
      },
      {
        maxWait: 5000,
        timeout: 10000,
      }
    );

    return res.status(200).json({
      message: "Approved item ready",
      order: newOrder,
    });
  } catch (e) {
    return next(e as Error);
  }
};
