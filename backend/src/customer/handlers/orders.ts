/**
 * Handlers for managing orders for customers
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Response, NextFunction, Request } from "express";
import prisma from "../../utils/db";
import { AuthenticatedRequest } from "../../types";
import { ORDER_STATUS } from "@prisma/client";

// Function to fetch orders
export const fetchOrders = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req;
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const status = req.query.status
      ? (req.query.status as ORDER_STATUS)
      : undefined;

    if (!user) {
      throw new Error("User not found");
    }

    const orders = await prisma.order.findMany({
      where: {
        customerID: user.id,
        status,
      },
      skip: (page - 1) * limit,
      take: limit + 1,
    });

    const hasNext = orders.length > limit;

    if (hasNext) {
      orders.pop();
    }

    return res.status(200).json({
      message: "Fetched orders",
      orders,
      hasNext,
    });
  } catch (e) {
    return next(e as Error);
  }
};

// Function to fetch individual order
export const fetchIndividualOrder = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { user } = req;

    if (!user) {
      throw new Error("User not found");
    }

    const order = await prisma.order.findUnique({
      where: {
        id,
        customerID: user.id,
      },
    });

    if (!order) {
      throw new Error("Order not found");
    }

    return res.status(200).json({
      message: "Fetched order",
      order,
    });
  } catch (e) {
    return next(e as Error);
  }
};

// Fetch order items
export const fetchOrderItems = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    if (!user) {
      throw new Error("User not found");
    }

    const order = await prisma.order.findUnique({
      where: {
        id,
      },
    });

    if (!order) {
      throw new Error("Order not found");
    }

    const orderItems = await prisma.orderItem.findMany({
      where: {
        orderID: order.id,
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

    const hasNext = orderItems.length > limit;

    if (hasNext) {
      orderItems.pop();
    }

    return res.status(200).json({
      message: "Fetched order items",
      orderItems,
      hasNext,
    });
  } catch (e) {
    return next(e as Error);
  }
};

// Function to cancel order
export const cancelOrder = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      throw new Error("User not found");
    }

    const order = await prisma.order.findUnique({
      where: {
        id,
      },
    });

    if (!order) {
      throw new Error("Order not found");
    }

    if (
      order.status == "READY" ||
      order.status == "DELIVERED" ||
      order.status == "SHIPPED"
    ) {
      throw new Error("Order cannot be cancelled");
    }

    const updatedOrder = await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: "CANCELLED",
      },
    });

    return res.status(200).json({
      message: "Cancelled order",
      id: updatedOrder.id,
    });
  } catch (e) {
    return next(e as Error);
  }
};
