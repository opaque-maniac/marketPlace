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
    const customerID = req.user?.id;
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const cancel = req.query.cancel === "true";

    if (!customerID) {
      throw new Error("Customer ID not found");
    }

    const orders = await prisma.order.findMany({
      where: {
        customerID,
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
    const customerID = req.user?.id;

    if (!customerID) {
      throw new Error("Customer ID not found");
    }

    const order = await prisma.order.findUnique({
      where: {
        id,
        customerID,
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
      return res.status(404).json({
        message: "Order not found",
      });
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
    const customerID = req.user?.id;

    if (!customerID) {
      throw new Error("Customer ID not found");
    }

    const order = await prisma.order.update({
      where: {
        id,
        customerID,
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
