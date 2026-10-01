import type { Request, Response } from "express";
import { Errors } from "../../errors/definitions";
import db from "../../db/db";
import { JWTPayload } from "../../definitons/jwt";
import { CreateCommentBody } from "../../definitons/payloads";
import searchService from "../../utils/services/search-service";
import { CommentSearchParams } from "../../definitons/search";

export async function FetchProductComments(
  req: Request,
  res: Response,
): Promise<void> {
  const page = req.query.page ? Number(req.query.page) : 1;
  const limit = req.query.limit ? Number(req.query.limit) : 10;
  const query = req.query.query ? (req.query.query as string) : "";

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

  // TODO: disabled: false
  const params: CommentSearchParams = {
    query,
    page,
    limit,
    productId: product.id,
    topLevelOnly: true,
    sortBy: "relevance",
  };

  const { items, hasNext } = await searchService.comments(params);

  res.status(200).json({
    success: true,
    message: "Retrieved product comments",
    comments: items,
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
