import { Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthenticatedRequest } from "../types";
import prisma from "../utils/db";
import { serverError } from "../utils/globals";

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
      throw new Error("Auth token not found");
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "something in the orange",
    ) as DecodedToken;

    (req as AuthenticatedRequest).user = decoded;
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
      throw new Error("Unauthorized");
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

      if (!currentUser || !currentUser.active) {
        throw new Error("User is not active");
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
      throw new Error("Product not found");
    }

    if (product.sellerID !== user.id) {
      throw new Error("Unauthorized");
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
      throw new Error("Unauthorized");
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
      throw new Error("Unauthorized");
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
      throw new Error("Unauthorized");
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
      throw new Error("Unauthorized");
    }

    if (staff.role !== "ADMIN" || staff.id != user.id) {
      throw new Error("Unauthorized");
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
      throw new Error("Unauthorized");
    }

    const staff = await prisma.staff.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!staff || staff?.role !== "ADMIN") {
      throw new Error("Unauthorized");
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
