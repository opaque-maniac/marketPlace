/**
 * Handlers for managing cart for customers
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Response, NextFunction, Request } from "express";
import prisma from "../../utils/db";
import { AuthenticatedRequest } from "../../types";

// Function to fetch cart
export const fetchCart = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req;
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    if (!user) {
      throw new Error("User not found");
    }

    const cart = await prisma.cart.findUnique({
      where: {
        customerID: user.id,
      },
    });

    if (!cart) {
      throw new Error("Cart not found");
    }

    const cartItems = await prisma.cartItem.findMany({
      where: {
        cartID: cart.id,
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

    const hasNext = cartItems.length > limit;

    if (hasNext) {
      cartItems.pop();
    }

    return res.status(200).json({
      message: "Cart fetched successfully",
      cart,
      hasNext,
      cartItems,
    });
  } catch (e) {
    return next(e as Error);
  }
};

// Fetch individual cart item
export const fetchCartItem = async (
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

    const cartItems = await prisma.cartItem.findUnique({
      where: {
        id,
        cart: {
          customerID: user.id,
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

    if (!cartItems) {
      return res.status(404).json({
        message: "Cart item not found",
        errorCode: "M400",
      });
    }

    return res.status(200).json({
      message: "Cart item fetched successfully",
      data: cartItems,
    });
  } catch (e) {
    return next(e as Error);
  }
};

// Function to order a cart item
export const orderCartItem = async (
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

    const cartItem = await prisma.cartItem.findUnique({
      where: {
        id,
        cart: {
          customerID: user.id,
        },
      },
    });

    if (!cartItem) {
      throw new Error("Cart item not found");
    }

    const order = await prisma.$transaction(
      async (txl) => {
        const newOrder = await txl.order.create({
          data: {
            customerID: user.id,
            status: "PENDING",
          },
        });

        await txl.orderItem.create({
          data: {
            orderID: newOrder.id,
            productID: cartItem.productID,
            quantity: cartItem.quantity,
            ready: false,
          },
        });

        await txl.cartItem.delete({
          where: {
            id,
          },
        });

        return newOrder;
      },
      {
        maxWait: 5000,
        timeout: 10000,
      }
    );

    return res.status(201).json({
      message: "Order created",
      order,
    });
  } catch (e) {
    return next(e as Error);
  }
};

// Function to order all cart items
export const orderAllCartItems = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req;

    if (!user) {
      throw new Error("User not found");
    }

    const cart = await prisma.cart.findUnique({
      where: {
        customerID: user.id,
      },
    });

    if (!cart) {
      throw new Error("Cart not found");
    }

    const cartItems = await prisma.cartItem.findMany({
      where: {
        cartID: cart.id,
      },
      include: {
        product: true,
      },
    });

    if (cartItems.length === 0) {
      throw new Error("No items in cart");
    }

    const order = await prisma.$transaction(
      async (txl) => {
        const newOrder = await txl.order.create({
          data: {
            customerID: user.id,
            status: "PENDING",
          },
        });

        let price: number = 0;

        await txl.orderItem.createMany({
          data: cartItems.map((item) => {
            price += item.quantity * item.product.price;
            return {
              orderID: newOrder.id,
              productID: item.productID,
              quantity: item.quantity,
              ready: false,
            };
          }),
        });

        const updatedOrder = await txl.order.update({
          where: {
            id: newOrder.id,
          },
          data: {
            totalAmout: price,
          },
        });

        await txl.cartItem.deleteMany({
          where: {
            cartID: cart.id,
          },
        });

        return updatedOrder;
      },
      {
        maxWait: 5000,
        timeout: 10000,
      }
    );

    return res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (e) {
    return next(e as Error);
  }
};

// Function to remove from cart
export const removeFromCart = async (
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

    const cartItem = await prisma.cartItem.delete({
      where: {
        id,
        cart: {
          customerID: user.id,
        },
      },
    });

    return res.status(203).json({
      message: "Item removed from cart",
      cartItem,
    });
  } catch (e) {
    return next(e as Error);
  }
};

// Function to add to cart
export const addToCart = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const quantity = req.query.quantity
      ? parseInt(req.query.quantity as string)
      : 1;

    const { user } = req;

    if (!user) {
      throw new Error("User not found");
    }

    const cart = await prisma.cart.findUnique({
      where: {
        customerID: user.id,
      },
      include: {
        cartItems: true,
      },
    });

    if (!cart) {
      throw new Error("Cart not found");
    }

    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        errorCode: "P400",
      });
    }

    const existingCartItem = cart.cartItems.find(
      (item) => item.productID === product.id
    );

    if (existingCartItem) {
      const updatedCartItem = await prisma.cartItem.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: quantity,
        },
      });

      return res.status(200).json({
        message: "Item added to cart",
        cartItem: updatedCartItem,
        new: false,
      });
    } else {
      const newCartItem = await prisma.cartItem.create({
        data: {
          cartID: cart.id,
          productID: product.id,
          quantity: quantity,
        },
      });

      return res.status(201).json({
        message: "Item added to cart",
        cartItem: newCartItem,
        new: true,
      });
    }
  } catch (e) {
    return next(e as Error);
  }
};

// Function to empty cart
export const emptyCart = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req;

    if (!user) {
      throw new Error("User not found");
    }

    const cart = await prisma.cart.findUnique({
      where: {
        customerID: user.id,
      },
    });

    if (!cart) {
      throw new Error("Cart not found");
    }

    await prisma.cartItem.deleteMany({
      where: {
        cartID: cart.id,
      },
    });

    return res.status(203).json({
      message: "Cart emptied successfully",
    });
  } catch (e) {
    return next(e as Error);
  }
};
