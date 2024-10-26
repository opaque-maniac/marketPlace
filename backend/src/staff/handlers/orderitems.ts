/**
 * Handlers for managing order items for staff
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { AuthenticatedRequest } from "../../types";
import { Response, NextFunction } from "express";
import prisma from "../../utils/db";
import { ORDER_STATUS } from "@prisma/client";

export const fetchOrderItems = async (
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
        : req.query.ready === "false"
          ? false
          : undefined;

    const orderItems = await prisma.orderItem.findMany({
      where: {
        ready,
      },
      include: {
        product: true,
      },
      take: limit + 1,
      skip: (page - 1) * limit,
    });
  } catch (e) {
    return next(e as Error);
  }
};

export const fetchIndividualOrderItems = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

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
      message: "Fetched order items successfully",
      orderItems,
      hasNext,
    });
  } catch (e) {
    return next(e as Error);
  }
};

export const fetchIndividualOrderItem = async (
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
        product: {
          include: {
            images: true,
          },
        },
      },
    });

    return res.status(200).json({
      message: "Fetched order item",
      orderItem,
    });
  } catch (e) {
    return next(e as Error);
  }
};

// Make Order Item Ready
export const makeOrderItemReady = async (
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

export const deleteOrderItem = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const orderItem = await prisma.orderItem.delete({
      where: {
        id,
      },
    });

    return res.status(203).json({
      message: "Deleted order item",
      orderItem,
    });
  } catch (e) {
    return next(e as Error);
  }
};

export const searchOrderItem = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query.query ? (req.query.query as string) : "";
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    const orderItems = await prisma.orderItem.findMany({
      where: {
        id: {
          contains: query,
          mode: "default",
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
      message: "Order items fetched successfully",
      orderItems,
      hasNext,
    });
  } catch (e) {
    return next(e as Error);
  }
};
