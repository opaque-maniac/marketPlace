/**
 * Handlers for managing wishlists for staff
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../../types";
import prisma from "../../utils/db";

export const fetchUserWishlist = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    const customer = await prisma.customer.findUnique({
      where: {
        id,
      },
    });

    if (!customer) {
      return res.status(404).json({
        errorCode: "P400",
        message: "User not found",
      });
    }

    const wishlistItems = await prisma.wishListItem.findMany({
      where: {
        wishlist: {
          customerID: customer.id,
        },
      },
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

    return res.status(200).json({
      message: "User cart fetched successfully",
      wishlistItems,
      hasNext,
    });
  } catch (e) {
    return next(e as Error);
  }
};

export const emptyWishlist = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const wishlist = await prisma.wishList.findUnique({
      where: { id },
    });

    if (!wishlist) {
      throw new Error("Wishlist not found");
    }

    await prisma.wishListItem.deleteMany({
      where: {
        wishlistID: id,
      },
    });

    return res.status(200).json({
      message: "Wishlist emptied successfully",
    });
  } catch (e) {
    return next(e as Error);
  }
};

export const fetchWishlistItems = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
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

    return res.status(200).json({
      message: "Wishlist items fetched successfully",
      wishlistItems,
      hasNext,
    });
  } catch (e) {
    return next(e as Error);
  }
};

export const fetchWishlistItem = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
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
      throw new Error("Wishlist not found");
    }

    return res.status(200).json({
      message: "Wishlist item fetched successfully",
      wishlistItem,
    });
  } catch (e) {
    return next(e as Error);
  }
};

export const deleteWishlistItem = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
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

    return res.status(200).json({
      message: "Wishlist item deleted successfully",
    });
  } catch (e) {
    return next(e as Error);
  }
};