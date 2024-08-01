import prisma from "../../utils/db";

// Fetch customer orders
export const fetchOrders = async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        customerId: req.user.id,
      },
      include: {
        orderProducts: {
          where: {
            OR: [
              {
                status: "PENDING",
              },
              {
                status: "SHIPPED",
              },
              {
                status: "PROCESSING",
              },
            ],
          },
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
        },
      },
    });

    return res.status(200).json({
      message: "Fetched orders",
      orders,
    });
  } catch (e) {
    return next(e);
  }
};

// Delete order
export const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findFirst({
      where: {
        id,
        customerId: req.user.id,
      },
      include: {
        orderProducts: true,
      },
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    let len = order.orderProducts.length;
    for (let i = 0; i < len; i++) {
      if (order.orderProducts[i].status !== "PENDING") {
        return res.status(400).json({
          message: "Cannot delete order",
        });
      }
    }

    const deletedOrder = await prisma.order.delete({
      where: {
        id,
        customerId: req.user.id,
      },
    });

    return res.status(204).json({
      message: "Deleted order successfully",
      order: deletedOrder,
    });
  } catch (e) {
    return next(e);
  }
};

// Update order item
export const updateOrderItem = async (req, res, next) => {
  try {
    const { id, itemId } = req.params;
    const { quantity } = req.body;

    const item = await prisma.orderProducts.findFirst({
      where: {
        orderId: id,
        id: itemId,
      },
      include: {
        product: true,
      },
    });

    if (!item) {
      return res.status(404).json({
        message: "Order item not found",
      });
    }

    if (item.status !== "PENDING") {
      return res.status(400).json({
        message: "Cannot update order item",
      });
    }

    const updatedItem = await prisma.orderProducts.update({
      where: {
        id: itemId,
        orderId: id,
      },
      data: {
        quantity,
        price: quantity * item.product.price,
      },
    });

    return res.status(200).json({
      message: "Updated order item",
      item: updatedItem,
    });
  } catch (e) {
    return next(e);
  }
};

// Delete order item
export const deleteOrderItem = async (req, res, next) => {
  try {
    const { id, itemId } = req.params;

    const item = await prisma.orderProducts.findFirst({
      where: {
        orderId: id,
        id: itemId,
      },
    });

    if (!item) {
      return res.status(404).json({
        message: "Order item not found",
      });
    }

    if (item.status !== "PENDING") {
      return res.status(400).json({
        message: "Cannot update order item",
      });
    }

    const deletedItem = await prisma.orderProducts.delete({
      where: {
        id: itemId,
        orderId: id,
      },
    });

    return res.status(204).json({
      message: "Deleted order item",
      item: deletedItem,
    });
  } catch (e) {
    return next(e);
  }
};
