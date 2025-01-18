import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthenticatedRequest } from "../types";
import prisma from "../utils/db";
import { serverError } from "../utils/globals";
import { Prisma } from "@prisma/client";

interface DecodedToken extends JwtPayload {
  id: string;
  email: string;
  userType: string;
}

export const allowIfAuthenticated = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({
        message: "Auth token not found",
        errorCode: "J400",
      });
      return;
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "something in the orange",
    ) as DecodedToken;

    if (!decoded) {
      res.status(401).json({
        message: "Invalid token",
        errorCode: "J402",
      });
      return;
    }
    req.user = decoded;
    next();
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

export const isProfileOwner = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { user } = req;

    if (!user) {
      throw new Error("User not found");
    }

    if (id !== user.id) {
      res.status(403).json({
        message: "You are not authorized to perform this action",
        errorCode: "J406",
      });
      return;
    }
    next();
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

export const allowIfActive = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
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

      if (currentUser && !currentUser.active) {
        res.status(401).json({
          message: "Account is not active",
          errorCode: "I402",
        });
        return;
      }
    }

    next();
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

export const isProductOwner = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { user } = req;

    if (!user) {
      throw new Error("User not found");
    }

    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      res.status(404).json({
        message: "Product not found",
        errorCode: "P400",
      });
      return;
    }

    if (product.sellerID !== user.id) {
      res.status(403).json({
        message: "You are not authorized to perform this action",
        errorCode: "J406",
      });
      return;
    }

    next();
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

export const isSeller = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { user } = req;

    if (!user) {
      throw new Error("User not found");
    }

    if (user.userType !== "seller") {
      res.status(403).json({
        message: "You are not authorized to perform this action",
        errorCode: "J406",
      });
      return;
    }

    next();
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

export const isCustomer = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { user } = req;

    if (!user) {
      throw new Error("User not found");
    }

    if (user.userType !== "customer") {
      res.status(403).json({
        message: "You are not authorized to perform this action",
        errorCode: "J406",
      });
      return;
    }

    next();
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

export const isStaff = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { user } = req;

    if (!user) {
      throw new Error("User not found");
    }

    if (user.userType !== "staff") {
      res.status(403).json({
        message: "You are not authorized to perform this action",
        errorCode: "J406",
      });
      return;
    }

    next();
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

export const isAdminOrProfileOwner = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { user } = req;

    if (!user) {
      throw new Error("User not found");
    }

    const staff = await prisma.staff.findUnique({
      where: { id },
    });

    if (!staff) {
      res.status(403).json({
        message: "You are not authorized to perform this action",
        errorCode: "J406",
      });
      return;
    }

    if (staff.role !== "ADMIN" || staff.id != user.id) {
      res.status(403).json({
        message: "You are not authorized to perform this action",
        errorCode: "J406",
      });
      return;
    }
    next();
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

export const isAdmin = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { user } = req;

    if (!user) {
      throw new Error("User not found");
    }

    if (user.userType !== "staff") {
      res.status(403).json({
        message: "You are not authorized to perform this action",
        errorCode: "J406",
      });
      return;
    }

    const staff = await prisma.staff.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!staff || staff?.role !== "ADMIN") {
      res.status(403).json({
        message: "You are not authorized to perform this action",
        errorCode: "J406",
      });
      return;
    }
    next();
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};
