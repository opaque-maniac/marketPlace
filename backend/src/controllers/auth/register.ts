import type { Request, Response, NextFunction } from "express";
import { RegisterUserBody, RegisterStaffBody } from "../../definitons/payloads";
import { Errors } from "../../errors/definitions";
import { Customer, SellerProfile, Staff } from "@prisma/client";
import db from "../../db/db";
import { hashPassword } from "../../utils/bcrypt";
import JWTService from "../../utils/services/jwt-service";
import EmailService from "../../utils/services/email-service";
import { UserType } from "../../definitons/users";
import APIErrorCodes from "../../errors/error-codes";
import { EmailTemplateData, EmailType } from "../../definitons/emails";

// ENV variables
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export async function RegisterUser(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const role = req.query.role ? (req.query.role as string).toLowerCase() : "";
  const orgRef = req.query.orgRef ? (req.query.orgRef as string) : "";

  if (!role) {
    throw Errors.BadRequest("Invalid role query param provided");
  }

  const { email, password } = req.body as RegisterUserBody;
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

  if (profile) {
    throw Errors.BadRequest("User with email already exists");
  }

  const passwordHash = await hashPassword(password);
  // Varaibles for sending email
  // Include email recipient, email type, user role and payload
  var recipient: string;
  var emailType: EmailType;
  var emailRole: UserType = "customer";
  var emailPayload: EmailTemplateData = {};

  switch (role) {
    case "customer":
      profile = await registerCustomer(req, passwordHash);
      recipient = profile.email;
      emailType = "verify-email";
      emailRole = "customer";
      break;
    case "seller":
      profile = await registerSeller(req, orgRef, passwordHash);
      recipient = profile.email;
      emailType = "verify-email";
      emailRole = "seller";
      break;
    case "staff":
      profile = await registerStaff(req, passwordHash);
      recipient = ADMIN_EMAIL || "";
      emailType = "verify-email-staff";
      emailRole = "staff";
      // Payload values specific to staff
      emailPayload["email"] = profile.email;
      emailPayload["role"] = (profile as Staff).role;
      break;
  }

  if (!recipient) {
    throw Errors.Internal("ADMIN_EMAIL env variable not set");
  }

  emailPayload["first_name"] = profile.firstName;
  emailPayload["last_name"] = profile.lastName;

  const tokenService = new JWTService();
  const emailService = new EmailService();

  const token = tokenService.generateEmailToken({
    id: profile.id,
    email: profile.email,
    role: emailRole,
  });
  emailPayload["token"] = token;

  const resp = await emailService.sendSecurityEmail(
    emailType,
    emailRole,
    recipient,
    emailPayload,
  );

  if (!resp.success) {
    throw Errors.Internal(
      resp.error?.message || "Internal Server Error",
      APIErrorCodes.server_error.resend_error,
    );
  }

  res.status(201).json({
    success: true,
    message: "Registered user successfully",
  });
}

async function registerCustomer(
  req: Request,
  password: string,
): Promise<Customer> {
  const { email, firstName, lastName } = req.body as RegisterUserBody;

  return await db.$transaction(async (tx) => {
    const profile = await tx.customer.create({
      data: {
        email,
        firstName,
        lastName,
        password,
      },
    });

    await tx.cart.create({
      data: {
        customerID: profile.id,
      },
    });

    return profile;
  });
}

async function registerSeller(
  req: Request,
  orgRef: string,
  password: string,
): Promise<SellerProfile> {
  if (!orgRef) {
    throw Errors.BadRequest("Invalid orgRef query param provided");
  }

  const { email, firstName, lastName } = req.body as RegisterUserBody;

  const org = await db.sellerOrganization.findFirst({
    where: {
      referenceNumber: orgRef,
    },
  });
  if (!org) {
    throw Errors.BadRequest("Invalid orgRef query param provided");
  }

  // return await db.sellerProfile.create({})
  return await db.sellerProfile.create({
    data: {
      email,
      firstName,
      lastName,
      password,
      role: "STAFF",
      organizationID: org.id,
    },
  });
}

async function registerStaff(req: Request, password: string): Promise<Staff> {
  const { email, firstName, lastName, role } = req.body as RegisterStaffBody;

  return await db.staff.create({
    data: {
      email,
      firstName,
      lastName,
      role,
      password,
    },
  });
}
