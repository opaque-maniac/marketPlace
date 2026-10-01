import type { Request, Response } from "express";
import { Errors } from "../../errors/definitions";
import db from "../../db/db";
import { JWTPayload } from "../../definitons/jwt";

export async function CustomerDeleteWishlistItem(
  req: Request,
  res: Response,
): Promise<void> {
  const user = (req as any).user as JWTPayload;
  const { id } = req.params;

  const item = await db.wishListItem.findFirst({
    where: {
      id,
      wishlist: {
        customerID: user.id,
      },
    },
  });
  if (!item) {
    throw Errors.NotFound("Wishlist item not found", "WishlistItem");
  }

  await db.wishList.delete({
    where: { id },
  });

  res.status(203).json({
    success: true,
    message: "Deleted wishlist item",
  });
}
