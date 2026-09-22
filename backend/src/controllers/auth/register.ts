import type { Request, Response, NextFunction } from "express";
import { RegisterUserBody } from "../../utils/definitons/payloads";
import { Errors } from "../../errors/definitions";

export async function RegisterUser(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const role = req.query.role ? (req.query.role as string) : ""
  if (!role) {
    throw Errors.BadRequest("Invalid role query param provided")
  }

  const { email, firstName, lastName } = (req.body as RegisterUserBody)
}

