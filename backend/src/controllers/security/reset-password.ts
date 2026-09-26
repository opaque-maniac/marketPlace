import type { Request, Response, NextFunction } from "express";
import { Errors } from "../../errors/definitions";

export async function RequestResetPassword(
  req: Request,
  res: Response,
): Promise<void> {}

export async function VerifyResetPasswordURL(
  req: Request,
  res: Response,
): Promise<void> {}

export async function ConfirmResetPassword(
  req: Request,
  res: Response,
): Promise<void> {}
