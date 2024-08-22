/**
 * Handlers for managing orders for customers
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Response, NextFunction, Request } from "express";
import prisma from "../../utils/db";
import { AuthenticatedRequest } from "../../types";

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
    const cancel = req.query.cancel === "true";

    if (!user) {
      throw new Error("User not found");
    }

    const orders = await prisma.order.findMany({
      where: {
        customerID: user.id,
        status: cancel
          ? "CANCELLED"
          : {
              not: "CANCELLED",
            },
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
      include: {
        orderItems: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
          },
        },
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

// Function to cancel order
export const cancelOrder = async (
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

    const order = await prisma.order.update({
      where: {
        id,
        customerID: user.id,
      },
      data: {
        status: "CANCELLED",
      },
    });

    return res.status(200).json({
      message: "Order cancelled",
      order,
    });
  } catch (e) {
    return next(e as Error);
  }
};
