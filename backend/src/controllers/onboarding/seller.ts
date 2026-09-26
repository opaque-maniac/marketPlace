import db from "../../db/db";
import type { Request, Response, NextFunction } from "express";
import { OnboardingSellerBody } from "../../definitons/payloads";
import { Errors } from "../../errors/definitions";
import { hashPassword } from "../../utils/bcrypt";
import JWTService from "../../utils/services/jwt-service";
import EmailService from "../../utils/services/email-service";
import APIErrorCodes from "../../errors/error-codes";
import { generateSellerReferenceNumber } from "../../utils/generate-ref";

export async function OnboardSeller(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { name, phone, bio, address, ownerData } =
    req.body as OnboardingSellerBody;

  const existingOrganizationName = await db.sellerOrganization.findFirst({
    where: {
      name,
    },
  });
  if (existingOrganizationName) {
    throw Errors.BadRequest(`Organization with name ${name} already exists`);
  }

  const { email, firstName, lastName, password } = ownerData;
  const hashedPassword = await hashPassword(password);

  /*
   * Organization verification happens when owner verifies email
   * If owner deletes profile, organization is deleted with owner profile and their product
   * But I am thinking about using the active flag turning it into false and using redis
   * to delete profiles that have been inactive for a month to give leeway
   * And disable deletion if there are still orders on their ways
   * */
  const referenceNumber = await generateSellerReferenceNumber(db);
  const sellerProfile = await db.$transaction(async (tx) => {
    const sellerOrg = await tx.sellerOrganization.create({
      data: {
        name,
        bio,
        phone,
        address,
        referenceNumber,
      },
    });

    return await tx.sellerProfile.create({
      data: {
        email,
        firstName,
        lastName,
        role: "OWNER",
        organizationID: sellerOrg.id,
        password: hashedPassword,
      },
    });
  });

  const tokenService = new JWTService();
  const emailService = new EmailService();

  const emailToken = tokenService.generateEmailToken({
    id: sellerProfile.id,
    email,
    role: "seller",
  });

  const resp = await emailService.sendSecurityEmail(
    "onboarding-verification",
    "seller",
    email,
    {
      first_name: sellerProfile.firstName,
      last_name: sellerProfile.lastName,
      token: emailToken,
    },
  );

  if (!resp.success) {
    throw Errors.Internal(
      resp.error?.message!,
      APIErrorCodes.server_error.resend_error,
    );
  }

  res.status(201).json({
    success: true,
    message: `Onboarded organization ${name}, please verify email`,
  });
}
