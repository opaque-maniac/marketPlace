import type { Response, NextFunction } from "express";
import {
  customerClientHost,
  sellerClientHost,
  serverError,
  staffClientHost,
} from "../../utils/globals";
import {
  ChangePasswordRequest,
  ResetPasswordRequest,
  UserAllTypes,
} from "../../types";
import prisma from "../../utils/db";
import { generateTempToken, getSecurityTokenPayload } from "../../utils/token";
import bcrypt from "bcrypt";
import { sendResetPasswordEmail } from "../../utils/send_email/reset-password";

export const requestPasswordResetEmail = async (
  req: ResetPasswordRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, role } = req.body;

    let profile: UserAllTypes | null = null;
    let name: string;

    switch (role) {
      case "customer":
        profile = await prisma.customer.findUnique({
          where: {
            email,
          },
        });
        name = `${profile?.firstName} ${profile?.lastName}`;
        break;
      case "seller":
        profile = await prisma.seller.findUnique({
          where: {
            email,
          },
        });
        name = `${profile?.name}`;
        break;
      case "staff":
        profile = await prisma.staff.findUnique({
          where: {
            email,
          },
        });
        name = `${profile?.firstName} ${profile?.lastName}`;
        break;
      default:
        throw serverError;
    }

    if (!profile) {
      throw new Error("Reset profile not found");
    }

    const token = generateTempToken(profile.email, role);

    const baseUrl =
      role === "customer"
        ? customerClientHost
        : role === "seller"
          ? sellerClientHost
          : staffClientHost;

    if (!baseUrl) {
      throw serverError;
    }

    const url = `${baseUrl}/reset-password/${token}`;

    // send email
    await sendResetPasswordEmail(url, name, baseUrl, profile.email);

    res.status(200).json({
      message: "Email sent successfully",
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

export const resetPassword = async (
  req: ChangePasswordRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { password, token } = req.body;

    const payload = getSecurityTokenPayload(token);

    if (!payload) {
      throw new Error("Invalid security token");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    switch (payload.userType) {
      case "customer":
        await prisma.customer.update({
          where: {
            email: payload.email,
          },
          data: {
            password: hashedPassword,
          },
        });
        break;
      case "seller":
        await prisma.seller.update({
          where: {
            email: payload.email,
          },
          data: {
            password: hashedPassword,
          },
        });
        break;
      case "staff":
        await prisma.staff.update({
          where: {
            email: payload.email,
          },
          data: {
            password: hashedPassword,
          },
        });
        break;
      default:
        throw serverError;
    }

    res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};
