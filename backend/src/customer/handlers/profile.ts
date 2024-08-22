/**
 * Handlers for managing customer profile
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Response, NextFunction } from "express";
import prisma from "../../utils/db";
import { AuthenticatedRequest, CustomerUpdateRequest } from "../../types";

// Function to fetch profile
export const fetchProfile = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const customer = await prisma.customer.findUnique({
      where: {
        id,
      },
      include: {
        image: true,
      },
    });

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
        errorCode: "I401",
      });
    }

    return res.status(200).json({
      message: "Customer fetched successfully",
      data: customer,
    });
  } catch (e) {
    return next(e);
  }
};

// Function to update profile
export const updateProfile = async (
  req: CustomerUpdateRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, phone, address } = req.body;
    let filename: string | undefined;

    if (Array.isArray(req.files)) {
      filename = req.files ? req.files[0].filename : undefined;
    } else if (req.files && typeof req.files === "object") {
      filename = req.files["image"][0].filename || undefined;
    } else {
      filename = undefined;
    }

    const customer = await prisma.$transaction(
      async (txl) => {
        const updatedCustomer = await txl.customer.update({
          where: {
            id,
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
      }
    );

    return res.status(200).json({
      message: "Customer updated successfully",
      customer,
    });
  } catch (e) {
    return next(e as Error);
  }
};

// Function to delete profile
export const deleteProfile = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const customer = await prisma.customer.delete({
      where: {
        id,
      },
    });

    return res.status(203).json({
      message: "Customer deleted successfully",
      customer,
    });
  } catch (e) {
    return next(e as Error);
  }
};
