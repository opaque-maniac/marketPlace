import type { Request, Response, NextFunction } from "express";
import { Errors } from "../../errors/definitions";
import { Customer, SellerProfile, Staff } from "@prisma/client";
import { LoginBody } from "../../definitons/payloads";
import db from "../../db/db";
import { comparePassword } from "../../utils/bcrypt";
import { UserType } from "../../definitons/users";
import {
  EmailResponse,
  EmailTemplateData,
  EmailType,
} from "../../definitons/emails";
import JWTService from "../../utils/services/jwt-service";
import EmailService from "../../utils/services/email-service";
import APIErrorCodes from "../../errors/error-codes";

// ENV variables
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export async function LoginUser(req: Request, res: Response): Promise<void> {
  const role = req.query.role ? (req.query.role as string).toLowerCase() : "";

  if (!role) {
    throw Errors.BadRequest("Invalid role query param provided");
  }

  var profile: Customer | SellerProfile | Staff | null = null;
  var userType: UserType;
  const { email, password } = req.body as LoginBody;

  switch (role) {
    case "customer":
      profile = await db.customer.findFirst({
        where: { email },
      });
      userType = "customer";
      break;
    case "seller":
      profile = await db.sellerProfile.findFirst({
        where: { email },
      });
      userType = "seller";
      break;
    case "staff":
      profile = await db.staff.findFirst({
        where: { email },
      });
      userType = "staff";
      break;
    default:
      throw Errors.BadRequest("Invalid role query param provided");
  }

  if (!profile) {
    throw Errors.BadRequest("Invalid credentials provided");
  }

  if (role == "seller") {
    const org = await db.sellerOrganization.findFirst({
      where: {
        id: (profile as SellerProfile).organizationID,
      },
    });

    // Not possible since profile exists
    if (!org) {
      throw Errors.Internal("Internal Server Error");
    }

    if (!org.verified) {
      throw Errors.BadRequest(
        "Organization is not verified",
        APIErrorCodes.authentication.unverified_seller_org,
      );
    }
  }

  if (!profile.verified) {
    const { success, error } = await sendVerificationEmail(profile, userType);
    if (!success) {
      throw Errors.Internal(
        error?.message || "Internal Server Error",
        APIErrorCodes.server_error.resend_error,
      );
    }

    // Error handler will send back right response
    throw Errors.BadRequest(
      "Profile is not verified",
      APIErrorCodes.authentication.unverified_profile,
    );
  }

  const isPasswordMatch = await comparePassword(password, profile.password);

  if (!isPasswordMatch) {
    throw Errors.BadRequest("Invalid credentials provided");
  }

  const tokenService = new JWTService();
  const tokenPayload = {
    id: profile.id,
    email: profile.email,
    role: userType,
  };

  switch (userType) {
    case "customer":
      await db.customer.update({
        where: { id: profile.id },
        data: { lastLogin: new Date() },
      });
      break;
    case "seller":
      await db.sellerProfile.update({
        where: { id: profile.id },
        data: { lastLogin: new Date() },
      });
      break;
    case "staff":
      await db.staff.update({
        where: { id: profile.id },
        data: { lastLogin: new Date() },
      });
      break;
  }

  const accessToken = tokenService.generateAccessToken(tokenPayload);
  const refreshToken = tokenService.generateRefreshToken(tokenPayload);

  res.status(200).json({
    success: true,
    message: "Logged in succesfully",
    accessToken,
    refreshToken,
  });
}

async function sendVerificationEmail(
  profile: Customer | SellerProfile | Staff,
  userType: UserType,
): Promise<EmailResponse> {
  const tokenService = new JWTService();
  const emailService = new EmailService();

  const token = tokenService.generateEmailToken({
    id: profile.id,
    email: profile.email,
    role: userType,
  });

  const payload: EmailTemplateData = {
    first_name: profile.firstName,
    last_name: profile.lastName,
    token: token,
  };

  var emailType: EmailType = "verify-email";
  var recipient = profile.email;
  if (userType == "staff") {
    payload["email"] = profile.email;
    payload["role"] = (profile as Staff).role;
    emailType = "verify-email-staff";
    recipient = ADMIN_EMAIL || "";
  }

  if (!recipient) {
    throw Errors.Internal("AMDIN_EMAIL env variable not set");
  }

  return await emailService.sendSecurityEmail(
    emailType,
    userType,
    recipient,
    payload,
  );
}
