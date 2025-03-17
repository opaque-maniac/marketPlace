import { Router } from "express";
import { body } from "express-validator";
import { fetchIndividualProduct, fetchProducts } from "../handlers/products";
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

// fetch individual product
router.get("/:id", fetchIndividualProduct);

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

export default router;
