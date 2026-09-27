import { Router } from "express";
import {
  allowIfAuthenticated,
  allowIfIsSeller,
} from "../../middleware/auth-middleware";
import {
  CreateNewProduct,
  FetchSellerProducts,
} from "../../controllers/products/sellers/products";
import {
  DeleteSellerIndividualProduct,
  FetchSellerIndividualProduct,
  UpdateSellerProductVerifiedStatus,
} from "../../controllers/products/sellers/individual-product";

const sellerRouter = Router();

sellerRouter.use(allowIfAuthenticated);
sellerRouter.use(allowIfIsSeller);

sellerRouter.get("", FetchSellerProducts);
sellerRouter.post("", CreateNewProduct);

// Invidiual product
sellerRouter.get("/:id", FetchSellerIndividualProduct);
sellerRouter.patch("/:id", UpdateSellerProductVerifiedStatus);
sellerRouter.delete("/:id", DeleteSellerIndividualProduct);

export default sellerRouter;
