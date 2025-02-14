/**
 * Handlers for authententicating staff
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Response, NextFunction } from "express";
import generateToken from "./token";
import { TokenRefreshRequest, DecodedToken, UserAllTypes } from "../types";
import jwt from "jsonwebtoken";
import { serverError } from "./globals";
import prisma from "./db";

const tokenSecret = process.env.JWT_SECRET || "somethingintheorange";

// To refresh the token
export const refreshToken = async (
  req: TokenRefreshRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new Error("Invalid refresh token");
    }

    const user = jwt.verify(refreshToken, tokenSecret) as DecodedToken;

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

    if (!profile.verified) {
      throw new Error("User email not verified");
    }

    const token = generateToken(user.id, user.email, user.userType);

    return res.status(200).json({
      token,
    });
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      throw new Error("Invalid refresh token");
    } else if (e instanceof Error) {
      next(e);
    } else {
      next(serverError);
    }
  }
};
