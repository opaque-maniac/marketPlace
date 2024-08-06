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
  r;
}

// To refresh the token
export const refreshToken = async (
  req: TokenRefreshRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token is required",
      });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET
    ) as RequestUSer;

    const token = generateToken(decoded.id, decoded.email, decoded.userType);

    return res.status(200).json({
      token,
    });
  } catch (e) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }
};
