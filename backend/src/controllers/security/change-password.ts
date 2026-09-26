import type { Request, Response } from "express";
import { JWTPayload } from "../../definitons/jwt";
import { Customer, SellerProfile, Staff } from "@prisma/client";
import db from "../../db/db";
import { Errors } from "../../errors/definitions";
import JWTService from "../../utils/services/jwt-service";
import EmailService from "../../utils/services/email-service";
import { EmailTemplateData } from "../../definitons/emails";
import APIErrorCodes from "../../errors/error-codes";
import { ConfirmResetPasswordBody } from "../../definitons/payloads";
import { hashPassword } from "../../utils/bcrypt";

export async function RequestChangePassword(
  req: Request,
  res: Response,
): Promise<void> {
  const { id, role } = (req as any).user as JWTPayload;

  var profile: Customer | SellerProfile | Staff | null = null;
  const findArgs = {
    where: { id },
  };

  switch (role) {
    case "customer":
      profile = await db.customer.findFirst(findArgs);
      break;
    case "seller":
      profile = await db.sellerProfile.findFirst(findArgs);
      break;
    case "staff":
      profile = await db.staff.findFirst(findArgs);
      break;
  }

  if (!profile) {
    throw Errors.Unauthorized("Unauthorized");
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
    "change-password",
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
    message: "Sent verification email to address",
  });
}

export async function VerifyChangePasswordURL(
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
  const findArgs = {
    where: { id },
  };

  switch (role) {
    case "customer":
      profile = await db.customer.findFirst(findArgs);
      break;
    case "seller":
      profile = await db.sellerProfile.findFirst(findArgs);
      break;
    case "staff":
      profile = await db.staff.findFirst(findArgs);
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
    succes: true,
    message: "Verified email token",
    token: securityToken,
  });
}

export async function ConfirmChangePassword(
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

  const { id, role } = payload;

  var profile: Customer | SellerProfile | Staff | null = null;
  const findArgs = {
    where: { id },
  };

  switch (role) {
    case "customer":
      profile = await db.customer.findFirst(findArgs);
      break;
    case "seller":
      profile = await db.sellerProfile.findFirst(findArgs);
      break;
    case "staff":
      profile = await db.staff.findFirst(findArgs);
      break;
  }

  if (!profile) {
    throw Errors.Unauthorized("Unauthorized");
  }

  const { password } = req.body as ConfirmResetPasswordBody;
  const passwordHash = await hashPassword(password);

  const updateArgs = {
    where: { id },
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
    message: "Updated profile password",
  });
}
