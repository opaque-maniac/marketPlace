import type { Request, Response } from "express";
import { Errors } from "../../../errors/definitions";
import { JWTPayload } from "../../../definitons/jwt";
import db from "../../../db/db";
import { ProductCreateUpdateBody } from "../../../definitons/payloads";

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

  const {
    name,
    description,
    buyingPrice,
    sellingPrice,
    categoryId,
    inventory,
  } = req.body as ProductCreateUpdateBody;
  let filenames: string[] | undefined;

  if (req.files && Array.isArray(req.files)) {
    filenames = req.files.map((file) => file.filename);
  }

  const category = await db.category.findFirst({
    where: { id: categoryId },
  });
  if (!category) {
    throw Errors.BadRequest("Invalid category id in request body");
  }

  const parsedBP = parseFloat(buyingPrice);
  const parsedSP = parseFloat(sellingPrice);
  const parsedInventory = parseInt(inventory);

  const updatedProduct = await db.$transaction(async (tx) => {
    const newProduct = await tx.product.update({
      where: {
        id: product.id,
      },
      data: {
        name,
        description,
        buyingPrice: parsedBP,
        sellingPrice: parsedSP,
        categoryID: category.id,
        inventory: parsedInventory,
        sellerID: profile.organizationID,
      },
    });

    if (filenames && filenames.length > 0) {
      await tx.productImage.deleteMany({
        where: { productID: newProduct.id },
      });

      for (const file in filenames) {
        await tx.productImage.create({
          data: {
            productID: newProduct.id,
            filename: file,
          },
        });
      }
    }

    return newProduct;
  });

  res.status(200).json({
    success: true,
    message: "Updated product",
    productId: updatedProduct.id,
  });
}

export async function UpdateSellerProductVerifiedStatus(
  req: Request,
  res: Response,
): Promise<void> {
  const { id } = req.params;
  const user = (req as any).user as JWTPayload;

  const profile = await db.sellerProfile.findFirst({
    where: { id: user.id },
  });
  if (!profile || profile.role != "OWNER") {
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

  const newStatus = !product.verified;
  await db.product.update({
    where: {
      id,
    },
    data: {
      verified: newStatus,
    },
  });

  res.status(200).json({
    success: true,
    message: "Updated product verified status",
  });
}

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
