import type { Request, Response, NextFunction } from "express";
import { Errors } from "../../errors/definitions";
import { Customer, SellerProfile, Staff } from "@prisma/client";
import { LoginBody, SellerLoginBody } from "../../definitons/payloads";
import db from "../../db/db";

export async function LoginUser(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const role = req.query.role ? (req.query.role as string).toLowerCase() : "";

  if (!role) {
    throw Errors.BadRequest("Invalid role query param provided");
  }

  var profile: Customer | SellerProfile | Staff | null = null;
  const { email } = req.body as SellerLoginBody;

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
}
