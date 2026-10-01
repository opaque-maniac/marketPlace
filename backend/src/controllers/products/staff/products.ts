import type { Request, Response } from "express";
import { ProductSearchParams } from "../../../definitons/search";
import searchService from "../../../utils/services/search-service";

export async function StaffFetchProducts(
  req: Request,
  res: Response,
): Promise<void> {
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
  const minInventory = req.query.minInventory
    ? Number(req.query.minInventory)
    : undefined;
  const maxInventory = req.query.minInventory
    ? Number(req.query.maxInventory)
    : undefined;
  const sellerId = req.query.sellerId
    ? (req.query.sellerId as string)
    : undefined;
  // TODO: add the from and to date ranges

  const searchParams: ProductSearchParams = {
    query,
    verified,
    categoryId,
    minPrice,
    maxPrice,
    page,
    limit,
    minInventory,
    maxInventory,
    sellerId,
  };

  const { items, hasNext } = await searchService.products(searchParams);

  res.status(200).json({
    success: true,
    message: "Fetched products",
    products: items,
    hasNext,
  });
}
