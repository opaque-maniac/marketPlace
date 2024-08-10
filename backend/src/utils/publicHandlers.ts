/**
 * Handlers for authententicating staff
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Response, NextFunction } from "express";
import generateToken from "./token";
import { TokenRefreshRequest } from "../types";
import jwt from "jsonwebtoken";

interface RequestUSer {
  email: string;
  id: string;
  userType: string;
}

// To refresh the token
export const refreshToken = async (
  req: TokenRefreshRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const refresh = req.cookies["refresh-token"];

    if (!refresh) {
      return res.status(401).json({
        message: "Unauthorized. No refresh token provided",
      });
    }

    const user = jwt.verify(refresh, process.env.REFRESH_SECRET) as RequestUSer;
    const token = generateToken(user.id, user.email, user.userType);

    return res.status(200).json({
      token,
    });
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      if (e.message === "jwt expired") {
        return res.status(401).json({
          message: "Refresh token expired, log in again",
        });
      }
      return res.status(403).json({
        message: "Unauthorized",
      });
    }
    next(e as Error);
  }
};
