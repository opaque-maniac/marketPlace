import type { Request, Response } from "express";
import { Errors } from "../../errors/definitions";
import JWTService from "../../utils/services/jwt-service";
import APIErrorCodes from "../../errors/error-codes";
import { Customer, SellerProfile, Staff } from "@prisma/client";
import db from "../../db/db";

export async function RefreshAccessToken(
  req: Request,
  res: Response,
): Promise<void> {
  const token = req.query.token ? (req.query.token as string) : "";

  if (!token) {
    throw Errors.BadRequest("Invalid token query param provided");
  }

  const tokenService = new JWTService();

  const payload = tokenService.parseToken(token);
  if (!payload || payload.purpose != "REFRESH") {
    throw Errors.BadRequest(
      "Token has expired or is invalid",
      APIErrorCodes.token.invalid_security_token,
    );
  }

  const { role, id } = payload;
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
    throw Errors.Unauthorized(
      "Unauthorized",
      APIErrorCodes.authentication.invalid_credentials,
    );
  }

  if (profile.status == "DISABLED") {
    throw Errors.Unauthorized(
      "Unauthorized",
      APIErrorCodes.authentication.disabled_profie,
    );
  }

  const tokenPayload = {
    id: profile.id,
    email: profile.email,
    role,
  };

  const accessToken = tokenService.generateAccessToken(tokenPayload);
  var refreshToken = "";

  if (tokenService.shouldRegerateRefresh(token)) {
    refreshToken = tokenService.generateRefreshToken(tokenPayload);
  }

  res.status(200).json({
    success: true,
    message: "Refreshed access token",
    accessToken,
    refreshToken,
  });
}
