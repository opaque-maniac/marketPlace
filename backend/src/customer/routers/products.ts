import { Router } from "express";
import { body } from "express-validator";
import {
  fetchCustomerProductRatings,
  fetchIndividualProduct,
  fetchProducts,
  newOrUpdateRating,
} from "../handlers/products";
import {
  createProductComment,
  fetchProductComments,
} from "../handlers/comments";
import {
  allowIfAuthenticated,
  isCustomer,
} from "../../middleware/auth-middleware";
import { stringConfig } from "../../utils/globals";

const router = Router();

// fetch products
router.get("/", fetchProducts);

// fetch comments
router.get("/:id/comments", fetchProductComments);

// create comment
router.post(
  "/:id/comments",
  allowIfAuthenticated,
  isCustomer,
  body("message").isString().isLength(stringConfig),
  createProductComment,
);

// current user ratings
router.get(
  "/:id/ratings",
  allowIfAuthenticated,
  isCustomer,
  fetchCustomerProductRatings,
);

// new or update ratings
router.post(
  "/:id/ratings",
  allowIfAuthenticated,
  isCustomer,
  body("value").isNumeric(),
  newOrUpdateRating,
);

// fetch individual product
router.get("/:id", fetchIndividualProduct);

export default router;
