import type { Request, Response, NextFunction } from "express";

export async function RequestVerifyEmail(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {}

export async function ConfirmVerifyEmailURL(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {}
