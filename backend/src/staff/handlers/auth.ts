/**
 * Handlers for authententicating staff
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Response, NextFunction } from "express";
import prisma from "../../utils/db";
import bcrypt from "bcrypt";
import { LoginRequest, RegisterStaffRequest } from "../../types";
import generateToken from "../../utils/token";
import { serverError } from "../../utils/globals";
import { sendVerificationEmail } from "../../utils/send_email/verify-email";

// View for staff login
export const login = async (
  req: LoginRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const staff = await prisma.staff.findUnique({
      where: {
        email,
      },
    });

    if (!staff) {
      throw new Error("Invalid email or password");
    }

    if (!staff.verified) {
      throw new Error("User email not verified");
    }

    const match = await bcrypt.compare(password, staff.password);

    if (!match) {
      throw new Error("Invalid email or password");
    }

    const token = generateToken(staff.id, staff.email, "staff");
    const refreshToken = generateToken(staff.id, staff.email, "staff");

    res.status(200).json({
      message: "Login successful",
      token,
      refreshToken,
      staff,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

// Register staff
export const registerStaff = async (
  req: RegisterStaffRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, firstName, lastName, role, password } = req.body;

    const staffExists = await prisma.staff.findUnique({
      where: { email },
    });

    console.log(staffExists);

    if (staffExists) {
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const staff = await prisma.staff.create({
      data: {
        email,
        firstName,
        lastName,
        role,
        password: hashedPassword,
        verified: false,
      },
    });

    await sendVerificationEmail(
      staff,
      "staff",
      `${staff.firstName} ${staff.lastName}`,
    );

    res.status(201).json({
      message: "Staff created successfully",
      staff,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};
