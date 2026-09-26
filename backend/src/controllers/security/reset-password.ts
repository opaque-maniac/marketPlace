import type { Request, Response } from "express";
import { Errors } from "../../errors/definitions";
import {
  ConfirmResetPasswordBody,
  ResetPasswordBody,
} from "../../definitons/payloads";
import { Customer, SellerProfile, Staff } from "@prisma/client";
import db from "../../db/db";
import JWTService from "../../utils/services/jwt-service";
import EmailService from "../../utils/services/email-service";
import APIErrorCodes from "../../errors/error-codes";
import { EmailTemplateData } from "../../definitons/emails";
import { hashPassword } from "../../utils/bcrypt";

export async function RequestResetPassword(
  req: Request,
  res: Response,
): Promise<void> {
  const role = req.query.role ? (req.query.role as string).toLowerCase() : "";

  if (!role) {
    throw Errors.BadRequest("Invalid role query param provided");
  }

  const { email } = req.body as ResetPasswordBody;
  var profile: Customer | SellerProfile | Staff | null = null;

  switch (role) {
    case "customer":
      profile = await db.customer.findFirst({
        where: { email },
      });
      break;
    case "seller":
      profile = await db.sellerProfile.findFirst({
        where: { email },
      });
      break;
    case "staff":
      profile = await db.staff.findFirst({
        where: { email },
      });
      break;
    default:
      throw Errors.BadRequest("Invalid role query param provided");
  }

  if (!profile) {
    throw Errors.BadRequest("Invalid credentails provided");
  }

  if (!profile.verified) {
    throw Errors.BadRequest(
      "Profile is not verified",
      APIErrorCodes.authentication.unverified_profile,
    );
  }

  const tokenService = new JWTService();
  const emailService = new EmailService();

  const token = tokenService.generateEmailToken({
    id: profile.id,
    email: profile.email,
    role,
  });

  const payload: EmailTemplateData = {
    first_name: profile.firstName,
    last_name: profile.lastName,
    token: token,
  };

  const { success, error } = await emailService.sendSecurityEmail(
    "reset-password",
    role,
    profile.email,
    payload,
  );

  if (!success) {
    throw Errors.Internal(
      error?.message || "Internal Server Error",
      APIErrorCodes.server_error.resend_error,
    );
  }

  res.status(200).json({
    success: true,
    message: "Sent reset password email",
  });
}

export async function VerifyResetPasswordURL(
  req: Request,
  res: Response,
): Promise<void> {
  const token = req.query.token ? (req.query.token as string) : "";

  if (!token) {
    throw Errors.BadRequest("Invalid token query param provided");
  }

  const tokenService = new JWTService();
  const payload = tokenService.parseToken(token);
  if (!payload || payload.purpose != "EMAIL") {
    throw Errors.BadRequest(
      "Token has expired or is invalid",
      APIErrorCodes.token.invalid_security_token,
    );
  }

  const { id, role } = payload;

  var profile: Customer | SellerProfile | Staff | null = null;
  switch (role) {
    case "customer":
      profile = await db.customer.findFirst({
        where: { id },
      });
      break;
    case "seller":
      profile = await db.sellerProfile.findFirst({
        where: { id },
      });
      break;
    case "staff":
      profile = await db.staff.findFirst({
        where: { id },
      });
      break;
  }

  if (!profile) {
    throw Errors.BadRequest(
      "Token has expired or is invalid",
      APIErrorCodes.token.invalid_security_token,
    );
  }

  const securityToken = tokenService.generateSecurityToken({
    id: profile.id,
    email: profile.email,
    role,
  });

  res.status(200).json({
    success: true,
    message: "Verified email token",
    securityToken,
  });
}

export async function ConfirmResetPassword(
  req: Request,
  res: Response,
): Promise<void> {
  const token = req.query.token ? (req.query.token as string) : "";

  if (!token) {
    throw Errors.BadRequest("Invalid token query param provided");
  }

  const tokenService = new JWTService();
  const payload = tokenService.parseToken(token);
  if (!payload || payload.purpose != "SECURITY") {
    throw Errors.BadRequest(
      "Token has expired or is invalid",
      APIErrorCodes.token.invalid_security_token,
    );
  }

  const { role, id } = payload;
  var profile: Customer | SellerProfile | Staff | null = null;
  switch (role) {
    case "customer":
      profile = await db.customer.findFirst({
        where: { id },
      });
      break;
    case "seller":
      profile = await db.sellerProfile.findFirst({
        where: { id },
      });
      break;
    case "staff":
      profile = await db.staff.findFirst({
        where: { id },
      });
      break;
  }

  if (!profile) {
    throw Errors.BadRequest(
      "Token has expired or is invalid",
      APIErrorCodes.token.invalid_security_token,
    );
  }

  const { password } = req.body as ConfirmResetPasswordBody;
  const passwordHash = await hashPassword(password);

  const updateArgs = {
    where: { id: profile.id },
    data: { password: passwordHash },
  };

  switch (role) {
    case "customer":
      await db.customer.update(updateArgs);
      break;
    case "seller":
      await db.sellerProfile.update(updateArgs);
      break;
    case "staff":
      await db.staff.update(updateArgs);
      break;
  }

  res.status(200).json({
    success: true,
    message: "Password reset successfuly",
  });
}
