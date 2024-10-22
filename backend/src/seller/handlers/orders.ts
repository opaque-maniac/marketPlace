/**
 * Handlers for seller orders
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Response, NextFunction } from "express";
import prisma from "../../utils/db";
import { AuthenticatedRequest, OrderSearchRequest } from "../../types";

// Function to fetch orders
export const fetchOrders = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const ready =
      req.query.ready === "true"
        ? true
        : req.query.ready === "all"
          ? undefined
          : false;
    const { user } = req;

    if (!user) {
      throw new Error("User not found");
    }

    const orderItems = await prisma.orderItem.findMany({
      where: {
        ready,
        product: {
          sellerID: user.id,
        },
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

    return res.status(200).json({
      message: "Orders fetched successfully",
      hasNext,
      orders: orderItems,
    });
  } catch (e) {
    return next(e as Error);
  }
};

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

    const orderItem = await prisma.orderItem.findUnique({
      where: {
        id,
      },
      include: {
        product: {
          include: {
            images: true,
          },
        },
        order: {
          include: {
            customer: true,
          },
        },
      },
    });

    if (!orderItem) {
      return res.status(404).json({
        message: "Order not found",
        errorCode: "O400",
      });
    }

    if (orderItem.product.sellerID !== user.id) {
      return res.status(403).json({
        message: "Unauthorized",
        errorCode: "J406",
      });
    }

    return res.status(200).json({
      message: "Order fetched successfully",
      order: orderItem,
    });
  } catch (e) {
    return next(e as Error);
  }
};

// Function to make order ready
export const makeOrderDelivered = async (
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

    const order = await prisma.orderItem.update({
      where: {
        id,
        product: {
          sellerID: user.id,
        },
      },
      data: {
        delivered: true,
      },
    });

    const updatedOrder = await prisma.orderItem.findUnique({
      where: {
        id: order.id,
        product: {
          sellerID: user.id,
        },
      },
      include: {
        order: {
          include: {
            customer: true,
          },
        },
        product: {
          include: {
            images: true,
          },
        },
      },
    });

    return res.status(200).json({
      message: "Order marked as delivered",
      order: updatedOrder,
    });
  } catch (e) {
    return next(e as Error);
  }
};

// Function to search for order
export const searchOrder = async (
  req: OrderSearchRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query.query as string;
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    const products = await prisma.orderItem.findMany({
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

    return res.status(200).json({
      message: "Orders fetched successfully",
      hasNext,
      orders: products,
    });
  } catch (e) {
    return next(e as Error);
  }
};
