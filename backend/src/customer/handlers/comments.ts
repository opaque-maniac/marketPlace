/**
 * Handlers for managing comments for customers
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Response, NextFunction, Request } from "express";
import prisma from "../../utils/db";
import { AuthenticatedRequest, CommentCreateRequest } from "../../types";

// Function to fetch comments for products
export const fetchProductComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;

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

// Function to add comment for product
export const createProductComment = async (
  req: CommentCreateRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message } = req.body;
    const { id } = req.params;

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

    if (req.user) {
      const comment = await prisma.comment.create({
        data: {
          message,
          customerID: req.user.id,
          productID: product.id,
        },
      });

      return res.status(201).json({
        message: "Comment added successfully",
        data: comment,
      });
    } else {
      throw new Error("User not found");
    }
  } catch (e) {
    return next(e as Error);
  }
};

// Function to fetchIndividualComment
export const fetchIndividualComment = async (
  req: Request,
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
      message: "Comment found",
      comment,
    });
  } catch (e) {
    return next(e as Error);
  }
};

// Function to delete product comment
export const deleteProductComment = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, commentId } = req.params;

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

    if (req.user) {
      const comment = await prisma.comment.delete({
        where: {
          id: commentId,
          productID: product.id,
          customerID: req.user.id,
        },
      });

      return res.status(203).json({
        message: "Comment deleted successfully",
        comment,
      });
    } else {
      throw new Error("User not found");
    }
  } catch (e) {
    return next(e as Error);
  }
};
