import type { Request, Response, NextFunction } from "express";

export async function RequestResetPassword(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {}

export async function VerifyResetPasswordURL(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {}

export async function ConfirmResetPassword(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {}
