import type { Request, Response } from "express";
import { Errors } from "../../errors/definitions";
import { Customer, SellerProfile, Staff } from "@prisma/client";
import db from "../../db/db";
import { VerifyEmailBody } from "../../definitons/payloads";
import APIErrorCodes from "../../errors/error-codes";
import JWTService from "../../utils/services/jwt-service";
import EmailService from "../../utils/services/email-service";
import { EmailTemplateData, EmailType } from "../../definitons/emails";

// ENV variables
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export async function RequestVerifyEmail(
  req: Request,
  res: Response,
): Promise<void> {
  const role = req.query.role ? (req.query.role as string).toLowerCase() : "";

  if (!role) {
    throw Errors.BadRequest("Invalid role query param provided");
  }

  const { email } = req.body as VerifyEmailBody;

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
    throw Errors.BadRequest("Invalid email address provided");
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

    if (!org.verified && (profile as SellerProfile).role == "STAFF") {
      throw Errors.BadRequest(
        "Organization is not verified",
        APIErrorCodes.authentication.unverified_seller_org,
      );
    }
  }

  const tokenService = new JWTService();
  const emailService = new EmailService();

  const token = tokenService.generateEmailToken({
    id: profile.id,
    email: profile.email,
    role,
  });

  var emailType: EmailType = "verify-email";
  var recipeint = profile.email;
  const payload: EmailTemplateData = {
    first_name: profile.firstName,
    last_name: profile.lastName,
    token: token,
  };

  if (role == "staff") {
    emailType = "verify-email-staff";
    recipeint = ADMIN_EMAIL || "";
    payload["email"] = profile.email;
    payload["role"] = (profile as Staff).role;
  }

  if (!recipeint) {
    throw Errors.Internal("AMDIN_EMAIL env variable not set");
  }

  const { success, error } = await emailService.sendSecurityEmail(
    emailType,
    role,
    recipeint,
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
    message: "Sent verification email",
  });
}

export async function ConfirmVerifyEmailURL(
  req: Request,
  res: Response,
): Promise<void> {
  const token = req.query.token ? (req.query.token as string) : "";

  if (!token) {
    throw Errors.BadRequest("Invalid token query param provided");
  }

  const tokenService = new JWTService();

  const tokenPayload = tokenService.parseToken(token);
  if (!tokenPayload || tokenPayload.purpose != "EMAIL") {
    throw Errors.BadRequest(
      "Token has expired or is invalid",
      APIErrorCodes.token.invalid_security_token,
    );
  }

  var profile: Customer | SellerProfile | Staff | null = null;
  const findArgs = {
    where: { email: tokenPayload.email },
  };

  switch (tokenPayload.role) {
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

  const updateArgs = {
    where: { id: profile.id },
    data: {
      verified: true,
    },
  };

  switch (tokenPayload.role) {
    case "customer":
      await db.customer.update(updateArgs);
      break;
    case "seller":
      await db.$transaction(async (tx) => {
        await tx.sellerProfile.update(updateArgs);

        if ((profile as SellerProfile).role == "OWNER") {
          await tx.sellerOrganization.update({
            where: { id: (profile as SellerProfile).organizationID },
            data: { verified: true },
          });
        }
      });
      break;
    case "staff":
      await db.staff.update(updateArgs);
      break;
  }

  res.status(200).json({
    success: true,
    message: "Verified profile email",
  });
}
