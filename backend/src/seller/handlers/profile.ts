/**
 * Handlers for authententicating seller
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Response, NextFunction } from "express";
import prisma from "../../utils/db";
import { AuthenticatedRequest, SellerUpdateRequest } from "../../types";

// Function to fetch profile
export const fetchProfile = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
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
      return res.status(404).json({
        message: "Seller not found",
      });
    }

    return res.status(200).json({
      message: "Seller profile fetched successfully",
      seller,
    });
  } catch (e) {
    return next(e as Error);
  }
};

export const updateProfie = async (
  req: SellerUpdateRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;
    const filename = req.files ? (req.files[0].filename as string) : null;

    const seller = prisma.$transaction(
      async (txl) => {
        const updatedSeller = await txl.seller.update({
          where: {
            id,
          },
          data: {
            name,
            email,
            phone,
            address,
          },
        });

        if (filename) {
          await txl.sellerImage.deleteMany({
            where: {
              sellerID: id,
            },
          });

          await txl.sellerImage.create({
            data: {
              sellerID: id,
              url: `uploads/sellers/${filename}`,
            },
          });
        }

        return updatedSeller;
      },
      {
        maxWait: 5000,
        timeout: 10000,
      }
    );

    return res.status(200).json({
      message: "Seller profile updated successfully",
      seller,
    });
  } catch (e) {
    return next(e as Error);
  }
};

export const deleteProfile = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await prisma.seller.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      message: "Seller profile deleted successfully",
    });
  } catch (e) {
    return next(e);
  }
};
