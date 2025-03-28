/**
 * Handlers for managing products for staff
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Response, NextFunction } from "express";
import prisma from "../../utils/db";
import { AuthenticatedRequest, CustomerUpdateRequest } from "../../types";
import { serverError } from "../../utils/globals";
import { ORDER_STATUS } from "@prisma/client";

// Function to fetch customers
export const fetchCustomers = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const query = req.query.query ? (req.query.query as string) : "";
    const active = req.query.active ? req.query.active === "true" : undefined;

    const customers = await prisma.customer.findMany({
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
            active,
          }
        : {
            active,
          },
      include: {
        image: true,
      },
      skip: (page - 1) * limit,
      take: limit + 1,
    });

    const hasNext = customers.length > limit;

    if (hasNext) {
      customers.pop();
    }

    res.status(200).json({
      message: "Customers fetched successfully",
      customers,
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

// Function to fetch individual customer
export const fetchIndividualCustomer = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
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
      throw new Error("Customer not found");
    }

    res.status(200).json({
      message: "Customer fetched successfully",
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

// Function to update customer profile
export const updateCustomer = async (
  req: CustomerUpdateRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
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

    const exists = await prisma.customer.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new Error("Customer not found");
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
      },
    );

    res.status(200).json({
      message: "Customer updated successfully",
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

// Function to disable customer profile
export const disableCustomer = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { user } = req;
    const misconductID = req.query.misconduct
      ? (req.query.misconduct as string)
      : undefined;

    if (!user) {
      throw new Error("User not found");
    }

    const exists = await prisma.customer.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new Error("Customer not found");
    }

    const misconduct = await prisma.misconduct.findUnique({
      where: {
        id: misconductID,
        customerID: exists.id,
      },
    });

    if (!misconduct) {
      throw new Error("Misconduct not found");
    }
    const customer = await prisma.customer.update({
      where: { id },
      data: {
        active: false,
      },
    });

    res.status(200).json({
      message: "Customer disabled successfully",
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

// Function to enable customer profile
export const enableCustomer = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    const exists = await prisma.customer.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new Error("Customer not found");
    }

    const customer = await prisma.customer.update({
      where: { id },
      data: {
        active: true,
      },
    });

    res.status(200).json({
      message: "Customer enabled successfully",
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

// Function to delete customer
export const deleteCustomer = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { user } = req;
    const misconductID = req.query.misconduct
      ? (req.query.misconduct as string)
      : undefined;

    if (!user) {
      throw new Error("User not found");
    }

    const exists = await prisma.customer.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new Error("Customer not found");
    }

    const misconduct = await prisma.misconduct.findUnique({
      where: {
        id: misconductID,
        customerID: exists.id,
        personelID: user.id,
        response: "DELETE_PROFILE",
      },
    });

    if (!misconduct) {
      throw new Error("Misconduct not found");
    }

    await prisma.customer.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      message: "Customer deleted successfully",
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

export const fetchCustomerOrders = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const query = req.query.query ? (req.query.query as string) : "";
    const status = req.query.status
      ? (req.query.status as ORDER_STATUS)
      : undefined;

    const exists = await prisma.customer.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new Error("Customer not found");
    }

    console.log(`Query ${query}`);

    const orders = await prisma.order.findMany({
      where: query
        ? {
            customerID: exists.id,
            status,
            OR: [
              {
                id: query,
              },
              {
                product: {
                  name: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
              },
            ],
          }
        : {
            customerID: exists.id,
            status,
          },
      include: {
        product: {
          include: {
            images: true,
          },
        },
      },
      take: limit + 1,
      skip: (page - 1) * limit,
    });

    const hasNext = orders.length > limit;

    if (hasNext) {
      orders.pop();
    }

    res.status(200).json({
      message: "Fetched customer orders",
      orders,
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
