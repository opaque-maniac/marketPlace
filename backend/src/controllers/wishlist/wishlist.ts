import type { Request, Response } from "express";
import { Errors } from "../../errors/definitions";
import db from "../../db/db";
import { JWTPayload } from "../../definitons/jwt";
import { WishlistItemSearchParams } from "../../definitons/search";
import searchService from "../../utils/services/search-service";

export async function CustomerFetchWishlist(
  req: Request,
  res: Response,
): Promise<void> {
  const page = req.query.page ? Number(req.query.page) : 1;
  const limit = req.query.limit ? Number(req.query.limit) : 10;
  // const query = req.query.query ? (req.query.query as string) : "";

  const user = (req as any).user as JWTPayload;

  const wishlist = await db.wishList.findFirst({
    where: { customerID: user.id },
  });
  if (!wishlist) {
    throw Errors.Unauthorized("Unauthorized");
  }

  const params: WishlistItemSearchParams = {
    page,
    limit,
    wishlistId: wishlist.id,
  };
  const { items, hasNext } = await searchService.wishlistItems(params);

  res.status(200).json({
    success: true,
    message: "Fetched wishlist items",
    items,
    hasNext,
  });
}

export async function CustomerEmptyWishlist(
  req: Request,
  res: Response,
): Promise<void> {
  const user = (req as any).user as JWTPayload;

  const wishlist = await db.wishList.findFirst({
    where: { customerID: user.id },
  });
  if (!wishlist) {
    throw Errors.Unauthorized("Unauthorized");
  }

  await db.wishListItem.deleteMany({
    where: { wishlistID: wishlist.id },
  });

  res.status(203).json({
    success: true,
    message: "Emptied customer wishlist",
  });
}
