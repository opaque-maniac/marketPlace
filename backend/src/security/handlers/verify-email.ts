import { Response, NextFunction } from "express";
import { serverError } from "../../utils/globals";
import {
  UserAllTypes,
  VerifyEmailRequest,
  VerifyEmailTokenRequest,
} from "../../types";
import prisma from "../../utils/db";
import { sendVerificationEmail } from "../../utils/send_email/verify-email";
import { getSecurityTokenPayload } from "../../utils/token";

export const verifyEmailRequest = async (
  req: VerifyEmailRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, role } = req.body;
    let profile: UserAllTypes | null = null;
    let name: string = "";

    switch (role) {
      case "customer":
        profile = await prisma.customer.findUnique({
          where: {
            email,
          },
        });
        name = `${profile?.firstName} ${profile?.lastName}`;
        break;
      case "staff":
        profile = await prisma.staff.findUnique({
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
      default:
        throw serverError;
    }

    if (!profile) {
      throw new Error("User profile not found");
    }

    if (profile.verified) {
      throw new Error("Email already verified");
    }

    await sendVerificationEmail(profile, role, name);

    res.status(200).json({
      message: `Verification email sent to ${email}`,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

export const verifyEmailTokenCheck = async (
  req: VerifyEmailTokenRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { token } = req.body;

    const payload = getSecurityTokenPayload(token);

    if (!payload) {
      throw new Error("Invalid security token");
    }

    const { email, userType } = payload;
    let profile: UserAllTypes | null = null;

    switch (userType) {
      case "customer":
        profile = await prisma.customer.findUnique({
          where: {
            email,
          },
        });
        break;
      case "staff":
        profile = await prisma.staff.findUnique({
          where: {
            email,
          },
        });
        break;
      case "seller":
        profile = await prisma.seller.findUnique({
          where: {
            email,
          },
        });
        break;
      default:
        throw serverError;
    }

    if (!profile) {
      throw new Error("User profile not found");
    }

    if (profile.verified) {
      throw new Error("Email already verified");
    }

    switch (userType) {
      case "customer":
        await prisma.customer.update({
          where: {
            email,
          },
          data: {
            verified: true,
          },
        });
        break;
      case "staff":
        await prisma.staff.update({
          where: {
            email,
          },
          data: {
            verified: true,
          },
        });
        break;
      case "seller":
        await prisma.seller.update({
          where: {
            email,
          },
          data: {
            verified: true,
          },
        });
      default:
        throw serverError;
    }

    res.status(200).json({
      message: "Verified email on profile",
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};
