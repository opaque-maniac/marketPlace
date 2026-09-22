import db from "../../db/db"
import type { Request, Response, NextFunction } from "express";
import { OnboardingSellerBody } from "../../utils/definitons/payloads";
import { BadRequestError, PrismaError } from "../../errors/definitions";
import { hashPassword } from "../../utils/bcrypt";
import JWTService from "../../utils/services/jwt-service";
import EmailService from "../../utils/services/email-service";

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
    }
  })
  if (existingOrganizationName) {
    throw new BadRequestError(`Organization with name ${name} already exists`)
  }

  const { email, firstName, lastName, password } = ownerData;
  const hashedPassword = await hashPassword(password)

  const sellerProfile = await db.$transaction(async (tx) => {
    const sellerOrg = await tx.sellerOrganization.create({
      data: {
        name,
        bio,
        phone,
        address,
      }
    })

    return await tx.sellerProfile.create({
      data: {
        email,
        firstName,
        lastName,
        role: "OWNER",
        organizationID: sellerOrg.id,
        password: hashedPassword,
      }
    })
  })

  const tokenService = new JWTService()
  const emailService = new EmailService()

  const emailToken = tokenService.generateEmailToken({
    id: sellerProfile.id,
    email,
    role: "seller",
  })

  const resp = await emailService.sendSecurityEmail(
    "verify-email",
    "seller",
    email,
    firstName,
    lastName,
    emailToken,
  )

  if (!resp.sucess) {
    throw new PrismaError(resp.error?.message!)
  }

  res.status(201).json({
    message: `Onboarded organization ${name}, please verify email`
  })
}
