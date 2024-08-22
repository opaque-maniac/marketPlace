/**
 * Handlers for authententicating staff
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Response, NextFunction } from "express";
import prisma from "../../utils/db";
import bcrypt from "bcrypt";
import { LoginRequest, RegisterCustomerRequest } from "../../types";
import generateToken from "../../utils/token";

// View for staff login
export const login = async (
  req: LoginRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const staff = await prisma.staff.findUnique({
      where: {
        email,
      },
    });

    if (!staff) {
      return res.status(401).json({
        message: "Invalid email or password",
        errorCode: "I403",
      });
    }

    const match = await bcrypt.compare(password, staff.password);

    if (!match) {
      return res.status(401).json({
        message: "Invalid email or password",
        errorCode: "I403",
      });
    }

    const token = generateToken(staff.id, staff.email, "staff");
    const refreshToken = generateToken(staff.id, staff.email, "staff");

    return res.status(200).json({
      message: "Login successful",
      token,
      refreshToken,
    });
  } catch (e) {
    return next(e as Error);
  }
};
