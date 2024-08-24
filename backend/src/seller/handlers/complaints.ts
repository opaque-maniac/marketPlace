/**
 * Handlers for seller profiles
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Response, NextFunction } from "express";
import prisma from "../../utils/db";
import { SendComplantsRequest } from "../../types";

// For sending complaints
export const sendComplaints = async (
  req: SendComplantsRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, name, message, phone } = req.body;

    await prisma.complaint.create({
      data: {
        email,
        name,
        phone,
        message,
      },
    });

    return res.status(201).json({
      message: "Created complaint",
    });
  } catch (e) {
    return next(e as Error);
  }
};
