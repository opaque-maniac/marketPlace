/**
 * Handlers for managing wishlists for staff
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../../types";
import prisma from "../../utils/db";
import { serverError } from "../../utils/globals";

export const fetchUserWishlist = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const query = req.query.query ? (req.query.query as string) : undefined;

    console.log(`Page ${page}`);
    console.log(`Limit ${limit}`);
    console.log(`Query ${query}`);

    const customer = await prisma.customer.findUnique({
      where: {
        id,
      },
    });

    if (!customer) {
      throw new Error("Customer not found");
    }

    const wishlist = await prisma.wishList.findUnique({
      where: {
        customerID: customer.id,
      },
    });

    if (!wishlist) {
      throw new Error("Wishlist not found");
    }

    const wishlistItems = await prisma.wishListItem.findMany({
      where: query
        ? {
            wishlistID: wishlist.id,
            OR: [
              {
                product: {
                  name: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
              },
              {
                id: query,
              },
            ],
          }
        : {
            wishlistID: wishlist.id,
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

    const hasNext = wishlistItems.length > limit;

    if (hasNext) {
      wishlistItems.pop();
    }

    res.status(200).json({
      message: "User cart fetched successfully",
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

export const emptyWishlist = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    const wishlist = await prisma.wishList.findUnique({
      where: { id },
    });

    if (!wishlist) {
      throw new Error("Customer wishlist not found");
    }

    await prisma.wishListItem.deleteMany({
      where: {
        wishlistID: id,
      },
    });

    res.status(200).json({
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

export const fetchWishlistItems = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    const wishlistItems = await prisma.wishListItem.findMany({
      include: {
        product: true,
      },
      take: limit + 1,
      skip: (page - 1) * limit,
    });

    const hasNext = wishlistItems.length > limit;

    if (hasNext) {
      wishlistItems.pop();
    }

    res.status(200).json({
      message: "Wishlist items fetched successfully",
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

export const fetchWishlistItem = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    const wishlistItem = await prisma.wishListItem.findUnique({
      where: {
        id,
      },
      include: {
        product: true,
      },
    });

    if (!wishlistItem) {
      throw new Error("Customer wishlist not found");
    }

    res.status(200).json({
      message: "Wishlist item fetched successfully",
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

export const deleteWishlistItem = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    const wishlistItem = await prisma.wishListItem.findUnique({
      where: {
        id,
      },
    });

    if (!wishlistItem) {
      throw new Error("Wishlist item not found");
    }

    await prisma.wishListItem.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      message: "Wishlist item deleted successfully",
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};
