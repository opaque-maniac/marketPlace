/**
 * Handlers for managing products for customers
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Response, NextFunction, Send } from "express";
import prisma from "../../utils/db";
import { SendComplantsRequest } from "../../types";

// To send complaints
export const sendComplaints = async (
  req: SendComplantsRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, name, message } = req.body;

    await prisma.complaint.create({
      data: { email, name, message },
    });

    return res.status(201).json({
      message: "Complaint created",
    });
  } catch (e) {
    return next(e as Error);
  }
};
