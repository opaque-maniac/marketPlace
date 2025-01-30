/**
 * Handlers for managing wishlist for customers
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Response, NextFunction } from "express";
import prisma from "../../utils/db";
import { AuthenticatedRequest } from "../../types";
import { newWishlistItemSocket } from "../../websockets/sockets";
import { serverError } from "../../utils/globals";

// Function to fetch wishlist
export const fetchWishlist = async (
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

    const wishlist = await prisma.wishList.findUnique({
      where: {
        customerID: user.id,
      },
    });

    if (!wishlist) {
      throw new Error("Wishlist not found");
    }

    const wishlistItems = await prisma.wishListItem.findMany({
      where: {
        wishlistID: wishlist.id,
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

    const hasNext = wishlistItems.length > limit;

    if (hasNext) {
      wishlistItems.pop();
    }

    res.status(200).json({
      success: true,
      wishlist,
      wishlistItems,
      hasNext,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

// Function to add to wishlist
export const addToWishlist = async (
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
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    const wishlist = await prisma.wishList.findUnique({
      where: {
        customerID: user.id,
      },
      include: {
        wishlistItems: true,
      },
    });

    if (!wishlist) {
      throw new Error("Wishlist not found");
    }

    const existingItem = wishlist.wishlistItems.find(
      (item) => item.productID === product.id,
    );

    if (existingItem) {
      res.status(200).json({
        message: "Item already in wishlist",
        wishlistItem: existingItem,
        new: false,
      });
      return;
    }

    const wishlistItem = await prisma.wishListItem.create({
      data: {
        productID: product.id,
        wishlistID: wishlist.id,
      },
    });

    await newWishlistItemSocket(user.id);

    res.status(201).json({
      message: "Item added to wishlist",
      wishlistItem,
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

// Function to fetch individual wishlist item
export const fetchWishlistItem = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { user } = req;
    const wishlistItemID = req.params.id;

    if (!user) {
      throw new Error("User not found");
    }

    const wishlistItem = await prisma.wishListItem.findUnique({
      where: {
        id: wishlistItemID,
        wishlist: {
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

    if (!wishlistItem) {
      throw new Error("Wishlist item not found");
    }

    res.status(200).json({
      success: true,
      data: {
        wishlistItem,
      },
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

// Remove from wishlist
export const removeFromWishlist = async (
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

    const exists = await prisma.wishListItem.findUnique({
      where: {
        id,
        wishlist: {
          customerID: user.id,
        },
      },
    });

    if (!exists) {
      res.status(203).json({
        message: "Item removed from wishlist",
        wishlistItem: exists,
      });
      return;
    }

    const wishlistItem = await prisma.wishListItem.delete({
      where: {
        id,
        wishlist: {
          customerID: user.id,
        },
      },
    });

    await newWishlistItemSocket(user.id);

    res.status(203).json({
      message: "Item removed from wishlist",
      wishlistItem,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

// Function to empty wishlist
export const emptyWishlist = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { user } = req;

    if (!user) {
      throw new Error("User not found");
    }

    const wishlist = await prisma.wishList.findUnique({
      where: {
        customerID: user.id,
      },
    });

    if (!wishlist) {
      throw new Error("Wishlist not found");
    }

    await prisma.wishListItem.deleteMany({
      where: {
        wishlistID: wishlist.id,
      },
    });

    await newWishlistItemSocket(user.id);

    res.status(203).json({
      message: "Wishlist emptied successfully",
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

export const fetchWishlistCount = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { user } = req;

    if (!user) {
      throw new Error("User not found");
    }

    const count = await prisma.wishListItem.count({
      where: {
        wishlist: {
          customerID: user.id,
        },
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
