/**
 * Handlers for managing products for staff
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Response, NextFunction } from "express";
import prisma from "../../utils/db";
import { AuthenticatedRequest, StaffUpdateProfileRequest } from "../../types";
import { serverError } from "../../utils/globals";

// Fetch profile
export const fetchProfile = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = req.user?.id;

    if (!id) {
      throw new Error("User not found");
    }

    const profile = await prisma.staff.findUnique({
      where: {
        id,
      },
      include: {
        image: true,
      },
    });

    if (!profile) {
      throw new Error("Profile not found");
    }

    res.status(200).json({
      message: "Profile fetched successfully",
      data: profile,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

// Update profile
export const updateProfile = async (
  req: StaffUpdateProfileRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { user } = req;
    const { email, firstName, lastName } = req.body;

    if (!user) {
      throw new Error("User not found");
    }
    const exists = await prisma.staff.findUnique({
      where: { id: user.id },
    });

    if (!exists) {
      throw new Error("Profile not found");
    }

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
            id: user.id,
          },
          data: {
            email,
            firstName,
            lastName,
          },
        });

        if (filename) {
          await txl.staffImage.deleteMany({
            where: {
              staffID: user.id,
            },
          });

          await txl.staffImage.create({
            data: {
              url: `uploads/staff/${filename}`,
              staffID: user.id,
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

    res.status(200).json({
      message: "Profile updated successfully",
      data: staff,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

// Delete profile
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

    const exists = await prisma.staff.findUnique({
      where: { id: user.id },
    });

    if (!exists) {
      throw new Error("Profile not found");
    }

    const profile = await prisma.staff.delete({
      where: {
        id: user.id,
      },
    });

    res.status(203).json({
      message: "Profile deleted successfully",
      data: profile,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};
