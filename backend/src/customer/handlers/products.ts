/**
 * Handlers for managing products for customers
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Response, NextFunction, Request } from "express";
import prisma from "../../utils/db";
import { ProductSearchRequest } from "../../types";
import { CATEGORIES } from "@prisma/client";

// Function to fetch products
export const fetchProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const category = req.query.category as CATEGORIES | undefined;

    const products = await prisma.product.findMany({
      where: {
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

    return res.status(200).json({
      message: "Products fetched successfully",
      data: products,
      hasNext,
    });
  } catch (e) {
    return next(e as Error);
  }
};

// Function to fetch individual product
export const fetchIndividualProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
      return res.status(404).json({
        message: "Product not found",
        errorCode: "P400",
      });
    }

    return res.status(200).json({
      message: "Product fetched successfully",
      data: product,
    });
  } catch (e) {
    return next(e as Error);
  }
};

// Function to search products
export const searchProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let query = req.query.query ? (req.query.query as string) : "";
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const category = req.query.category
      ? (req.query.category as CATEGORIES)
      : undefined;

    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: query, // Search for names containing the query string
          mode: "insensitive", // Case-insensitive search
        },
        category: {
          equals: category,
        },
      },
    });

    const hasNext = products.length > limit;

    if (hasNext) {
      products.pop();
    }

    return res.status(200).json({
      message: "Products fetched successfully",
      data: products,
    });
  } catch (e) {
    return next(e as Error);
  }
};
