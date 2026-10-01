import type { Request, Response } from "express";
import db from "../../../db/db";
import { Errors } from "../../../errors/definitions";
import {
  ProductCreateUpdateBody,
  ProductStatusUpdateBody,
} from "../../../definitons/payloads";

export async function StaffFetchIndividualProduct(
  req: Request,
  res: Response,
): Promise<void> {
  const { id } = req.params;

  const product = await db.product.findFirst({
    where: { id },
    include: {
      images: {
        select: {
          filename: true,
        },
      },
      seller: {
        include: {
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

  res.status(200).json({
    success: true,
    message: "Fetched product",
    product,
  });
}

export async function StaffUpdateProduct(
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

export async function StaffUpdateProductVerifiedStatus(
  req: Request,
  res: Response,
): Promise<void> {
  const { id } = req.params;

  const exists = await db.product.findFirst({
    where: { id },
  });
  if (!exists) {
    throw Errors.NotFound("Product not found", "Product");
  }

  const { verified } = req.body as ProductStatusUpdateBody;
  await db.product.update({
    where: { id },
    data: { verified },
  });

  res.status(200).json({
    success: true,
    message: "Updated product verified status",
  });
}

export async function StaffDeleteProduct(
  req: Request,
  res: Response,
): Promise<void> {
  const { id } = req.params;

  const exists = await db.product.findFirst({
    where: { id },
  });
  if (!exists) {
    throw Errors.NotFound("Product not found", "Product");
  }

  await db.product.delete({
    where: { id },
  });

  res.status(203).json({
    success: true,
    message: "Deleted product in database",
  });
}
