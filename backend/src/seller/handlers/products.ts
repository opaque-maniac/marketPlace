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

// Function to fetch products
export const fetchProducts = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req;
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    if (!user) {
      throw new Error("User not found");
    }

    const products = await prisma.product.findMany({
      where: {
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

    return res.status(200).json({
      message: "Products fetched successfully",
      hasNext,
      products,
    });
  } catch (e) {
    return next(e as Error);
  }
};

// Function to create product
export const createProduct = async (
  req: ProductCreateUpdateRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, price, category, inventory, discount } =
      req.body;
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
      return res.status(404).json({
        message: "Seller not found",
      });
    }

    const product = await prisma.$transaction(async (txl) => {
      const newProduct = await txl.product.create({
        data: {
          name,
          description,
          price: parseFloat(price),
          category: category as CATEGORIES,
          inventory: parseInt(inventory),
          sellerID: seller.id,
          discountPercentage: parseFloat(discount),
        },
      });

      if (filenames) {
        await txl.productImage.createMany({
          data: filenames.map((filename) => ({
            productID: newProduct.id,
            url: `uploads/products/${filename}`,
          })),
        });
      }

      return newProduct;
    });

    return res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (e) {
    return next(e as Error);
  }
};

// Function to fetch individual product
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
      },
    });

    return res.status(200).json({
      message: "Product fetched successfully",
      product,
    });
  } catch (e) {
    return next(e as Error);
  }
};

// Function to update individual product
export const updateIndividualProduct = async (
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

    const product = await prisma.$transaction(async (txl) => {
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
    });

    return res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (e) {
    return next(e as Error);
  }
};

// Function to delete individual product
export const deleteIndividualProduct = async (
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
export const searchProducts = async (
  req: ProductSearchRequest,
  res: Response,
  next: NextFunction
) => {
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

    return res.status(200).json({
      message: "Products fetched successfully",
      hasNext,
      products,
    });
  } catch (e) {
    return next(e as Error);
  }
};
