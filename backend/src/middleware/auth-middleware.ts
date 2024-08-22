import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthenticatedRequest } from "../types";
import prisma from "../utils/db";

interface DecodedToken extends JwtPayload {
  id: string;
  email: string;
  userType: string;
}

export const allowIfAuthenticated = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Auth token not found",
        errorCode: "J400",
      });
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "something in the orange"
    ) as DecodedToken;

    if (!decoded) {
      return res.status(401).json({
        message: "Invalid token",
        errorCode: "J402",
      });
    }
    req.user = decoded;
    next();
  } catch (e) {
    return next(e as Error);
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

    if (!user) {
      throw new Error("User not found");
    }

    if (id !== user.id) {
      return res.status(403).json({
        message: "You are not authorized to perform this action",
        errorCode: "J406",
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

      if (currentUser && !currentUser.active) {
        return res.status(401).json({
          message: "Account is not active",
          errorCode: "I402",
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

    if (!user) {
      throw new Error("User not found");
    }

    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        errorCode: "P400",
      });
    }

    if (product.sellerID !== user.id) {
      return res.status(403).json({
        message: "You are not authorized to perform this action",
        errorCode: "J406",
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

    if (!user) {
      throw new Error("User not found");
    }

    if (user.userType !== "seller") {
      return res.status(403).json({
        message: "You are not authorized to perform this action",
        errorCode: "J406",
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

    if (!user) {
      throw new Error("User not found");
    }

    if (user.userType !== "customer") {
      return res.status(403).json({
        message: "You are not authorized to perform this action",
        errorCode: "J406",
      });
    }

    next();
  } catch (e) {
    return next(e as Error);
  }
};

export const isStaff = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req;

    if (!user) {
      throw new Error("User not found");
    }

    if (user.userType !== "staff") {
      return res.status(403).json({
        message: "You are not authorized to perform this action",
        errorCode: "J406",
      });
    }

    next();
  } catch (e) {
    return next(e as Error);
  }
};

export const isAdminOrProfileOwner = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
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
      return res.status(403).json({
        message: "You are not authorized to perform this action",
        errorCode: "J406",
      });
    }

    if (staff.role !== "ADMIN" || staff.id != user.id) {
      return res.status(403).json({
        message: "You are not authorized to perform this action",
        errorCode: "J406",
      });
    }
    next();
  } catch (e) {
    return next(e as Error);
  }
};

export const isAdmin = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req;

    if (!user) {
      throw new Error("User not found");
    }

    if (user.userType !== "staff") {
      return res.status(403).json({
        message: "You are not authorized to perform this action",
        errorCode: "J406",
      });
    }

    const staff = await prisma.staff.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!staff || staff?.role !== "ADMIN") {
      return res.status(403).json({
        message: "You are not authorized to perform this action",
        errorCode: "J406",
      });
    }
    next();
  } catch (e) {
    return next(e as Error);
  }
};
