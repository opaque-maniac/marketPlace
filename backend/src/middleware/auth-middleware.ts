import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../types";

export const allowIfAuthenticated = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(403).json({
      message: "Unauthorized",
    });
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

    if (id !== user?.id) {
      return res.status(403).json({
        message: "You are not authorized to perform this action",
      });
    }
    next();
  } catch (e) {
    return next(e as Error);
  }
};
