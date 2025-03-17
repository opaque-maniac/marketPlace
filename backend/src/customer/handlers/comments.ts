/**
 * Handlers for managing comments for customers
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Response, NextFunction, Request } from "express";
import prisma from "../../utils/db";
import { AuthenticatedRequest, CommentCreateRequest } from "../../types";
import { serverError } from "../../utils/globals";
import { addToWishlist } from "./wishlist";

// Function to fetch comments for products
export const fetchProductComments = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
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
      throw new Error("Product not found");
    }

    const comments = await prisma.comment.findMany({
      where: {
        productID: id,
      },
      include: {
        customer: {
          select: {
            image: true,
            firstName: true,
            lastName: true,
            id: true,
          },
        },
        product: {
          select: {
            id: true,
          },
        },
        _count: {
          select: {
            replies: true,
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

    const formattedComments = comments.map((comment) => ({
      ...comment,
      hasReplies: comment._count.replies > 0,
    }));

    res.status(200).json({
      message: "Comments fetched successfully",
      hasNext,
      data: formattedComments,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

// Function to add comment for product
export const createProductComment = async (
  req: CommentCreateRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { message } = req.body;
    const { id } = req.params;
    const { user } = req;

    if (!user) {
      throw new Error("User not found");
    }

    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    const comment = await prisma.comment.create({
      data: {
        message,
        customerID: user.id,
        productID: product.id,
      },
    });

    res.status(201).json({
      message: "Comment added successfully",
      data: comment,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

// Function to fetch individual comment replies
export const fetchIndividualComment = async (
  req: Request,
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
          select: {
            firstName: true,
            lastName: true,
            id: true,
            image: {
              select: {
                url: true,
              },
            },
          },
        },
      },
    });

    if (!comment) {
      throw new Error("Comment not found");
    }

    res.status(200).json({
      message: "Retrieved comment",
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

// Function to fetch individual comment replies
export const fetchCommentReplies = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    const comment = await prisma.comment.findUnique({
      where: {
        id,
      },
    });

    if (!comment) {
      throw new Error("Comment not found");
    }

    const replies = await prisma.comment.findMany({
      where: {
        parentID: comment.id,
      },
      include: {
        customer: {
          select: {
            firstName: true,
            lastName: true,
            id: true,
            image: {
              select: {
                url: true,
              },
            },
          },
        },
      },
      take: limit + 1,
      skip: (page - 1) * limit,
    });

    const hasNext = replies.length > limit;

    if (hasNext) {
      replies.pop();
    }

    res.status(200).json({
      message: "Comment found",
      replies,
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

// Function to delete product comment
export const deleteComment = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { user } = req;

    if (!user) {
      throw new Error("User not found");
    }

    const exists = await prisma.comment.findUnique({
      where: {
        id,
        customerID: user.id,
      },
    });

    if (!exists) {
      throw new Error("Comment not found");
    }

    const comment = await prisma.comment.delete({
      where: {
        id: exists.id,
      },
    });

    res.status(203).json({
      message: "Comment deleted successfully",
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
  req: CommentCreateRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { message } = req.body;
    const { user } = req;
    const { id } = req.params;

    if (!user) {
      throw new Error("User not found");
    }

    const comment = await prisma.comment.findUnique({
      where: {
        id,
        customerID: user.id,
      },
    });

    if (!comment) {
      throw new Error("Comment not found");
    }

    await prisma.comment.update({
      where: {
        id: comment.id,
      },
      data: {
        message,
      },
    });

    res.status(200).json({
      message: "Updated comment",
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

export const replyToComment = async (
  req: CommentCreateRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { message } = req.body;
    const { user } = req;
    const { id } = req.params;

    if (!user) {
      throw new Error("User not found");
    }

    const comment = await prisma.comment.findUnique({
      where: {
        id,
      },
    });

    if (!comment) {
      throw new Error("Comment not found");
    }

    await prisma.comment.create({
      data: {
        customerID: user.id,
        parentID: comment.id,
        message,
      },
    });

    res.status(200).json({
      message: "Updated comment",
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};
