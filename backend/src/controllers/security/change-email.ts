import type { Request, Response, NextFunction } from "express";

export async function RequestChangeEmail(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {}

export async function VerifyChangeEmailURL(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {}
