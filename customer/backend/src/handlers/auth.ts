/**
 * Handlers for authenticating sellers
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Request, Response, NextFunction } from "express";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({
      message: "Hello, world!",
    });
  } catch (e) {
    return next(e);
  }
};
