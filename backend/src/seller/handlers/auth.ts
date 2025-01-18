/**
 * Handlers for authententicating seller
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Response, NextFunction } from "express";
import prisma from "../../utils/db";
import bcrypt from "bcrypt";
import { LoginRequest, RegisterSellerRequest } from "../../types";
import generateToken, { generateRefreshToken } from "../../utils/token";
import { serverError } from "../../utils/globals";

// Endpoint to register seller
export const register = async (
  req: RegisterSellerRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, name, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const seller = await prisma.seller.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      message: "Seller registered successfully",
      seller,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

// Endpoint to login
export const login = async (
  req: LoginRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const seller = await prisma.seller.findUnique({
      where: {
        email,
      },
    });

    if (!seller) {
      res.status(401).json({
        message: "Invalid email or password",
        errorCode: "I403",
      });
      return;
    }

    if (!seller.active) {
      res.status(401).json({
        message: "Account is not active",
        errorCode: "I402",
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, seller.password);

    if (!isPasswordValid) {
      res.status(401).json({
        message: "Invalid email or password",
        errorCode: "I403",
      });
      return;
    }

    const token = generateToken(seller.id, seller.email, "seller");
    const refreshToken = generateRefreshToken(
      seller.id,
      seller.email,
      "seller",
    );

    res.status(200).json({
      message: "Login successful",
      token,
      refreshToken,
      seller,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};
