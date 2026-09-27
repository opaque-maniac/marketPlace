import type { Request, Response } from "express";
import { Errors } from "../../../errors/definitions";
import { ProductSearchParams } from "../../../definitons/products";
import { JWTPayload } from "../../../definitons/jwt";
import db from "../../../db/db";
import { ProductSearchService } from "../../../utils/services/product-search";

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
