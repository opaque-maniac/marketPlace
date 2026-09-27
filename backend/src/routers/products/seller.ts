import { Router } from "express";
import {
  allowIfAuthenticated,
  allowIfIsSeller,
} from "../../middleware/auth-middleware";
import { FetchSellerProducts } from "../../controllers/products/sellers/products";

const sellerRouter = Router();

sellerRouter.use(allowIfAuthenticated);
sellerRouter.use(allowIfIsSeller);

sellerRouter.get("", FetchSellerProducts);

export default sellerRouter;
