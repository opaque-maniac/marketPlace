/**
 * Handlers for managing cart for customers
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Response, NextFunction } from "express";
import prisma from "../../utils/db";
import { AuthenticatedRequest } from "../../types";
import { newCartItemSocket } from "../../websockets/sockets";
import { serverError } from "../../utils/globals";

// Function to fetch cart
export const fetchCart = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
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

    res.status(200).json({
      message: "Cart fetched successfully",
      cart,
      hasNext,
      cartItems,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

// Fetch individual cart item
export const fetchCartItem = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
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
      throw new Error("Cart item not found");
    }

    res.status(200).json({
      message: "Cart item fetched successfully",
      data: cartItems,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

// Function to order a cart item
export const orderCartItem = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
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
      include: {
        product: true,
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
            productID: cartItem.productID,
            quantity: cartItem.quantity,
            totalAmount: cartItem.product.sellingPrice * cartItem.quantity,
            sellerID: cartItem.product.sellerID,
          },
        });

        await txl.product.update({
          where: {
            id: newOrder.productID,
          },
          data: {
            inventory: {
              decrement: newOrder.quantity,
            },
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
      },
    );

    await newCartItemSocket(user.id);

    res.status(201).json({
      message: "Order created",
      order,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

// Function to order all cart items
export const orderAllCartItems = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
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

    await prisma.$transaction(
      async (txl) => {
        for (const item of cartItems) {
          await txl.order.create({
            data: {
              customerID: user.id,
              productID: item.productID,
              quantity: item.quantity,
              totalAmount: item.product.sellingPrice * item.quantity,
              sellerID: item.product.sellerID,
            },
          });

          await txl.product.update({
            where: {
              id: item.productID,
            },
            data: {
              inventory: {
                decrement: item.quantity,
              },
            },
          });
        }

        await txl.cartItem.deleteMany({
          where: {
            cartID: cart.id,
          },
        });
      },
      {
        maxWait: 5000,
        timeout: 10000,
      },
    );

    await newCartItemSocket(user.id);

    res.status(201).json({
      message: "Order created successfully",
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

// Function to remove from cart
export const removeFromCart = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
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

    await newCartItemSocket(user.id);

    res.status(203).json({
      message: "Item removed from cart",
      cartItem,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

// Function to add to cart
export const addToCart = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
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
      throw new Error("Product not found");
    }

    const existingCartItem = cart.cartItems.find(
      (item) => item.productID === product.id,
    );

    if (existingCartItem) {
      res.status(200).json({
        message: "Item added to cart",
        cartItem: existingCartItem,
        new: false,
      });
      return;
    }

    const newCartItem = await prisma.cartItem.create({
      data: {
        cartID: cart.id,
        productID: product.id,
        quantity: quantity,
      },
    });

    await newCartItemSocket(user.id);

    res.status(201).json({
      message: "Item added to cart",
      cartItem: newCartItem,
      new: true,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

// Function to empty cart
export const emptyCart = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
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

    await newCartItemSocket(user.id);

    res.status(203).json({
      message: "Cart emptied successfully",
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

export const fetchCartCount = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
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

    const count = await prisma.cartItem.count({
      where: {
        cartID: cart.id,
      },
    });

    res.status(200).json({
      count,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};
