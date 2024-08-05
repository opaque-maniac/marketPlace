/**
 * Handlers for authententicating seller
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Response, NextFunction } from "express";
import prisma from "../../utils/db";
import { AuthenticatedRequest } from "../../types";

// Function to fetch
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
