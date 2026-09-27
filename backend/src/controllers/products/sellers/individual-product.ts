import type { Request, Response } from "express";
import { Errors } from "../../../errors/definitions";
import { JWTPayload } from "../../../definitons/jwt";
import db from "../../../db/db";

export async function FetchSellerIndividualProduct(
  req: Request,
  res: Response,
): Promise<void> {
  const { id } = req.params;
  const user = (req as any).user as JWTPayload;

  const profile = await db.sellerProfile.findFirst({
    where: { id: user.id },
  });
  if (!profile) {
    throw Errors.Unauthorized("Unauthorized");
  }

  const product = await db.product.findFirst({
    where: {
      id,
      sellerID: profile.organizationID,
    },
    include: {
      images: {
        select: {
          filename: true,
        },
      },
      seller: {
        select: {
          name: true,
          image: {
            select: {
              filename: true,
            },
          },
        },
      },
    },
  });

  if (!product) {
    throw Errors.NotFound("Product not found", "Product");
  }

  const ratings = await db.ratings.findMany({
    where: { productID: product.id },
  });

  const ratingValue =
    ratings.length > 0
      ? ratings.reduce((acc, val) => acc + val.value, 0) / ratings.length
      : 0;

  res.status(200).json({
    success: true,
    message: "Fetched product",
    product,
    rating: ratingValue,
  });
}

export async function UpdateSellerIndividualProduct(
  req: Request,
  res: Response,
): Promise<void> {}

export async function DeleteSellerIndividualProduct(
  req: Request,
  res: Response,
): Promise<void> {
  const { id } = req.params;
  const user = (req as any).user as JWTPayload;

  const profile = await db.sellerProfile.findFirst({
    where: { id: user.id },
  });
  if (!profile) {
    throw Errors.Unauthorized("Unauthorized");
  }

  const product = await db.product.findFirst({
    where: {
      id,
      sellerID: profile.organizationID,
    },
  });

  if (!product) {
    throw Errors.NotFound("Product not found", "Product");
  }

  await db.product.delete({
    where: { id: product.id },
  });

  res.status(203).json({
    success: true,
    message: "Deleted product",
  });
}
