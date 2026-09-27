import { Router } from "express";
import { FetchCustomerProducts } from "../../controllers/products/customers/products";
import {
  AddToCart,
  AddToWishlist,
  FetchCustomerIndividualProduct,
  OrderProduct,
} from "../../controllers/products/customers/individual-product";
import { allowIfAuthenticated } from "../../middleware/auth-middleware";

const customerRouter = Router();

customerRouter.get("", FetchCustomerProducts);

// Individual products
customerRouter.get("/:id", FetchCustomerIndividualProduct);
customerRouter.post("/:id", allowIfAuthenticated, AddToCart);
customerRouter.put("/:id", allowIfAuthenticated, AddToWishlist);
customerRouter.patch("/:id", allowIfAuthenticated, OrderProduct);

export default customerRouter;
