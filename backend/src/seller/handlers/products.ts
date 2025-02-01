/**
 * Handlers for seller profiles
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
import { serverError } from "../../utils/globals";

// Function to fetch products
export const fetchProducts = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { user } = req;
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const query = req.query.query ? (req.query.query as string) : "";

    if (!user) {
      throw new Error("User not found");
    }

    const products = await prisma.product.findMany({
      where: query
        ? {
            name: {
              contains: query,
              mode: "insensitive",
            },
            sellerID: user.id,
          }
        : {
            sellerID: user.id,
          },
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
      hasNext,
      products,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

// Function to create product
export const createProduct = async (
  req: ProductCreateUpdateRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const {
      name,
      description,
      buyingPrice,
      sellingPrice,
      category,
      inventory,
      discount,
    } = req.body;
    let filenames: string[] | undefined;
    const { user } = req;

    if (!user) {
      throw new Error("User not found");
    }

    if (req.files && Array.isArray(req.files)) {
      filenames = req.files.map((file) => file.filename);
    }

    const seller = await prisma.seller.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!seller) {
      throw new Error("User profile not found");
    }

    const product = await prisma.$transaction(async (txl) => {
      const newProduct = await txl.product.create({
        data: {
          name,
          description,
          buyingPrice: parseFloat(buyingPrice),
          sellingPrice: parseFloat(sellingPrice),
          category: category as CATEGORIES,
          inventory: parseInt(inventory),
          sellerID: seller.id,
        },
      });

      if (filenames) {
        for (let i = 0; i < filenames.length; i++) {
          await txl.productImage.create({
            data: {
              productID: newProduct.id,
              url: `uploads/products/${filenames[i]}`,
            },
          });
        }
      }

      return newProduct;
    });

    res.status(201).json({
      message: "Product created successfully",
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

// Function to fetch individual product
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
      },
    });

    if (!product) {
      throw new Error("Product not found");
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

// Function to update individual product
export const updateIndividualProduct = async (
  req: ProductCreateUpdateRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      buyingPrice,
      sellingPrice,
      category,
      inventory,
      discount,
    } = req.body;
    let filenames: string[] | undefined;

    if (req.files && Array.isArray(req.files)) {
      filenames = req.files.map((file) => file.filename);
    }

    const exists = await prisma.product.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new Error("Product not found");
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
            buyingPrice: parseFloat(buyingPrice),
            sellingPrice: parseFloat(sellingPrice),
            category: category as CATEGORIES,
            inventory: parseInt(inventory),
          },
        });

        if (filenames && filenames.length > 0) {
          await txl.productImage.deleteMany({
            where: {
              productID: id,
            },
          });

          for (let i = 0; i < filenames.length; i++) {
            await txl.productImage.create({
              data: {
                productID: updatedProduct.id,
                url: `uploads/products/${filenames[i]}`,
              },
            });
          }
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

// Function to delete individual product
export const deleteIndividualProduct = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    const product = await prisma.product.delete({
      where: {
        id,
      },
    });

    res.status(203).json({
      message: "Product deleted successfully",
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

// Function to search for products
export const searchProducts = async (
  req: ProductSearchRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { query } = req.body;
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const { user } = req;

    if (!user) {
      throw new Error("User not found");
    }

    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
        sellerID: user.id,
      },
      include: {
        images: true,
        seller: {
          include: {
            image: true,
          },
        },
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
      hasNext,
      products,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};
