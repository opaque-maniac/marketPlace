/**
 * Handlers for authententicating seller
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Response, NextFunction } from "express";
import prisma from "../../utils/db";
import { AuthenticatedRequest, SellerUpdateRequest } from "../../types";
import { serverError } from "../../utils/globals";

// Function to fetch profile
export const fetchProfile = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { user } = req;

    if (!user) {
      throw new Error("User not found");
    }

    const seller = await prisma.seller.findUnique({
      where: {
        id: user.id,
      },
      include: {
        image: true,
      },
    });

    if (!seller) {
      throw new Error("Profile not found");
    }

    res.status(200).json({
      message: "Seller profile fetched successfully",
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

export const updateProfie = async (
  req: SellerUpdateRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { name, email, phone, address, bio } = req.body;
    let filename: string | undefined;
    const { user } = req;

    if (!user) {
      throw new Error("User not found");
    }

    if (Array.isArray(req.files)) {
      filename = req.files ? req.files[0].filename : undefined;
    } else if (req.files && typeof req.files === "object") {
      filename = req.files["image"][0].filename || undefined;
    } else {
      filename = undefined;
    }

    const exists = await prisma.seller.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!exists) {
      throw new Error("Profile not found");
    }

    const seller = await prisma.$transaction(
      async (txl) => {
        const updatedSeller = await txl.seller.update({
          where: {
            id: user.id,
          },
          data: {
            name,
            email,
            phone,
            bio,
            address,
          },
        });

        if (filename) {
          await txl.sellerImage.deleteMany({
            where: {
              sellerID: user.id,
            },
          });

          await txl.sellerImage.create({
            data: {
              sellerID: user.id,
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
      message: "Seller profile updated successfully",
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

export const deleteProfile = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { user } = req;

    if (!user) {
      throw new Error("User not found");
    }

    const exists = await prisma.seller.findUnique({
      where: { id: user.id },
    });

    if (!exists) {
      throw new Error("Profile not found");
    }

    await prisma.seller.delete({
      where: {
        id: user.id,
      },
    });

    res.status(200).json({
      message: "Seller profile deleted successfully",
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};
