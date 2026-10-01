import { Router } from "express";
import {
  allowIfAuthenticated,
  allowIfIsCustomer,
} from "../middleware/auth-middleware";
import { CustomerEmptyCart, CustomerFetchCart } from "../controllers/cart/cart";
import {
  CustomerDeleteCartItem,
  CustomerOrderCartItem,
  CustomerUpdateCartItem,
} from "../controllers/cart/cart-item";
import { body } from "express-validator";

const cartRouter = Router();

cartRouter.use(allowIfAuthenticated);
cartRouter.use(allowIfIsCustomer);

cartRouter.get("", CustomerFetchCart);
cartRouter.delete("", CustomerEmptyCart);

cartRouter.put("/:id", body("increment").isBoolean(), CustomerUpdateCartItem);
cartRouter.patch("/:id", CustomerOrderCartItem);
cartRouter.delete("/:id", CustomerDeleteCartItem);

export default cartRouter;
