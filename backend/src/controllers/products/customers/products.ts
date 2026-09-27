import type { Request, Response } from "express";
import { Errors } from "../../../errors/definitions";
import { ProductSearchParams } from "../../../definitons/products";
import { ProductSearchService } from "../../../utils/services/product-search";

export async function FetchCustomerProducts(
  req: Request,
  res: Response,
): Promise<void> {
  const page = req.query.page ? Number(req.query.page) : 1;
  const limit = req.query.limit ? Number(req.query.limit) : 10;
  const query = req.query.query ? (req.query.query as string) : "";
  const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : undefined;
  const minPrice = req.query.minPrice ? Number(req.query.minPrice) : undefined;

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

  const searchParams: ProductSearchParams = {
    query,
    page,
    verified: true,
    limit,
    maxPrice,
    minPrice,
  };

  const productSearchService = new ProductSearchService();
  const { products, hasNext } = await productSearchService.search(searchParams);

  res.status(200).json({
    success: true,
    message: "Fetched products successfully",
    products,
    hasNext,
  });
}
