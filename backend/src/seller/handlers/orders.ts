import { Prisma } from "@prisma/client";
import prisma from "../../utils/db";

// Function to fetch seller orders
export const fetchSellerOrders = async (req, res, next) => {
  try {
    const itemsPerPage = req.query.itemsPerPage || 20;
    const page = req.query.page || 1;

    const orders = await prisma.orderProducts.findMany({
      where: {
        product: {
          sellerId: req.user.id,
        },
      },
      include: {
        product: {
          include: {
            images: true,
          },
        },
      },
      take: itemsPerPage + 1,
      skip: (page - 1) * itemsPerPage,
    });

    const hasNextPage = orders.length > itemsPerPage;

    if (hasNextPage) {
      orders.pop();
    }

    return res.status(200).json({
      message: "Orders fetched successfully",
      orders,
      hasNextPage,
    });
  } catch (e) {
    return next(e);
  }
};

// Function to fetch individual seller order
export const fetchIndividualSellerOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await prisma.orderProducts.findFirst({
      where: {
        id,
        product: {
          sellerId: req.user.id,
        },
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
      return res.status(404).json({
        message: "Order not found",
      });
    }

    return res.status(200).json({
      message: "Order fetched successfully",
      order,
    });
  } catch (e) {
    return next(e);
  }
};

// Function to update individual seller order
export const updateIndividualSellerOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await prisma.$transaction(
      async (txl) => {
        const updatedOrder = await txl.orderProducts.update({
          where: {
            id,
            product: {
              sellerId: req.user.id,
            },
          },
          data: {
            status,
          },
        });

        if (status === "DELIVERED") {
          await txl.product.update({
            where: {
              id: updatedOrder.productId,
            },
            data: {
              stock: {
                decrement: updatedOrder.quantity,
              },
            },
          });
        }

        return updatedOrder;
      },
      {
        maxWait: 5000,
        timeout: 10000,
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      }
    );

    if (status === "DELIVERED") {
      // Send delivery email
    }

    return res.status(200).json({
      message: "Order updated successfully",
      order,
    });
  } catch (e) {
    return next(e);
  }
};
