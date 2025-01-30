/**
 *
 * Handlers for managing products for staff
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Response, NextFunction } from "express";
import prisma from "../../utils/db";
import { AuthenticatedRequest, SellerUpdateStaffRequest } from "../../types";
import { serverError } from "../../utils/globals";

// Function to fetch sellers
export const fetchSellers = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const query = req.query.query ? (req.query.query as string) : "";

    const sellers = await prisma.seller.findMany({
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
                email: query,
              },
            ],
          }
        : {},
      include: {
        image: true,
      },
      skip: (page - 1) * limit,
      take: limit + 1,
    });

    const hasNext = sellers.length > limit;

    if (hasNext) {
      sellers.pop();
    }

    res.status(200).json({
      message: "Sellers fetched successfully",
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

// Function to fetch a single seller
export const fetchIndividualSeller = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    const seller = await prisma.seller.findUnique({
      where: {
        id,
      },
      include: {
        image: true,
      },
    });

    if (!seller) {
      throw new Error("Seller not found");
    }

    res.status(200).json({
      message: "Seller fetched successfully",
      seller,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

// Fetch seller products
export const fetchSellerProducts = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    const seller = await prisma.seller.findUnique({
      where: {
        id,
      },
    });

    if (!seller) {
      throw new Error("Seller not found");
    }

    const products = await prisma.product.findMany({
      where: {
        sellerID: seller.id,
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

// To update seller
export const updateSeller = async (
  req: SellerUpdateStaffRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { email, name, phone, address } = req.body;
    let filename: string | undefined;

    if (Array.isArray(req.files)) {
      filename = req.files ? req.files[0].filename : undefined;
    } else if (req.files && typeof req.files === "object") {
      filename = req.files["image"][0].filename || undefined;
    } else {
      filename = undefined;
    }

    const seller = await prisma.$transaction(
      async (txl) => {
        const updatedSeller = await txl.seller.update({
          where: {
            id,
          },
          data: {
            email,
            name,
            phone,
            address,
          },
        });

        if (filename) {
          await txl.sellerImage.delete({
            where: {
              sellerID: updatedSeller.id,
            },
          });

          await txl.sellerImage.create({
            data: {
              sellerID: updatedSeller.id,
              url: `uploads/sellers/${filename}`,
            },
          });
        }

        return updatedSeller;
      },
      {
        maxWait: 5000,
        timeout: 10000,
      },
    );

    res.status(200).json({
      message: "Updated seller",
      seller,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

// To enable a seller
export const enableSeller = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    const seller = await prisma.seller.update({
      where: { id },
      data: {
        active: true,
      },
    });

    res.status(200).json({
      message: "Seller enabled successfully",
      seller,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

// To disable a seller
export const disableSeller = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    const seller = await prisma.seller.update({
      where: { id },
      data: {
        active: false,
      },
    });

    res.status(200).json({
      message: "Seller disabled successfully",
      seller,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

// Function to delete a seller
export const deleteSeller = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    const seller = await prisma.seller.delete({
      where: {
        id,
      },
    });

    res.status(203).json({
      message: "Seller deleted successfully",
      seller,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};
