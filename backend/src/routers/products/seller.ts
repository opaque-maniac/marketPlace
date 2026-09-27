import { Router } from "express";
import {
  allowIfAuthenticated,
  allowIfIsSeller,
} from "../../middleware/auth-middleware";
import { CreateNewProduct, FetchSellerProducts } from "../../controllers/products/sellers/products";

const sellerRouter = Router();

sellerRouter.use(allowIfAuthenticated);
sellerRouter.use(allowIfIsSeller);

sellerRouter.get("", FetchSellerProducts);
sellerRouter.post("", CreateNewProduct);

export default sellerRouter;
