import type { Response, NextFunction } from "express";
import {
  AuthenticatedRequest,
  ChangePasswordRequest,
  UserAllTypes,
  UserRole,
} from "../../types";
import {
  customerClientHost,
  sellerClientHost,
  serverError,
  staffClientHost,
} from "../../utils/globals";
import prisma from "../../utils/db";
import { generateTempToken, getSecurityTokenPayload } from "../../utils/token";
import bcrypt from "bcrypt";

export const requestPasswordVerificationEmail = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { user } = req;

    if (!user) {
      throw new Error("User not found");
    }

    let profile: UserAllTypes | null = null;

    switch (user.userType) {
      case "customer":
        profile = await prisma.customer.findUnique({
          where: {
            id: user.id,
          },
        });
        break;
      case "seller":
        profile = await prisma.seller.findUnique({
          where: {
            id: user.id,
          },
        });
        break;
      case "staff":
        profile = await prisma.staff.findUnique({
          where: {
            id: user.id,
          },
        });
        break;
      default:
        throw serverError;
    }

    if (!profile) {
      throw new Error("User profile not found");
    }

    const { userType } = user;

    const token = generateTempToken(profile.id, userType);

    const url = `${
      userType === "customer"
        ? customerClientHost
        : userType === "seller"
          ? sellerClientHost
          : staffClientHost
    }/change-password/${token}`;

    // send email here
    console.log(url);

    res.status(200).json({
      message: "Send verification email",
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

export const changePassword = async (
  req: ChangePasswordRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { user } = req;
    const { password, token } = req.body;

    if (!user) {
      throw new Error("User not found");
    }

    const payload = getSecurityTokenPayload(token);

    if (!payload) {
      throw new Error("Invalid security token");
    }

    if (user.email != payload.email) {
      throw new Error("Permission denied");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    switch (user.userType) {
      case "customer":
        await prisma.customer.update({
          where: {
            id: user.id,
          },
          data: {
            password: hashedPassword,
          },
        });
        break;
      case "seller":
        await prisma.seller.update({
          where: {
            id: user.id,
          },
          data: {
            password: hashedPassword,
          },
        });
        break;
      case "staff":
        await prisma.staff.update({
          where: {
            id: user.id,
          },
          data: {
            password: hashedPassword,
          },
        });
        break;
      default:
        throw serverError;
    }

    res.status(200).json({
      message: "Email updated successfully",
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};
