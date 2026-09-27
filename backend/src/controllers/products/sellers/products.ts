import type { Request, Response } from "express";
import { Errors } from "../../../errors/definitions";
import { ProductSearchParams } from "../../../definitons/products";
import { JWTPayload } from "../../../definitons/jwt";
import db from "../../../db/db";
import { ProductSearchService } from "../../../utils/services/product-search";
import { ProductCreateUpdateBody } from "../../../definitons/payloads";

export async function FetchSellerProducts(req: Request, res: Response) {
  const limit = req.query.limit ? Number(req.query.limit) : 10;
  const page = req.query.page ? Number(req.query.page) : 1;
  const query = req.query.query ? (req.query.query as string) : "";
  const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : undefined;
  const minPrice = req.query.minPrice ? Number(req.query.minPrice) : undefined;
  const categoryId = req.query.categoryId
    ? (req.query.categoryId as string)
    : undefined;
  const verified =
    req.query.verified === "true"
      ? true
      : req.query.verified == "false"
        ? false
        : undefined;

  if (isNaN(page)) {
    throw Errors.BadRequest("Invalid page query param");
  }

  if (isNaN(limit)) {
    throw Errors.BadRequest("Invalid limit query param");
  }

  if (minPrice != undefined && isNaN(minPrice)) {
    throw Errors.BadRequest("Invalid minPrice query param");
  }

  if (maxPrice != undefined && isNaN(maxPrice)) {
    throw Errors.BadRequest("Invalid maxPrice query param");
  }

  const { id } = (req as any).user as JWTPayload;

  const profile = await db.sellerProfile.findFirst({
    where: { id },
  });
  if (!profile) {
    throw Errors.Unauthorized("Unauthorized");
  }

  const searchParams: ProductSearchParams = {
    query,
    verified,
    categoryId,
    minPrice,
    maxPrice,
    page,
    limit,
    sellerID: profile.organizationID,
  };

  const productSearch = new ProductSearchService();
  const { products, hasNext } = await productSearch.search(searchParams);

  res.status(200).json({
    success: true,
    message: "Fetched products",
    products,
    hasNext,
  });
}

export async function CreateNewProduct(
  req: Request,
  res: Response,
): Promise<void> {
  const { id } = (req as any).user as JWTPayload;

  const profile = await db.sellerProfile.findFirst({
    where: { id },
  });
  if (!profile) {
    throw Errors.Unauthorized("Unauthorized");
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

  if (!filenames || filenames.length == 0) {
    throw Errors.BadRequest("New products require at least one image");
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

  const product = await db.$transaction(async (tx) => {
    const newProduct = await tx.product.create({
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

    for (const file in filenames) {
      await tx.productImage.create({
        data: {
          productID: newProduct.id,
          filename: file,
        },
      });
    }

    return newProduct;
  });

  res.status(200).json({
    success: true,
    message: "Created new product",
    productId: product.id,
  });
}
