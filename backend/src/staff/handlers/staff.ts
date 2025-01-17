/**
 * Handlers for managing products for staff
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Response, NextFunction } from "express";
import prisma from "../../utils/db";
import { AuthenticatedRequest, StaffUpdateRequest } from "../../types";

// Function for fetching all staff
export const fetchStaff = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const query = req.query.query ? (req.query.query as string) : "";

    const staff = await prisma.staff.findMany({
      where: query
        ? {
            OR: [
              {
                firstName: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                lastName: {
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

    const hasNext = staff.length > limit;

    if (hasNext) {
      staff.pop();
    }

    return res.status(200).json({
      message: "Staff fetched successfully",
      staff,
      hasNext,
    });
  } catch (e) {
    return next(e as Error);
  }
};

// Fetch a single staff
export const fetchIndividualStaff = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const staff = await prisma.staff.findUnique({
      where: {
        id,
      },
      include: {
        image: true,
      },
    });

    return res.status(200).json({
      message: "Staff fetched successfully",
      staff,
    });
  } catch (e) {
    return next(e as Error);
  }
};

// Update staff profile
export const updateStaff = async (
  req: StaffUpdateRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;
    let filename: string | undefined;

    if (Array.isArray(req.files)) {
      filename = req.files ? req.files[0].filename : undefined;
    } else if (req.files && typeof req.files === "object") {
      filename = req.files["image"][0].filename || undefined;
    } else {
      filename = undefined;
    }

    const staff = await prisma.$transaction(
      async (txl) => {
        const updatedStaff = await txl.staff.update({
          where: {
            id,
          },
          data: {
            firstName,
            lastName,
            email,
          },
        });

        if (filename) {
          await txl.staffImage.deleteMany({
            where: {
              staffID: updatedStaff.id,
            },
          });

          await txl.staffImage.create({
            data: {
              staffID: updatedStaff.id,
              url: `uploads/customers/${filename}`,
            },
          });
        }

        return updatedStaff;
      },
      {
        maxWait: 5000,
        timeout: 10000,
      },
    );

    return res.status(200).json({
      message: "Staff updated successfully",
      staff,
    });
  } catch (e) {
    return next(e as Error);
  }
};

// Enable staff profile
export const enableStaff = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const staff = await prisma.staff.update({
      where: { id },
      data: {
        active: true,
      },
    });

    return res.status(200).json({
      message: "Staff enabled successfully",
      staff,
    });
  } catch (e) {
    return next(e as Error);
  }
};

// Disable staff profile
export const disableStaff = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const staff = await prisma.staff.update({
      where: { id },
      data: {
        active: false,
      },
    });

    return res.status(200).json({
      message: "Staff disabled successfully",
      staff,
    });
  } catch (e) {
    return next(e as Error);
  }
};

// Delete staff
export const deleteStaff = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const staff = await prisma.staff.delete({
      where: { id },
    });

    return res.status(203).json({
      message: "Staff deleted successfully",
      staff,
    });
  } catch (e) {
    return next(e as Error);
  }
};
