import { Response, NextFunction, response } from "express";
import { AuthenticatedRequest } from "../../types";
import { serverError } from "../../utils/globals";
import prisma from "../../utils/db";
import { Seller } from "@prisma/client";

export const fetchComplaints = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const query = req.query.query ? (req.query.query as string) : "";
    const resolved = req.query.resolved
      ? Boolean(req.query.resolved)
      : undefined;

    const complaints = await prisma.complaint.findMany({
      where: query
        ? {
            OR: [
              {
                email: query,
              },
              {
                name: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                phone: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                staff: {
                  firstName: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
              },
              {
                staff: {
                  lastName: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
              },
            ],
            resolved,
          }
        : {
            resolved,
          },
      take: limit + 1,
      skip: (page - 1) * limit,
    });

    const hasNext = complaints.length > limit;

    if (hasNext) {
      complaints.pop();
    }

    res.status(200).json({
      message: "Fetched complaints",
      complaints,
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

export const fetchComplaint = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    const complaint = await prisma.complaint.findUnique({
      where: {
        id,
      },
      include: {
        staff: true,
      },
    });

    if (!complaint) {
      throw new Error("Complaint not found");
    }

    res.status(200).json({
      message: "Fetched complaint",
      complaint,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

export const fetchComplaintProfiles = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    const complaint = await prisma.complaint.findUnique({
      where: {
        id,
      },
    });

    if (!complaint) {
      throw new Error("Complaint not found");
    }

    const customer = await prisma.customer.findUnique({
      where: {
        email: complaint.email,
      },
    });

    const seller = await prisma.seller.findUnique({
      where: {
        email: complaint.email,
      },
    });

    const staff = await prisma.staff.findUnique({
      where: {
        email: complaint.email,
      },
    });

    res.status(200).json({
      message: "Fetched complaint profiles",
      customer,
      seller,
      staff,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};
