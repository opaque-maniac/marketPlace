/**
 * Handlers for authententicating staff
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Response, NextFunction } from "express";
import generateToken from "./token";
import { TokenRefreshRequest } from "../types";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  id: string;
  email: string;
  userType: string;
}

const tokenSecret = process.env.JWT_SECRET || "somethingintheorange";

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
        message: "Unauthorized. No refresh token provided",
      });
    }

    const user = jwt.verify(refreshToken, tokenSecret) as DecodedToken;
    const token = generateToken(user.id, user.email, user.userType);

    return res.status(200).json({
      token,
    });
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      if (e.message === "jwt expired") {
        return res.status(401).json({
          message: "Refresh token expired, log in again",
          errorCode: "J404",
        });
      }
      return res.status(403).json({
        message: "Unauthorized",
        errorCode: "J406",
      });
    }
    next(e as Error);
  }
};
