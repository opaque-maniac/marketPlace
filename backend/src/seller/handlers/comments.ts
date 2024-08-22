/**
 * Handlers for seller product comments
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Response, NextFunction } from "express";
import prisma from "../../utils/db";
import { AuthenticatedRequest } from "../../types";

// Function to fetch product comments
export const fetchProductComments = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        errorCode: "P400",
      });
    }

    const comments = await prisma.comment.findMany({
      where: {
        productID: id,
      },
      include: {
        customer: {
          include: {
            image: true,
          },
        },
      },
      skip: (page - 1) * limit,
      take: limit + 1,
    });

    const hasNext = comments.length > limit;

    if (hasNext) {
      comments.pop();
    }

    return res.status(200).json({
      message: "Comments fetched successfully",
      hasNext,
      data: comments,
    });
  } catch (e) {
    return next(e as Error);
  }
};

// Function to fetch individual comment
export const fetchIndividualComment = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, commentId } = req.params;

    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
        productID: id,
      },
      include: {
        customer: {
          include: {
            image: true,
          },
        },
      },
    });

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
        errorCode: "C400",
      });
    }

    return res.status(200).json({
      message: "Comment fetched successfully",
      data: comment,
    });
  } catch (e) {
    return next(e as Error);
  }
};
