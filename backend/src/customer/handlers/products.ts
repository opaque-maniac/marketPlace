/**
 * Handlers for managing products for customers
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Response, NextFunction, Request } from "express";
import prisma from "../../utils/db";
import { CATEGORIES, Seller } from "@prisma/client";
import { serverError } from "../../utils/globals";
import { AuthenticatedRequest, NewOrUpdateRatingRequest } from "../../types";

// Function to fetch products
export const fetchProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const category = req.query.category as CATEGORIES | undefined;
    const query = req.query.query ? (req.query.query as string) : "";
    const min = req.query.minprice
      ? parseInt(req.query.minprice as string)
      : undefined;
    const max = req.query.maxprice
      ? parseInt(req.query.maxprice as string)
      : undefined;
    const addSeller =
      req.query.seller && req.query.seller === "true" ? true : false;

    let sellers: Seller[] = [];

    if (addSeller) {
      sellers = await prisma.seller.findMany({
        where: {
          name: {
            equals: query,
            mode: "insensitive",
          },
        },
        include: {
          image: {
            select: {
              url: true,
            },
          },
        },
      });
    }

    const products = await prisma.product.findMany({
      where: query
        ? {
            name: {
              contains: query,
              mode: "insensitive",
            },
            OR: [
              {
                sellingPrice: {
                  lte: min,
                },
              },
              {
                sellingPrice: {
                  gte: min,
                },
              },
            ],
          }
        : {
            category,
          },
      include: {
        seller: true,
        images: true,
      },
      skip: (page - 1) * limit,
      take: limit + 1,
    });

    const hasNext = products.length > limit;

    if (hasNext) {
      products.pop();
    }

    res.status(200).json({
      message: "Products fetched successfully",
      data: products,
      sellers,
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

// Function to fetch individual product
export const fetchIndividualProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        images: true,
        seller: {
          include: {
            image: true,
          },
        },
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    const raitngs = await prisma.ratings.findMany({
      where: {
        productID: product.id,
      },
    });

    const value =
      raitngs.length > 0
        ? raitngs.reduce(
            (accumulator, current) => accumulator + current.value,
            0,
          ) / raitngs.length
        : 0;

    res.status(200).json({
      message: "Product fetched successfully",
      data: product,
      value,
      count: raitngs.length,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

export const fetchCustomerProductRatings = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { user } = req;
    const { id } = req.params;

    if (!user) {
      throw new Error("User not found");
    }

    const rating = await prisma.ratings.findFirst({
      where: {
        customerID: user.id,
        productID: id,
      },
    });

    console.log(`Rating\n${rating}`);

    res.status(200).json({
      message: "Fetched your rating",
      rating,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

export const newOrUpdateRating = async (
  req: NewOrUpdateRatingRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const { value } = req.body;

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

    const rating = await prisma.ratings.findFirst({
      where: {
        customerID: user.id,
        productID: product.id,
      },
    });

    let newRaring;

    if (rating) {
      newRaring = await prisma.ratings.update({
        where: {
          id: rating.id,
        },
        data: {
          value,
        },
      });
    } else {
      newRaring = await prisma.ratings.create({
        data: {
          productID: product.id,
          customerID: user.id,
          value,
        },
      });
    }

    res.status(200).json({
      message: `${rating ? "Updated" : "Created"} product rating`,
      rating: newRaring,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};
