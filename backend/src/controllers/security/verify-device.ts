import type { Request, Response, NextFunction } from "express";

export async function RequestVerifyDevice(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> { }

export async function ConfirmVerifyDeviceURL(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> { }
