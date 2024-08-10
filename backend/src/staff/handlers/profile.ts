/**
 * Handlers for managing products for staff
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Response, NextFunction } from "express";
import prisma from "../../utils/db";
import { AuthenticatedRequest, StaffUpdateProfileRequest } from "../../types";

// Fetch profile
export const fetchProfile = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const profile = await prisma.staff.findUnique({
      where: {
        id,
      },
      include: {
        image: true,
      },
    });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      message: "Profile fetched successfully",
      data: profile,
    });
  } catch (e) {
    return next(e as Error);
  }
};

// Update profile
export const updateProfile = async (
  req: StaffUpdateProfileRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { email, firstName, lastName } = req.body;
    const filename = req.files ? req.files[0].filename : undefined;

    const staff = await prisma.$transaction(
      async (txl) => {
        const updatedStaff = await prisma.staff.update({
          where: {
            id,
          },
          data: {
            email,
            firstName,
            lastName,
          },
        });

        if (filename) {
          await prisma.staffImage.deleteMany({
            where: {
              staffID: id,
            },
          });

          await prisma.staffImage.create({
            data: {
              url: `uploads/staff/${filename}`,
              staffID: id,
            },
          });
        }

        return updatedStaff;
      },
      {
        maxWait: 5000,
        timeout: 10000,
      }
    );

    return res.status(200).json({
      message: "Profile updated successfully",
      data: staff,
    });
  } catch (e) {
    return next(e as Error);
  }
};

// Delete profile
export const deleteProfile = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const profile = await prisma.staff.delete({
      where: {
        id,
      },
    });

    return res.status(203).json({
      message: "Profile deleted successfully",
      data: profile,
    });
  } catch (e) {
    return next(e as Error);
  }
};
