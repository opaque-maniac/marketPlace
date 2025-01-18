/**
 * Handlers for managing products for staff
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Response, NextFunction } from "express";
import prisma from "../../utils/db";
import { AuthenticatedRequest, ProductCreateUpdateRequest } from "../../types";
import { CATEGORIES } from "@prisma/client";
import { serverError } from "../../utils/globals";

// Function to fetch products
export const fetchProducts = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const query = req.query.query ? (req.query.query as string) : "";

    const products = await prisma.product.findMany({
      where: query
        ? {
            OR: [
              {
                name: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                id: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {},
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

    res.status(200).json({
      message: "Products fetched successfully",
      products,
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

// Function to fetch a single product
export const fetchIndividualProduct = async (
  req: AuthenticatedRequest,
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
      res.status(404).json({
        message: "Product not found",
        errorCode: "P400",
      });
      return;
    }

    res.status(200).json({
      message: "Product fetched successfully",
      product,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

// Function to update a product
export const updateProduct = async (
  req: ProductCreateUpdateRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
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
      },
    );

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

// Function to delete a product
export const deleteProduct = async (
  req: AuthenticatedRequest,
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
      res.status(404).json({
        message: "Product not found",
        errorCode: "P400",
      });
      return;
    }

    await prisma.product.delete({
      where: {
        id: product.id,
      },
    });

    res.status(203).json({
      message: "Product deleted successfully",
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};
