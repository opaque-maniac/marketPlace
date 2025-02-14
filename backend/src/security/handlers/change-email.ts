import { Response, NextFunction } from "express";
import {
  ChangeEmailRequest,
  ChangeEmailVerificationRequest,
  UserAllTypes,
} from "../../types";
import {
  customerClientHost,
  sellerClientHost,
  serverError,
  staffClientHost,
} from "../../utils/globals";
import prisma from "../../utils/db";
import {
  generateChangeEmailToken,
  getEmailChangeTokenPayload,
} from "../../utils/token";
import { sendChangeEmailtokenEmail } from "../../utils/send_email/change-email";

export const changeEmailRequest = async (
  req: ChangeEmailRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { user } = req;

    if (!user) {
      throw new Error("User not found");
    }

    const { email } = req.body;
    let profile: UserAllTypes | null = null;
    let name: string = "";

    switch (user.userType) {
      case "customer":
        profile = await prisma.customer.findUnique({
          where: {
            id: user.id,
          },
        });
        name = `${profile?.firstName} ${profile?.lastName}`;
        break;
      case "staff":
        profile = await prisma.staff.findUnique({
          where: {
            id: user.id,
          },
        });
        name = `${profile?.firstName} ${profile?.lastName}`;
        break;
      case "seller":
        profile = await prisma.seller.findUnique({
          where: {
            id: user.id,
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

    // Update temp email
    switch (user.userType) {
      case "customer":
        await prisma.customer.update({
          where: {
            id: user.id,
          },
          data: {
            tempEmail: email,
          },
        });
        break;
      case "staff":
        await prisma.customer.update({
          where: {
            id: user.id,
          },
          data: {
            tempEmail: email,
          },
        });
        break;
      case "seller":
        await prisma.customer.update({
          where: {
            id: user.id,
          },
          data: {
            tempEmail: email,
          },
        });
        break;
      default:
        throw serverError;
    }

    const token = generateChangeEmailToken(profile.email, email, user.userType);

    const baseUrl =
      user.userType === "customer"
        ? customerClientHost
        : user.userType === "seller"
          ? sellerClientHost
          : staffClientHost;

    if (!baseUrl) {
      throw serverError;
    }

    const url = `${baseUrl}/change-email/${token}`;

    // send email here
    await sendChangeEmailtokenEmail(url, name, email, baseUrl);

    res.status(200).json({
      message: "Send verification email",
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

export const changeEmailVerification = async (
  req: ChangeEmailVerificationRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { token } = req.body;

    const payload = getEmailChangeTokenPayload(token);

    if (!payload) {
      throw new Error("Invalid security token");
    }

    const { initialEmail, newEmail, userType } = payload;

    switch (userType) {
      case "customer":
        await prisma.customer.update({
          where: {
            email: initialEmail,
          },
          data: {
            email: newEmail,
            tempEmail: null,
          },
        });
        break;
      case "seller":
        await prisma.seller.update({
          where: {
            email: initialEmail,
          },
          data: {
            email: newEmail,
            tempEmail: null,
          },
        });
        break;
      case "staff":
        await prisma.staff.update({
          where: {
            email: initialEmail,
          },
          data: {
            email: newEmail,
            tempEmail: null,
          },
        });
        break;
      default:
        throw serverError;
    }

    res.status(200).json({
      message: "Email changed successfully",
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};
