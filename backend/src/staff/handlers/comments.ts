/**
 * Handlers for managing products for staff
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { NextFunction, Response } from "express";
import { AuthenticatedRequest, StaffUpdateCommentRequest } from "../../types";
import prisma from "../../utils/db";
import { serverError } from "../../utils/globals";

export const fetchProductComments = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
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
      res.status(404).json({
        message: "Product not found",
        errorCode: "P400",
      });
      return;
    }

    const comments = await prisma.comment.findMany({
      where: {
        productID: product.id,
      },
      include: {
        customer: {
          include: {
            image: true,
          },
        },
      },
      take: limit + 1,
      skip: (page - 1) * limit,
    });

    const hasNext = comments.length > limit;

    if (hasNext) {
      comments.pop();
    }

    res.status(200).json({
      message: "Comments fetched successfully",
      comments,
      hasNext,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

export const fetchComments = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    const comments = await prisma.comment.findMany({
      include: {
        customer: {
          include: {
            image: true,
          },
        },
      },
      take: limit + 1,
      skip: (page - 1) * limit,
    });

    const hasNext = comments.length > limit;

    if (hasNext) {
      comments.pop();
    }

    res.status(200).json({
      message: "Comments fetched successfully",
      comments,
      hasNext,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

export const fetchIndividualComment = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    const comment = await prisma.comment.findUnique({
      where: {
        id,
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
      res.status(404).json({
        message: "Comment not found",
        errorCode: "C400",
      });
      return;
    }

    res.status(200).json({
      message: "Comment fetched successfully",
      comment,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

export const updateComment = async (
  req: StaffUpdateCommentRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { message } = req.body;

    const comment = await prisma.comment.findUnique({
      where: {
        id,
      },
    });

    if (!comment) {
      res.status(404).json({
        message: "Comment not found",
        errorCode: "C400",
      });
      return;
    }

    await prisma.comment.update({
      where: {
        id,
      },
      data: {
        message,
      },
    });

    res.status(200).json({
      message: "Comment updated successfully",
      comment,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

export const deleteComment = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    const comment = await prisma.comment.findUnique({
      where: {
        id,
      },
    });

    if (!comment) {
      res.status(404).json({
        message: "Comment not found",
        errorCode: "C400",
      });
      return;
    }

    await prisma.comment.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      message: "Comment deleted successfully",
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};
