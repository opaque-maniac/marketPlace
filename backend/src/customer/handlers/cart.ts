import { Prisma } from "@prisma/client";
import prisma from "../../utils/db";

// Fetch customer cart
export const fetchCustomerCart = async (req, res, next) => {
  try {
    const cart = await prisma.cart.findFirst({
      where: {
        customerId: req.user.id,
      },
      include: {
        cartItems: {
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

    return res.status(200).json({
      message: "Fetched customer cart",
      cart,
    });
  } catch (e) {
    return next(e);
  }
};

// Add product to cart
export const addToCart = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findFirst({
      where: {
        id,
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const _cart = await prisma.cart.findFirst({
      where: {
        customerId: req.user.id,
      },
    });

    if (!_cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const cartItem = await prisma.cartItems.findFirst({
      where: {
        productId: product.id,
        cartId: _cart.id,
      },
    });

    if (cartItem) {
      return res.status(400).json({
        message: "Product already in cart",
      });
    }

    const cart = await prisma.$transaction(
      async (txl) => {
        const cart = await txl.cart.findFirst({
          where: {
            customerId: req.user.id,
          },
        });

        await txl.cartItems.create({
          data: {
            cartId: cart.id,
            productId: product.id,
            quantity: 1,
          },
        });

        return cart;
      },
      {
        maxWait: 5000,
        timeout: 10000,
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      }
    );

    return res.status(200).json({
      message: "Added to cart",
      cart,
    });
  } catch (e) {
    return next(e);
  }
};

// Update cart item
export const updateCartItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const item = await prisma.cartItems.update({
      where: {
        id,
      },
      data: {
        quantity,
      },
    });

    return res.status(200).json({
      message: "Updated cart item",
      item,
    });
  } catch (e) {
    return next(e);
  }
};

// Remove item from cart
export const removeFromCart = async (req, res, next) => {
  try {
    const { id } = req.params;

    const item = await prisma.cartItems.delete({
      where: {
        id,
      },
    });

    return res.status(204).json({
      message: "Removed from cart",
      item,
    });
  } catch (e) {
    return next(e);
  }
};

// Delete all cart items
export const emptyCart = async (req, res, next) => {
  try {
    const cart = await prisma.cart.findFirst({
      where: {
        customerId: req.user.id,
      },
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    await prisma.cartItems.deleteMany({
      where: {
        cartId: cart.id,
      },
    });

    return res.status(204).json({
      message: "Cart emptied",
    });
  } catch (e) {
    return next(e);
  }
};

// Order all items in cart
export const orderCart = async (req, res, next) => {
  try {
    const cart = await prisma.cart.findFirst({
      where: {
        customerId: req.user.id,
      },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    if (cart.cartItems.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    const order = await prisma.$transaction(
      async (txl) => {
        const newOrder = await txl.order.create({
          data: {
            customerId: req.user.id,
            total: 0,
          },
        });

        const orderItemsData = cart.cartItems.map((item) => ({
          orderId: newOrder.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price * item.quantity,
        }));

        await txl.orderProducts.createMany({ data: orderItemsData });

        const total = orderItemsData.reduce((sum, item) => sum + item.price, 0);

        const updatedOrder = await txl.order.update({
          where: { id: newOrder.id },
          data: { total },
        });

        return updatedOrder;
      },
      {
        maxWait: 5000,
        timeout: 10000,
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      }
    );

    return res.status(201).json({
      message: "Order created",
      order,
    });
  } catch (e) {
    return next(e);
  }
};
