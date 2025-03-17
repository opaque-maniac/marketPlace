/**
 * Handlers for managing customer profile
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Response, NextFunction } from "express";
import prisma from "../../utils/db";
import { AuthenticatedRequest, CustomerUpdateRequest } from "../../types";
import { maskEmail, serverError } from "../../utils/globals";

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

    const customer = await prisma.customer.findUnique({
      where: {
        id: user.id,
      },
      include: {
        image: true,
      },
    });

    if (!customer) {
      throw new Error("User profile not found");
    }

    res.status(200).json({
      message: "Customer fetched successfully",
      data: { ...customer, email: maskEmail(customer.email) },
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

// Function to update profile
export const updateProfile = async (
  req: CustomerUpdateRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { firstName, lastName, phone, address } = req.body;
    const { user } = req;

    if (!user) {
      throw new Error("User not found");
    }

    const exists = await prisma.customer.findUnique({
      where: { id: user.id },
    });

    if (!exists) {
      throw new Error("User profile not found");
    }

    const filename = req.file?.filename;

    const customer = await prisma.$transaction(
      async (txl) => {
        const updatedCustomer = await txl.customer.update({
          where: {
            id: user.id,
          },
          data: {
            firstName,
            lastName,
            phone,
            address,
          },
        });

        if (filename) {
          await txl.customerImage.deleteMany({
            where: {
              customerID: updatedCustomer.id,
            },
          });

          await txl.customerImage.create({
            data: {
              customerID: updatedCustomer.id,
              url: `uploads/customers/${filename}`,
            },
          });
        }

        return updatedCustomer;
      },
      {
        maxWait: 5000,
        timeout: 10000,
      },
    );

    const image = await prisma.customerImage.findUnique({
      where: {
        customerID: customer.id,
      },
    });

    res.status(200).json({
      message: "Customer updated successfully",
      image,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

// Function to delete profile
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

    const profile = await prisma.customer.findUnique({
      where: { id: user.id },
    });

    if (!profile) {
      throw new Error("Profile not found");
    }

    const customer = await prisma.customer.delete({
      where: {
        id: user.id,
      },
    });

    res.status(203).json({
      message: "Customer deleted successfully",
      customer,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};
