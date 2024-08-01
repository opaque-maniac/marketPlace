import prisma from "../../utils/db";

export const fetchComments = async (req, res, next) => {
  try {
    const { id } = req.params;
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 20;
    const page = req.query.page || 1;

    const product = await prisma.product.findFirst({
      where: {
        id,
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const comments = await prisma.comment.findMany({
      where: {
        productId: product.id,
      },
      include: {
        customer: {
          include: {
            image: true,
          },
        },
      },
      take: itemsPerPage + 1,
      skip: (page - 1) * itemsPerPage,
    });

    const hasNextPage = comments.length > itemsPerPage;

    if (hasNextPage) {
      comments.pop();
    }

    return res.status(200).json({
      message: "Fetched comments",
      comments,
      hasNextPage,
    });
  } catch (e) {
    return next(e);
  }
};

export const createComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const product = await prisma.product.findFirst({
      where: {
        id,
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const comment = await prisma.comment.create({
      data: {
        customerId: req.user.id,
        productId: product.id,
        content,
      },
    });

    return res.status(201).json({
      message: "Created comment successfully",
      comment,
    });
  } catch (e) {
    return next(e);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const { id, commentId } = req.params;

    const comment = await prisma.comment.findFirst({
      where: {
        id: commentId,
        productId: id,
      },
    });

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    if (comment.customerId !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to delete this comment",
      });
    }

    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    return res.status(204).json({
      message: "Deleted comment successfully",
    });
  } catch (e) {
    return next(e);
  }
};
