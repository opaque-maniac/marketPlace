import type { Request, Response } from "express";
import { Errors } from "../../errors/definitions";
import db from "../../db/db";
import { CartItemSearchParams } from "../../definitons/search";
import { JWTPayload } from "../../definitons/jwt";
import searchService from "../../utils/services/search-service";

export async function CustomerFetchCart(
  req: Request,
  res: Response,
): Promise<void> {
  const page = req.query.page ? Number(req.query.page) : 1;
  const limit = req.query.limit ? Number(req.query.limit) : 10;
  // const query = req.query.query ? (req.query.query as string) : "";

  const user = (req as any).user as JWTPayload;

  const cart = await db.cart.findFirst({
    where: { customerID: user.id },
  });
  if (!cart) {
    throw Errors.Unauthorized("Unauthorized");
  }

  const params: CartItemSearchParams = {
    limit,
    page,
    cartId: cart.id,
  };

  const { items, hasNext } = await searchService.cartItems(params);

  res.status(200).json({
    success: true,
    message: "Fetched cart items",
    items,
    hasNext,
  });
}

export async function CustomerEmptyCart(
  req: Request,
  res: Response,
): Promise<void> {
  const user = (req as any).user as JWTPayload;

  const cart = await db.cart.findFirst({
    where: { customerID: user.id },
  });
  if (!cart) {
    throw Errors.Unauthorized("Unauthorized");
  }

  await db.cartItem.deleteMany({
    where: { cartID: cart.id },
  });

  res.status(203).json({
    success: true,
    message: "Emptied customer cart",
  });
}
