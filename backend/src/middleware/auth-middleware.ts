import type { Request, Response, NextFunction } from "express";
import JWTService from "../utils/services/jwt-service";
import { Errors } from "../errors/definitions";
import APIErrorCodes from "../errors/error-codes";
import { JWTPayload } from "../definitons/jwt";

const tokenService = new JWTService();

export async function allowIfAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw Errors.Unauthorized(
      "Unauthorized",
      APIErrorCodes.authentication.invalid_credentials,
    );
  }

  const payload = tokenService.parseToken(token);
  if (!payload) {
    throw Errors.Unauthorized(
      "Unauthorized",
      APIErrorCodes.authentication.invalid_credentials,
    );
  }

  (req as any).user = payload;
  next();
}

export async function allowIfIsCustomer(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const user = (req as any).user as JWTPayload | undefined;
  if (!user) {
    throw Errors.Unauthorized("Unauthorized");
  }

  if (user.role != "customer") {
    throw Errors.Unauthorized("Unauthorized");
  }

  next();
}

export async function allowIfIsSeller(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const user = (req as any).user as JWTPayload | undefined;
  if (!user) {
    throw Errors.Unauthorized("Unauthorized");
  }

  if (user.role != "seller") {
    throw Errors.Unauthorized("Unauthorized");
  }

  next();
}
