import type { Request, Response, NextFunction } from "express";

export async function RequestChangePassword(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {}

export async function VerifyChangePasswordURL(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {}

export async function ConfirmChangePassword(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {}
