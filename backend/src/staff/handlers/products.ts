/**
 * Handlers for managing products for staff
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Response, NextFunction } from "express";
import prisma from "../../utils/db";
import {
  AuthenticatedRequest,
  ProductCreateUpdateRequest,
  ProductSearchRequest,
} from "../../types";
import { CATEGORIES } from "@prisma/client";

// Function to fetch products
export const fetchProducts = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    const products = await prisma.product.findMany({
      include: {
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
      products,
      hasNext,
    });
  } catch (e) {
    return next(e as Error);
  }
};

// Function to fetch a single product
export const fetchIndividualProduct = async (
  req: AuthenticatedRequest,
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
      product,
    });
  } catch (e) {
    return next(e as Error);
  }
};

// Function to update a product
export const updateProduct = async (
  req: ProductCreateUpdateRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, inventory } = req.body;
    let filenames: string[] | undefined;

    if (req.files && Array.isArray(req.files)) {
      filenames = req.files.map((file) => file.filename);
    }

    const product = await prisma.$transaction(
      async (txl) => {
        const updatedProduct = await txl.product.update({
          where: {
            id,
          },
          data: {
            name,
            description,
            price: parseFloat(price),
            category: category as CATEGORIES,
            inventory: parseInt(inventory),
          },
        });

        if (filenames) {
          await txl.productImage.deleteMany({
            where: {
              productID: id,
            },
          });

          await txl.productImage.createMany({
            data: filenames.map((filename) => ({
              productID: id,
              url: `uploads/products/${filename}`,
            })),
          });
        }

        return updatedProduct;
      },
      {
        maxWait: 5000,
        timeout: 10000,
      }
    );

    return res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (e) {
    return next(e as Error);
  }
};

// Function to delete a product
export const deleteProduct = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.delete({
      where: {
        id,
      },
    });

    return res.status(203).json({
      message: "Product deleted successfully",
      product,
    });
  } catch (e) {
    return next(e as Error);
  }
};

// Function to search for products
export const searchProduct = async (
  req: ProductSearchRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { query } = req.body;
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      skip: (page - 1) * limit,
      take: limit + 1,
    });

    const hasNext = products.length > limit;

    if (hasNext) {
      products.pop();
    }

    return res.status(200).json({
      message: "Fetched product query",
      products,
    });
  } catch (e) {
    return next(e as Error);
  }
};
