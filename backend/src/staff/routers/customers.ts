import { Router } from "express";
import { body } from "express-validator";
import { stringConfig } from "../../utils/globals";
import {
  allowIfAuthenticated,
  isStaff,
} from "../../middleware/auth-middleware";
import {
  deleteCustomer,
  disableCustomer,
  enableCustomer,
  fetchCustomers,
  fetchIndividualCustomer,
  updateCustomer,
} from "../handlers/customers";
import { fetchUserCart } from "../handlers/cart";
import { fetchUserWishlist } from "../handlers/wishlist";

const router = Router();

// middleware
router.use(allowIfAuthenticated);
router.use(isStaff);

// customers
router.get("/", fetchCustomers);

// fetch individual customer
router.get("/:id", fetchIndividualCustomer);

// update customer
router.put(
  "/:id",
  body("firstName").isString().isLength(stringConfig),
  body("lastName").isString().isLength(stringConfig),
  body("phone")
    .isString()
    .matches(/^\d{11}$/)
    .optional(),
  body("address").isString().isLength(stringConfig).optional(),
  updateCustomer,
);

// disable and enable customer
router.post("/:id/disable", disableCustomer);
router.post("/:id/enable", enableCustomer);

// delete customer
router.delete("/:id", deleteCustomer);

// fetch cart and wishlist
router.get("/:id/cart", fetchUserCart);
router.get("/:id/wishlist", fetchUserWishlist);

export default router;
