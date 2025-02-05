/**
 * Handlers for authententicating staff
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Response, NextFunction } from "express";
import generateToken from "./token";
import { TokenRefreshRequest, DecodedToken } from "../types";
import jwt from "jsonwebtoken";
import { serverError } from "./globals";

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
