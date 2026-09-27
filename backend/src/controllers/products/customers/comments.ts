import type { Request, Response } from "express";
import { Errors } from "../../../errors/definitions";
import db from "../../../db/db";
import { JWTPayload } from "../../../definitons/jwt";
import { CreateCommentBody } from "../../../definitons/payloads";

export async function FetchProductComments(
  req: Request,
  res: Response,
): Promise<void> {
  const limit = req.query.limit ? Number(req.query.limit) : 10;
  const page = req.query.page ? Number(req.query.page) : 1;

  if (isNaN(page)) {
    throw Errors.BadRequest("Invalid page query param");
  }

  if (isNaN(limit)) {
    throw Errors.BadRequest("Invalid limit query param");
  }

  const { id } = req.params;
  const product = await db.product.findFirst({
    where: { id },
  });

  if (!product) {
    throw Errors.NotFound("Product not found", "Product");
  }

  const comments = await db.comment.findMany({
    where: { productID: product.id },
    include: {
      customer: {
        select: {
          firstName: true,
          lastName: true,
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

  const hasNext = comments.length > limit;
  if (hasNext) {
    comments.pop();
  }

  res.status(200).json({
    success: true,
    message: "Retrieved product comments",
    comments,
    hasNext,
  });
}

export async function CreateProductComment(
  req: Request,
  res: Response,
): Promise<void> {
  const { id } = req.params;

  const product = await db.product.findFirst({
    where: { id },
  });

  if (!product) {
    throw Errors.NotFound("Product not found", "Product");
  }

  const user = (req as any).user as JWTPayload;

  const { comment } = req.body as CreateCommentBody;

  await db.comment.create({
    data: {
      message: comment,
      customerID: user.id,
    },
  });

  res.status(200).json({
    success: true,
    message: "Created product comment",
  });
}
