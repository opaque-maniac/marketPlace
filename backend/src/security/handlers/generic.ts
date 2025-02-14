import type { Response, NextFunction } from "express";
import {
  AuthenticatedRequest,
  UserAllTypes,
  VerifySecurityCodeRequest,
} from "../../types";
import { generateDataToken, getSecurityTokenPayload } from "../../utils/token";
import { maskEmail, serverError } from "../../utils/globals";
import prisma from "../../utils/db";

export const verifyEmailToken = async (
  req: VerifySecurityCodeRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { token } = req.body;

    const payload = getSecurityTokenPayload(token);

    if (!payload) {
      throw new Error("Invalid security token");
    }
    const { email, userType } = payload;
    let profile: UserAllTypes | null = null;

    switch (userType) {
      case "customer":
        profile = await prisma.customer.findUnique({
          where: {
            email,
          },
        });
        break;
      case "seller":
        profile = await prisma.seller.findUnique({
          where: {
            email,
          },
        });
        break;
      case "staff":
        profile = await prisma.staff.findUnique({
          where: {
            email,
          },
        });
        break;
      default:
        throw serverError;
    }

    if (!profile) {
      throw new Error("User profile not found");
    }

    if (profile.email != payload.email) {
      throw new Error("Permission denied");
    }

    const dataToken = generateDataToken(profile.email, userType);

    res.status(200).json({
      message: "Verified email token",
      token: dataToken,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

export const fetchEmail = async (
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

    res.status(200).json({
      message: "Fetched user email",
      email: maskEmail(profile.email),
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};
