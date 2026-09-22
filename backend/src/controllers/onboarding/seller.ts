import db from "../../db/db"
import type { Request, Response, NextFunction } from "express";
import { OnboardingSellerBody } from "../../utils/definitons/payloads";
import { BadRequestError } from "../../errors/definitions";

export async function OnboardSeller(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { name, phone, bio, address, ownerData } =
    req.body as OnboardingSellerBody;

  const existingOrganizationName = await db.seller.findFirst({
    where: {
      name,
    }
  })
  if (existingOrganizationName) {
    throw new BadRequestError(`Organization with name ${name} already exists`)
  }

  const sellerProfile = await db.$transaction(async (tx) => {
  })
}
