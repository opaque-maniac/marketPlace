import { NextFunction, Response } from "express";
import { SendComplantsRequest } from "./types";
import { serverError } from "./utils/globals";
import prisma from "./utils/db";

export const sendComplaint = async (
  req: SendComplantsRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, name, message, phone } = req.body;

    await prisma.complaint.create({
      data: {
        email,
        name,
        message,
        phone,
      },
    });

    res.status(200).json({
      message: "Complaint sent successfully",
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};
