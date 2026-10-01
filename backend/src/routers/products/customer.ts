import { Router } from "express";
import {
  AddToCart,
  AddToWishlist,
  CustomerFetchIndividualProduct,
  OrderProduct,
} from "../../controllers/products/customers/individual-product";
import { CustomerFetchProducts } from "../../controllers/products/customers/products";
import {
  allowIfAuthenticated,
  allowIfIsCustomer,
} from "../../middleware/auth-middleware";
import { body } from "express-validator";

const customerRouter = Router();

customerRouter.get("", CustomerFetchProducts);

// Individual products
customerRouter.get("/:id", CustomerFetchIndividualProduct);
customerRouter.post("/:id", allowIfAuthenticated, allowIfIsCustomer, AddToCart);
customerRouter.put(
  "/:id",
  allowIfAuthenticated,
  allowIfIsCustomer,
  AddToWishlist,
);
customerRouter.patch(
  "/:id",
  allowIfAuthenticated,
  allowIfIsCustomer,
  body("quantity").isNumeric(),
  OrderProduct,
);

export default customerRouter;
