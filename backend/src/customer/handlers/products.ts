/**
 * Handlers for managing products for customers
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Response, NextFunction, Request } from "express";
import prisma from "../../utils/db";
import { CATEGORIES } from "@prisma/client";
import { serverError } from "../../utils/globals";

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

    const products = await prisma.product.findMany({
      where: query
        ? {
            name: {
              contains: query,
              mode: "insensitive",
            },
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

    res.status(200).json({
      message: "Product fetched successfully",
      data: product,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};
