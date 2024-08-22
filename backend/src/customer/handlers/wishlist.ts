/**
 * Handlers for managing wishlist for customers
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Response, NextFunction, Request } from "express";
import prisma from "../../utils/db";
import { AuthenticatedRequest } from "../../types";

// Function to fetch wishlist
export const fetchWishlist = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerID = req.user?.id;
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    if (!customerID) {
      throw new Error("User not found");
    }

    const wishlist = await prisma.wishList.findUnique({
      where: {
        customerID,
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

    return res.status(200).json({
      success: true,
      data: {
        wishlist: wishlistItems,
        hasNext,
      },
    });
  } catch (e) {
    return next(e as Error);
  }
};

// Function to add to wishlist
export const addToWishlist = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const customerID = req.user?.id;

    if (!customerID) {
      throw new Error("User not found");
    }
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const wishlist = await prisma.wishList.findUnique({
      where: {
        customerID,
      },
    });

    if (!wishlist) {
      throw new Error("Wishlist not found");
    }

    const wishlistItem = await prisma.wishListItem.create({
      data: {
        productID: product.id,
        wishlistID: wishlist.id,
      },
    });

    return res.status(201).json({
      message: "Item added to wishlist",
      wishlistItem,
    });
  } catch (e) {
    return next(e as Error);
  }
};

// Function to fetch individual wishlist item
export const fetchWishlistItem = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerID = req.user?.id;
    const wishlistItemID = req.params.id;

    if (!customerID) {
      throw new Error("User not found");
    }

    const wishlistItem = await prisma.wishListItem.findUnique({
      where: {
        id: wishlistItemID,
        wishlist: {
          customerID,
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
      throw new Error("Wishlist not found");
    }

    return res.status(200).json({
      success: true,
      data: {
        wishlistItem,
      },
    });
  } catch (e) {
    return next(e as Error);
  }
};

// Remove from wishlist
export const removeFromWishlist = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const customerID = req.user?.id;

    if (!customerID) {
      throw new Error("User not found");
    }

    const wishlistItem = await prisma.wishListItem.delete({
      where: {
        id,
        wishlist: {
          customerID,
        },
      },
    });

    return res.status(203).json({
      message: "Item removed from wishlist",
      wishlistItem,
    });
  } catch (e) {
    return next(e as Error);
  }
};

// Function to empty wishlist
export const emptyWishlist = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerID = req.user?.id;

    if (!customerID) {
      throw new Error("User not found");
    }

    const wishlist = await prisma.wishList.findUnique({
      where: {
        customerID,
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

    return res.status(203).json({
      message: "Wishlist emptied successfully",
    });
  } catch (e) {
    return next(e as Error);
  }
};
