import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../types";
import prisma from "../utils/db";

export const allowIfAuthenticated = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "You need to be logged in to access this route",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      if (e.message === "jwt expired") {
        return res.status(401).json({
          message: "Token expired, please log in again",
        });
      }
      return res.status(403).json({
        message: "Unauthorized",
      });
    }
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const isProfileOwner = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { user } = req;

    if (id !== user?.id) {
      return res.status(403).json({
        message: "You are not authorized to perform this action",
      });
    }
    next();
  } catch (e) {
    return next(e as Error);
  }
};

export const allowIfActive = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req;

    if (user) {
      let currentUser;
      if (user.userType === "seller") {
        currentUser = await prisma.seller.findUnique({
          where: {
            id: user.id,
          },
        });
      } else if (user.userType === "staff") {
        currentUser = await prisma.staff.findUnique({
          where: {
            id: user.id,
          },
        });
      } else {
        currentUser = await prisma.customer.findUnique({
          where: {
            id: user.id,
          },
        });
      }

      if (!currentUser?.active) {
        return res.status(401).json({
          message: "Account is not active",
        });
      }
    }

    next();
  } catch (e) {
    return next(e as Error);
  }
};

export const isProductOwner = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { user } = req;

    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (product.sellerID !== user?.id) {
      return res.status(403).json({
        message: "You are not authorized to perform this action",
      });
    }

    next();
  } catch (e) {
    return next(e as Error);
  }
};

export const isSeller = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req;

    if (user?.userType !== "seller") {
      return res.status(403).json({
        message: "You are not authorized to perform this action",
      });
    }

    next();
  } catch (e) {
    return next(e as Error);
  }
};

export const isCustomer = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req;

    if (user && user.userType !== "customer") {
      return res.status(403).json({
        message: "You are not authorized to perform this action",
      });
    }

    next();
  } catch (e) {
    return next(e as Error);
  }
};
